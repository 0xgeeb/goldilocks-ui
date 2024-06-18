import goldiswapABI from "../abi/Goldiswap.json"
import goldilockedABI from "../abi/Goldilocked.json"
import honeyABI from "../abi/Honey.json"
import goldilendABI from "../abi/Goldilend.json"
import ibgtABI from "../abi/IBGT.json"
import bandbearABI from "../abi/BandBear.json"
import bondbearABI from "../abi/BondBear.json"
import beradromeABI from "../abi/Beradrome.json"
import honeycombABI from "../abi/HoneyComb.json"

export const contracts = {
  goldiswap: {
    address: '0xc6f4D3Ae8443f091A9c5015041093F3c0a41956f',
    abi: goldiswapABI.abi
  },
  goldilocked: {
    address: '0xA01cB564ecc3F58a4e2bA5fD59d13a6b998de9b8',
    abi: goldilockedABI.abi
  },
  honey: {
    address: '0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03',
    abi: honeyABI.abi
  },
  goldilend: {
    address: '0xfb8283E50c89e367674BC566db3070D9e9Ff2fDd',
    abi: goldilendABI.abi
  },
  ibgt: {
    address: '0xe2f6eF50fD232c7c9698F2f4CaE44A6D80AaFdEE',
    abi: ibgtABI.abi
  },
  bandbear: {
    address: '0xB1195a6cdB7ef8fB22671bd8321727dBB6DDDe03',
    abi: bandbearABI.abi
  },
  bondbear: {
    address: '0x8172BDB659837F321bF7Da8941d8E12a62a72d6a',
    abi: bondbearABI.abi
  },
  beradrome: {
    address: '0x5371d852e38B72C61DFc7771d225a599d32FE2Ba',
    abi: beradromeABI.abi
  },
  honeycomb: {
    address: '0x7701F54182C55091a8a78a51c22d1899736113D2',
    abi: honeycombABI.abi
  }
}