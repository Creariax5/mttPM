'use client';

import { useEffect, useCallback } from 'react';
import { usePMStore, type PMViewName } from '../store/usePMStore';
import { getTrendingMarkets, searchMarkets, getCategories } from '../api/pmApi';
import { generateMockPredictionMarkets, mockPMCategories } from '@/lib/mockData';

interface UsePMDataOptions {
  enabled?: boolean;
  refreshInterval?: number;
}

/**
 * Hook to fetch and manage prediction markets data
 */
export function usePMData(options: UsePMDataOptions = {}) {
  const { enabled = true, refreshInterval = 30000 } = options;
  // Always use mock data for now
  const useMockData = true; // process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  
  const {
    sections,
    categories,
    selectedCategory,
    setMarkets,
    setLoading,
    setError,
    setCategories,
  } = usePMStore();

  const fetchTrending = useCallback(async () => {
    setLoading('trending', true);
    try {
      if (useMockData) {
        // Use mock data
        const mockData = generateMockPredictionMarkets();
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        setMarkets('trending', mockData.trending);
        setLoading('trending', false);
      } else {
        const markets = await getTrendingMarkets('24h', selectedCategory || undefined, 50);
        setMarkets('trending', markets);
        setLoading('trending', false);
      }
    } catch (err) {
      setLoading('trending', false);
      setError('trending', err instanceof Error ? err.message : 'Failed to fetch trending');
    }
  }, [selectedCategory, setLoading, setMarkets, setError, useMockData]);

  const fetchNew = useCallback(async () => {
    setLoading('new', true);
    try {
      if (useMockData) {
        // Use mock data
        const mockData = generateMockPredictionMarkets();
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        setMarkets('new', mockData.new);
        setLoading('new', false);
      } else {
        const response = await searchMarkets({
          status: 'active',
          limit: 50,
          category: selectedCategory || undefined,
        });
        // Sort by creation date descending
        const sorted = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        setMarkets('new', sorted);
        setLoading('new', false);
      }
    } catch (err) {
      setLoading('new', false);
      setError('new', err instanceof Error ? err.message : 'Failed to fetch new markets');
    }
  }, [selectedCategory, setLoading, setMarkets, setError, useMockData]);

  const fetchClosing = useCallback(async () => {
    setLoading('closing', true);
    try {
      if (useMockData) {
        // Use mock data
        const mockData = generateMockPredictionMarkets();
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        setMarkets('closing', mockData.closing);
        setLoading('closing', false);
      } else {
        const response = await searchMarkets({
          status: 'active',
          limit: 50,
          category: selectedCategory || undefined,
        });
        // Sort by end date ascending (closest to ending first)
        const sorted = response.data
          .filter((m) => m.endDate)
          .sort((a, b) => {
            const dateA = new Date(a.endDate || 0).getTime();
            const dateB = new Date(b.endDate || 0).getTime();
            return dateA - dateB;
          });
        setMarkets('closing', sorted);
        setLoading('closing', false);
      }
    } catch (err) {
      setLoading('closing', false);
      setError('closing', err instanceof Error ? err.message : 'Failed to fetch closing markets');
    }
  }, [selectedCategory, setLoading, setMarkets, setError, useMockData]);

  const fetchCategories = useCallback(async () => {
    try {
      if (useMockData) {
        // Use mock categories
        setCategories(mockPMCategories);
      } else {
        const cats = await getCategories();
        setCategories(cats);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, [setCategories, useMockData]);

  const refreshAll = useCallback(() => {
    fetchTrending();
    fetchNew();
    fetchClosing();
  }, [fetchTrending, fetchNew, fetchClosing]);

  // Initial fetch
  useEffect(() => {
    if (!enabled) return;
    
    fetchCategories();
    refreshAll();

    // Set up refresh interval
    const interval = setInterval(refreshAll, refreshInterval);
    return () => clearInterval(interval);
  }, [enabled, refreshAll, refreshInterval, fetchCategories]);

  // Refetch when category changes
  useEffect(() => {
    if (!enabled) return;
    refreshAll();
  }, [selectedCategory, enabled, refreshAll]);

  return {
    trending: sections.trending,
    new: sections.new,
    closing: sections.closing,
    categories,
    selectedCategory,
    refreshAll,
    loading: sections.trending.loading || sections.new.loading || sections.closing.loading,
    error: sections.trending.error || sections.new.error || sections.closing.error,
  };
}
