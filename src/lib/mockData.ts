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

// Prediction Markets Mock Data
import type { PMMarket, PMCategory, PMOutcome } from '@/features/predictions/types';

const generateMockOutcomes = (count: number = 2): PMOutcome[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `outcome-${i}`,
    platformOutcomeId: `${i}`,
    label: i === 0 ? 'Yes' : i === 1 ? 'No' : `Outcome ${i}`,
    price: 0.3 + Math.random() * 0.4, // 0.3 to 0.7
    priceUSD: (0.3 + Math.random() * 0.4) * 1000,
    liquidity: Math.floor(10000 + Math.random() * 50000),
    openInterest: Math.floor(5000 + Math.random() * 20000),
    holders: Math.floor(100 + Math.random() * 500),
  }));
};

const categories = ['Politics', 'Sports', 'Crypto', 'Technology', 'Entertainment', 'Economics'];
const platforms = ['polymarket', 'manifold', 'predictit', 'kalshi'];

const questions = [
  'Will Bitcoin reach $100,000 by end of 2026?',
  'Will there be a recession in the US in 2026?',
  'Will AI surpass human intelligence by 2027?',
  'Will Ethereum complete the merge by Q3 2026?',
  'Will SpaceX successfully land humans on Mars by 2028?',
  'Will the S&P 500 reach 6000 points by end of year?',
  'Will Apple release a foldable iPhone in 2026?',
  'Will Donald Trump win the 2026 election?',
  'Will Tesla stock reach $1000 by end of year?',
  'Will there be a new COVID variant outbreak?',
  'Will the Fed cut interest rates in 2026?',
  'Will NFT market cap exceed $50B again?',
  'Will quantum computing become mainstream?',
  'Will Twitter/X get acquired by another company?',
  'Will inflation drop below 2% in the US?',
];

const generateMockMarket = (index: number, type: 'trending' | 'new' | 'closing'): PMMarket => {
  const now = Date.now();
  const createdAt = type === 'new' ? 
    now - Math.random() * 7 * 24 * 60 * 60 * 1000 : // Within last week
    now - Math.random() * 90 * 24 * 60 * 60 * 1000; // Within last 3 months
  
  const endDate = type === 'closing' ?
    now + Math.random() * 7 * 24 * 60 * 60 * 1000 : // Within next week
    now + (30 + Math.random() * 180) * 24 * 60 * 60 * 1000; // 1-6 months

  const volume24h = type === 'trending' ?
    50000 + Math.random() * 200000 :
    10000 + Math.random() * 50000;

  const volumeTotal = volume24h * (10 + Math.random() * 50);
  const liquidity = volumeTotal * (0.1 + Math.random() * 0.3);

  return {
    id: `market-${index}`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    marketId: `${index}-${Date.now()}`,
    platformMarketId: `pm-${index}`,
    slug: `market-${index}-slug`,
    chainId: 'polygon',
    contractAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
    question: questions[index % questions.length] + (index >= questions.length ? ` (${Math.floor(index / questions.length)})` : ''),
    description: `This is a prediction market for: ${questions[index % questions.length]}. Users can bet on the outcome using their crypto assets.`,
    category: categories[Math.floor(Math.random() * categories.length)],
    tags: ['crypto', 'prediction', 'trading'].slice(0, 1 + Math.floor(Math.random() * 3)),
    type: 'binary',
    status: 'active',
    outcomes: generateMockOutcomes(2),
    stats: {
      totalVolume: volumeTotal,
      volume24h: volume24h,
      volume7d: volume24h * 5,
      totalLiquidity: liquidity,
      totalOpenInterest: liquidity * 0.7,
      totalHolders: Math.floor(100 + Math.random() * 500),
      tradesCount: Math.floor(500 + Math.random() * 2000),
      trades24h: Math.floor(20 + Math.random() * 100),
    },
    metadata: {
      createdAt: new Date(createdAt).toISOString(),
      resolutionDate: new Date(endDate).toISOString(),
      status: 'active',
      resolved: false,
      creator: `0x${Math.random().toString(16).slice(2, 42)}`,
      rewardPool: volumeTotal * 0.02,
      platformFee: 0.02,
      image: `https://picsum.photos/seed/market-${index}/400/300`,
      url: `https://example.com/market/${index}`,
      chainId: 'polygon',
    },
    volume24h,
    volumeTotal,
    liquidity,
    endDate: new Date(endDate).toISOString(),
    createdAt: new Date(createdAt).toISOString(),
    trendingScore: type === 'trending' ? 80 + Math.random() * 20 : 50 + Math.random() * 30,
    volumeChange24h: (Math.random() - 0.5) * 100,
    rank: index + 1,
  };
};

export const generateMockPredictionMarkets = () => {
  return {
    trending: Array.from({ length: 20 }, (_, i) => generateMockMarket(i, 'trending')),
    new: Array.from({ length: 20 }, (_, i) => generateMockMarket(i + 20, 'new')),
    closing: Array.from({ length: 20 }, (_, i) => generateMockMarket(i + 40, 'closing')),
  };
};

export const mockPMCategories: PMCategory[] = categories.map((name, i) => ({
  id: name.toLowerCase(),
  name,
  marketsCount: Math.floor(50 + Math.random() * 200),
  activeMarkets: Math.floor(30 + Math.random() * 100),
  volume24h: 100000 + Math.random() * 500000,
  volumeTotal: 1000000 + Math.random() * 5000000,
}));

// Export mock data as default
export default {
  pulse: generateMockPulseData(),
  trading: mockTradingData,
  predictions: generateMockPredictionMarkets(),
  pmCategories: mockPMCategories,
};
