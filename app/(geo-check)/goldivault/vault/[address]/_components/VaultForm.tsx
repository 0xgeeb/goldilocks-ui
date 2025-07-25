"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldivault } from "@/providers";
import { useVaultInfoConfig } from "@/hooks";
import {
  TradeTab,
  LiqManagerTab,
  StakingTab
} from "@/components/goldivault";
import { HoverText } from "./InfoHover";
import {
  FieldWithLabel,
  Label,
  LabelSet,
  Container,
  FormWrapper
} from "./FormComponents";

type VaultBoxProps = {
  params: {
    vaultToken: string;
    dt: string;
    ot: string;
    yt: string;
  };
};

function VaultForm({ params }: VaultBoxProps) {
  const {
    displayString,
    handleChange,
    handleBalanceClick,
    debouncedDeposit,
    debouncedRedeemOT,
    calculateDeposit,
    calculateYTRedeem,
    debouncedRedeemYT,
    setOutputTokensLoading,
    otAmount,
    setOtAmount,
    setYtAmount,
    txConfirming,
    refreshVaultInfo,
    refreshVaultWalletInfo,
    activeToggle,
    calculateOTRedeem,
    walletInfoLoading,
  } = useGoldivault();

  const {
    vaultOT,
    vaultYT,
    vaultDT,
    activeVaultTokens
  } = useVaultInfoConfig({ vaultToken: params.vaultToken })

  const { isConnected } = useAccount();

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>;
  };

  const formatBalance = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  useEffect(() => {
    refreshVaultInfo(params.vaultToken);
    refreshVaultWalletInfo(params.vaultToken);
  }, [isConnected]);

  useEffect(() => {
    if (debouncedDeposit > 0) {
      calculateDeposit(params.vaultToken);
    } else {
      setOtAmount(0);
      setYtAmount(0);
      setOutputTokensLoading(false);
    }
  }, [debouncedDeposit]);

  useEffect(() => {
    if (debouncedRedeemOT > 0) {
      calculateOTRedeem(params.vaultToken);
    } else {
      setOtAmount(0);
      setYtAmount(0);
      setOutputTokensLoading(false);
    }
  }, [debouncedRedeemOT]);

  useEffect(() => {
    if (debouncedRedeemYT > 0) {
      calculateYTRedeem();
    } else {
      setOtAmount(0);
      setYtAmount(0);
      setOutputTokensLoading(false);
    }
  }, [debouncedRedeemYT]);

  const renderTopLabel = (): string => {
    if (activeToggle === "DEPOSIT") {
      return "Deposit Tokens"
    } else if (activeToggle === "REDEEMOT") {
      return `Redeem Ownership Tokens${!activeVaultTokens.includes(params.vaultToken) ? "" : " & Burn Yield Tokens"}`
    } else {
      return "Redeem Yield Tokens"
    }
  }

  const renderBalance = () => {
    if (activeToggle === "DEPOSIT") {
      return vaultDT;
    } else if (activeToggle === "REDEEMOT") {
      return vaultOT;
    } else {
      return vaultYT;
    }
  };

  const renderTopBalanceLabel = (): string => {
    if (activeToggle === "DEPOSIT") {
      return params.dt;
    } else if (activeToggle === "REDEEMOT") {
      return `OT${!activeVaultTokens.includes(params.vaultToken) ? "" : " & YT"}`
    } else {
      return params.yt;
    }
  };

  const renderBottomBalanceLabel = (): string => {
    if (activeToggle === "DEPOSIT") {
      return "OT & YT"
    } else if (activeToggle === "REDEEMOT") {
      return params.dt;
    } else {
      return params.dt;
    }
  }

  if (txConfirming) {
    return (
      <img
        className="h-[100%] w-[100%] rounded-4xl p-5"
        src="/images/bg-transaction.png"
        alt="tx"
      />
    )
  }

  return (
    <>
      {activeToggle === "TRADEOT" || activeToggle === "TRADEYT" ? (
        <TradeTab
          params={{
            vaultToken: params.vaultToken,
            }}
          />
        ) : activeToggle === "ADDLIQ" || activeToggle === "REMOVELIQ" ? (
          <LiqManagerTab
            params={{
              vaultToken: params.vaultToken
            }}
          />
        ) : activeToggle === "STAKE" || activeToggle === "UNSTAKE" || activeToggle === "CLAIM" ? (
          <StakingTab
            params={{
              vaultToken: params.vaultToken,
              dt: params.dt,
              yt: params.yt
            }}
          />
        ) :
          <FormWrapper>
            <LabelSet>
              <Label>
                {renderTopLabel()}
                { activeToggle === "REDEEMOT" && <HoverText hoverText="Burn ownership tokens (and yield tokens before maturity) to receive underlying assets from the vault" /> }
              </Label>
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
            <LabelSet>
              <Label>Tokens Received</Label>
            </LabelSet>
            <FieldWithLabel
              id="number-input"
              label={renderBottomBalanceLabel()}
              value={otAmount}
              disabled={true}
            /> 
          </FormWrapper>
        }
    </>
  );
};

export default VaultForm;