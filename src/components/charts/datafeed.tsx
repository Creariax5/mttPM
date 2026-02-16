//datafeed.tsx
import { sdk, streams } from '@/lib/sdkClient';
import { formatPureNumber } from '@mobula_labs/sdk';

export const supportedResolutions = ['1s', '5s', '15s', '30s', '1', '5', '15', '30', '60', '240', '1D', '1W', '1M'];

const lastBarsCache = new Map<string, unknown>();
type StreamSubscription = { unsubscribe: () => void };
const activeSubscriptions = new Map<string, { subscription: StreamSubscription; assetKey: string }>();
const pendingRequests = new Map<string, Promise<any[]>>();
const marksCache = new Map<string, Map<string, ChartMark>>();

const getMarksCacheKey = (address: string | undefined, chainId: string) => `${address}-${chainId}`;

export type ChartMetricMode = 'price' | 'marketcap';

export interface ChartMarkCustomColor {
  color: string;
  background: string;
}

export interface ChartMark {
  id: string | number;
  time: number;
  color: 'red' | 'green' | 'blue' | 'yellow' | ChartMarkCustomColor;
  text: string;
  label: string;
  labelFontColor: string;
  minSize: number;
}

const clearCacheForMetric = (assetId: string | undefined, metric: ChartMetricMode) => {
  const keysToDelete: string[] = [];
  
  lastBarsCache.forEach((_, key) => {
    if (key.includes(`${assetId}-`) && key.includes(`-${metric}`)) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach(key => lastBarsCache.delete(key));
  const requestKeysToDelete: string[] = [];
  pendingRequests.forEach((_, key) => {
    if (key.includes(`${assetId}-`)) {
      requestKeysToDelete.push(key);
    }
  });

  requestKeysToDelete.forEach(key => pendingRequests.delete(key));
};

interface ChartSettings {
  isUsd: boolean;
  metric: ChartMetricMode;
  circulatingSupply: number;
  scaleDivisor: number;
}

const normalizeResolution = (resolution: string): string => {
  switch (resolution) {
    case '1S':
    case '1s':
      return '1s';
    case '5S':
    case '5s':
      return '5s';
    case '15S':
    case '15s':
      return '15s';
    case '30S':
    case '30s':
      return '30s';
    case '1':
    case '1m':
      return '1m';
    case '5':
    case '5m':
      return '5m';
    case '15':
    case '15m':
      return '15m';
    case '30':
    case '30m':
      return '30m';
    case '60':
    case '1h':
      return '1h';
    case '240':
    case '4h':
      return '4h';
    case '1D':
    case '1d':
      return '1d';
    case '1W':
    case '1w':
      return '1w';
    case '1M':
    case '1month':
      return '1M';
    default:
      return resolution;
  }
};

type BaseAsset = {
  asset?: string;
  address?: string;
  chainId: string;
  symbol?: string;
  base?: { symbol?: string };
  quote?: { symbol?: string; priceUSD?: number };
  priceUSD?: number;
  isPair?: boolean;
  circulatingSupply?: number;
};

class BaseAssetRef {
  current: BaseAsset;
  constructor(initialAsset: BaseAsset) {
    this.current = initialAsset;
  }
  update(newAsset: BaseAsset) {
    this.current = newAsset;
  }
}

const buildSettingsKey = (assetId: string | undefined, resolution: string, settings: ChartSettings) => {
  const currency = settings.isUsd ? 'usd' : 'quote';
  return `${assetId ?? 'unknown'}-${resolution}-${currency}-${settings.metric}`;
};

const buildRequestKey = (
  assetId: string | undefined,
  resolution: string,
  params: { from: number; to: number },
  settings: ChartSettings,
) => `${buildSettingsKey(assetId, resolution, settings)}-${params.from}-${params.to}`;

const applyMetricToBar = (bar: any, settings: ChartSettings) => {
  if (settings.metric !== 'marketcap') {
    return bar;
  }

  const supply = settings.circulatingSupply;
  if (!supply || supply <= 0) {
    return bar;
  }

  const open = Number(bar.open) || 0;
  const high = Number(bar.high) || 0;
  const low = Number(bar.low) || 0;
  const close = Number(bar.close) || 0;

  const mcBar = {
    ...bar,
    open: open * supply,
    high: high * supply,
    low: low * supply,
    close: close * supply,
  };

  return mcBar;
};

const applyMetricToBars = (bars: any[], settings: ChartSettings) => bars.map((bar) => applyMetricToBar(bar, settings));

interface DatafeedOptions {
  isUsd?: boolean;
  metricMode?: ChartMetricMode;
  deployer?: string;
  userAddress?: string;
}

export const Datafeed = (
  initialBaseAsset: BaseAsset,
  options: DatafeedOptions = {},
) => {
  const baseAssetRef = new BaseAssetRef(initialBaseAsset);
  const marksOptionsRef = {
    current: {
      deployer: options.deployer,
      userAddress: options.userAddress,
    },
  };
  const settingsRef = {
    current: {
      isUsd: options.isUsd ?? false,
      metric: options.metricMode ?? 'price',
      circulatingSupply: initialBaseAsset.circulatingSupply ?? 0,
      scaleDivisor: 1,
    } satisfies ChartSettings,
  };

  const updateSupply = (supply?: number) => {
    settingsRef.current.circulatingSupply = supply ?? 0;
  };

  return {
    updateBaseAsset: (newAsset: BaseAsset) => {
      baseAssetRef.update(newAsset);
      updateSupply(newAsset.circulatingSupply);
    },

    setCurrencyMode: (nextIsUsd: boolean) => {
      settingsRef.current.isUsd = nextIsUsd;
    },

    setMetricMode: (mode: ChartMetricMode) => {
      const current = baseAssetRef.current;
      const assetId = current.isPair ? current.address : current.asset;
      settingsRef.current.metric = mode;
      clearCacheForMetric(assetId, mode);
      const keysToDelete: string[] = [];
      lastBarsCache.forEach((_, key) => {
        if (key.includes(`${assetId}-`)) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach(key => lastBarsCache.delete(key));
      
      // Unsubscribe from all active subscriptions
      activeSubscriptions.forEach((sub, uid) => {
        try {
          sub.subscription.unsubscribe();
        } catch { }
        activeSubscriptions.delete(uid);
      });
    },

    setCirculatingSupply: updateSupply,

    onReady: (cb: (config: any) => void) => {
      console.log('[Datafeed Debug] onReady called');
      setTimeout(() => {
        console.log('[Datafeed Debug] onReady callback executing');
        cb({
          supported_resolutions: supportedResolutions,
          supports_search: false,
          supports_group_request: false,
          supports_marks: true,
          supports_timescale_marks: false,
          supports_time: true,
        });
      }, 0);
    },

    searchSymbols: (
      _userInput: string,
      _exchange: string,
      _symbolType: string,
      onResult: (result: never[]) => void,
    ) => {
      onResult([]);
    },

    resolveSymbol: (symbolName: string, onResolve: (info: any) => void) => {
      console.log('[Datafeed Debug] resolveSymbol called:', symbolName);
      setTimeout(() => {
        const price = baseAssetRef.current.priceUSD ?? 1;
        const supply = settingsRef.current.circulatingSupply;
        const metric = settingsRef.current.metric;
        let cleanSymbolName = symbolName.split('?')[0];
        cleanSymbolName = cleanSymbolName.replace(/_(MCAP|PRICE)_\d+$/, '');
        if (cleanSymbolName.endsWith('_MCAP') || cleanSymbolName.endsWith('_PRICE')) {
          cleanSymbolName = cleanSymbolName.replace(/_(MCAP|PRICE)$/, '');
        }

        const effectiveValue = metric === 'marketcap' && supply > 0
          ? price * supply
          : price;

        let pricescale: number;
        let scaleDivisor = 1;
        const magnitude = Math.floor(Math.log10(Math.max(effectiveValue, 0.0001)));

        if (metric === 'marketcap' && supply > 0) {
          pricescale = 100;
        } else {
          if (magnitude >= 0) {
            pricescale = 100;
          } else {
            pricescale = Math.pow(10, Math.abs(magnitude) + 4);
          }
          pricescale = Math.min(Math.max(pricescale, 100), 1e16);
        }

        if (metric === 'marketcap') {
          settingsRef.current.scaleDivisor = scaleDivisor;
        } else {
          settingsRef.current.scaleDivisor = 1;
        }

        const displayName = metric === 'marketcap'
          ? `${cleanSymbolName} MC`
          : cleanSymbolName;

        const info = {
          name: displayName,
          description: metric === 'marketcap'
            ? 'MarketCap'
            : 'Price in USD',
          type: 'crypto',
          session: '24x7',
          timezone: 'Etc/UTC',
          ticker: symbolName,
          minmov: 1,
          pricescale: pricescale,
          format: metric === 'marketcap' ? 'volume' : 'price',
          has_intraday: true,
          has_seconds: true,
          has_daily: true,
          has_weekly_and_monthly: true,
          intraday_multipliers: ['1', '5', '15', '30', '60', '240'],
          seconds_multipliers: ['1', '5', '15', '30'],
          daily_multipliers: ['1'],
          supported_resolution: supportedResolutions,
          volume_precision: 2,
          data_status: 'streaming',
        };
        onResolve(info);
      }, 0);
    },

    getBars: async (
      _info: any,
      resolution: string,
      params: any,
      onResult: (bars: any[], meta: { noData: boolean }) => void,
    ) => {
      console.log('[Datafeed Debug] getBars called', { resolution, params });
      const current = baseAssetRef.current;
      const assetId = current.isPair ? current.address : current.asset;
      const normalizedResolution = normalizeResolution(resolution);
      const settingsSnapshot: ChartSettings = { ...settingsRef.current };
      const requestKey = buildRequestKey(assetId, normalizedResolution, params, settingsSnapshot);
      const cacheKey = buildSettingsKey(assetId, normalizedResolution, settingsSnapshot);

      const fromMs = params.from * 1000;
      const toMs = params.to * 1000;

      console.log('[Datafeed Debug] Fetching data for:', { assetId, isPair: current.isPair, chainId: current.chainId });

      try {
        if (pendingRequests.has(requestKey) && settingsSnapshot.metric === 'price') {
          const cachedBars = await pendingRequests.get(requestKey)!;
          onResult(cachedBars, { noData: !cachedBars.length });
          return;
        }

        if (settingsSnapshot.metric === 'marketcap') {
          pendingRequests.delete(requestKey);
          lastBarsCache.delete(cacheKey);
        }

        const requestParams: Record<string, string | number | undefined> = {
          from: fromMs,
          to: toMs,
          amount: params.countBack,
          usd: `${settingsSnapshot.isUsd}`,
          period: normalizedResolution,
          blockchain: current.chainId,
        };

        if (current.isPair) {
          requestParams.address = current.address;
          requestParams.mode = 'pair';
        } else {
          requestParams.asset = current.asset;
          requestParams.mode = 'asset';
        }

        console.log('[Datafeed Debug] Fetching historical data with params:', requestParams);
        const rawPromise = sdk.fetchMarketHistoricalPairData(requestParams as Parameters<typeof sdk.fetchMarketHistoricalPairData>[0]).then((res) => (res as { data?: unknown[] })?.data || []);
        const processedPromise = rawPromise.then((bars) => applyMetricToBars(bars, settingsSnapshot));

        pendingRequests.set(requestKey, processedPromise);

        const [rawBars, processedBars] = await Promise.all([rawPromise, processedPromise]);

        console.log('[Datafeed Debug] Got bars:', { count: processedBars.length, hasData: processedBars.length > 0 });
        onResult(processedBars, { noData: !processedBars.length });

        if (rawBars.length > 0) {
          const lastBar = rawBars[rawBars.length - 1] as Record<string, unknown>;
          const cachedBar = lastBarsCache.get(cacheKey) as Record<string, unknown> | undefined;

          if (!cachedBar || (lastBar.time as number) >= (cachedBar.time as number)) {
            lastBarsCache.set(cacheKey, lastBar);
          }
        }

        setTimeout(() => {
          pendingRequests.delete(requestKey);
        }, 200);
      } catch (err) {
        console.error('[Datafeed Debug] Error fetching bars:', err);
        onResult([], { noData: true });
        pendingRequests.delete(requestKey);
      }
    },

    subscribeBars: (
      _info: unknown,
      resolution: string,
      onRealtime: (bar: unknown) => void,
      subscriberUID: string,
    ) => {
      const current = baseAssetRef.current;
      const assetId = current.isPair ? current.address : current.asset;
      const normalizedResolution = normalizeResolution(resolution);
      const settingsSnapshot: ChartSettings = { ...settingsRef.current };
      const cacheKey = buildSettingsKey(assetId, normalizedResolution, settingsSnapshot);
      const subscriptionAssetKey = `${cacheKey}-${current.isPair ? 'pair' : 'asset'}`;

      const existing = activeSubscriptions.get(subscriberUID);
      if (existing?.assetKey === subscriptionAssetKey) {
        return;
      }

      if (existing) {
        existing.subscription.unsubscribe();
        activeSubscriptions.delete(subscriberUID);
      }

      const emitProcessedCandle = (rawCandle: Record<string, unknown>) => {
        const currentSettings: ChartSettings = { ...settingsRef.current };
        const processed = applyMetricToBar({ ...rawCandle }, currentSettings);
        onRealtime(processed);
        const currentCacheKey = buildSettingsKey(assetId, normalizedResolution, currentSettings);
        lastBarsCache.set(currentCacheKey, rawCandle);
      };

      let lastBar = lastBarsCache.get(cacheKey) as Record<string, unknown> | undefined;
      let firstCandleReceived = false;

      try {
        const subscribeParams: { period: string; chainId: string; usd: string; address?: string; asset?: string; mode?: 'pair' | 'asset' } = {
          period: normalizedResolution,
          chainId: current.chainId,
          usd: `${settingsSnapshot.isUsd}`,
        };

        if (current.isPair) {
          subscribeParams.address = current.address;
          subscribeParams.mode = 'pair';
        } else {
          subscribeParams.asset = current.asset;
          subscribeParams.mode = 'asset';
        }

        const subscription = streams.subscribeOhlcv(subscribeParams, (candle: unknown) => {
          const candleData = candle as Record<string, unknown>;
          if (!candleData?.time) return;

          if (!firstCandleReceived) {
            firstCandleReceived = true;

            if (lastBar?.time && lastBar?.close != null) {
              const normalizeTime = (t: number) => t > 10_000_000_000 ? t : t * 1000;
              const lastBarTimeMs = normalizeTime(lastBar.time as number);
              const candleTimeMs = normalizeTime(candleData.time as number);

              if (candleTimeMs > lastBarTimeMs) {
                const startPrice = lastBar.close as number;
                const endPrice = (candleData.open ?? candleData.close ?? startPrice) as number;
                const bridgeTime = (lastBarTimeMs + candleTimeMs) / 2;

                const bridgeBar = {
                  time: bridgeTime,
                  open: startPrice,
                  high: Math.max(startPrice, endPrice),
                  low: Math.min(startPrice, endPrice),
                  close: endPrice,
                  volume: 0,
                };

                emitProcessedCandle(bridgeBar);
                lastBar = bridgeBar;
              }
            }
          }
          emitProcessedCandle(candleData);
          lastBar = candleData;
        });

        activeSubscriptions.set(subscriberUID, { subscription, assetKey: subscriptionAssetKey });
      } catch (err) {
        console.error('Error subscribing to OHLCV stream', err);
      }
    },

    unsubscribeBars: (subscriberUID: string) => {
      const existing = activeSubscriptions.get(subscriberUID);

      if (existing) {
        existing.subscription.unsubscribe();
      }

      activeSubscriptions.delete(subscriberUID);
    },

    getMarks: async (
      _symbolInfo: { ticker?: string },
      _from: number,
      _to: number,
      onDataCallback: (marks: ChartMark[]) => void,
      _resolution: string,
    ) => {
      const { deployer, userAddress } = marksOptionsRef.current;
      const current = baseAssetRef.current;
      const address = current.isPair ? current.address : current.asset;

      if (!deployer && !userAddress) {
        onDataCallback([]);
        return;
      }

      try {
        const transactionSenderAddresses: string[] = [];
        if (deployer) transactionSenderAddresses.push(deployer);
        if (userAddress && userAddress.toLowerCase() !== deployer?.toLowerCase()) {
          transactionSenderAddresses.push(userAddress);
        }

        const requestParams = {
          address: address || '',
          blockchain: current.chainId,
          transactionSenderAddresses: transactionSenderAddresses.join(','),
          limit: 100,
          mode: (current.isPair ? 'pair' : 'asset'),
          formatted: true,
        };

        const response = await sdk.fetchTokenTrades(requestParams as Parameters<typeof sdk.fetchTokenTrades>[0]);

        interface TradeData {
          hash: string;
          date: number | string;
          type: string;
          tokenAmount?: number;
          tokenAmountUsd?: number;
          tokenPrice?: number;
          sender?: string;
        }

        const trades = (response as { data?: TradeData[] })?.data || [];

        const cacheKey = getMarksCacheKey(address, current.chainId);
        if (!marksCache.has(cacheKey)) {
          marksCache.set(cacheKey, new Map());
        }
        const assetMarksCache = marksCache.get(cacheKey)!;

        trades.forEach((trade: TradeData) => {
          const markId = trade.hash;
          
          if (assetMarksCache.has(markId)) {
            return;
          }

          const isDeployer = deployer && trade.sender?.toLowerCase() === deployer.toLowerCase();
          const isBuy = trade.type?.toLowerCase() === 'buy';

          const color =isBuy 
          ? { color: '#ffffff', background: '#18C722' } 
          : { color: '#ffffff', background: '#f51818' };

          let label: string;
          let labelFontColor: string;

          if (isDeployer) {
            label = isBuy ? 'DB' : 'DS';
            labelFontColor = '#ffffff';
          } else {
            label = isBuy ? 'UB' : 'US';
            labelFontColor = '#ffffff';
          }

          const tradeTime = typeof trade.date === 'number' 
            ? (trade.date > 10_000_000_000 ? Math.floor(trade.date / 1000) : trade.date)
            : Math.floor(new Date(trade.date).getTime() / 1000);

          const pricePerToken = trade.tokenPrice ?? 
            (trade.tokenAmount && trade.tokenAmountUsd ? trade.tokenAmountUsd / trade.tokenAmount : 0);

          const formattedAmount = trade.tokenAmountUsd ? formatPureNumber(trade.tokenAmountUsd, { minFractionDigits: 2, maxFractionDigits: 2 }) : '?';
          const formattedPrice = pricePerToken ? formatPureNumber(pricePerToken) : '?';

          const mark: ChartMark = {
            id: markId,
            time: tradeTime,
            color,
            text: `${isDeployer ? 'Dev' : 'User'} ${isBuy ? 'bought' : 'sold'} $${formattedAmount} at $${formattedPrice} USD`,
            label,
            labelFontColor,
            minSize: 20,
          };

          assetMarksCache.set(markId, mark);
        });

        const allMarks = Array.from(assetMarksCache.values());
        onDataCallback(allMarks);
      } catch (err) {
        console.error('Error fetching marks:', err);
        onDataCallback([]);
      }
    },

    updateMarksOptions: (newDeployer?: string, newUserAddress?: string) => {
      const current = baseAssetRef.current;
      const address = current.isPair ? current.address : current.asset;
      
      // Clear marks cache when user address changes to force re-fetch
      const cacheKey = getMarksCacheKey(address, current.chainId);
      if (marksCache.has(cacheKey)) {
        marksCache.delete(cacheKey);
      }
      
      marksOptionsRef.current.deployer = newDeployer;
      marksOptionsRef.current.userAddress = newUserAddress;
    },
  };
};

