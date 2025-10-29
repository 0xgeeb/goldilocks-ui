"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useGov } from "../../../providers";
import { useGovTx } from "../../../hooks";

type BoxProps = {
  number: string;
};

export const ProposalBoxMobile = ({ number }: BoxProps) => {
  const [activeToggle, setActiveToggle] = useState<string>("INFO");
  const [activeVoteScreen, setActiveVoteScreen] = useState<boolean>(false);

  const { chain, isConnected } = useAccount();

  const { sendCastVoteTx } = useGovTx();

  const {
    proposals,
    proposalInfo,
    refreshProposalInfo,
    infoLoading,
    proposalInfoLoading,
    govWalletInfo,
    refreshGovWalletInfo,
  } = useGov();

  useEffect(() => {
    if (proposals.length > 0) {
      refreshProposalInfo(parseFloat(number));
    }
  }, [proposals]);

  useEffect(() => {
    refreshGovWalletInfo();
  }, [isConnected]);

  const loadingElement = () => {
    return <span className="loader-small"></span>;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${month}-${day}-${year}`;
  };

  const handleVoteClick = async (vote: string) => {
    if (vote === "for") {
      const text = document.getElementById("for");
      if (!isConnected) {
        text && (text.innerHTML = "no wallet");
        return;
      }
      if (chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain");
        return;
      }
      text && (text.innerHTML = "voting...");
      const voteTx = await sendCastVoteTx(parseFloat(number), 1, "");
      if (voteTx.substring(0, 2) === "0x") {
        text && (text.innerHTML = "voted :)");
      } else {
        text && (text.innerHTML = "for");
      }
    } else if (vote === "abstain") {
      const text = document.getElementById("abstain");
      if (!isConnected) {
        text && (text.innerHTML = "no wallet");
        return;
      }
      if (chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain");
        return;
      }
      text && (text.innerHTML = "voting...");
      const voteTx = await sendCastVoteTx(parseFloat(number), 2, "");
      if (voteTx.substring(0, 2) === "0x") {
        text && (text.innerHTML = "voted :)");
      } else {
        text && (text.innerHTML = "abstain");
      }
    } else {
      const text = document.getElementById("against");
      if (!isConnected) {
        text && (text.innerHTML = "no wallet");
        return;
      }
      if (chain?.name !== "Berachain") {
        text && (text.innerHTML = "no berachain");
        return;
      }
      text && (text.innerHTML = "voting...");
      const voteTx = await sendCastVoteTx(parseFloat(number), 0, "");
      if (voteTx.substring(0, 2) === "0x") {
        text && (text.innerHTML = "voted :)");
      } else {
        text && (text.innerHTML = "against");
      }
    }
  };

  const proposal = proposals.find(
    (p: any) => p.proposalId == parseFloat(number),
  );

  return (
    <>
      <div
        className={`absolute left-[2.5%] top-[14%] h-[6%] w-[25%] border-2 border-[#FFCD00] ${activeToggle === "INFO" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
        onClick={() => setActiveToggle("INFO")}
      >
        INFO
      </div>
      <div
        className={`absolute left-[30%] top-[14%] h-[6%] w-[25%] border-2 border-[#FFCD00] ${activeToggle === "VOTE" ? "bg-[#033E5E]" : "bg-[#995816]"} flex items-center justify-center font-amaticbold text-[6vw] font-medium text-[#FFCD00]`}
        onClick={() => setActiveToggle("VOTE")}
      >
        VOTE
      </div>
      <div className="absolute left-[5%] top-[24%] h-[70%] w-[90%] border-2 border-black bg-[#EEDCD2]">
        <div className="absolute left-0 top-2 w-4 skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute right-0 top-2 w-4 -skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-black"></div>
        <div className="absolute inset-4 border-2 border-black bg-[#D9C6BA] font-amaticbold text-[8vw] font-medium text-black">
          {infoLoading || proposalInfoLoading ? (
            <div className="flex h-[100%] w-[100%] items-center justify-center">
              {loadingElement()}
            </div>
          ) : activeToggle === "INFO" ? (
            <>
              {proposal ? (
                <div className="flex h-[100%] w-[100%] flex-col overflow-y-auto px-[1%]">
                  <h1 className="text-[7vw]">
                    title:{" "}
                    <span className="text-[5.5vw]">{proposal.title}</span>
                  </h1>
                  <h1 className="text-[7vw]">
                    description:{" "}
                    <span className="text-[5.5vw]">{proposal.description}</span>
                  </h1>
                  <h1 className="text-[7vw]">
                    proposer:{" "}
                    <span className="text-[5.5vw]">{proposal.proposer}</span>
                  </h1>
                  <h1 className="text-[7vw]">
                    start block:{" "}
                    <span className="text-[5.5vw]">{proposal.startBlock}</span>
                  </h1>
                  <h1 className="text-[7vw]">
                    end block:{" "}
                    <span className="text-[5.5vw]">{proposal.endBlock}</span>
                  </h1>
                  <h1 className="text-[7vw]">
                    action{proposal.actions.length > 1 ? "s" : ""}:
                  </h1>
                  {proposal.actions.map((action: any, index: number) => (
                    <div
                      className="w-[100%] border-t-2 border-black"
                      key={index}
                    >
                      <h1 className="text-[7vw]">
                        target:{" "}
                        <span className="text-[5.5vw]">{action.target}</span>
                      </h1>
                      <h1 className="text-[7vw]">
                        calldata:{" "}
                        <span className="text-[5.5vw]">{action.calldata}</span>
                      </h1>
                      <h1 className="text-[7vw]">
                        value:{" "}
                        <span className="text-[5.5vw]">{action.value}</span>
                      </h1>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-block flex h-[100%] w-[100%] items-center justify-center text-[10vw]">
                  <h1>no such proposal</h1>
                </div>
              )}
            </>
          ) : (
            <>
              {!proposal ? (
                <div className="text-block flex h-[100%] w-[100%] items-center justify-center text-[10vw]">
                  <h1>no such proposal</h1>
                </div>
              ) : proposalInfo.state === "PENDING" ? (
                <div className="flex h-[100%] w-[100%] flex-col items-center justify-center text-center">
                  <h1>This proposal is pending</h1>
                  <h1>Voting will begin on block {proposal.startBlock}</h1>
                </div>
              ) : proposalInfo.state === "ACTIVE" ? (
                activeVoteScreen ? (
                  <div className="flex h-[100%] w-[100%] flex-col items-center justify-center p-0 text-center">
                    <h1>Your votes</h1>
                    <h1>{govWalletInfo.votes}</h1>
                    <div className="relative mt-[10%] flex h-[15%] w-[95%] flex-row items-center justify-between text-[6vw]">
                      <div
                        className="flex h-[100%] w-[30%] cursor-pointer items-center justify-center border-2 border-black bg-green-500 hover:scale-110 hover:bg-green-700"
                        id="for"
                        onClick={() => handleVoteClick("for")}
                      >
                        FOR
                      </div>
                      <div
                        className="flex h-[100%] w-[30%] cursor-pointer items-center justify-center border-2 border-black bg-blue-500 hover:scale-110 hover:bg-blue-700"
                        id="abstain"
                        onClick={() => handleVoteClick("abstain")}
                      >
                        ABSTAIN
                      </div>
                      <div
                        className="flex h-[100%] w-[30%] cursor-pointer items-center justify-center border-2 border-black bg-red-500 hover:scale-110 hover:bg-red-700"
                        id="against"
                        onClick={() => handleVoteClick("against")}
                      >
                        AGAINST
                      </div>
                    </div>
                    <h1
                      className="absolute left-[4%] top-0 cursor-pointer font-baloo text-[8vw] hover:scale-125"
                      onClick={() => setActiveVoteScreen(false)}
                    >
                      x
                    </h1>
                  </div>
                ) : (
                  <div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
                    <h1>Voting for this proposal is active</h1>
                    <h1>Current Votes:</h1>
                    <h1 className="text-[6vw]">
                      for votes: {proposalInfo.forVotes}
                    </h1>
                    <h1 className="text-[6vw] text-red-600">
                      against votes: {proposalInfo.againstVotes}
                    </h1>
                    <h1 className="text-[6vw]">
                      abstain votes: {proposalInfo.abstainVotes}
                    </h1>
                    <h1
                      className="mt-[5%] cursor-pointer hover:underline"
                      onClick={() => setActiveVoteScreen(true)}
                    >
                      vote on this proposal
                    </h1>
                  </div>
                )
              ) : proposalInfo.state === "CANCELED" ? (
                <div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
                  <h1>This proposal has been canceled</h1>
                </div>
              ) : proposalInfo.state === "DEFEATED" ? (
                <div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
                  <h1>This proposal has been defeated</h1>
                  <h1>Voting Results:</h1>
                  <h1 className="text-[6vw]">
                    for votes: {proposalInfo.forVotes}
                  </h1>
                  <h1 className="text-[6vw] text-red-600">
                    against votes: {proposalInfo.againstVotes}
                  </h1>
                  <h1 className="text-[6vw]">
                    abstain votes: {proposalInfo.abstainVotes}
                  </h1>
                </div>
              ) : proposalInfo.state === "SUCCEEDED" ? (
                <div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
                  <h1>This proposal has succeeded</h1>
                  <h1>Voting Results:</h1>
                  <h1 className="text-[6vw] text-green-700">
                    for votes: {proposalInfo.forVotes}
                  </h1>
                  <h1 className="text-[6vw]">
                    against votes: {proposalInfo.againstVotes}
                  </h1>
                  <h1 className="text-[6vw]">
                    abstain votes: {proposalInfo.abstainVotes}
                  </h1>
                </div>
              ) : proposalInfo.state === "QUEUED" ? (
                <div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
                  <h1>This proposal is queued</h1>
                  <h1>Able to be executed on {formatDate(proposalInfo.eta)}</h1>
                </div>
              ) : proposalInfo.state === "EXPIRED" ? (
                <div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
                  <h1>This proposal has expired</h1>
                  <h1>Expired on {formatDate(proposalInfo.eta)}</h1>
                </div>
              ) : (
                <div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
                  <h1>This proposal has been executed</h1>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
