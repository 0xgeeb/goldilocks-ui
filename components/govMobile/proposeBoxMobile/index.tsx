"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGov } from "../../../providers";
import { useGovTx } from "../../../hooks";

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
    <div className="absolute left-[2.5%] top-[25%] h-[65%] w-[95%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-2 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-2 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-4 border-2 border-black bg-[#D9C6BA] font-amaticbold text-[1.5vw] font-medium text-black">
        {proposeTab === "TITLE" ? (
          <div className="flex h-[100%] w-[100%] flex-col items-start p-[2.5%] font-baloo">
            <h1 className="font-amaticbold text-[8vw]">title</h1>
            <textarea
              className="h-[15%] w-[100%] resize-none pl-[1%] pt-[1%] text-[6vw]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <h1 className="mt-[1%] font-amaticbold text-[8vw]">description</h1>
            <textarea
              className="h-[30%] w-[100%] resize-none pl-[1%] pt-[1%] text-[6vw]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <h1
              className="mt-auto cursor-pointer self-end font-amaticbold text-[8vw] hover:underline"
              onClick={() => addTitle()}
            >
              add a action
            </h1>
          </div>
        ) : proposeTab === "ERROR" ? (
          <div className="flex h-[100%] w-[100%] flex-col items-center justify-center p-[5%] text-center font-baloo text-[7vw]">
            <h1>something went wrong</h1>
          </div>
        ) : proposeTab === "SUCCESS" ? (
          <div className="flex h-[100%] w-[100%] flex-col items-center justify-center p-[5%] text-center font-baloo text-[7vw]">
            <h1>you proposed</h1>
          </div>
        ) : (
          <div className="flex h-[100%] w-[100%] flex-col items-start px-[2.5%] py-[0.5%] font-baloo">
            <h1 className="font-amaticbold text-[8vw]">target</h1>
            <textarea
              className="h-[12.5%] w-[100%] resize-none pl-[1%] pt-[1%] text-[6vw]"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            ></textarea>
            <h1 className="mt-[1%] font-amaticbold text-[8vw]">calldata</h1>
            <textarea
              className="h-[12.5%] w-[100%] resize-none pl-[1%] pt-[1%] text-[6vw]"
              value={calldata}
              onChange={(e) => setCalldata(e.target.value)}
            ></textarea>
            <h1 className="mt-[1%] font-amaticbold text-[8vw]">value</h1>
            <textarea
              className="h-[12.5%] w-[100%] resize-none pl-[1%] pt-[1%] text-[6vw]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
            <div className="mt-auto flex w-[100%] flex-row items-center justify-between font-amaticbold text-[8vw]">
              <h1 className="" onClick={() => addBack()}>
                back
              </h1>
              <h1 className="" onClick={() => addAction()}>
                add action
              </h1>
              <h1 className="" onClick={() => handlePropose()}>
                propose
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
