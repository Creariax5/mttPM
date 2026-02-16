'use client';

import { memo, useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { PMMarket, PMOutcome } from '../types';
import { getMarketOrderbook } from '../api/pmApi';

interface OrderBookPanelProps {
  market: PMMarket;
  platform: string;
  marketId: string;
}

interface OrderBookData {
  time: number;
  bid: number;
  ask: number;
  spread: number;
}

/**
 * OrderBook Panel - Shows bid/ask spread evolution from pm_prices table
 * Displays orderbook depth and spread changes over time
 */
export const OrderBookPanel = memo(function OrderBookPanel({ market, platform, marketId }: OrderBookPanelProps) {
  const [orderbook, setOrderbook] = useState<OrderBookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'5m' | '15m' | '1h'>('5m');

  const yesOutcome = market.outcomes?.find((o: PMOutcome) => o.label.toLowerCase() === 'yes');

  useEffect(() => {
    if (!yesOutcome?.id) return;

    const fetchOrderbook = async () => {
      try {
        setLoading(true);
        const data = await getMarketOrderbook(platform, marketId, yesOutcome.id, selectedPeriod, 50);
        setOrderbook(data.reverse()); // Reverse to show newest first
      } catch (error) {
        console.error('Failed to fetch orderbook:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderbook();
    const interval = setInterval(fetchOrderbook, 10000); // Refresh every 10s

    return () => clearInterval(interval);
  }, [platform, marketId, yesOutcome?.id, selectedPeriod]);

  const latestData = orderbook[orderbook.length - 1];
  const avgSpread = orderbook.length > 0
    ? orderbook.reduce((sum, d) => sum + d.spread, 0) / orderbook.length
    : 0;

  return (
    <div className="p-4 space-y-4">
      {/* Period Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-textTertiary">Granularity:</span>
        <div className="flex gap-1">
          {(['5m', '15m', '1h'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`text-xs px-2 py-1 rounded ${
                selectedPeriod === period
                  ? 'bg-success text-black font-medium'
                  : 'bg-bgContainer text-textTertiary hover:text-textPrimary'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Current Spread */}
      {latestData && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-bgContainer p-3 rounded-lg">
            <div className="text-xs text-textTertiary mb-1">Best Bid</div>
            <div className="text-lg font-bold text-success flex items-center gap-1">
              <TrendingUp size={16} />
              {(latestData.bid * 100).toFixed(2)}%
            </div>
          </div>
          <div className="bg-bgContainer p-3 rounded-lg">
            <div className="text-xs text-textTertiary mb-1">Best Ask</div>
            <div className="text-lg font-bold text-danger flex items-center gap-1">
              <TrendingDown size={16} />
              {(latestData.ask * 100).toFixed(2)}%
            </div>
          </div>
          <div className="bg-bgContainer p-3 rounded-lg">
            <div className="text-xs text-textTertiary mb-1">Spread</div>
            <div className="text-lg font-bold text-warning">
              {(latestData.spread * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      )}

      {/* Spread History */}
      <div className="bg-bgContainer rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-textPrimary">Spread Evolution (Last 24h)</h3>
          <div className="text-xs text-textTertiary">
            Avg: {(avgSpread * 100).toFixed(2)}%
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-xs text-textTertiary">Loading orderbook data...</div>
          </div>
        ) : orderbook.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-xs text-textTertiary">No orderbook data available</div>
          </div>
        ) : (
          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            {/* Header */}
            <div className="grid grid-cols-4 gap-2 text-[10px] text-textTertiary font-medium pb-2 border-b border-borderDefault sticky top-0 bg-bgContainer">
              <div>Time</div>
              <div className="text-right">Bid</div>
              <div className="text-right">Ask</div>
              <div className="text-right">Spread</div>
            </div>

            {/* Rows */}
            {orderbook.map((data, idx) => {
              const spreadColor = 
                data.spread < 0.01 ? 'text-success' :
                data.spread < 0.03 ? 'text-warning' :
                'text-danger';

              return (
                <div
                  key={idx}
                  className="grid grid-cols-4 gap-2 text-xs py-1.5 hover:bg-bgOverlay rounded transition-colors"
                >
                  <div className="text-textTertiary">
                    {new Date(data.time).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="text-right text-success font-mono">
                    {(data.bid * 100).toFixed(2)}%
                  </div>
                  <div className="text-right text-danger font-mono">
                    {(data.ask * 100).toFixed(2)}%
                  </div>
                  <div className={`text-right font-mono font-medium ${spreadColor}`}>
                    {(data.spread * 100).toFixed(2)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-bgOverlay rounded-lg p-3">
        <div className="text-xs text-textTertiary space-y-1">
          <p><span className="text-textPrimary font-medium">Bid:</span> Highest price someone wants to buy YES at</p>
          <p><span className="text-textPrimary font-medium">Ask:</span> Lowest price someone wants to sell YES at</p>
          <p><span className="text-textPrimary font-medium">Spread:</span> Difference between ask and bid (lower = more liquid)</p>
        </div>
      </div>
    </div>
  );
});
