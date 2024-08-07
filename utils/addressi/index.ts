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
    address: '0xC94ecBfE16E337f6e606dcd86B8A5eaDbAe7A337',
    abi: goldiswapABI.abi
  },
  goldilocked: {
    address: '0xe2cA693a47C32bd33949120d31d42b9e5Ef5c7Ef',
    abi: goldilockedABI.abi
  },
  honey: {
    address: '0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03',
    abi: honeyABI.abi
  },
  goldilend: {
    address: '0x9256322361d9f68d1d8d11Bc61242D1476050ea3',
    abi: goldilendABI.abi
  },
  ibgt: {
    address: '0x46eFC86F0D7455F135CC9df501673739d513E982',
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