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
    activeToggle,
    selectedZapAsset,
    setSelectedZapAsset,
    goldivaultWalletInfoStlbgt,
    changeActiveToggle
  } = useGoldivault()

  const {
    vaultDTLabel,
    vaultDT,
    zapOutAsset,
    zapOutAssetLabel,
    zapInSteps,
    zapOutSteps
  } = useVaultInfoConfig({ vaultToken: params.vaultToken})

  useEffect(() => {
    if(debouncedZap > 0) {
      if(activeToggle === "ADDLIQ") {
        calculateZapIn(params.vaultToken)
      }
      else {
        calculateZapOut(params.vaultToken)
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

  const getAssetLabel = () => {
    if(params.vaultToken === "stlbgt" && activeToggle === "ADDLIQ") {
      return selectedZapAsset
    }
    return activeToggle === "ADDLIQ" ? vaultDTLabel : zapOutAssetLabel
  }

  const getAssetBalance = () => {
    if(params.vaultToken === "stlbgt" && activeToggle === "ADDLIQ") {
      return selectedZapAsset === "LBGT" ? goldivaultWalletInfoStlbgt.lbgt : goldivaultWalletInfoStlbgt.stlbgt
    }
    return activeToggle === "ADDLIQ" ? vaultDT : zapOutAsset
  }

  return (
    <FormWrapper>
      {params.vaultToken === "stlbgt" && activeToggle === "ADDLIQ" ? (
        <>
        <LabelSet>
          <Label>
            Select Zap Asset
          </Label>
        </LabelSet>
        <Container align="left" padding="sm">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="flex rounded-lg bg-input-base p-1">
              <button
                className={`px-3 py-1 rounded text-sm font-medium text-teak transition-colors ${
                  selectedZapAsset === 'LBGT' 
                    ? 'border-b-2 border-white text-white' 
                    : 'cursor-pointer'
                }`}
                onClick={() => {
                  setSelectedZapAsset('LBGT')
                  changeActiveToggle("ADDLIQ")
                }}
              >
                LBGT
              </button>
              <button
                className={`px-3 py-1 rounded text-sm font-medium text-teak transition-colors ${
                  selectedZapAsset === 'stLBGT' 
                    ? 'border-b-2 border-white text-white'
                    : 'cursor-pointer'
                }`}
                onClick={() => {
                  setSelectedZapAsset('stLBGT')
                  changeActiveToggle("ADDLIQ")
                }}
              >
                stLBGT
              </button>
            </div>
            <Label>
              <div className="rounded-xl bg-button-base hover:bg-button-hover font-inter text-md cursor-pointer text-teak p-2" onClick={() => handleButton()}>
                {activeToggle === "ADDLIQ" ? "add" : "remove"} liq manually
              </div>
            </Label>
          </div>
        </Container>
        </>
      ) :
        <Container align="right" padding="sm">
          <Label>
            <div className="rounded-xl bg-button-base hover:bg-button-hover font-inter text-md cursor-pointer text-teak p-2" onClick={() => handleButton()}>
              {activeToggle === "ADDLIQ" ? "add" : "remove"} liq manually
            </div>
          </Label>
        </Container>
      }
      <LabelSet>
        <Label>
          {activeToggle === "ADDLIQ" ? `Zap ${getAssetLabel()}` : `Unzap ${getAssetLabel()}`}
          {
            activeToggle === "ADDLIQ" ?
            <HoverText hoverText={zapInSteps} /> :
            <HoverText hoverText={zapOutSteps} />
          }
          <HoverText hoverText="Zaps are only compatible with Metamask" />
        </Label>
      </LabelSet>
      <FieldWithLabel
        id="number-input"
        label={getAssetLabel()}
        value={displayString}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Container align="right" padding="sm">
        <Label
          className="cursor-pointer"
          onClick={() => handleBalanceClick(params.vaultToken)}
        >
          Balance <span className="text-teak">{" "}
          {formatOutput(getAssetBalance())}
            </span>
        </Label>
      </Container>
    </FormWrapper>
  )
}