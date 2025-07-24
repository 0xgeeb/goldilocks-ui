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
import { useGoldivaultTx, useVaultInfoConfig } from "@/hooks";
import { FormWrapper } from "../../../app/(geo-check)/goldivault/vault/[address]/_components/FormComponents"

type BuyOTPopupProps = {
  params: {
    vaultToken: string;
  }
}

export const BuyOTPopup = ({ params }: BuyOTPopupProps) => {

  const [approvalLoading, setApprovalLoading] = useState<boolean>(false)
  const [approved, setApproved] = useState<boolean>(false)
  const [depositLoading, setDepositLoading] = useState<boolean>(false)
  const [deposited, setDeposited] = useState<boolean>(false)
  const [tradeApprovalLoading, setTradeApprovalLoading] = useState<boolean>(false)
  const [tradeApproved, setTradeApproved] = useState<boolean>(false)
  const [tradeLoading, setTradeLoading] = useState<boolean>(false)
  const [traded, setTraded] = useState<boolean>(false)
  const [depositProceeds, setDepositProceeds] = useState<number>(0)
  const [dtAllowance, setDtAllowance] = useState<number>(0)
  const [lpAllowance, setLpAllowance] = useState<number>(0)

  useEffect(() => {
    getAllowances()
  }, [])

  const {
    tradeInput,
    slippage,
    setBuyOtPopup,
    setTradeInput,
    setTradeOutput,
    setDisplayString,
    setOutputTokensLoading
  } = useGoldivault()

  const {
    sendV3TradeTx,
    sendRouterV2ApproveTx,
    sendApproveTx,
    send4626DepositTx
  } = useGoldivaultTx()

  const {
    popupLPAssetAddy,
    vaultDTaddy,
    vaultOTaddy,
    popupDTLabel,
    vaultOTLabel,
    popupLPAssetLabel,
    dtPicSrc,
    lpPicSrc
  } = useVaultInfoConfig({ vaultToken: params.vaultToken })

  const { address } = useAccount()

  const getAllowances = async () => {
    const dtResult = await readContract(config, {
      address: vaultDTaddy as `0x${string}`,
      abi: contracts.ibgt.abi,
      functionName: 'allowance',
      args: [address, popupLPAssetAddy]
    })
    setDtAllowance(parseFloat(formatEther(dtResult as unknown as bigint)))
    const lpResult = await readContract(config, {
      address: popupLPAssetAddy as `0x${string}`,
      abi: contracts.oribgt.abi,
      functionName: 'allowance',
      args: [address, contracts.routerv2.address]
    })
    setLpAllowance(parseFloat(formatEther(lpResult as unknown as bigint)))
  }

  const handleLeftButtonClick = async () => {
    if(approved) {
      if(lpAllowance >= depositProceeds) {
        setTradeApprovalLoading(false)
        setTradeApproved(true)
      }
      else {
        setTradeApprovalLoading(true)
        await sendRouterV2ApproveTx(tradeInput, popupLPAssetAddy, false, 'eth')
        setTradeApprovalLoading(false)
        setTradeApproved(true)
      }
    }
    else {
      if(dtAllowance >= tradeInput) {
        setApprovalLoading(false)
        setApproved(true)
      }
      else {
        setApprovalLoading(true)
        await sendApproveTx(tradeInput, popupDTLabel, false)
        setApprovalLoading(false)
        setApproved(true)
      }
    } 
  }

  const handleRightButtonClick = async () => {
    if(approved) {
      if(lpAllowance >= depositProceeds) {
        setTradeApprovalLoading(false)
        setTradeApproved(true)  
      }
      else {
        setTradeApprovalLoading(true)
        await sendRouterV2ApproveTx(0, popupLPAssetAddy, true, 'eth')
        setTradeApprovalLoading(false)
        setTradeApproved(true)
      }
    }
    else {
      if(dtAllowance >= tradeInput) {
        setApprovalLoading(false)
        setApproved(true)
      }
      else {
        setApprovalLoading(true)
        await sendApproveTx(0, popupDTLabel, true)
        setApprovalLoading(false)
        setApproved(true)
      }
    }
  }

  const handleButtonClick = async () => {
    if(!deposited) {
      setDepositLoading(true)
      const beforeBalResult = await readContract(config, {
        address: popupLPAssetAddy as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const beforeBal = parseFloat(formatEther(beforeBalResult as unknown as bigint))
      await send4626DepositTx(tradeInput, address as `0x${string}`, params.vaultToken)
      const afterBalResult = await readContract(config, {
        address: popupLPAssetAddy as `0x${string}`,
        abi: contracts.oribgt.abi,
        functionName: 'balanceOf',
        args: [address]
      })
      const afterBal = parseFloat(formatEther(afterBalResult as unknown as bigint))
      setDepositProceeds(afterBal - beforeBal)
      setDepositLoading(false)
      setDeposited(true)
    }
    else if(!traded) {
      setTradeLoading(true)
      const quoteResult: any = await readContract(config, {
        address: contracts.quoterv2.address as `0x${string}`,
        abi: contracts.quoterv2.abi,
        functionName: "quoteExactInputSingle",
        args: [
          [
            popupLPAssetAddy,
            vaultOTaddy,
            parseEther(depositProceeds.toString()),
            500,
            0
          ]
        ]
      })
      const quoteForOutput = parseFloat(formatEther(quoteResult[0] as unknown as bigint))
      await sendV3TradeTx(
        depositProceeds,
        quoteForOutput * (1 - slippage.amount / 100),
        popupLPAssetAddy,
        vaultOTaddy,
        address as `0x${string}`,
        'eth'
      )
      setTradeLoading(false)
      setTraded(true)
    }
    else {
      setBuyOtPopup(false)
      setDisplayString("")
      setTradeInput(0)
      setTradeOutput(0)
      setOutputTokensLoading(false)
    }
  }

  return (
    <div className="absolute w-full max-w-5xl z-60 flex flex-col items-center gap-2.5 rounded-2xl border-2 border-[#352A1C] p-2 bg-bera-brown-dark">
      <FormWrapper>
        <h1 id="page-title" className="text-HoneyYellow font-amaticbold text-4xl">Deposit your {popupDTLabel} into {popupLPAssetLabel} then swap into {vaultOTLabel}</h1>
        <div className="flex flex-row items-center mx-auto mt-8 w-[60%] justify-between">
          <img className="w-[80px] h-[80px]" src={dtPicSrc} alt={popupDTLabel} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-10 -scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <img className="w-[80px] h-[80px]" src={lpPicSrc} alt={popupLPAssetLabel} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="size-10 -scale-x-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <img className="w-[80px] h-[80px]" src="/images/logo-ot.png" alt={vaultOTLabel} />
        </div>
        <div className="flex flex-row items-center mx-auto mt-8 w-[85%] justify-between text-2xl">
          <span className={`${approvalLoading ? "text-HoneyYellow" : approved ? "text-green-500" : "text-white"}`}>approv{approvalLoading ? "ing..." : "e"}</span>
          <span className={`${depositLoading ? "text-HoneyYellow" : deposited ? "text-green-500" : "text-white"}`}>deposit{depositLoading ? "ing..." : ""}</span>
          <span className={`${tradeApprovalLoading ? "text-HoneyYellow" : tradeApproved ? "text-green-500" : "text-white"}`}>approv{tradeApprovalLoading ? "ing..." : "e"}</span>
          <span className={`${tradeLoading ? "text-HoneyYellow" : traded ? "text-green-500" : "text-white"}`}>swap{tradeLoading ? "ping..." : ""}</span>
        </div>
        {((!approved && !deposited) || (deposited && !tradeApproved && !traded)) && (
          <div>
            <button
              className={`${cn(BUTTON_CLASSES)} mt-8`}
              id="left-approve-button"
              onClick={() => handleLeftButtonClick()}
            >
              {(approvalLoading || tradeApprovalLoading) ? "Approving..." : "Approve Tx"}
            </button>
            <button
              className={`${cn(BUTTON_CLASSES)} mt-4`}
              id="right-approve-button"
              onClick={() => handleRightButtonClick()}
            >
              {(approvalLoading || tradeApprovalLoading) ? "Approving..." : "Approve Infinite"}
            </button>
          </div>
        )}
        {((approved && !deposited) || tradeApproved) && (
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
                  {traded ? "All Done" : tradeLoading ? "Swapping..." : (tradeApproved && !tradeLoading) ? "Swap" : depositLoading ? "Depositing..." : "Deposit"}
                </button>
              );
            }}
          </ConnectButton.Custom>
        )}
        <span
          className="absolute top-0 right-[2%] hover:text-white cursor-pointer text-5xl"
          onClick={() => setBuyOtPopup(false)}
        >
          x
        </span>
      </FormWrapper>
    </div>
  )
}