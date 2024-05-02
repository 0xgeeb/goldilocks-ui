import { readContract } from "@wagmi/core"
import { useSendTransaction } from "wagmi"
import { parseEther, formatEther } from "viem"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

export const useGoldiswapTx = () => {

  const checkAllowance = async (amt: number, wallet: string): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: contracts.honey.address as `0x${string}`,
      abi: contracts.honey.abi,
      functionName: 'allowance',
      args: [wallet, contracts.goldiswap.address]
    })
    const allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))

    if(amt > allowanceNum) {
      return false
    }
    else {
      return true
    }
  }

  return { checkAllowance }
}