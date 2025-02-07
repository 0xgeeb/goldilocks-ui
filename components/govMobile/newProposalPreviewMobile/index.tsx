"use client"

import { useGov } from "../../../providers"

export const NewProposalPreviewMobile = () => {

  const { newProposalInfo } = useGov()

  return (
    <div className="absolute left-[1%] top-[8.5%] h-[15%] w-[98%]">
      <div className="flex flex-row justify-between w-[100%] h-[100%] p-0 text-[#D9C6BA] font-amaticbold">
        <div className="flex flex-col h-[100%] w-[60%] overflow-x-auto">
          <h1 className="text-[8vw]" id="page-title">title: <span className="text-[5vw]">{newProposalInfo.title}</span></h1>
          <h1 className="text-[8vw]" id="page-title">description: <span className="text-[5vw]">{newProposalInfo.description}</span></h1>
        </div>
        <div className="flex flex-col h-[100%] w-[38%] overflow-x-auto">
          <h1 className="text-[8vw]" id="page-title">{newProposalInfo.actions.length > 1 ? "actions" : "action"}</h1>
          {
            newProposalInfo.actions.map((action: any, index: number) => (
              <div className="w-[100%]" key={index} >
                <h1 className="text-[4vw]" id="page-title">target: <span className="text-[3vw]">{action.target}</span></h1>
                <h1 className="text-[4vw]" id="page-title">calldata: <span className="text-[3vw]">{action.calldata}</span></h1>
                <h1 className="text-[4vw] pb-[2.5%] mb-[2.5%] border-b-2 border-[#D9C6BA]" id="page-title">value: <span className="text-[3vw]">{action.value}</span></h1>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}