"use client";

import { useGov } from "../../../providers";

export const NewProposalPreviewMobile = () => {
  const { newProposalInfo } = useGov();

  return (
    <div className="absolute left-[1%] top-[8.5%] h-[15%] w-[98%]">
      <div className="flex h-[100%] w-[100%] flex-row justify-between p-0 font-amaticbold text-[#D9C6BA]">
        <div className="flex h-[100%] w-[60%] flex-col overflow-x-auto">
          <h1 className="text-[8vw]" id="page-title">
            title: <span className="text-[5vw]">{newProposalInfo.title}</span>
          </h1>
          <h1 className="text-[8vw]" id="page-title">
            description:{" "}
            <span className="text-[5vw]">{newProposalInfo.description}</span>
          </h1>
        </div>
        <div className="flex h-[100%] w-[38%] flex-col overflow-x-auto">
          <h1 className="text-[8vw]" id="page-title">
            {newProposalInfo.actions.length > 1 ? "actions" : "action"}
          </h1>
          {newProposalInfo.actions.map((action: any, index: number) => (
            <div className="w-[100%]" key={index}>
              <h1 className="text-[4vw]" id="page-title">
                target: <span className="text-[3vw]">{action.target}</span>
              </h1>
              <h1 className="text-[4vw]" id="page-title">
                calldata: <span className="text-[3vw]">{action.calldata}</span>
              </h1>
              <h1
                className="mb-[2.5%] border-b-2 border-[#D9C6BA] pb-[2.5%] text-[4vw]"
                id="page-title"
              >
                value: <span className="text-[3vw]">{action.value}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
