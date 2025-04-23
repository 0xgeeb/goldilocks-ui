"use client"

import { useEffect, useState } from "react"
import { parseEther, formatEther } from "viem"
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { useGoldivault } from "@/providers";
import { config } from "../../../providers/WagmiProvider";
import { contracts } from "@/utils/addressi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BUTTON_CLASSES } from "../../../app/(geo-check)/goldivault/vault/[address]/_components/styles"
import { cn } from "@/app/_components/utils";
import { useGoldivaultTx } from "@/hooks";
import { FormWrapper } from "../../../app/(geo-check)/goldivault/vault/[address]/_components/FormComponents"

export const SellOTPopup = () => {

  const [approvalLoading, setApprovalLoading] = useState<boolean>(false)
  const [approved, setApproved] = useState<boolean>(false)
  const [tradeLoading, setTradeLoading] = useState<boolean>(false)
  const [traded, setTraded] = useState<boolean>(false)
  const [withdrawLoading, setWithdrawLoading] = useState<boolean>(false)
  const [withdrew, setWithdrew] = useState<boolean>(false)
  const [tradeProceeds, setTradeProceeds] = useState<number>(0)
  const [oribgtotAllowance, setOribgtotAllowance] = useState<number>(0)

  useEffect(() => {
    getAllowance()
  }, [])

  const {
    tradeInput,
    slippage,
    setSellOtPopup,
    setTradeInput,
    setTradeOutput,
    setDisplayString,
    setOutputTokensLoading
  } = useGoldivault()

  const {
    sendV3TradeTx,
    sendRouterV2ApproveTx,
    sendOribgtRedeemTx
  } = useGoldivaultTx()

  const { address } = useAccount()

  const getAllowance = async () => {
    const oribgtotResult = await readContract(config, {
      address: contracts.oribgtot.address as `0x${string}`,
      abi: contracts.oribgtot.abi,
      functionName: 'allowance',
      args: [address, contracts.routerv2.address]
    })
    setOribgtotAllowance(parseFloat(formatEther(oribgtotResult as unknown as bigint)))
  }

  const handleLeftButtonClick = async () => {
    if(oribgtotAllowance >= tradeInput) {
      setApprovalLoading(false)
      setApproved(true)
    }
    else {
      setApprovalLoading(true)
      await sendRouterV2ApproveTx(tradeInput, contracts.oribgtot.address, false, 'eth')
      setApprovalLoading(false)
      setApproved(true)
    }
  }

  const handleRightButtonClick = async () => {
    if(oribgtotAllowance >= tradeInput) {
      setApprovalLoading(false)
      setApproved(true)
    }
    else {
      setApprovalLoading(true)
      await sendRouterV2ApproveTx(0, contracts.oribgtot.address, true, 'eth')
      setApprovalLoading(false)
      setApproved(true)
    }
  }

  const handleButtonClick = async () => {
    if(!traded) {
      setTradeLoading(true)
      const quoteResult: any = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: "quoteExactInputSingle",
        args: [
          [
            contracts.oribgtot.address,
            contracts.oribgt.address,
            parseEther(`${tradeInput}`),
            500,
            0
          ]
        ]
      })
      const quoteForOutput = parseFloat(formatEther(quoteResult[0] as unknown as bigint))
      const beforeBalResult = await readContract(config, {
        address: contracts.oribgt.address as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const beforeBal = parseFloat(formatEther(beforeBalResult as unknown as bigint))
      await sendV3TradeTx(
        tradeInput,
        quoteForOutput * (1 - slippage.amount / 100),
        contracts.oribgtot.address,
        contracts.oribgt.address,
        address as `0x${string}`,
        'eth'
      )
      const afterBalResult = await readContract(config, {
        address: contracts.oribgt.address as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const afterBal = parseFloat(formatEther(afterBalResult as unknown as bigint))
      setTradeProceeds(afterBal - beforeBal)
      setTradeLoading(false)
      setTraded(true)
    }
    else if(!withdrew) {
      setWithdrawLoading(true)
      await sendOribgtRedeemTx(tradeProceeds, address as `0x${string}`)
      setWithdrawLoading(false)
      setWithdrew(true)
    }
    else {
      setSellOtPopup(false)
      setDisplayString("")
      setTradeInput(0)
      setTradeOutput(0)
      setOutputTokensLoading(false)
    }
  }

  return (
    <div className="absolute w-full max-w-5xl z-60 flex flex-col items-center gap-2.5 rounded-2xl border-2 border-[#352A1C] p-2 bg-bera-brown-dark">
      <FormWrapper>
        <h1 id="page-title" className="text-HoneyYellow font-amaticbold text-4xl">Swap your oriBGT-OT into oriBGT then withdraw iBGT</h1>
        <div className="flex flex-row items-center mx-auto mt-8 w-[60%] justify-between">
          <img className="w-[80px] h-[80px]" src="/images/logo-ot.png" alt="oribgtot" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-10 -scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <img className="w-[80px] h-[80px]" src="/images/logo-oribgt.svg" alt="oribgt" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-10 -scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <img className="w-[80px] h-[80px]" src="/images/logo-ibgt.svg" alt="ibgt" />
        </div>
        <div className="flex flex-row items-center mx-auto mt-8 w-[85%] justify-between text-2xl">
          <span className={`${approvalLoading ? "text-HoneyYellow" : approved ? "text-green-500" : "text-white"}`}>approv{approvalLoading ? "ing..." : "e"}</span>
          <span className={`${tradeLoading ? "text-HoneyYellow" : traded ? "text-green-500" : "text-white"}`}>swap{tradeLoading ? "ping..." : ""}</span>
          <span className={`${withdrawLoading ? "text-HoneyYellow" : withdrew ? "text-green-500" : "text-white"}`}>withdraw{withdrawLoading ? "ing..." : ""}</span>
        </div>
        {!approved && (
          <div>
            <button
              className={`${cn(BUTTON_CLASSES)} mt-8`}
              id="left-approve-button"
              onClick={() => handleLeftButtonClick()}
            >
              {approvalLoading ? "Approving..." : "Approve Tx"}
            </button>
            <button
              className={`${cn(BUTTON_CLASSES)} mt-4`}
              id="right-approve-button"
              onClick={() => handleRightButtonClick()}
            >
              {approvalLoading ? "Approving..." : "Approve Infinite"}
            </button>
          </div>
        )}
        {approved && (
          <ConnectButton.Custom>
            {({ account, chain, openChainModal, openConnectModal }) => {
              return (
                <button
                className={`${cn(BUTTON_CLASSES)} mt-8`}
                  id="deposit-button"
                  onClick={() => {
                    const button = document.getElementById("deposit-button");
  
                    if (!account) {
                      if (button && button.innerHTML === "connect wallet") {
                        openConnectModal();
                      } else {
                        button && (button.innerHTML = "connect wallet");
                      }
                    } else if (chain?.name !== "Berachain") {
                      if (button && button.innerHTML === "where berachain") {
                        openChainModal();
                      } else {
                        button && (button.innerHTML = "where berachain");
                      }
                    } else {
                      handleButtonClick();
                    }
                  }}
                >
                  {withdrew ? "All Done" : (!tradeLoading && !withdrew && !traded) ? "Swap" : tradeLoading ? "Swapping..." : withdrawLoading ? "Withdrawing..." : (traded && !withdrew) ? "Withdraw" : "Withdraw"}
                </button>
              );
            }}
          </ConnectButton.Custom>
        )}
        <span
          className="absolute top-0 right-[2%] hover:text-white cursor-pointer text-5xl"
          onClick={() => setSellOtPopup(false)}
        >
          x
        </span>
      </FormWrapper>
    </div>
  )
}