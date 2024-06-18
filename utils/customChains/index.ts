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