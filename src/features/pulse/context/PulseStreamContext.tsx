'use client';

import { createContext, useContext, type ReactNode, useEffect } from 'react';
import { usePulseV2 } from '@/features/pulse/hooks/usePulseV2';
import usePulseDataStore from '@/features/pulse/store/usePulseDataStore';
import { generateMockPulseData } from '@/lib/mockData';

type PulseStreamContextValue = ReturnType<typeof usePulseV2>;

const PulseStreamContext = createContext<PulseStreamContextValue | null>(null);

interface PulseStreamProviderProps {
  children: ReactNode;
}

export function PulseStreamProvider({ children }: PulseStreamProviderProps) {
  // Use mock mode when environment variable is set
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  const pulseStream = usePulseV2('default', 'solana', { enabled: !useMockData });
  
  // Load mock data if enabled
  useEffect(() => {
    if (useMockData) {
      const mockData = generateMockPulseData();
      const pulseDataStore = usePulseDataStore.getState();
      
      // Set initial loading state
      pulseDataStore.setLoading('new', true);
      pulseDataStore.setLoading('bonding', true);
      pulseDataStore.setLoading('bonded', true);
      
      // Simulate loading delay
      setTimeout(() => {
        pulseDataStore.setTokens('new', mockData.new);
        pulseDataStore.setTokens('bonding', mockData.bonding);
        pulseDataStore.setTokens('bonded', mockData.bonded);
        
        pulseDataStore.setLoading('new', false);
        pulseDataStore.setLoading('bonding', false);
        pulseDataStore.setLoading('bonded', false);
      }, 500);
    }
  }, [useMockData]);

  return (
    <PulseStreamContext.Provider value={pulseStream}>
      {children}
    </PulseStreamContext.Provider>
  );
}

export function usePulseStreamContext() {
  const context = useContext(PulseStreamContext);

  if (!context) {
    throw new Error('usePulseStreamContext must be used inside PulseStreamProvider');
  }

  return context;
}


