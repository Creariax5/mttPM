import type { PulseToken } from '@/features/pulse/store/usePulseDataStore';

// Mock token data generator
const generateMockToken = (index: number, type: 'new' | 'bonding' | 'bonded'): PulseToken => {
  const now = Date.now();
  const baseAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
  
  // Generate random data based on type
  const bondingPercentage = type === 'new' ? Math.random() * 30 : 
                           type === 'bonding' ? 30 + Math.random() * 60 : 
                           100;

  const marketCap = type === 'new' ? Math.random() * 50000 : 
                   type === 'bonding' ? 50000 + Math.random() * 200000 : 
                   250000 + Math.random() * 1000000;

  const createdTime = type === 'new' ? now - Math.random() * 3600000 : // Within 1 hour
                     type === 'bonding' ? now - (3600000 + Math.random() * 7200000) : // 1-3 hours ago
                     now - (10800000 + Math.random() * 86400000); // 3-27 hours ago

  const symbols = ['DOGE', 'PEPE', 'SHIB', 'WOJAK', 'BONK', 'FLOKI', 'MEME', 'APE', 'SHIBAI', 'CATCOIN'];
  const names = ['Doge Coin', 'Pepe Frog', 'Shiba Inu', 'Wojak Face', 'Bonk Dog', 'Floki Viking', 'Meme Token', 'Ape Strong', 'Shib AI', 'Cat Coin'];
  
  const symbolIndex = (index % symbols.length);
  const symbol = symbols[symbolIndex] + (Math.floor(index / symbols.length) > 0 ? index : '');
  const name = names[symbolIndex] + (Math.floor(index / names.length) > 0 ? ` ${index}` : '');

  return {
    address: baseAddress,
    chainId: 'solana',
    symbol,
    name,
    logo: `https://picsum.photos/seed/${baseAddress}/200`,
    exchange: {
      logo: 'https://picsum.photos/seed/raydium/50',
      name: 'Raydium'
    },
    socials: {
      twitter: Math.random() > 0.5 ? `https://twitter.com/${symbol.toLowerCase()}` : undefined,
      website: Math.random() > 0.5 ? `https://${symbol.toLowerCase()}.com` : undefined,
      telegram: Math.random() > 0.3 ? `https://t.me/${symbol.toLowerCase()}` : undefined,
    },
    poolAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
    holders_count: Math.floor(50 + Math.random() * 1000),
    holdersCount: Math.floor(50 + Math.random() * 1000),
    proTradersCount: Math.floor(Math.random() * 50),
    deployerMigrations: Math.floor(Math.random() * 10),
    created_at: new Date(createdTime).toISOString(),
    createdAt: new Date(createdTime).toISOString(),
    bonded_at: type === 'bonded' ? new Date(createdTime + 3600000).toISOString() : undefined,
    marketCap,
    organic_volume_sell_24h: marketCap * (0.1 + Math.random() * 0.3),
    fees_paid_24h: marketCap * 0.01 * Math.random(),
    price_change_24h: (Math.random() - 0.5) * 200, // -100% to +100%
    buys_24h: Math.floor(100 + Math.random() * 500),
    sells_24h: Math.floor(50 + Math.random() * 300),
    bondingPercentage,
    ath: 1 + Math.random() * 10,
    athDate: now - Math.random() * 86400000,
    atl: 0.1 + Math.random() * 0.5,
    atlDate: now - Math.random() * 86400000,
    source: 'pumpfun',
    // Additional holdings data
    top10Holdings: 20 + Math.random() * 40,
    devHoldingsPercentage: 5 + Math.random() * 15,
    snipersHoldings: 2 + Math.random() * 10,
    insidersHoldings: 3 + Math.random() * 12,
    bundlersHoldings: 1 + Math.random() * 8,
    // Price data
    priceUSD: Math.random() * 0.01,
    liquidityUSD: marketCap * (0.05 + Math.random() * 0.15),
    volume24h: marketCap * (0.2 + Math.random() * 0.5),
  };
};

// Generate mock data for each view
export const generateMockPulseData = () => {
  const newTokens: PulseToken[] = Array.from({ length: 20 }, (_, i) => generateMockToken(i, 'new'));
  const bondingTokens: PulseToken[] = Array.from({ length: 20 }, (_, i) => generateMockToken(i, 'bonding'));
  const bondedTokens: PulseToken[] = Array.from({ length: 20 }, (_, i) => generateMockToken(i, 'bonded'));

  return {
    new: newTokens,
    bonding: bondingTokens,
    bonded: bondedTokens,
  };
};

// Sample trading data
export const mockTradingData = {
  markets: [
    {
      id: '1',
      pair: 'SOL/USDC',
      price: 98.45,
      change24h: 5.32,
      volume24h: 12500000,
      liquidity: 5000000,
    },
    {
      id: '2',
      pair: 'ETH/USDC',
      price: 2845.32,
      change24h: -2.15,
      volume24h: 45000000,
      liquidity: 25000000,
    },
  ],
  trades: [
    {
      id: '1',
      type: 'buy',
      price: 98.45,
      amount: 100,
      time: Date.now() - 60000,
      total: 9845,
    },
    {
      id: '2',
      type: 'sell',
      price: 98.40,
      amount: 50,
      time: Date.now() - 120000,
      total: 4920,
    },
  ],
};

// Export mock data as default
export default {
  pulse: generateMockPulseData(),
  trading: mockTradingData,
};
