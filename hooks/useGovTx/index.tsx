import { readContract, writeContract, waitForTransactionReceipt} from "@wagmi/core"
import { parseEther, formatEther } from "viem"
import { config } from "../../providers/WagmiProvider"
import { contracts } from "../../utils/addressi"

export const useGovTx = () => {

  const checkAllowance = async (amt: number, wallet: string): Promise<boolean> => {
    const allowanceResult = await readContract(config, {
      address: contracts.goldiswap.address as `0x${string}`,
      abi: contracts.goldiswap.abi,
      functionName: 'allowance',
      args: [wallet, contracts.govlocks.address]
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
        address: contracts.goldiswap.address as `0x${string}`,
        abi: contracts.goldiswap.abi,
        functionName: 'approve',
        args: [contracts.govlocks.address, infinite ? parseEther('115792089237316195423570985008687907853269984665640564039457') : parseEther(`${amt + 0.01}`)]
      })
      await waitForTransactionReceipt(config, { hash })
    }
    catch (e) {
      console.log('user denied tx')
      console.log('or: ', e)
    }
  }

  const sendProposeTx = async (
    targets: string[],
    values: number[],
    signatures: string[],
    calldatas: string[],
    description: string
  ): Promise<string> => {
    console.log(targets, values, signatures, calldatas, description)
    try {
      const hash = await writeContract(config, {
        address: contracts.goldigov.address as `0x${string}`,
        abi: contracts.goldigov.abi,
        functionName: 'propose',
        args: [
          targets,
          values,
          signatures,
          calldatas,
          description
        ]
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

  const sendQueueTx = async (proposalId: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldigov.address as `0x${string}`,
        abi: contracts.goldigov.abi,
        functionName: 'queue',
        args: [proposalId]
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

  const sendExecuteTx = async (proposalId: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldigov.address as `0x${string}`,
        abi: contracts.goldigov.abi,
        functionName: 'execute',
        args: [proposalId]
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

  const sendCancelTx = async (proposalId: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldigov.address as `0x${string}`,
        abi: contracts.goldigov.abi,
        functionName: 'cancel',
        args: [proposalId]
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

  const sendCastVoteTx = async (proposalId: number, support: number, reason: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.goldigov.address as `0x${string}`,
        abi: contracts.goldigov.abi,
        functionName: 'castVoteWithReason',
        args: [proposalId, support, reason]
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

  const sendDepositTx = async (amount: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.govlocks.address as `0x${string}`,
        abi: contracts.govlocks.abi,
        functionName: 'deposit',
        args: [parseEther(`${amount}`)]
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

  const sendWithdrawTx = async (amount: number): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.govlocks.address as `0x${string}`,
        abi: contracts.govlocks.abi,
        functionName: 'withdraw',
        args: [parseEther(`${amount}`)]
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

  const sendDelegateTx = async (address: string): Promise<string> => {
    try {
      const hash = await writeContract(config, {
        address: contracts.govlocks.address as `0x${string}`,
        abi: contracts.govlocks.abi,
        functionName: 'delegate',
        args: [address]
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
    checkAllowance,
    sendApproveTx,
    sendProposeTx,
    sendQueueTx,
    sendExecuteTx,
    sendCancelTx,
    sendCastVoteTx,
    sendDepositTx,
    sendWithdrawTx,
    sendDelegateTx
  }
}