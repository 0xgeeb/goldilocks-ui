"use client"

import { useGov } from "../../../providers"

export const NewProposalPreview = () => {

  const { newProposalInfo } = useGov()

  return (
    <div className="absolute left-[0.5%] top-[17.5%] lg:top-[22.5%] h-[70%] lg:h-[65%] w-[37.5%] lg:w-[29.5%]">
      <div className="flex flex-col items-start w-[100%] h-[100%] py-0 pl-0 pr-[1%] overflow-x-auto text-[#D9C6BA] font-amaticbold">
        <h1 className="text-[4.5vw] lg:text-[3vw]" id="page-title">title: <span className="text-[3.5vw] lg:text-[2.5vw]">{newProposalInfo.title}</span></h1>
        <h1 className="text-[4.5vw] lg:text-[3vw]" id="page-title">description: <span className="text-[3.5vw] lg:text-[2.5vw]">{newProposalInfo.description}</span></h1>
        <h1 className="text-[4.5vw] lg:text-[3vw]" id="page-title">{newProposalInfo.actions.length > 1 ? "actions" : "action"}</h1>
        {
          newProposalInfo.actions.map((action: any, index: number) => (
            <div className="w-[100%]" key={index} >
              <h1 className="text-[3vw] lg:text-[2vw]" id="page-title">target: <span className="text-[2.5vw] lg:text-[1.5vw]">{action.target}</span></h1>
              <h1 className="text-[3vw] lg:text-[2vw]" id="page-title">calldata: <span className="text-[2.5vw] lg:text-[1.5vw]">{action.calldata}</span></h1>
              <h1 className="text-[3vw] lg:text-[2vw] pb-[2.5%] mb-[2.5%] border-b-2 border-[#D9C6BA]" id="page-title">value: <span className="text-[2.5vw] lg:text-[1.5vw]">{action.value}</span></h1>
            </div>
          ))
        }
      </div>
    </div>
  )
}