import { readContract, writeContract, waitForTransactionReceipt} from "@wagmi/core"
import { parseEther, formatEther } from "viem"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

export const useStakeTx = () => {

  const checkAllowance = async (amt: number, token: string, wallet: string): Promise<boolean> => {
    let allowanceResult
    let allowanceNum

    if(token === 'locks') {
      // let allowanceResult = 
    }
    else {

    }

    if(amt > allowanceNum) {
      return false
    }
    else {
      return true
    }
  }

  return {}
}