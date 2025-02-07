"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useGov } from "../../../providers"
import { useGovTx } from "../../../hooks"

export const ProposeBox = () => {

  const {
    title,
    description,
    target,
    calldata,
    value,
    setTitle,
    setDescription,
    setTarget,
    setCalldata,
    setValue,
    addTitle,
    addBack,
    addAction,
    proposeTab,
    refreshGovWalletInfo,
    enableProposeError,
    govWalletInfo,
    newProposalInfo,
    enableProposeSuccess
  } = useGov()

  const { sendProposeTx } = useGovTx()

  const { isConnected } = useAccount()

  useEffect(() => {
    refreshGovWalletInfo()
  }, [isConnected])

  const handlePropose = async () => {
    if(newProposalInfo.actions.length == 0) {
      return
    }
    if(govWalletInfo.votes < 4) {
      enableProposeError()
      return
    }
    const targets = newProposalInfo.actions.map((action: { target: any }) => action.target)
    const calldatas = newProposalInfo.actions.map((action: { calldata: any }) => action.calldata)
    const signatures = newProposalInfo.actions.map(() => "")
    const values = newProposalInfo.actions.map((action: { value: any }) => parseFloat(action.value))
    const proposeTx = await sendProposeTx(targets, values, signatures, calldatas, `${title}: ${description}`)
    if(proposeTx.substring(0, 2) === '0x') {
      enableProposeSuccess()
    }
    else {
      enableProposeError()
    }
  }

  return (
    <div className="absolute top-[12.5%] lg:top-[10%] right-[0.5%] lg:right-[5%] w-[60%] lg:w-[65%] h-[75%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA] font-amaticbold font-medium text-black text-[3vw] lg:text-[1.5vw]">
        {
          proposeTab === 'TITLE' ?
          <div className="w-[100%] h-[100%] flex flex-col items-start p-[2.5%] font-baloo">
            <h1 className="text-[4vw] lg:text-[2.5vw] font-amaticbold">title</h1>
            <textarea
              className="text-[2vw] lg:text-[1.5vw] w-[100%] h-[20%] lg:h-[15%] pt-[1%] pl-[1%] resize-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
            </textarea>
            <h1 className="text-[4vw] lg:text-[2.5vw] mt-[1%] font-amaticbold">description</h1>
            <textarea
              className="text-[2vw] lg:text-[1.5vw] w-[100%] h-[40%] lg:h-[30%] pt-[1%] pl-[1%] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
            <h1 className="text-[4vw] lg:text-[2.5vw] self-end mt-auto font-amaticbold cursor-pointer hover:underline" onClick={() => addTitle()}>add a action</h1>
          </div> :
          proposeTab === 'ERROR' ?
          <div className="w-[100%] h-[100%] flex flex-col items-center justify-center p-[5%] font-baloo">
            <h1>something went wrong</h1>
          </div> :
          proposeTab === 'SUCCESS' ?
          <div className="w-[100%] h-[100%] flex flex-col items-center justify-center p-[5%] font-baloo">
            <h1>you proposed</h1>
          </div> :
          <div className="w-[100%] h-[100%] flex flex-col items-start py-[0.5%] px-[2.5%] font-baloo">
            <h1 className="text-[4vw] lg:text-[2.5vw] font-amaticbold">target</h1>
            <textarea
              className="text-[2vw] lg:text-[1.5vw] w-[100%] h-[12.5%] pt-[1%] pl-[1%] resize-none"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
            </textarea>
            <h1 className="text-[4vw] lg:text-[2.5vw] mt-[1%] font-amaticbold">calldata</h1>
            <textarea
              className="text-[2vw] lg:text-[1.5vw] w-[100%] h-[12.5%] pt-[1%] pl-[1%] resize-none"
              value={calldata}
              onChange={(e) => setCalldata(e.target.value)}
            >
            </textarea>
            <h1 className="text-[4vw] lg:text-[2.5vw] mt-[1%] font-amaticbold">value</h1>
            <textarea
              className="text-[2vw] lg:text-[1.5vw] w-[100%] h-[12.5%] pt-[1%] pl-[1%] resize-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
            </textarea>
            <div className="flex flex-row items-center text-[4vw] lg:text-[2.5vw] font-amaticbold w-[100%] mt-auto justify-between">
              <h1 className="cursor-pointer hover:underline" onClick={() => addBack()}>back</h1>
              <h1 className="cursor-pointer hover:underline" onClick={() => addAction()}>add action</h1>
              <h1 className="cursor-pointer hover:underline" onClick={() => handlePropose()}>propose</h1>
            </div>
          </div>
        }
      </div>
    </div>
  )
}