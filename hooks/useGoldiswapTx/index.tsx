import { readContract, writeContract, waitForTransactionReceipt} from "@wagmi/core"
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

  const sendApproveTx = async (amt: number, infinite: boolean) => {
    try {
      const hash = await writeContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'approve',
        args: [contracts.goldiswap.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
      })
      await waitForTransactionReceipt(config, { hash })
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }
  }

  const sendBuyTx = async (buyAmt: number, maxCost: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: 'buy',
        args: [parseEther(`${buyAmt}`), parseEther(`${maxCost}`)]
      })
      const data = await waitForTransactionReceipt(config, { hash })
      return data.transactionHash
    }
    catch (e) {
      if(findSlippage(e)) {
        return 'slippage'
      }
      else {
        return ''
      }
    }
  }

  const sendSellTx = async (sellAmt: number, minReceive: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: 'sell',
        args: [parseEther(`${sellAmt}`), parseEther(`${0}`)]
      })
      const data = await waitForTransactionReceipt(config, { hash })
      return data.transactionHash
    }
    catch (e) {
      if(findSlippage(e)) {
        return 'slippage'
      }
      else {
        return ''
      }
    }
  }

  const sendRedeemTx = async (redeemAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: 'redeem',
        args: [parseEther(`${redeemAmt}`)]
      })
      const data = await waitForTransactionReceipt(config, { hash })
      return data.transactionHash
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }

    return ''
  }

  const findSlippage = (e: any): boolean => {
    const regex = /ExcessiveSlippage\(\)/
    return regex.test(e)
  }

  return { checkAllowance, sendApproveTx, sendBuyTx, sendSellTx, sendRedeemTx }
}