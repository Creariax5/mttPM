'use client';

import { memo } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, DollarSign, Clock, ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { PMMarket } from '../types';

interface MarketCardProps {
  market: PMMarket;
}

/**
 * Format large numbers with K, M, B suffixes
 */
function formatVolume(value: number | undefined): string {
  if (value === undefined || value === null) return '$0';
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

/**
 * Format time remaining until end date
 */
function formatTimeRemaining(endDate: string | undefined): string {
  if (!endDate) return 'No end date';
  
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  
  if (diff < 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 30) return `${Math.floor(days / 30)}mo`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  return '<1h';
}

/**
 * Get outcome display (Yes/No prices for binary markets)
 */
function getOutcomeDisplay(market: PMMarket): { yes: number; no: number } | null {
  if (!market.outcomes || market.outcomes.length < 2) return null;
  
  const yesOutcome = market.outcomes.find((o) => o.label.toLowerCase() === 'yes');
  const noOutcome = market.outcomes.find((o) => o.label.toLowerCase() === 'no');
  
  if (yesOutcome && noOutcome) {
    return { yes: yesOutcome.price, no: noOutcome.price };
  }
  
  // Fallback: use first two outcomes
  return { yes: market.outcomes[0].price, no: market.outcomes[1].price };
}

const MarketCard = memo(({ market }: MarketCardProps) => {
  const router = useRouter();  
  // DEBUG: Log market data to check what we receive
  if (!market.volume24h) {
    console.log('[MarketCard] Market missing volume24h:', {
      question: market.question,
      marketId: market.marketId,
      volume24h: market.volume24h,
      volumeTotal: market.volumeTotal,
      liquidity: market.liquidity,
      allKeys: Object.keys(market),
    });
  }
    const outcomes = getOutcomeDisplay(market);
  const yesPercent = outcomes ? Math.round(outcomes.yes * 100) : null;
  
  const handleClick = () => {
    // Navigate to market detail page
    router.push(`/predictions/${market.platform}/${encodeURIComponent(market.marketId)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-bgContainer border border-borderDefault hover:border-borderSecondary rounded-lg p-3 cursor-pointer transition-all hover:bg-bgTableHover"
    >
      {/* Question */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm text-textPrimary font-medium line-clamp-2 flex-1">
          {market.question}
        </h3>
        <ExternalLink 
          size={14} 
          className="text-textTertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" 
        />
      </div>

      {/* Outcome Bar */}
      {yesPercent !== null && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-success font-medium">Yes {yesPercent}%</span>
            <span className="text-danger font-medium">No {100 - yesPercent}%</span>
          </div>
          <div className="h-2 bg-danger/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all"
              style={{ width: `${yesPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="flex items-center justify-between text-[11px] text-textTertiary">
        <TooltipProvider delayDuration={0}>
          {/* Volume 24h */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <TrendingUp size={12} className="text-success" />
                <span>{formatVolume(market.volume24h)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              24h Volume: {formatVolume(market.volume24h)}
            </TooltipContent>
          </Tooltip>

          {/* Total Volume */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <DollarSign size={12} className="text-warning" />
                <span>{formatVolume(market.volumeTotal)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Total Volume: {formatVolume(market.volumeTotal)}
            </TooltipContent>
          </Tooltip>

          {/* Time Remaining */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{formatTimeRemaining(market.endDate)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              Ends: {market.endDate ? new Date(market.endDate).toLocaleDateString() : 'TBD'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Category Badge */}
        <span className="px-1.5 py-0.5 bg-bgOverlay rounded text-[10px] capitalize">
          {market.category}
        </span>
      </div>
    </div>
  );
});

MarketCard.displayName = 'MarketCard';

export default MarketCard;
