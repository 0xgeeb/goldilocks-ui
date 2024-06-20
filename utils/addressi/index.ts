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
    address: '0x1e30215d6Be6ec48785B7CAA60d31ccaa0186A98',
    abi: goldilendABI.abi
  },
  ibgt: {
    address: '0xB1195a6cdB7ef8fB22671bd8321727dBB6DDDe03',
    abi: ibgtABI.abi
  },
  bandbear: {
    address: '0xF21F3139BD4aD005aAba2ef2d6F319058bFA7230',
    abi: bandbearABI.abi
  },
  bondbear: {
    address: '0x186C96B9c362DBBf4D33C6dAd04127F0238F5499',
    abi: bondbearABI.abi
  },
  beradrome: {
    address: '0x1FD5270705F2F6b69a57b1eb72901031b1c46752',
    abi: beradromeABI.abi
  },
  honeycomb: {
    address: '0xE4dC8142CEd52C547384032e43379b0514341c22',
    abi: honeycombABI.abi
  }
}