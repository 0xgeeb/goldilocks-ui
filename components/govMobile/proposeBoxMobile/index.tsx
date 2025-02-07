"use client"

import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useGov } from "../../../providers"
import { useGovTx } from "../../../hooks"

export const ProposeBoxMobile = () => {

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
    <div className="absolute top-[25%] left-[2.5%] w-[95%] h-[65%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-4 border-2 border-black bg-[#D9C6BA] font-amaticbold font-medium text-black text-[1.5vw]">
        {
          proposeTab === 'TITLE' ?
          <div className="w-[100%] h-[100%] flex flex-col items-start p-[2.5%] font-baloo">
            <h1 className="text-[8vw] font-amaticbold">title</h1>
            <textarea
              className="text-[6vw] w-[100%] h-[15%] pt-[1%] pl-[1%] resize-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
            </textarea>
            <h1 className="text-[8vw] mt-[1%] font-amaticbold">description</h1>
            <textarea
              className="text-[6vw] w-[100%] h-[30%] pt-[1%] pl-[1%] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
            <h1 className="text-[8vw] self-end mt-auto font-amaticbold cursor-pointer hover:underline" onClick={() => addTitle()}>add a action</h1>
          </div> :
          proposeTab === 'ERROR' ?
          <div className="w-[100%] h-[100%] text-[7vw] text-center flex flex-col items-center justify-center p-[5%] font-baloo">
            <h1>something went wrong</h1>
          </div> :
          proposeTab === 'SUCCESS' ?
          <div className="w-[100%] h-[100%] text-[7vw] text-center flex flex-col items-center justify-center p-[5%] font-baloo">
            <h1>you proposed</h1>
          </div> :
          <div className="w-[100%] h-[100%] flex flex-col items-start py-[0.5%] px-[2.5%] font-baloo">
            <h1 className="text-[8vw] font-amaticbold">target</h1>
            <textarea
              className="text-[6vw] w-[100%] h-[12.5%] pt-[1%] pl-[1%] resize-none"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
            </textarea>
            <h1 className="text-[8vw] mt-[1%] font-amaticbold">calldata</h1>
            <textarea
              className="text-[6vw] w-[100%] h-[12.5%] pt-[1%] pl-[1%] resize-none"
              value={calldata}
              onChange={(e) => setCalldata(e.target.value)}
            >
            </textarea>
            <h1 className="text-[8vw] mt-[1%] font-amaticbold">value</h1>
            <textarea
              className="text-[6vw] w-[100%] h-[12.5%] pt-[1%] pl-[1%] resize-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
            </textarea>
            <div className="flex flex-row items-center text-[8vw] font-amaticbold w-[100%] mt-auto justify-between">
              <h1 className="" onClick={() => addBack()}>back</h1>
              <h1 className="" onClick={() => addAction()}>add action</h1>
              <h1 className="" onClick={() => handlePropose()}>propose</h1>
            </div>
          </div>
        }
      </div>
    </div>
  )
}