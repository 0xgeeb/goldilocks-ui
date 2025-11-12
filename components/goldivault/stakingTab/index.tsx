"use client"

import { useGoldivault} from "../../../providers"
import { useVaultInfoConfig } from "@/hooks";
import { HoverText } from "@/app/(geo-check)/goldivault/vault/[address]/_components/InfoHover"
import {
  FieldWithLabel,
  Label,
  LabelSet,
  Container,
  FormWrapper
} from "@/app/(geo-check)/goldivault/vault/[address]/_components/FormComponents";

type StakingTabProps = {
  params: {
    vaultToken: string;
    dt: string;
    yt: string;
  }
}

export const StakingTab = ({ params }: StakingTabProps) => {

  const {
    displayString,
    handleChange,
    walletInfoLoading,
    activeToggle,
    handleBalanceClick,
  } = useGoldivault()

  const {
    vaultDTLabel,
    vaultYTLabel,
    justYt,
    stakedYt,
    claimable
  } = useVaultInfoConfig({ vaultToken: params.vaultToken })

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>;
  };

  const formatBalance = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const formatClaimable = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 8 });
  };

  const renderTopBalanceLabel = () => {
    if(activeToggle === "STAKE") {
      return vaultYTLabel
    }
    else if(activeToggle === "UNSTAKE") {
      return `staked ${vaultYTLabel}`
    }
    else {
      return `claimable ${vaultDTLabel}`
    }
  }

  const renderBalance = () => {
    if (activeToggle === "STAKE") {
      return justYt
    }
    else {
      return stakedYt
    } 
  }

  return (
    <FormWrapper>
      <LabelSet>
        <Label>
          {
            activeToggle === "STAKE" ? `Stake ${vaultYTLabel}` :
            activeToggle === "UNSTAKE" ? `Unstake ${vaultYTLabel}` :
            `Claim ${params.dt}`
          }
          {
            activeToggle === "STAKE" && (
              <HoverText hoverText="Yield Tokens are automatically staked on buys and deposits" />
            )
          }
          {
            activeToggle === "UNSTAKE" && (
              <HoverText hoverText="Yield Tokens are automatically unstaked on sales and redemptions. Note that unstaked YT do not earn yield" />
            )
          }
        </Label>
      </LabelSet>
      {
        activeToggle === "CLAIM" ?
        <FieldWithLabel
          id="number-input"
          label={`claimable ${vaultDTLabel}`}
          value={formatClaimable(claimable)}
          disabled={true}
        /> :
        <>
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
              Balance
              <span className="text-teak">{" "}
                {
                  walletInfoLoading
                  ? loadingElement()
                  : formatBalance(renderBalance())
                }
              </span>
            </Label>
          </Container>
        </>
      }
    </FormWrapper>
  )
}