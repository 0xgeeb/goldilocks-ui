"use client"

import { useEffect, useRef } from "react"
import { useGov } from "../../../providers"

export const ProposalsBox = () => {

  const {
    infoLoading,
    proposals,
    toggleProposalHover,
    removeUnderlines
  } = useGov()

  const scrollableDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      removeUnderlines()
    }
    const scrollableDiv = scrollableDivRef.current
    if(scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll)
    }
    return () => {
      if(scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll)
      }
    }
  }, [proposals])

  const loadingElement = () => {
    return <span className="loader-small"></span>
  }

  return (
    <div className="absolute top-[15%] lg:top-[10%] right-[5%] w-[90%] lg:w-[50%] h-[70%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA] font-amaticbold font-medium text-black text-[3vw] lg:text-[1.5vw]">
        <h1 className="pl-[4%] text-[5vw] lg:text-[2.5vw] h-[15%]">GoldiGov Proposals</h1>
        {
          infoLoading ?
          <div className="w-[100%] h-[100%] flex justify-center items-center">{loadingElement()}</div> :
          <div
            className="flex flex-col w-[100%] h-[85%] overflow-y-auto border-t-2 border-black"
            ref={scrollableDivRef}
            onMouseLeave={() => removeUnderlines()}
          >
            {
              proposals.map((proposal: any, index: any) => (
                <div
                  key={index}
                  className="w-[100%] p-2 border-b-2 border-black"
                >
                  <a href={`/goldigovernance/proposal/${proposal.proposalId}`}>
                    <div
                      className="w-[100%] h-[100%] cursor-pointer"
                      onMouseEnter={() => toggleProposalHover(proposal.proposalId, true)}
                      onMouseLeave={() => toggleProposalHover(proposal.proposalId, false)}
                    >
                      <span
                        className={`${proposal.hover ? "underline" : ""}`}
                      >
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