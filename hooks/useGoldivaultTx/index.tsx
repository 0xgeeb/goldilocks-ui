import { readContract, writeContract, waitForTransactionReceipt} from "@wagmi/core"
import { parseEther, formatEther, parseUnits, formatUnits } from "viem"
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
    else if(vault === 'weeth') {
      allowanceResult = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: 'allowance',
        args: [wallet, contracts.weethVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'weETH-OT') {
      allowanceResult = await readContract(config, {
        address: contracts.weot.address as `0x${string}`,
        abi: contracts.weot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.weethVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'unibtc') {
      allowanceResult = await readContract(config, {
        address: contracts.unibtc.address as `0x${string}`,
        abi: contracts.unibtc.abi,
        functionName: 'allowance',
        args: [wallet, contracts.unibtcVault.address]
      })
      allowanceNum = parseFloat((allowanceResult as unknown as bigint).toString()) / 1e8
    }
    else if(vault === 'solvbtc') {
      allowanceResult = await readContract(config, {
        address: contracts.solvbtc.address as `0x${string}`,
        abi: contracts.solvbtc.abi,
        functionName: 'allowance',
        args: [wallet, contracts.solvbtcVault.address]
      })
      allowanceNum = parseFloat(formatEther(allowanceResult as unknown as bigint))
    }
    else if(vault === 'uniBTC-OT') {
      allowanceResult = await readContract(config, {
        address: contracts.unibtcot.address as `0x${string}`,
        abi: contracts.unibtcot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.unibtcVault.address]
      })
      allowanceNum = parseFloat((allowanceResult as unknown as bigint).toString()) / 1e8
    }
    else if(vault === 'solvBTC.BBN-OT') {
      allowanceResult = await readContract(config, {
        address: contracts.solvbtcot.address as `0x${string}`,
        abi: contracts.solvbtcot.abi,
        functionName: 'allowance',
        args: [wallet, contracts.solvbtcVault.address]
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

  const checkRouterV2Allowance = async (amt: number, token: string, wallet: string, vaultType: string): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: token as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: 'allowance',
      args: [wallet, contracts.routerv2.address]
    })
    const allowanceNum = vaultType === 'eth' ? parseFloat(formatEther(allowanceResult as unknown as bigint)) : parseFloat(formatUnits(allowanceResult as unknown as bigint, 8))

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
    else if(vault === 'weeth') {
      try {
        const hash = await writeContract(config, {
          address: contracts.weeth.address as `0x${string}`,
          abi: contracts.weeth.abi,
          functionName: 'approve',
          args: [contracts.weethVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'weETH-OT') {
      try {
        const hash = await writeContract(config, {
          address: contracts.weot.address as `0x${string}`,
          abi: contracts.weot.abi,
          functionName: 'approve',
          args: [contracts.weethVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'unibtc') {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtc.address as `0x${string}`,
          abi: contracts.unibtc.abi,
          functionName: 'approve',
          args: [contracts.unibtcVault.address, infinite ? parseUnits('115792089237316195423570985008687907853269984665640564039457', 8) : parseUnits(`${amt + 0.01}`, 8)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'solvbtc') {
      try {
        const hash = await writeContract(config, {
          address: contracts.solvbtc.address as `0x${string}`,
          abi: contracts.solvbtc.abi,
          functionName: 'approve',
          args: [contracts.solvbtcVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'uniBTC-OT') {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtcot.address as `0x${string}`,
          abi: contracts.unibtcot.abi,
          functionName: 'approve',
          args: [contracts.unibtcVault.address, infinite ? parseUnits('115792089237316195423570985008687907853269984665640564039457', 8) : parseUnits(`${amt + 0.01}`, 8)]
        })
        await waitForTransactionReceipt(config, { hash })
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'solvBTC.BBN-OT') {
      try {
        const hash = await writeContract(config, {
          address: contracts.solvbtcot.address as `0x${string}`,
          abi: contracts.solvbtcot.abi,
          functionName: 'approve',
          args: [contracts.solvbtcVault.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
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

  const sendRouterV2ApproveTx = async (amt: number, token: string, infinite: boolean, vaultType: string) => {
    try {
      const hash = await writeContract(config, {
        address: token as `0x${string}`,
        abi: contracts.ibgt.abi,
        functionName: 'approve',
        args: [contracts.routerv2.address, infinite ? (vaultType === 'eth' ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseUnits('115792089237316195423570985008687907853269984665640564039457', 8)) : (vaultType === 'eth' ? parseEther(`${amt + 0.01}`) : parseUnits(`${amt + 0.01}`, 8))]
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
    else if(vault === 'weeth') {
      try {
        const hash = await writeContract(config, {
          address: contracts.weethVault.address as `0x${string}`,
          abi: contracts.weethVault.abi,
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
    else if(vault === 'unibtc') {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtcVault.address as `0x${string}`,
          abi: contracts.unibtcVault.abi,
          functionName: 'deposit',
          args: [parseUnits(`${depositAmt}`, 8)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'solvbtc') {
      try {
        const hash = await writeContract(config, {
          address: contracts.solvbtcVault.address as `0x${string}`,
          abi: contracts.solvbtcVault.abi,
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
        if(findRevert(e)) {
          return 'revert'
        }
        else {
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
    else if(vault === 'weeth') {
      try {
        const hash = await writeContract(config, {
          address: contracts.weethVault.address as `0x${string}`,
          abi: contracts.weethVault.abi,
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
    else if(vault === 'unibtc') {
      try {
        const hash = await writeContract(config, {
          address: contracts.unibtcVault.address as `0x${string}`,
          abi: contracts.unibtcVault.abi,
          functionName: 'redeemOwnership',
          args: [parseUnits(`${redeemOTAmt}`, 8)]
        })
        const data = await waitForTransactionReceipt(config, { hash })
        return data.transactionHash
      }
      catch (e) {
        console.log('user denied tx')
        console.log('or: ', e)
      }
    }
    else if(vault === 'solvbtc') {
      try {
        const hash = await writeContract(config, {
          address: contracts.solvbtcVault.address as `0x${string}`,
          abi: contracts.solvbtcVault.abi,
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
  
      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }

    return ''
  }

  const sendV3TradeTx = async (tradeInput: number, tradeOutput: number, pathOne: string, pathTwo: string, wallet: string, vaultType: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.routerv2.address as `0x${string}`,
        abi: contracts.routerv2.abi,
        functionName: 'exactInputSingle',
        args: [[
          pathOne,
          pathTwo,
          500,
          wallet,
          vaultType === 'eth' ? parseEther(`${tradeInput}`) : parseUnits(`${tradeInput}`, 8),
          vaultType === 'eth' ? parseEther(`${tradeOutput * .99}`) : parseUnits(`${tradeOutput * .99}`, 8),
          0
        ]]
      })

      const receipt = await waitForTransactionReceipt(config, { hash })
      return receipt.transactionHash
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }

    return ''
  }

  const sendBuyYTTx = async (ytAmount: number, dtAmountMax: number, amountOutMin: number, address: string, vaultType: string): Promise<[string, number]> => {
    console.log(ytAmount, dtAmountMax, amountOutMin)
    try {
      const hash = await writeContract(config, {
        address: contracts.weethVault.address as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: 'buyYT',
        args: [vaultType === 'eth' ? parseEther(`${ytAmount}`) : parseUnits(`${ytAmount}`, 8), vaultType === 'eth' ? parseEther(`${dtAmountMax}`) : parseUnits(`${dtAmountMax}`, 8), vaultType === 'eth' ? parseEther(`${amountOutMin}`) : parseUnits(`${amountOutMin}`, 8)]
      })
      const receipt = await waitForTransactionReceipt(config, { hash })
      const afterBalance = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: 'balanceOf',
        args: [address]
      })

      return [receipt.transactionHash, vaultType === 'eth' ? parseFloat(formatEther(afterBalance as unknown as bigint)) : parseFloat(formatUnits(afterBalance as unknown as bigint, 8))]
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }

    return ['', 0]
  }

  const sendSellYTTx = async (ytAmount: number, dtAmountMin: number, amountInMax: number, address: string, vaultType: string): Promise<[string, number]> => {
    console.log(ytAmount, dtAmountMin, amountInMax)
    try {
      const hash = await writeContract(config, {
        address: contracts.weethVault.address as `0x${string}`,
        abi: contracts.weethVault.abi,
        functionName: 'sellYT',
        args: [vaultType === 'eth' ? parseEther(`${ytAmount}`) : parseUnits(`${ytAmount}`, 8), vaultType === 'eth' ? parseEther(`${dtAmountMin}`) : parseUnits(`${dtAmountMin}`, 8), vaultType === 'eth' ? parseEther(`${amountInMax}`) : parseUnits(`${amountInMax}`, 8)]

      })
      const receipt = await waitForTransactionReceipt(config, { hash })
      const afterBalance = await readContract(config, {
        address: contracts.weeth.address as `0x${string}`,
        abi: contracts.weeth.abi,
        functionName: 'balanceOf',
        args: [address]
      })

      return [receipt.transactionHash, vaultType === 'eth' ? parseFloat(formatEther(afterBalance as unknown as bigint)) : parseFloat(formatUnits(afterBalance as unknown as bigint, 8))]
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }

    return ['', 0]
  }

  const findRevert = (e: any): boolean => {
    console.log(e)
    const regex = /CallExecutionError/
    return regex.test(e)
  }

  return {
    checkAllowance,
    checkRouterAllowance,
    checkRouterV2Allowance,
    sendApproveTx,
    sendRouterApproveTx,
    sendDepositTx,
    sendRedeemOTTx,
    sendRedeemYTTx,
    sendTradeTx,
    sendBuyYTTx,
    sendSellYTTx,
    sendV3TradeTx,
    sendRouterV2ApproveTx
  }
}