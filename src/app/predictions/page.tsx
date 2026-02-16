'use client';

import { useState, useCallback } from 'react';
import PMHeader from '@/features/predictions/components/PMHeader';
import MarketSection from '@/features/predictions/components/MarketSection';
import { usePMData } from '@/features/predictions/hooks/usePMData';

export default function PredictionsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshAll, loading, error } = usePMData({ enabled: true });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshAll();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refreshAll]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-danger">
        <p>Error loading prediction markets: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-bgPrimary min-h-screen">
      {/* Header */}
      <div className="pt-3 pb-1">
        <PMHeader onRefresh={handleRefresh} isRefreshing={isRefreshing || loading} />
      </div>

      {/* Three Column Grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 min-h-[calc(100vh-200px)]">
          {/* Trending Markets */}
          <div className="border border-borderDefault md:border-r-0 md:rounded-l-lg overflow-hidden">
            <MarketSection title="Trending" viewName="trending" icon="trending" />
          </div>

          {/* New Markets */}
          <div className="border border-borderDefault border-t-0 md:border-t overflow-hidden">
            <MarketSection title="New Markets" viewName="new" icon="new" />
          </div>

          {/* Closing Soon */}
          <div className="border border-borderDefault border-t-0 md:border-t md:border-l-0 md:rounded-r-lg overflow-hidden">
            <MarketSection title="Closing Soon" viewName="closing" icon="closing" />
          </div>
        </div>
      </div>
    </div>
  );
}
