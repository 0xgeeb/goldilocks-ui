import { type Chain } from "@rainbow-me/rainbowkit"

export const BerachainArtioTestnet = {
  id: 80085,
  name: 'Berachain Artio',  
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  rpcUrls: {
    default: { 
      http: ['https://artio.rpc.berachain.com/'] 
    },
    public: {
      http: ['https://artio.rpc.berachain.com/']
    }
  },
  iconUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.coingecko.com%2Fen%2Fcoins%2Fberachain-bgt&psig=AOvVaw2Ds5B9eQx1wVDvSDjapZ4Z&ust=1714534940577000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPDqpMWC6YUDFQAAAAAdAAAAABAE',
  iconBackground: '#2C1A16'
} as const satisfies Chain