import goldiswapABI from "../abi/Goldiswap.json"
import goldilockedABI from "../abi/Goldilocked.json"
import honeyABI from "../abi/Honey.json"

export const contracts = {
  goldiswap: {
    address: '0x508901E24f7055515FDB390ea3564495704936b3',
    abi: goldiswapABI.abi
  },
  goldilocked: {
    address: '0xd8A4b467d6B653253D0c89CC49EAB6c6A5aB3067',
    abi: goldilockedABI.abi
  },
  honey: {
    address: '0xD323ba82A0ec287C9D19c63C439898720a93604A',
    abi: honeyABI.abi
  }
}