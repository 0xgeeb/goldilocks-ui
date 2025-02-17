"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGov } from "../../../providers";
import { useGovTx } from "../../../hooks";

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
    enableProposeSuccess,
  } = useGov();

  const { sendProposeTx } = useGovTx();

  const { isConnected } = useAccount();

  useEffect(() => {
    refreshGovWalletInfo();
  }, [isConnected]);

  const handlePropose = async () => {
    if (newProposalInfo.actions.length == 0) {
      return;
    }
    if (govWalletInfo.votes < 4) {
      enableProposeError();
      return;
    }
    const targets = newProposalInfo.actions.map(
      (action: { target: any }) => action.target,
    );
    const calldatas = newProposalInfo.actions.map(
      (action: { calldata: any }) => action.calldata,
    );
    const signatures = newProposalInfo.actions.map(() => "");
    const values = newProposalInfo.actions.map((action: { value: any }) =>
      parseFloat(action.value),
    );
    const proposeTx = await sendProposeTx(
      targets,
      values,
      signatures,
      calldatas,
      `${title}: ${description}`,
    );
    if (proposeTx.substring(0, 2) === "0x") {
      enableProposeSuccess();
    } else {
      enableProposeError();
    }
  };

  return (
    <div className="absolute right-[0.5%] top-[12.5%] h-[75%] w-[60%] border-2 border-black bg-[#EEDCD2] lg:right-[5%] lg:top-[10%] lg:w-[65%]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA] font-amaticbold text-[3vw] font-medium text-black lg:text-[1.5vw]">
        {proposeTab === "TITLE" ? (
          <div className="flex h-[100%] w-[100%] flex-col items-start p-[2.5%] font-baloo">
            <h1 className="font-amaticbold text-[4vw] lg:text-[2.5vw]">
              title
            </h1>
            <textarea
              className="h-[20%] w-[100%] resize-none pl-[1%] pt-[1%] text-[2vw] lg:h-[15%] lg:text-[1.5vw]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <h1 className="mt-[1%] font-amaticbold text-[4vw] lg:text-[2.5vw]">
              description
            </h1>
            <textarea
              className="h-[40%] w-[100%] resize-none pl-[1%] pt-[1%] text-[2vw] lg:h-[30%] lg:text-[1.5vw]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <h1
              className="mt-auto cursor-pointer self-end font-amaticbold text-[4vw] hover:underline lg:text-[2.5vw]"
              onClick={() => addTitle()}
            >
              add a action
            </h1>
          </div>
        ) : proposeTab === "ERROR" ? (
          <div className="flex h-[100%] w-[100%] flex-col items-center justify-center p-[5%] font-baloo">
            <h1>something went wrong</h1>
          </div>
        ) : proposeTab === "SUCCESS" ? (
          <div className="flex h-[100%] w-[100%] flex-col items-center justify-center p-[5%] font-baloo">
            <h1>you proposed</h1>
          </div>
        ) : (
          <div className="flex h-[100%] w-[100%] flex-col items-start px-[2.5%] py-[0.5%] font-baloo">
            <h1 className="font-amaticbold text-[4vw] lg:text-[2.5vw]">
              target
            </h1>
            <textarea
              className="h-[12.5%] w-[100%] resize-none pl-[1%] pt-[1%] text-[2vw] lg:text-[1.5vw]"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            ></textarea>
            <h1 className="mt-[1%] font-amaticbold text-[4vw] lg:text-[2.5vw]">
              calldata
            </h1>
            <textarea
              className="h-[12.5%] w-[100%] resize-none pl-[1%] pt-[1%] text-[2vw] lg:text-[1.5vw]"
              value={calldata}
              onChange={(e) => setCalldata(e.target.value)}
            ></textarea>
            <h1 className="mt-[1%] font-amaticbold text-[4vw] lg:text-[2.5vw]">
              value
            </h1>
            <textarea
              className="h-[12.5%] w-[100%] resize-none pl-[1%] pt-[1%] text-[2vw] lg:text-[1.5vw]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
            <div className="mt-auto flex w-[100%] flex-row items-center justify-between font-amaticbold text-[4vw] lg:text-[2.5vw]">
              <h1
                className="cursor-pointer hover:underline"
                onClick={() => addBack()}
              >
                back
              </h1>
              <h1
                className="cursor-pointer hover:underline"
                onClick={() => addAction()}
              >
                add action
              </h1>
              <h1
                className="cursor-pointer hover:underline"
                onClick={() => handlePropose()}
              >
                propose
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
