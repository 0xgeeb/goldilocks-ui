"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { useGovTx } from "../../../hooks"
import { useGov } from "../../../providers"

type BoxProps = {
  number: string;
}

export const VoteBox = ({ number }: BoxProps) => {

  const [activeVoteScreen, setActiveVoteScreen] = useState<boolean>(false)

  const { chain, isConnected } = useAccount()

  const {
    sendCastVoteTx
  } = useGovTx()

  const {
    proposals,
    proposalInfo,
    refreshProposalInfo,
    infoLoading,
    proposalInfoLoading,
    govWalletInfo,
    refreshGovWalletInfo
  } = useGov()

  useEffect(() => {
    if(proposals.length > 0) {
      refreshProposalInfo(parseFloat(number))
    }
  }, [proposals])

  useEffect(() => {
    refreshGovWalletInfo()
  }, [isConnected])
  
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

  const handleVoteClick = async (vote: string) => {
    if(vote === 'for') {
      const text = document.getElementById('for')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== 'Berachain bArtio') {
        text && (text.innerHTML = "no bartio")
        return
      }
      text && (text.innerHTML = "voting...")
      const voteTx = await sendCastVoteTx(parseFloat(number), 1, "")
      if(voteTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "voted :)")
      }
      else {
        text && (text.innerHTML = "for")
      }
    }
    else if(vote === 'abstain') {
      const text = document.getElementById('abstain')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== 'Berachain bArtio') {
        text && (text.innerHTML = "no bartio")
        return
      }
      text && (text.innerHTML = "voting...")
      const voteTx = await sendCastVoteTx(parseFloat(number), 2, "")
      if(voteTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "voted :)")
      }
      else {
        text && (text.innerHTML = "abstain")
      }
    }
    else {
      const text = document.getElementById('against')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== 'Berachain bArtio') {
        text && (text.innerHTML = "no bartio")
        return
      }
      text && (text.innerHTML = "voting...")
      const voteTx = await sendCastVoteTx(parseFloat(number), 0, "")
      if(voteTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "voted :)")
      }
      else {
        text && (text.innerHTML = "against")
      }
    }
  }

  const proposal = proposals.find((p: any) => p.proposalId == parseFloat(number))

  return (
    <div className="absolute top-[15%] lg:top-[20%] right-[1.5%] lg:right-[5%] w-[40%] lg:w-[35%] h-[75%] lg:h-[65%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute top-3 left-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute top-3 right-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute inset-6 border-2 border-black bg-[#D9C6BA] font-amaticbold font-medium text-black text-[4vw] lg:text-[2vw]">
        { 
          (infoLoading || proposalInfoLoading) ?
          <div className="w-[100%] h-[100%] flex justify-center items-center">
            { loadingElement() }
          </div> :
          !proposal ?
          <div className="w-[100%] h-[100%] flex justify-center items-center font-amaticbold font-medium text-block text-[5vw] lg:text-[2.5vw]">
            <h1>no such proposal</h1>
          </div> :
          proposalInfo.state === 'PENDING' ?
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center text-center">
            <h1>This proposal is pending</h1>
            <h1>Voting will begin on block {proposal.startBlock}</h1>
          </div> :
          proposalInfo.state === 'ACTIVE' ?
          activeVoteScreen ?
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center p-0">
            <h1>Your votes</h1>
            <h1>{govWalletInfo.votes}</h1>
            <div className="h-[15%] w-[95%] mt-[10%] flex flex-row items-center justify-between relative text-[2.5vw] lg:text-[1.5vw]">
              <div
                className="h-[100%] w-[30%] bg-green-500 hover:bg-green-700 hover:scale-110 cursor-pointer border-2 border-black flex items-center justify-center"
                id="for"
                onClick={() => handleVoteClick('for')}
              >
                FOR
              </div>
              <div
                className="h-[100%] w-[30%] bg-blue-500 hover:bg-blue-700 hover:scale-110 cursor-pointer border-2 border-black flex items-center justify-center"
                id="abstain"
                onClick={() => handleVoteClick('abstain')}
              >
                ABSTAIN
              </div>
              <div
                className="h-[100%] w-[30%] bg-red-500 hover:bg-red-700 hover:scale-110 cursor-pointer border-2 border-black flex items-center justify-center"
                id="against"
                onClick={() => handleVoteClick('against')}
              >
                AGAINST
              </div>
            </div>
            <h1 className="absolute left-[4%] lg:left-[2%] top-0 text-[4vw] lg:text-[2vw] font-baloo cursor-pointer hover:scale-125" onClick={() => setActiveVoteScreen(false)}>x</h1>
          </div> :
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center text-center">
            <h1>Voting for this proposal is active</h1>
            <h1>Current Votes:</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw]">for votes: {proposalInfo.forVotes}</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw] text-red-600">against votes: {proposalInfo.againstVotes}</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw]">abstain votes: {proposalInfo.abstainVotes}</h1>
            <h1 className="hover:underline mt-[5%] cursor-pointer" onClick={() => setActiveVoteScreen(true)}>vote on this proposal</h1>
          </div> :
          proposalInfo.state === 'CANCELED' ?
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center text-center">
            <h1>This proposal has been canceled</h1>
          </div> :
          proposalInfo.state === 'DEFEATED' ?
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center text-center">
            <h1>This proposal has been defeated</h1>
            <h1>Voting Results:</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw]">for votes: {proposalInfo.forVotes}</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw] text-red-600">against votes: {proposalInfo.againstVotes}</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw]">abstain votes: {proposalInfo.abstainVotes}</h1>
          </div> :
          proposalInfo.state === 'SUCCEEDED' ?
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
            <h1>This proposal has succeeded</h1>
            <h1>Voting Results:</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw] text-green-700">for votes: {proposalInfo.forVotes}</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw]">against votes: {proposalInfo.againstVotes}</h1>
            <h1 className="text-[2.25vw] lg:text-[1.5vw]">abstain votes: {proposalInfo.abstainVotes}</h1>
          </div> :
          proposalInfo.state === 'QUEUED' ?
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center text-center">
            <h1>This proposal is queued</h1>
            <h1>Able to be executed on {formatDate(proposalInfo.eta)}</h1>
          </div> :
          proposalInfo.state === 'EXPIRED' ?
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center text-center">
            <h1>This proposal has expired</h1>
            <h1>Expired on {formatDate(proposalInfo.eta)}</h1>
          </div> :
          <div className="w-[100%] h-[100%] flex flex-col justify-center items-center text-center">
            <h1>This proposal has been executed</h1>
          </div>
        }
      </div>
    </div>
  )
}