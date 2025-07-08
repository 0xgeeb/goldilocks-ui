"use client"

import { useEffect } from "react"
import { useGoldivault } from "@/providers"
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

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      calculateLiquidity(activeToggle)
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
      else {
        return goldivaultWalletInfoOribgt.oribgt
      }
    }
    else {
      if(params.vaultToken === "rusd") {
        return goldivaultWalletInfoRusd.rusdaquabera
      }
      else {
        return goldivaultWalletInfoOribgt.steerLP
      }
    }
  }

  const renderBottomBalance = () => {
    if (activeToggle === "ADDLIQ") {
      return goldivaultWalletInfoOribgt.oribgtot
    }
  }

  const renderTopBalanceLabel = (): string => {
    if (activeToggle === "ADDLIQ") {
      if(params.vaultToken === "rusd") {
        return "rUSD"
      }
      else {
        return "oriBGT"
      }
    }
    else {
      if(params.vaultToken === "rusd") {
        return "rUSD / rUSD-OT LP"
      }
      else {
        return "oriBGT / oriBGT-OT LP"
      }
    }
  }

  const handleZapButton = () => {
    setZapPopup(true)
    setZap(0)
    resetZapInfo()
    setDisplayString('')
  }

  return (
    zapPopup ? <ZapTab params={{ vaultToken: params.vaultToken}} /> :
    <FormWrapper>
      <Container align="right" padding="sm">
        <Label>
          <div className="rounded-xl bg-button-base hover:bg-button-hover font-inter text-md cursor-pointer text-teak p-2" onClick={() => handleZapButton()}>
            zap to reward vault
          </div>
        </Label>
      </Container>
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
        (activeToggle === "ADDLIQ" && params.vaultToken === "oribgt") &&
        <>
          <div className='my-2'></div>
          <FieldWithLabel
            id="number-input"
            label={"oriBGT-OT"}
            value={tradeOutput}
            disabled={true}
          />
          <Container align="right" padding="sm">
            <Label>
              <HoverText hoverText="Click the deposit tab to get oriBGT-OT" />
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
        (activeToggle === "REMOVELIQ" && params.vaultToken === "oribgt") &&
        <>
          <div className='my-2'></div>
          <FieldWithLabel
            id="number-input"
            label={"oriBGT"}
            value={otAmount}
            disabled={true}
          />
          <div className='my-1'></div>
          <FieldWithLabel
            id="number-input"
            label={"oriBGT-OT"}
            value={ytAmount}
            disabled={true}
          />
        </>
      }
    </FormWrapper>
  )
}

LiqManagerTab.displayName = "LiqManagerTab";