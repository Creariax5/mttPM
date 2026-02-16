'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import clsx from 'clsx';
import { getMarketDetails, getMarketPrices, getMarketTrades, getMarketOHLCV } from '@/features/predictions/api/pmApi';
import type { PMMarket, PMTrade, PMOutcome } from '@/features/predictions/types';
import { Separator } from '@/components/ui/separator';
import { OrderBookPanel } from '@/features/predictions/components/OrderBookPanel';

// ============================================================================
// Utilities
// ============================================================================

function formatVolume(value: number | undefined | string): string {
  if (value === undefined || value === null || value === 'data_not_ingested') return '--';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '--';
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null) return '--';
  if (price < 0.0001) return price.toExponential(2);
  if (price < 0.01) return price.toFixed(4);
  if (price < 1) return price.toFixed(3);
  return price.toFixed(2);
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr || dateStr === '1970-01-01 00:00:00.000') return '--';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '--';
  }
}

function getTimeAgo(timestamp: string): string {
  const now = Date.now();
  const time = new Date(timestamp).getTime();
  const diff = now - time;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

// ============================================================================
// Components
// ============================================================================

const VerticalDivider = () => (
  <div className="flex flex-col h-12 justify-center">
    <Separator orientation="vertical" className="h-full w-px bg-borderPrimary" />
  </div>
);

const MetricDisplay = memo(function MetricDisplay({ 
  label, 
  value, 
  valueColor 
}: { 
  label: string; 
  value?: string;
  valueColor?: string;
}) {
  return (
    <div className="flex flex-col space-y-1 w-[100px] min-w-[100px] text-center">
      <span className="text-grayNeutral font-menlo text-[11px] font-bold leading-[14px] uppercase">
        {label}
      </span>
      <span className={clsx(
        "flex items-center justify-center gap-1 font-menlo text-[15px] font-bold leading-[18px] truncate",
        valueColor || "text-white"
      )}>
        {value ?? '--'}
      </span>
    </div>
  );
});

// TradingView-style price chart using Canvas
function PMChart({ 
  data, 
  color = '#10b981',
  showGrid = true,
}: { 
  data: Array<{ time: number; open: number; high: number; low: number; close: number }>; 
  color?: string;
  showGrid?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 60, bottom: 30, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear
    ctx.fillStyle = '#0d0d0f';
    ctx.fillRect(0, 0, width, height);

    if (data.length < 2) return;

    const closes = data.map((d) => d.close);
    const highs = data.map((d) => d.high);
    const lows = data.map((d) => d.low);
    const minPrice = Math.min(...lows) * 0.98;
    const maxPrice = Math.max(...highs) * 1.02;
    const priceRange = maxPrice - minPrice || 0.01;

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = '#1a1a1f';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        // Price labels
        const price = maxPrice - (priceRange / 4) * i;
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${(price * 100).toFixed(1)}%`, width - padding.right + 5, y + 3);
      }
    }

    // Draw area gradient
    ctx.beginPath();
    data.forEach((point, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i;
      const y = padding.top + chartHeight - ((point.close - minPrice) / priceRange) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    ctx.closePath();
    
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    gradient.addColorStop(0, color + '30');
    gradient.addColorStop(1, color + '05');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    data.forEach((point, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i;
      const y = padding.top + chartHeight - ((point.close - minPrice) / priceRange) * chartHeight;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Current price line
    const lastPrice = data[data.length - 1].close;
    const lastY = padding.top + chartHeight - ((lastPrice - minPrice) / priceRange) * chartHeight;
    
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, lastY);
    ctx.lineTo(width - padding.right, lastY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Price label box
    ctx.fillStyle = color;
    ctx.fillRect(width - padding.right, lastY - 10, 55, 20);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${(lastPrice * 100).toFixed(1)}%`, width - padding.right + 27, lastY + 4);

  }, [data, color, showGrid]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#0d0d0f]">
      <canvas ref={canvasRef} />
    </div>
  );
}

// Trades Table Component
const TradesPanel = memo(function TradesPanel({ 
  trades, 
  compact = false 
}: { 
  trades: PMTrade[]; 
  compact?: boolean;
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="grid grid-cols-4 gap-2 px-3 py-2 text-[10px] text-textTertiary font-medium border-b border-borderDefault/50">
        <div>Amount</div>
        <div>Price</div>
        <div>Side</div>
        <div className="text-right">Age</div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#22242D] scrollbar-track-transparent">
        {trades.map((trade) => (
          <div
            key={trade.tradeId}
            className="grid grid-cols-4 gap-2 px-3 py-1.5 hover:bg-bgOverlay text-[11px] border-b border-borderDefault/30"
          >
            <div className={trade.side === 'buy' ? 'text-success' : 'text-danger'}>
              ${trade.amountUSD.toFixed(2)}
            </div>
            <div className="text-textSecondary">
              {(trade.price * 100).toFixed(1)}%
            </div>
            <div className={clsx(
              "truncate",
              trade.side === 'buy' ? 'text-success' : 'text-danger'
            )}>
              {trade.outcomeLabel}
            </div>
            <div className="text-textTertiary text-right">
              {getTimeAgo(trade.timestamp)}
            </div>
          </div>
        ))}
        {trades.length === 0 && (
          <div className="text-center py-8 text-textTertiary text-xs">
            No trades yet
          </div>
        )}
      </div>
    </div>
  );
});

// Market Stats Tab
const MarketStatsPanel = memo(function MarketStatsPanel({ market }: { market: PMMarket }) {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-bgContainer p-3 rounded-lg">
          <div className="text-xs text-textTertiary mb-1">24h Volume</div>
          <div className="text-lg font-bold">{formatVolume(market.stats?.volume24h)}</div>
        </div>
        <div className="bg-bgContainer p-3 rounded-lg">
          <div className="text-xs text-textTertiary mb-1">Total Volume</div>
          <div className="text-lg font-bold">{formatVolume(market.stats?.totalVolume)}</div>
        </div>
        <div className="bg-bgContainer p-3 rounded-lg">
          <div className="text-xs text-textTertiary mb-1">Liquidity</div>
          <div className="text-lg font-bold text-success">{formatVolume(market.stats?.totalLiquidity)}</div>
        </div>
        <div className="bg-bgContainer p-3 rounded-lg">
          <div className="text-xs text-textTertiary mb-1">Total Trades</div>
          <div className="text-lg font-bold">{market.stats?.tradesCount?.toLocaleString() || '--'}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bgContainer p-3 rounded-lg">
          <div className="text-xs text-textTertiary mb-1">Created</div>
          <div className="text-sm font-medium">{formatDate(market.metadata?.createdAt)}</div>
        </div>
        <div className="bg-bgContainer p-3 rounded-lg">
          <div className="text-xs text-textTertiary mb-1">End Date</div>
          <div className="text-sm font-medium">{formatDate(market.metadata?.resolutionDate)}</div>
        </div>
      </div>

      <div className="bg-bgContainer p-4 rounded-lg">
        <div className="text-xs text-textTertiary mb-2">Description</div>
        <div className="text-sm text-textSecondary">
          {market.description || 'No description available.'}
        </div>
      </div>
    </div>
  );
});

// Outcomes Tab
const OutcomesPanel = memo(function OutcomesPanel({ market }: { market: PMMarket }) {
  const yesOutcome = market.outcomes?.find((o: PMOutcome) => o.label.toLowerCase() === 'yes');
  const noOutcome = market.outcomes?.find((o: PMOutcome) => o.label.toLowerCase() === 'no');
  const yesPercent = yesOutcome ? Math.round(yesOutcome.price * 100) : 0;
  const noPercent = noOutcome ? Math.round(noOutcome.price * 100) : 0;

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div key="yes-outcome" className="bg-bgContainer p-4 rounded-lg border border-success/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-success font-bold text-lg">YES</span>
            <span className="text-2xl font-bold text-success">{yesPercent}%</span>
          </div>
          <div className="h-3 bg-bgOverlay rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500" 
              style={{ width: `${yesPercent}%` }} 
            />
          </div>
          <div className="mt-2 text-xs text-textTertiary">
            Price: ${formatPrice(yesOutcome?.price)}
          </div>
        </div>

        <div key="no-outcome" className="bg-bgContainer p-4 rounded-lg border border-danger/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-danger font-bold text-lg">NO</span>
            <span className="text-2xl font-bold text-danger">{noPercent}%</span>
          </div>
          <div className="h-3 bg-bgOverlay rounded-full overflow-hidden">
            <div 
              className="h-full bg-danger transition-all duration-500" 
              style={{ width: `${noPercent}%` }} 
            />
          </div>
          <div className="mt-2 text-xs text-textTertiary">
            Price: ${formatPrice(noOutcome?.price)}
          </div>
        </div>
      </div>

      {market.outcomes && market.outcomes.length > 2 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-textTertiary">All Outcomes</div>
          {market.outcomes.map((outcome: PMOutcome, idx: number) => (
            <div key={`${outcome.id}-${idx}`} className="flex items-center justify-between bg-bgContainer p-3 rounded-lg">
              <span className="text-sm">{outcome.label}</span>
              <span className="font-bold">{Math.round(outcome.price * 100)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

// ============================================================================
// Main Page Component
// ============================================================================

export default function MarketDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const platform = params.platform as string;
  const marketId = params.marketId as string;

  const [market, setMarket] = useState<PMMarket | null>(null);
  const [trades, setTrades] = useState<PMTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ohlcvData, setOhlcvData] = useState<Array<{ time: number; open: number; high: number; low: number; close: number }>>([]);
  const [showTrades, setShowTrades] = useState(true);
  const [selectedTab, setSelectedTab] = useState('outcomes');

  const fetchMarket = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMarketDetails(platform, marketId);
      setMarket(data);
      setError(null);
      
      const yesOutcome = data.outcomes?.find((o: PMOutcome) => o.label.toLowerCase() === 'yes');
      
      if (yesOutcome) {
        try {
          const ohlcv = await getMarketOHLCV(platform, marketId, yesOutcome.id, '5m', 200);
          if (ohlcv && ohlcv.length > 0) {
            setOhlcvData(ohlcv);
          }
        } catch (ohlcvErr) {
          console.error('Failed to load OHLCV data:', ohlcvErr);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load market');
    } finally {
      setLoading(false);
    }
  }, [platform, marketId]);

  const fetchTrades = useCallback(async () => {
    try {
      const data = await getMarketTrades(platform, marketId, undefined, 50);
      setTrades(data);
    } catch (err) {
      console.error('Failed to fetch trades:', err);
    }
  }, [platform, marketId]);

  const refreshPrices = useCallback(async () => {
    if (!market) return;
    try {
      // Refresh outcome prices for display
      const priceData = await getMarketPrices(platform, marketId);
      if (market.outcomes && priceData?.outcomes) {
        const updatedOutcomes = market.outcomes.map((outcome: PMOutcome) => {
          const outcomePrice = priceData.outcomes[outcome.id];
          return outcomePrice ? { ...outcome, price: outcomePrice.price } : outcome;
        });
        setMarket({ ...market, outcomes: updatedOutcomes });
      }
      
      // Refresh OHLCV chart data from trades (not orderbook)
      const yesOutcome = market.outcomes?.find((o: PMOutcome) => o.label.toLowerCase() === 'yes');
      if (yesOutcome) {
        try {
          const ohlcv = await getMarketOHLCV(platform, marketId, yesOutcome.id, '5m', 200);
          if (ohlcv && ohlcv.length > 0) {
            setOhlcvData(ohlcv);
          }
        } catch (ohlcvErr) {
          console.error('Failed to refresh OHLCV data:', ohlcvErr);
        }
      }
    } catch (err) {
      console.error('Failed to refresh prices:', err);
    }
  }, [platform, marketId, market]);

  useEffect(() => {
    fetchMarket();
    fetchTrades();
  }, [fetchMarket, fetchTrades]);

  useEffect(() => {
    if (!market) return;
    const interval = setInterval(refreshPrices, 10000); // Refresh every 10s (OHLCV from trades)
    return () => clearInterval(interval);
  }, [market, refreshPrices]);

  useEffect(() => {
    const interval = setInterval(fetchTrades, 3000);
    return () => clearInterval(interval);
  }, [fetchTrades]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bgPrimary flex items-center justify-center">
        <div className="text-textSecondary">Loading market...</div>
      </div>
    );
  }

  if (error || !market) {
    return (
      <div className="min-h-screen bg-bgPrimary p-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-textSecondary hover:text-textPrimary mb-4">
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="text-danger text-center py-8">{error || 'Market not found'}</div>
      </div>
    );
  }

  const yesOutcome = market.outcomes?.find((o: PMOutcome) => o.label.toLowerCase() === 'yes');
  const yesPercent = yesOutcome ? Math.round(yesOutcome.price * 100) : 0;

  const tabs = [
    { value: 'outcomes', label: 'Outcomes' },
    { value: 'stats', label: 'Market Stats' },
    { value: 'orderbook', label: 'Order Book' },
    { value: 'trades', label: `Trades (${trades.length})` },
  ];

  return (
    <main className="flex flex-col lg:flex-row w-full min-h-screen overflow-y-auto">
      {/* Main content area */}
      <div className="w-full lg:w-[80%] flex flex-col border-r border-borderDefault">
        {/* Header - DataHeader style */}
        <div className="border-b border-borderDefault px-4 py-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center flex-1 justify-start gap-6">
              {/* Back + Token Info */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => router.back()} 
                  className="p-2 hover:bg-bgContainer rounded-lg transition-colors"
                >
                  <ArrowLeft size={18} className="text-textSecondary" />
                </button>
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded-full shadow-lg overflow-hidden bg-success/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-success">
                      {market.question.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 overflow-hidden min-w-[200px] max-w-[400px]">
                  <span className="text-textPrimary text-[14px] font-medium truncate">
                    {market.question}
                  </span>
                  <div className="flex items-center gap-2 text-textTertiary text-xs">
                    <span className="capitalize">{market.platform}</span>
                    <span>•</span>
                    <span>{market.category}</span>
                    <span>•</span>
                    <span>Ends {formatDate(market.metadata?.resolutionDate)}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center ml-2 gap-0 border border-borderDefault rounded-lg overflow-hidden">
                <MetricDisplay label="YES PRICE" value={`${yesPercent}%`} valueColor="text-success" />
                <VerticalDivider />
                <MetricDisplay label="24H VOL" value={formatVolume(market.stats?.volume24h)} />
                <VerticalDivider />
                <MetricDisplay label="TOTAL VOL" value={formatVolume(market.stats?.totalVolume)} />
                <VerticalDivider />
                <MetricDisplay label="LIQUIDITY" value={formatVolume(market.stats?.totalLiquidity)} valueColor="text-success" />
              </div>
            </div>

            {/* Trade Button */}
            <a
              href={`https://polymarket.com/event/${market.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-success text-black font-bold rounded-lg text-sm hover:bg-success/90 transition-colors"
            >
              <ExternalLink size={14} />
              Trade on Polymarket
            </a>
          </div>
        </div>

        {/* Chart + Trades Resizable */}
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="vertical" className="h-full">
            {/* Chart Panel */}
            <Panel defaultSize={60} minSize={30} maxSize={80}>
              <div className="flex h-full w-full">
                {/* Chart */}
                <div className={clsx(
                  'relative flex-1 bg-[#0d0d0f] border-b border-borderDefault overflow-hidden',
                  !showTrades && 'w-full'
                )}>
                  {/* Chart Header */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-[#0d0d0f]/80 backdrop-blur-sm border-b border-borderDefault/50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-textTertiary">YES Probability</span>
                      <div className="flex items-center gap-1">
                        <button className="text-xs px-2 py-1 bg-bgContainer rounded text-success">5m</button>
                        <button className="text-xs px-2 py-1 text-textTertiary hover:text-textPrimary">15m</button>
                        <button className="text-xs px-2 py-1 text-textTertiary hover:text-textPrimary">1h</button>
                        <button className="text-xs px-2 py-1 text-textTertiary hover:text-textPrimary">1d</button>
                      </div>
                    </div>
                    <div className="text-xs text-textTertiary">
                      {ohlcvData.length > 0 && (
                        <>
                          O: {(ohlcvData[ohlcvData.length - 1].open * 100).toFixed(1)}%{' '}
                          H: {(ohlcvData[ohlcvData.length - 1].high * 100).toFixed(1)}%{' '}
                          L: {(ohlcvData[ohlcvData.length - 1].low * 100).toFixed(1)}%{' '}
                          C: {(ohlcvData[ohlcvData.length - 1].close * 100).toFixed(1)}%
                        </>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 pt-10">
                    <PMChart data={ohlcvData} color="#10b981" />
                  </div>

                  {/* Toggle trades button */}
                  {!showTrades && (
                    <button
                      onClick={() => setShowTrades(true)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-4 h-10 bg-bgTertiary hover:bg-borderDefault border-l border-t border-b border-borderTertiary rounded-l-lg flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}
                </div>

                {/* Trades Sidebar */}
                {showTrades && (
                  <div className="w-[20%] min-w-[200px] bg-bgPrimary border-l border-borderDefault flex flex-col">
                    <div className="h-10 flex items-center justify-between px-3 border-b border-bgContainer flex-shrink-0">
                      <span className="text-xs font-medium text-grayGhost">TRADES</span>
                      <button
                        onClick={() => setShowTrades(false)}
                        className="text-grayGhost bg-bgTertiary rounded-full p-1 hover:text-textPrimary hover:bg-opacity-40 transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <TradesPanel trades={trades} compact />
                    </div>
                  </div>
                )}
              </div>
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="relative h-[6px] group cursor-row-resize flex items-center justify-center bg-bgContainer hover:bg-borderDefault transition-all duration-200 z-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-1 w-10 bg-grayGhost rounded-full group-hover:bg-primary group-hover:w-20 group-hover:h-1.5 transition-all duration-200" />
              </div>
            </PanelResizeHandle>

            {/* Tabs Panel */}
            <Panel defaultSize={40} minSize={20} maxSize={60}>
              <div className="h-full flex flex-col bg-bgPrimary border-t border-borderDefault overflow-hidden">
                {/* Tab Bar */}
                <div className="border-b min-h-10 border-borderDefault flex-shrink-0 flex items-center px-0">
                  {tabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setSelectedTab(tab.value)}
                      className={clsx(
                        'relative px-4 py-2 text-xs font-medium transition-colors border-b-2',
                        selectedTab === tab.value
                          ? 'text-white border-white'
                          : 'text-textTertiary border-transparent hover:text-white hover:border-[#374151]'
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#22242D] scrollbar-track-transparent">
                  {selectedTab === 'outcomes' && <OutcomesPanel market={market} />}
                  {selectedTab === 'stats' && <MarketStatsPanel market={market} />}
                  {selectedTab === 'orderbook' && <OrderBookPanel market={market} platform={platform} marketId={marketId} />}
                  {selectedTab === 'trades' && <TradesPanel trades={trades} />}
                </div>
              </div>
            </Panel>
          </PanelGroup>
        </div>
      </div>

      {/* Right Sidebar - Stats Card */}
      <aside className="w-full lg:w-[20%] bg-bgPrimary flex flex-col border-l border-borderDefault overflow-y-auto scrollbar-hide">
        <div className="p-4 border-b border-borderDefault">
          <h3 className="text-sm font-bold mb-4">Market Info</h3>
          
          {/* YES/NO Bars */}
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-success font-medium">YES</span>
                <span className="text-xs font-bold text-success">{yesPercent}%</span>
              </div>
              <div className="h-2 bg-bgOverlay rounded-full overflow-hidden">
                <div className="h-full bg-success transition-all duration-500" style={{ width: `${yesPercent}%` }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-danger font-medium">NO</span>
                <span className="text-xs font-bold text-danger">{100 - yesPercent}%</span>
              </div>
              <div className="h-2 bg-bgOverlay rounded-full overflow-hidden">
                <div className="h-full bg-danger transition-all duration-500" style={{ width: `${100 - yesPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">Status</span>
            <span className="font-medium capitalize text-success">{market.status}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">Platform</span>
            <span className="font-medium capitalize">{market.platform}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">Category</span>
            <span className="font-medium">{market.category}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">24h Volume</span>
            <span className="font-medium">{formatVolume(market.stats?.volume24h)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">Total Volume</span>
            <span className="font-medium">{formatVolume(market.stats?.totalVolume)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">Liquidity</span>
            <span className="font-medium text-success">{formatVolume(market.stats?.totalLiquidity)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">Total Trades</span>
            <span className="font-medium">{market.stats?.tradesCount?.toLocaleString() || '--'}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">Created</span>
            <span className="font-medium">{formatDate(market.metadata?.createdAt)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-textTertiary">End Date</span>
            <span className="font-medium">{formatDate(market.metadata?.resolutionDate)}</span>
          </div>
        </div>

        {/* Trade CTA */}
        <div className="mt-auto p-4 border-t border-borderDefault">
          <a
            href={`https://polymarket.com/event/${market.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-success text-black font-bold rounded-lg text-sm hover:bg-success/90 transition-colors"
          >
            <ExternalLink size={14} />
            Trade on Polymarket
          </a>
        </div>
      </aside>
    </main>
  );
}
