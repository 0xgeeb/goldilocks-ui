import borrowABI from "../abi/Borrow.json"
import porridgeABI from "../abi/Porridge.json"
import honeyABI from "../abi/Honey.json"
import goldiswapABI from "../abi/Goldiswap.json"

export const contracts = {
  goldiswap: {
    address: '0xd8A4b467d6B653253D0c89CC49EAB6c6A5aB3067',
    abi: goldiswapABI.abi
  },
  porridge: {
    address: '0x2A436a4F062bE8744Aa7B1Ba7E2D5b754F97E829',
    abi: porridgeABI.abi
  },
  borrow: {
    address: '0xc4945574BF4FE1721F7F8D253f91eAdcb5f3C2df',
    abi: borrowABI.abi,
  },
  honey: {
    address: '0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B',
    abi: honeyABI.abi
  }
}