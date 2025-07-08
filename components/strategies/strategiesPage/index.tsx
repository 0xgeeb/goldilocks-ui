"use client"

import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom"
import CsrPageLayout from "@/app/_components/CsrPageLayout"
import { Loading } from "../../utils"
import { createWalletClient, custom } from "viem"
import { readContract } from "@wagmi/core"
import { config } from "../../../providers/WagmiProvider"
import { Bepolia } from "../../../utils/customChains"

export const StrategiesPage = () => {

  const [wutPopup, setWutPopup] = useState<boolean>(false)
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom)
  const [farmingLevel, setFarmingLevel] = useState<number>(0)
  const [hunterLevel, setHunterLevel] = useState<number>(0)

  const bundleAddress = '0x8016269e0c30d897f495470aC464c283bf51A77b'

  const getLevels = async () => {
    const farmingResult = await readContract(config, {
      address: bundleAddress as `0x${string}`,
      abi: [{ "name": "farmingLevel", "type": "function", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] }],
      functionName: 'farmingLevel',
      args: []
    })
    const hunterResult = await readContract(config, {
      address: bundleAddress as `0x${string}`,
      abi: [{ "name": "hunterLevel", "type": "function", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] }],
      functionName: 'hunterLevel',
      args: []
    })
    setFarmingLevel(parseFloat(farmingResult.toString()))
    setHunterLevel(parseFloat(hunterResult.toString()))
  }

  useEffect(() => {
    getLevels()
    setPageLoading(false)
  }, [])

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false)
    }
  }

  if (pageLoading) {
    return (
      <Loading />
    )
  }

  const walletClient = createWalletClient({
    chain: Bepolia,
    transport: custom(window.ethereum)
  })  
  
  const test = async () => {
    const [account] = await walletClient.getAddresses()
    const { id } = await walletClient.sendCalls({
      account,
      calls: [
        {
          to: bundleAddress as `0x${string}`,
          abi: [{ "name": "farmingLevelUp", "type": "function", "stateMutability": "nonpayable", "inputs": [{ "name": "_farmingLevel", "type": "uint256" }], "outputs": [] }],
          functionName: 'farmingLevelUp',
          args: [6969696n]
        },
        {
          to: bundleAddress as `0x${string}`,
          abi: [{ "name": "hunterLevelup", "type": "function", "stateMutability": "nonpayable", "inputs": [{ "name": "_hunterLevel", "type": "uint256" }], "outputs": [] }],
          functionName: 'hunterLevelup',
          args: [420420420n]
        },
      ]
    })
    console.log(id)
  }

  return (
    <CsrPageLayout
      onPageClick={() => handlePopups()}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldivault-2.png"
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-white text-6xl">farming level: {farmingLevel}</h1>
        <h1 className="text-white text-6xl">hunter level: {hunterLevel}</h1>
        <h1 className="text-white text-6xl" onClick={() => test()}>raise hunter and farming</h1>
      </div>
    </CsrPageLayout>
  )
}