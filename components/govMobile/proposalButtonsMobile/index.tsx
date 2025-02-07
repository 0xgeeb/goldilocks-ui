"use client"

import { useAccount } from "wagmi"
import { useGov } from "../../../providers"
import { useGovTx } from "../../../hooks"

type ButtonsProps = {
  number: string;
}

export const ProposalButtonsMobile = ({ number }: ButtonsProps) => {

  const {
    proposalInfo,
    proposals,
    proposalInfoLoading,
    infoLoading
  } = useGov()

  const { chain, isConnected } = useAccount()

  const {
    sendCancelTx,
    sendQueueTx,
    sendExecuteTx
  } = useGovTx()

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>
  }

  const proposal = proposals.find((p: any) => p.proposalId == parseFloat(number))

  const handleButtonClick = async (button: string) => {
    if(button === 'cancel') {
      if(!proposalInfo.cancel || !proposal) return
      const text = document.getElementById('cancel')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== 'Berachain') {
        text && (text.innerHTML = "no berachain")
        return
      }
      text && (text.innerHTML = "cancelling...")
      const cancelTx = await sendCancelTx(parseFloat(number))
      if(cancelTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "cancelled :)")
      }
      else {
        text && (text.innerHTML = "cancel")
      }
    }
    if(button === 'queue') {
      if(!proposalInfo.queue) return
      const text = document.getElementById('queue')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== 'Berachain') {
        text && (text.innerHTML = "no berachain")
        return
      }
      text && (text.innerHTML = "queueing...")
      const queueTx = await sendQueueTx(parseFloat(number))
      if(queueTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "queued :)")
      }
      else {
        text && (text.innerHTML = "queue")
      }
    }
    if(button === 'execute') {
      if(!proposalInfo.execute) return
      const text = document.getElementById('execute')
      if(!isConnected) {
        text && (text.innerHTML = "no wallet")
        return
      }
      if(chain?.name !== 'Berachain') {
        text && (text.innerHTML = "no berachain")
        return
      }
      text && (text.innerHTML = "executing...")
      const executeTx = await sendExecuteTx(parseFloat(number))
      if(executeTx.substring(0, 2) === '0x') {
        text && (text.innerHTML = "executed :)")
      }
      else {
        text && (text.innerHTML = "execute")
      }
    }
  }

  return (
    <div className="absolute top-[2%] right-[2%] w-[40%] h-[7%] flex flex-row items-center justify-between font-amaticbold font-medium text-[4.5vw]">
      {
        (infoLoading || proposalInfoLoading) ?
        loadingElement() :
        <>
          <div
            className={`h-[100%] w-[30%] border-2 border-black ${proposalInfo.cancel && proposal ? "bg-[#D9C6BA]" : "bg-gray-300 opacity-30"} flex items-center justify-center`}
            id="cancel"
            onClick={() => handleButtonClick('cancel')}
          >
            cancel
          </div>
          <div
            className={`h-[100%] w-[30%] border-2 border-black ${proposalInfo.queue ? "bg-[#D9C6BA]" : "bg-gray-300 opacity-30"} flex items-center justify-center`}
            id="queue"
            onClick={() => handleButtonClick('queue')}
          >
            queue
          </div>
          <div
            className={`h-[100%] w-[30%] border-2 border-black ${proposalInfo.execute ? "bg-[#D9C6BA]" : "bg-gray-300 opacity-30"} flex items-center justify-center`}
            id="execute"
            onClick={() => handleButtonClick('execute')}
          >
            execute
          </div>
        </>
      }
    </div>
  )
}