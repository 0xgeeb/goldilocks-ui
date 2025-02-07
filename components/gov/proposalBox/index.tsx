"use client"

import { useGov } from "../../../providers"

type BoxProps = {
  number: string;
}

export const ProposalBox = ({ number }: BoxProps) => {

  const {
    infoLoading,
    proposals,
  } = useGov()
  
  const loadingElement = () => {
    return <span className="loader-small"></span>
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear())
    return `${month}-${day}-${year}`
  }

  const proposal = proposals.find((p: any) => p.proposalId == parseFloat(number))

  return (
    <div className="absolute top-[15%] lg:top-[20%] left-[1.5%] lg:left-[5%] w-[55%] lg:w-[50%] h-[75%] lg:h-[65%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA]">
        {
          infoLoading ?
          <div className="w-[100%[ h-[100%] flex justify-center items-center">
            { loadingElement() }
          </div> :
          proposal ?
          <div className="w-[100%] h-[100%] flex flex-col font-amaticbold font-medium text-black text-[1.5vw] px-[1%] overflow-y-auto">
            <h1 className="text-[3.5vw] lg:text-[2vw]">title: <span className="text-[2.5vw] lg:text-[1.5vw]">{proposal.title}</span></h1>
            <h1 className="text-[3.5vw] lg:text-[2vw]">description: <span className="text-[2.5vw] lg:text-[1.5vw]">{proposal.description}</span></h1>
            <h1 className="text-[3.5vw] lg:text-[2vw]">proposer: <span className="text-[2.5vw] lg:text-[1.5vw]">{proposal.proposer}</span></h1>
            <h1 className="text-[3.5vw] lg:text-[2vw]">start block: <span className="text-[2.5vw] lg:text-[1.5vw]">{proposal.startBlock}</span></h1>
            <h1 className="text-[3.5vw] lg:text-[2vw]">end block: <span className="text-[2.5vw] lg:text-[1.5vw]">{proposal.endBlock}</span></h1>
            <h1 className="text-[3.5vw] lg:text-[2vw]">action{proposal.actions.length > 1 ? "s" : ""}:</h1>
            {
              proposal.actions.map((action: any, index: number) => (
                <div className="w-[100%] border-t-2 border-black" key={index}>
                  <h1 className="text-[2.75vw] lg:text-[1.75vw]">target: <span className="text-[2.25vw] lg:text-[1.25vw]">{action.target}</span></h1>
                  <h1 className="text-[2.75vw] lg:text-[1.75vw]">calldata: <span className="text-[2.25vw] lg:text-[1.25vw]">{action.calldata}</span></h1>
                  <h1 className="text-[2.75vw] lg:text-[1.75vw]">value: <span className="text-[2.25vw] lg:text-[1.25vw]">{action.value}</span></h1>
                </div>
              ))
            }
          </div> :
          <div className="w-[100%] h-[100%] flex justify-center items-center font-amaticbold font-medium text-block text-[5vw] lg:text-[2.5vw]">
            <h1>no such proposal</h1>
          </div>
        }
      </div>
    </div>
  )
}