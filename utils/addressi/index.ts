import goldiswapABI from "../abi/Goldiswap.json"
import goldilockedABI from "../abi/Goldilocked.json"
import honeyABI from "../abi/Honey.json"
import goldilendABI from "../abi/Goldilend.json"
import ibgtABI from "../abi/IBGT.json"

export const contracts = {
  goldiswap: {
    address: '0xc6f4D3Ae8443f091A9c5015041093F3c0a41956f',
    abi: goldiswapABI.abi
  },
  goldilocked: {
    address: '0x053c948FB1d8158654eB4e115201B56E1f2e8631',
    abi: goldilockedABI.abi
  },
  honey: {
    address: '0x8016269e0c30d897f495470aC464c283bf51A77b',
    abi: honeyABI.abi
  },
  goldilend: {
    address: '0xfb8283E50c89e367674BC566db3070D9e9Ff2fDd',
    abi: goldilendABI.abi
  },
  ibgt: {
    address: '0xe2f6eF50fD232c7c9698F2f4CaE44A6D80AaFdEE',
    abi: ibgtABI.abi
  }
}