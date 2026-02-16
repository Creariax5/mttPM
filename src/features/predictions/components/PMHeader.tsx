'use client';

import { ChevronDown, RefreshCw } from 'lucide-react';
import { useState, useCallback } from 'react';
import { usePMStore } from '../store/usePMStore';
import type { PMCategory } from '../types';

interface PMHeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function PMHeader({ onRefresh, isRefreshing }: PMHeaderProps) {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const { categories, selectedCategory, setSelectedCategory } = usePMStore();

  const handleCategorySelect = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      setCategoryOpen(false);
    },
    [setSelectedCategory]
  );

  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name || selectedCategory
    : 'All Categories';

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-4">
        <h1 className="text-xl text-textPrimary font-bold">Predictions</h1>
        
        {/* Category Filter */}
        <div className="relative">
          <button
            onClick={() => setCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-2 bg-bgContainer border border-borderDefault rounded-lg px-3 py-1.5 text-sm text-textPrimary hover:bg-bgOverlay transition"
          >
            <span className="capitalize">{selectedCategoryName}</span>
            <ChevronDown size={14} className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCategoryOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setCategoryOpen(false)}
              />
              
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-bgContainer border border-borderDefault rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-bgOverlay transition ${
                    !selectedCategory ? 'text-success' : 'text-textPrimary'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-bgOverlay transition ${
                      selectedCategory === cat.id ? 'text-success' : 'text-textPrimary'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="capitalize">{cat.name}</span>
                      <span className="text-xs text-textTertiary">{cat.activeMarkets}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-2 bg-bgContainer border border-borderDefault rounded-lg px-3 py-1.5 text-sm text-textPrimary hover:bg-bgOverlay transition disabled:opacity-50"
      >
        <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
        <span className="hidden sm:inline">Refresh</span>
      </button>
    </div>
  );
}
