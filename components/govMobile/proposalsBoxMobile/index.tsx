"use client"

import { useGov } from "../../../providers"

export const ProposalsBoxMobile = () => {

  const { infoLoading, proposals } = useGov()

  const loadingElement = () => {
    return <span className="loader-small"></span>
  }

  return (
    <div className="absolute top-[18%] left-[2.5%] w-[95%] h-[70%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-4 border-2 border-black bg-[#D9C6BA] font-amaticbold font-medium text-black text-[6vw]">
        <h1 className="pl-[2%] text-[8vw] h-[10%]">GoldiGov Proposals</h1>
        {
          infoLoading ?
          <div className="w-[100%] h-[100%] flex justify-center items-center">{ loadingElement() }</div> :
          <div className="flex flex-col w-[100%] h-[90%] overflow-y-auto border-t-2 border-black">
            {
              proposals.map((proposal: any, index: any) => (
                <div key={index} className="w-[100%] p-1 border-b-2 border-black">
                  <a href={`/goldigovernance/proposal/${proposal.proposalId}`}>
                    <div className="w-[100%] h-[100%]">
                      <span className="">
                        {proposal.proposalId} - {proposal.title ? `${proposal.title}:` : ""} {proposal.description}
                      </span>
                    </div>
                  </a>
                </div>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}