"use client"

import { useEffect } from "react"
import { useGoldivault } from "../../../providers"
import { useVaultInfoConfig } from "@/hooks"
import {
  FormWrapper,
  FieldWithLabel,
  Container,
  Label,
  LabelSet
} from "@/app/(geo-check)/goldivault/vault/[address]/_components/FormComponents"
import { HoverText } from "@/app/(geo-check)/goldivault/vault/[address]/_components/InfoHover"

type ZapTabProps = {
  params: {
    vaultToken: string;
  }
}

export const ZapTab = ({ params }: ZapTabProps) => {

  const {
    handleChange,
    setOutputTokensLoading,
    calculateZapIn,
    calculateZapOut,
    setZapPopup,
    debouncedZap,
    displayString,
    setZap,
    setDisplayString,
    resetZapInfo,
    handleBalanceClick,
    activeToggle
  } = useGoldivault()

  const {
    vaultDTLabel,
    vaultDT,
    zapOutAsset,
    zapOutAssetLabel
  } = useVaultInfoConfig({ vaultToken: params.vaultToken})

  useEffect(() => {
    if(debouncedZap > 0) {
      if(activeToggle === "ADDLIQ") {
        calculateZapIn()
      }
      else {
        calculateZapOut()
      }
    }
    else {
      setOutputTokensLoading(false)
    }
  }, [debouncedZap])

  const formatOutput = (num: number) => {
    if(num > 0) {
      return num.toFixed(4)
    }
    else {
      return '~'
    }
  }

  const handleButton = () => {
    setZapPopup(false)
    setZap(0)
    setDisplayString('')
    resetZapInfo()
  }

  return (
    <FormWrapper>
      <Container align="right" padding="lg">
        <Label>
          <div className="rounded-xl bg-button-base hover:bg-button-hover font-inter text-md cursor-pointer text-teak p-2" onClick={() => handleButton()}>
            add liq manually
          </div>
        </Label>
      </Container>
      <LabelSet>
        <Label>
          {activeToggle === "ADDLIQ" ? `Zap ${vaultDTLabel}` : `Unzap ${zapOutAssetLabel}`}
          {
            activeToggle === "ADDLIQ" ?
            <HoverText hoverText="1. Deposit iBGT into Origami for oriBGT 2. Deposit oriBGT into Goldilocks for oriBGT-OT 3. LP oriBGT and oriBGT-OT into Steer 4. Stake Steer LP tokens into reward vault" /> :
            <HoverText hoverText="1. Unstake Steer LP tokens from reward vault 2. Remove oriBGT and oriBGT-OT liquidity from Steer 3. Redeem oriBGT-OT from Goldilocks 4. Redeem oriBGT from Origami" />
          }
        </Label>
      </LabelSet>
      <FieldWithLabel
        id="number-input"
        label={activeToggle === "ADDLIQ" ? vaultDTLabel : zapOutAssetLabel}
        value={displayString}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Container align="right" padding="sm">
        <Label
          className="cursor-pointer"
          onClick={() => handleBalanceClick(params.vaultToken)}
        >
          Balance <span className="text-teak">{" "}
          {formatOutput(activeToggle === "ADDLIQ" ? vaultDT : zapOutAsset)}
            </span>
        </Label>
      </Container>
      {/* <Container align="center" padding="lg">
        {
          activeToggle === "ADDLIQ" ?
          <div className="flex flex-col items-center justify-center text-md text-teak">
            <h2 className="">Deposit {formatOutput(zapInfo.ibgtOribgt)} into Origami for oriBGT</h2>
            <h2 className="">Deposit {formatOutput(zapInfo.ibgtGoldivault)} into Goldivault for oriBGT-OT</h2>
            <h2 className="">LP {formatOutput(zapInfo.oribgtSteer)} oriBGT and {formatOutput(zapInfo.ibgtGoldivault)} oriBGT-OT into Steer</h2>
            <h2 className="">Stake {formatOutput(zapInfo.steerLP)} Steer LP tokens into reward vault</h2>
          </div> :
          <div className="flex flex-col items-center justify-center text-md text-teak">
            <h2 className="">Unstake {formatOutput(zapInfo.steerLP)} Steer LP tokens from reward vault</h2>
            <h2 className="">Remove {formatOutput(zapInfo.oribgtSteer)} oriBGT and {formatOutput(zapInfo.ibgtGoldivault)} oriBGT-OT from Steer</h2>
            <h2 className="">Redeem {formatOutput(zapInfo.ibgtGoldivault)} oriBGT-OT from Goldivault</h2>
            <h2 className="">Redeem {formatOutput(zapInfo.ibgtOribgt)} oriBGT from Origami</h2>
          </div>
        }
      </Container> */}
    </FormWrapper>
  )
}