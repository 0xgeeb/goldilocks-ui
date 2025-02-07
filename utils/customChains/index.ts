import { type Chain } from "viem"

export const BerachainBartioTestnet = {
  id: 80084,
  name: 'Berachain bArtio',  
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  rpcUrls: {
    default: { 
      http: ['https://bartio.rpc.berachain.com/'] 
    },
    public: {
      http: ['https://bartio.rpc.berachain.com/']
    }
  }
} as const satisfies Chain

export const BerachainMainnet = {
  id: 80094,
  name: 'Berachain',
  nativeCurrency: {
    name: 'BERA',
    symbol: 'BERA',
    decimals: 18,
  },
  rpcUrls: {
    default: { 
      http: ['https://rpc.berachain.com/'] 
    },
    public: {
      http: ['https://rpc.berachain.com/']
    }
  }
} as const satisfies Chain