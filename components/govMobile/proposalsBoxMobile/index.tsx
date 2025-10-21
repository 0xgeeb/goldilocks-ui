"use client";

import { useGov } from "../../../providers";

export const ProposalsBoxMobile = () => {
  const { infoLoading, proposals } = useGov();

  const loadingElement = () => {
    return <span className="loader-small"></span>;
  };

  const getFirstSentence = (text: string): string => {
    if (!text) return "";
    const match = text.match(/[^.!?]+[.!?]/);
    return match ? match[0].trim() : text;
  };

  return (
    <div className="absolute left-[2.5%] top-[18%] h-[70%] w-[95%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-2 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-2 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-4 border-2 border-black bg-[#D9C6BA] font-amaticbold text-[6vw] font-medium text-black">
        <h1 className="h-[10%] pl-[2%] text-[6.5vw]">GoldiGov Proposals</h1>
        {infoLoading ? (
          <div className="flex h-[100%] w-[100%] items-center justify-center">
            {loadingElement()}
          </div>
        ) : (
          <div className="flex h-[90%] w-[100%] flex-col overflow-y-auto border-t-2 border-black">
            {proposals.map((proposal: any, index: any) => (
              <div key={index} className="w-[100%] border-b-2 border-black p-1">
                <a href={`/goldigovernance/proposal/${proposal.proposalId}`}>
                  <div className="h-[100%] w-[100%]">
                    <span className="">
                      {proposal.proposalId} - {proposal.title || "Untitled"}
                      {proposal.description && (
                        <>: {getFirstSentence(proposal.description)}</>
                      )}
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
