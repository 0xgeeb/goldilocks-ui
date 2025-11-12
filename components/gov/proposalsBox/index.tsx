"use client";

import { useEffect, useRef } from "react";
import { useGov } from "../../../providers";

export const ProposalsBox = () => {
  const { infoLoading, proposals, toggleProposalHover, removeUnderlines } =
    useGov();

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      removeUnderlines();
    };
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableDiv) {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [proposals]);

  const loadingElement = () => {
    return <span className="loader-small"></span>;
  };

  return (
    <div className="absolute right-[5%] top-[15%] h-[70%] w-[90%] border-2 border-black bg-[#EEDCD2] lg:top-[10%] lg:w-[50%]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA] font-amaticbold text-[3vw] font-medium text-black lg:text-[1.5vw]">
        <h1 className="h-[15%] pl-[4%] text-[5vw] lg:text-[2.5vw]">
          GoldiGov Proposals
        </h1>
        {infoLoading ? (
          <div className="flex h-[100%] w-[100%] items-center justify-center">
            {loadingElement()}
          </div>
        ) : (
          <div
            className="flex h-[85%] w-[100%] flex-col overflow-y-auto border-t-2 border-black"
            ref={scrollableDivRef}
            onMouseLeave={() => removeUnderlines()}
          >
            {proposals.map((proposal: any, index: any) => (
              <div key={index} className="w-[100%] border-b-2 border-black p-2">
                <a href={`/goldigovernance/proposal/${proposal.proposalId}`}>
                  <div
                    className="h-[100%] w-[100%] cursor-pointer"
                    onMouseEnter={() =>
                      toggleProposalHover(proposal.proposalId, true)
                    }
                    onMouseLeave={() =>
                      toggleProposalHover(proposal.proposalId, false)
                    }
                  >
                    <span className={`${proposal.hover ? "underline" : ""}`}>
                      {proposal.proposalId} -{" "}
                      {proposal.title ? `${proposal.title}:` : ""}{" "}
                      {proposal.description}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
