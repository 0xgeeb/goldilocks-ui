"use client"

import { useEffect } from "react"
import { useGoldivault } from "@/providers"
import { useVaultInfoConfig } from "@/hooks"
import {
  FieldWithLabel,
  Label,
  LabelSet,
  Container,
  GearIcon,
  FormWrapper
} from "@/app/(geo-check)/goldivault/vault/[address]/_components/FormComponents";
import { HoverText } from "@/app/(geo-check)/goldivault/vault/[address]/_components/InfoHover"
import { ZapTab } from "../"


type LiqManagerTabProps = {
  params: {
    vaultToken: string;
  };
};

export const LiqManagerTab = ({ params }: LiqManagerTabProps) => {

  const {
    changeSlippageToggle,
    displayString,
    handleChange,
    activeToggle,
    walletInfoLoading,
    goldivaultWalletInfoRusd,
    goldivaultWalletInfoOribgt,
    goldivaultWalletInfoStlbgt,
    goldivaultWalletInfoYbgt,
    handleBalanceClick,
    tradeOutput,
    setTradeOutput,
    setOtAmount,
    setYtAmount,
    calculateLiquidity,
    debouncedTradeInput,
    setOutputTokensLoading,
    otAmount,
    ytAmount,
    setZapPopup,
    zapPopup,
    setZap,
    setDisplayString,
    resetZapInfo
  } = useGoldivault()

  const {
    vaultOTLabel,
    popupLPAssetLabel,
    vaultOT,
    zappableVaults
  } = useVaultInfoConfig({ vaultToken: params.vaultToken})

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      calculateLiquidity(activeToggle, params.vaultToken)
    }
    else {
      setTradeOutput(0)
      setOtAmount(0)
      setYtAmount(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedTradeInput])

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>;
  };

  const formatBalance = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const renderTopBalance = () => {
    if (activeToggle === "ADDLIQ") {
      if(params.vaultToken === "rusd") {
        return goldivaultWalletInfoRusd.rusd
      }
      else if(params.vaultToken == "stlbgt") {
        return goldivaultWalletInfoStlbgt.stlbgt
      }
      else if(params.vaultToken === "ybgt") {
        return goldivaultWalletInfoYbgt.ysysybgt
      }
      else {
        return goldivaultWalletInfoOribgt.oribgt
      }
    }
    else {
      if(params.vaultToken === "rusd") {
        return goldivaultWalletInfoRusd.rusdaquabera
      }
      else if(params.vaultToken == "stlbgt") {
        return goldivaultWalletInfoStlbgt.kodiakIsland
      }
      else if(params.vaultToken === "ybgt") {
        return goldivaultWalletInfoYbgt.kodiakIsland
      }
      else {
        return goldivaultWalletInfoOribgt.steerLP
      }
    }
  }

  const renderBottomBalance = () => {
    if (activeToggle === "ADDLIQ") {
      return vaultOT
    }
  }

  const renderTopBalanceLabel = (): string => {
    if (activeToggle === "ADDLIQ") {
      return popupLPAssetLabel
    }
    else {
      return `${popupLPAssetLabel} / ${vaultOTLabel} LP`
    }
  }

  const handleZapButton = () => {
    setZapPopup(true)
    setZap(0)
    resetZapInfo()
    setDisplayString('')
  }

  return (
    (zapPopup && zappableVaults.includes(params.vaultToken)) ? <ZapTab params={{ vaultToken: params.vaultToken}} /> :
    <FormWrapper>
      {
        zappableVaults.includes(params.vaultToken) &&
        <Container align="right" padding="sm">
          <Label>
            <div className="rounded-xl bg-button-base hover:bg-button-hover font-inter text-md cursor-pointer text-teak p-2" onClick={() => handleZapButton()}>
              {activeToggle === "ADDLIQ" ? "zap to" : "unzap from"} {params.vaultToken === "oribgt" ? "reward vault" : "LP"}
            </div>
          </Label>
        </Container>
      }
      <LabelSet>
        <Label>
          {activeToggle === 'ADDLIQ' ? "Deposit" : "Withdraw"} Liquidity
        </Label>
        { params.vaultToken === "rusd" && <GearIcon onClick={() => changeSlippageToggle(true)}/> }
      </LabelSet>
      <FieldWithLabel
        id="number-input"
        label={renderTopBalanceLabel()}
        value={displayString}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Container align="right" padding="sm">
        <Label
          className="cursor-pointer"
          onClick={() => handleBalanceClick(params.vaultToken)}
        >
          Balance <span className="text-teak">{" "}
          {walletInfoLoading
            ? loadingElement()
            : formatBalance(renderTopBalance())}
            </span>
        </Label>
      </Container>
      {
        (activeToggle === "ADDLIQ" && (params.vaultToken === "oribgt" || params.vaultToken === "stlbgt" || params.vaultToken === "ybgt")) &&
        <>
          <div className='my-2'></div>
          <FieldWithLabel
            id="number-input"
            label={vaultOTLabel}
            value={tradeOutput}
            disabled={true}
          />
          <Container align="right" padding="sm">
            <Label>
              <HoverText hoverText={`Click the deposit tab to get ${vaultOTLabel}`} />
              Balance <span className="text-teak">{" "}
              {walletInfoLoading
                ? loadingElement()
                : formatBalance(renderBottomBalance())}
                </span>
            </Label>
          </Container>
        </>
      }
      {
        (activeToggle === "REMOVELIQ" && (params.vaultToken === "oribgt" || params.vaultToken === "stlbgt" || params.vaultToken === "ybgt")) &&
        <>
          <div className='my-2'></div>
          <FieldWithLabel
            id="number-input"
            label={popupLPAssetLabel}
            value={otAmount}
            disabled={true}
          />
          <div className='my-1'></div>
          <FieldWithLabel
            id="number-input"
            label={vaultOTLabel}
            value={ytAmount}
            disabled={true}
          />
        </>
      }
    </FormWrapper>
  )
}

LiqManagerTab.displayName = "LiqManagerTab";