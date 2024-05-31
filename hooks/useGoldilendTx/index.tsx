import { readContract, writeContract, waitForTransactionReceipt} from "@wagmi/core"
import { parseEther, formatEther } from "viem"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

export const useGoldilendTx = () => {

  const checkLockAllowance = async (amt: number, wallet: string): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: contracts.ibgt.address as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: 'allowance',
      args: [wallet, contracts.goldilend.address]
    })
    const allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))

    if(amt > allowanceNum) {
      return false
    }
    else {
      return true
    }
  }

  const checkStakeAllowance = async (amt: number, wallet: string): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: contracts.goldilend.address as `0x${string}`,
      abi: contracts.goldilend.abi,
      functionName: 'allowance',
      args: [wallet, contracts.goldilend.address]
    })
    const allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))

    if(amt > allowanceNum) {
      return false
    }
    else {
      return true
    }
  }
  
  const sendiBGTApproveTx = async (amt: number, infinite: boolean) => {
    try {
      const hash = await writeContract(config, {
        address: contracts.ibgt.address as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: 'approve',
        args: [contracts.goldilend.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
      })
      await waitForTransactionReceipt(config, { hash })
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }
  }

  const sendGiBGTApproveTx = async (amt: number, infinite: boolean) => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'approve',
        args: [contracts.goldilend.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
      })
      await waitForTransactionReceipt(config, { hash })
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }
  }
  
  const sendLockTx = async (lockAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'lock',
        args: [parseEther(`${lockAmt}`)]
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
  
  const sendStakeTx = async (stakeAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'stake',
        args: [parseEther(`${stakeAmt}`)]
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

  const sendUnstakeTx = async (unstakeAmt: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldilend.address as `0x${string}`,
        abi: contracts.goldilend.abi,
        functionName: 'unstake',
        args: [parseEther(`${unstakeAmt}`)]
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

  return { 
    // checkBoostAllowance,
    // checkLoanAllowance,
    // sendGoldilendNFTApproveTx,
    // sendBoostTx,
    // sendExtendBoostTx,
    // sendWithdrawBoostTx,
    // sendBorrowTx,
    // sendRepayTx,
    // checkRepayAllowance,
    checkLockAllowance,
    checkStakeAllowance,
    sendiBGTApproveTx,
    sendGiBGTApproveTx,
    sendLockTx,
    sendStakeTx,
    sendUnstakeTx,
    // sendClaimTx,
    // sendLiquidateTx
  }
}