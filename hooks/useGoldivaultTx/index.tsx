import { readContract, writeContract, waitForTransactionReceipt} from "@wagmi/core"
import { parseEther, formatEther } from "viem"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

export const useGoldivaultTx = () => {

  const checkAllowance = async (amt: number, vault: string, wallet: string): Promise<boolean> => {
    let allowanceResult
    let allowanceNum

    if(vault === 'honeywbera') {
      allowanceResult = await readContract(config, {
        address: contracts.honeywberaLP.address as `0x${string}`,
        abi: contracts.honeywberaLP.abi,
        functionName: 'allowance',
        args: [wallet, contracts.honeywberagoldivault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else {
      allowanceResult = await readContract(config, {
        address: contracts.honey.address as `0x${string}`,
        abi: contracts.honey.abi,
        functionName: 'allowance',
        args: [wallet, contracts.bhoneygoldivault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }

    if(amt > allowanceNum) {
      return false
    }
    else {
      return true
    }
  }

  const checkRouterAllowance = async (amt: number, token: string, wallet: string): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: token as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: 'allowance',
      args: [wallet, contracts.router.address]
    })
    const allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))

    if(amt > allowanceNum) {
      return false
    }
    else {
      return true
    }
  }

  const sendApproveTx = async (amt: number, vault: string, infinite: boolean) => {
    if(vault === 'honeywbera') {
      try {
        const hash = await writeContract(config, {
          address: contracts.honeywberaLP.address as `0x${string}`,
          abi: contracts.honeywberaLP.abi,
          functionName: 'approve',
          args: [contracts.honeywberagoldivault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else {
      try {
        const hash = await writeContract(config, {
          address: contracts.honey.address as `0x${string}`,
          abi: contracts.honey.abi,
          functionName: 'approve',
          args: [contracts.bhoneygoldivault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
  }

  const sendRouterApproveTx = async (amt: number, token: string, infinite: boolean) => {
    try {
      const hash = await writeContract(config, {
        address: token as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: 'approve',
        args: [contracts.router.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
      })
      await waitForTransactionReceipt(config, { hash })
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }
  }

  const sendDepositTx = async (depositAmt: number, vault: string): Promise<string> => {
    if(vault === 'honeywbera') {
      try {
        const hash = await writeContract(config, {
          address: contracts.honeywberagoldivault.address as `0x${string}`,
          abi: contracts.honeywberagoldivault.abi,
          functionName: 'deposit',
          args: [parseEther(`${depositAmt}`)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else {
      try {
        console.log('trying tx')
        const hash = await writeContract(config, {
          address: contracts.bhoneygoldivault.address as `0x${string}`,
          abi: contracts.bhoneygoldivault.abi,
          functionName: 'deposit',
          args: [parseEther(`${depositAmt}`)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('catching failed tx')
        if(findRevert(e)) {
          return 'revert'
        }
        else {
          console.log('returning nothing')
          return ''
        }
      }
    }

    return ''
  }

  const sendRedeemOTTx = async (redeemOTAmt: number, vault: string): Promise<string> => {
    if(vault === 'honeywbera') {
      try {
        const hash = await writeContract(config, {
          address: contracts.honeywberagoldivault.address as `0x${string}`,
          abi: contracts.honeywberagoldivault.abi,
          functionName: 'redeemOwnership',
          args: [parseEther(`${redeemOTAmt}`)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else {
      try {
        const hash = await writeContract(config, {
          address: contracts.bhoneygoldivault.address as `0x${string}`,
          abi: contracts.bhoneygoldivault.abi,
          functionName: 'redeemOwnership',
          args: [parseEther(`${redeemOTAmt}`)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }

    return ''
  }

  const sendRedeemYTTx = async (redeemYTAmt: number, vault: string): Promise<string> => {
    if(vault === 'honeywbera') {
      try {
        const hash = await writeContract(config, {
          address: contracts.honeywberagoldivault.address as `0x${string}`,
          abi: contracts.honeywberagoldivault.abi,
          functionName: 'redeemYield',
          args: [parseEther(`${redeemYTAmt}`)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else {
      try {
        const hash = await writeContract(config, {
          address: contracts.bhoneygoldivault.address as `0x${string}`,
          abi: contracts.bhoneygoldivault.abi,
          functionName: 'redeemYield',
          args: [parseEther(`${redeemYTAmt}`)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }

    return ''
  }

  const sendTradeTx = async (tradeInput: number, tradeOutput: number, pathOne: string, pathTwo: string, wallet: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.router.address as `0x${string}`,
        abi: contracts.router.abi,
        functionName: 'swapExactTokensForTokens',
        args: [parseEther(`${tradeInput}`), parseEther(`${tradeOutput * .99}`), [pathOne, pathTwo], wallet, 1737962268]
      })
      console.log(hash)
  
      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }

    return ''
  }

  const findRevert = (e: any): boolean => {
    console.log(e)
    const regex = /CallExecutionError/
    return regex.test(e)
  }

  return {
    checkAllowance,
    checkRouterAllowance,
    sendApproveTx,
    sendRouterApproveTx,
    sendDepositTx,
    sendRedeemOTTx,
    sendRedeemYTTx,
    sendTradeTx
  }
}