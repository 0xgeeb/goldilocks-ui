import { Address } from "viem"

export const beraScanLink = (address: Address): string => {
    return `https://berascan.com/address/${address}`
}
  
export const dexLink = (address: Address): string => {
    return `https://dexscreener.com/berachain/${address}`
}