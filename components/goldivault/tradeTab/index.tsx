"use client";

import { useEffect, useRef } from "react";
import { useGoldivault } from "@/providers";
import { useVaultInfoConfig } from "@/hooks";
import {
  FieldWithLabel,
  Label,
  LabelSet,
  Container,
  FormWrapper,
  GearIcon
} from "@/app/(geo-check)/goldivault/vault/[address]/_components/FormComponents";
import { HoverText } from "@/app/(geo-check)/goldivault/vault/[address]/_components/InfoHover";
import { cn } from "@/app/_components/utils";

type TradeTabProps = {
  params: {
    vaultToken: string;
  };
};

export const TradeTab = ({ params }: TradeTabProps) => {
  const {
    displayString,
    handleChange,
    walletInfoLoading,
    activeToggle,
    tradeDirection,
    handleBalanceClick,
    debouncedTradeInput,
    flipTokens,
    setTradeOutput,
    tradeOutput,
    setOutputTokensLoading,
    quoteV3Swap,
    changeSlippageToggle,
    priceImpact,
    impliedApr,
    debouncedSlippage
  } = useGoldivault();

  const {
    vaultOT,
    vaultYT,
    vaultDT,
    vaultOTLabel,
    vaultYTLabel,
    vaultDTLabel,
    four626bool,
    LPasset,
    LPassetLabel
  } = useVaultInfoConfig({ vaultToken: params.vaultToken })

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>;
  };

  const formatBalance = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const getVaultType = (vault: string): string => {
    if (vault === "weeth") {
      return "eth";
    } else if (vault === "rseth") {
      return "eth";
    } else if (vault === "ebtc") {
      return "btc";
    } else if (vault === "unibtc") {
      return "btc";
    } else if (vault === "rusd") {
      return "eth";
    } else {
      return "eth";
    }
  };

  useEffect(() => {
    if (debouncedTradeInput > 0) {
      quoteV3Swap(params.vaultToken, getVaultType(params.vaultToken), four626bool);
    } else {
      setTradeOutput(0);
      setOutputTokensLoading(false);
    }
  }, [debouncedTradeInput]);

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      quoteV3Swap(params.vaultToken, getVaultType(params.vaultToken), four626bool);
    }
    else {
      setTradeOutput(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedSlippage])

  const renderBottomBalance = () => {
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        return vaultOT;
      } else {
        return LPasset;
      }
    } else {
      if (tradeDirection === "OUT") {
        return vaultYT;
      } else {
        return LPasset;
      }
    }
  };

  const renderTopBalanceLabel = (): string => {
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        return vaultOTLabel;
      } else {
        return LPassetLabel;
      }
    } else {
      if (tradeDirection === "OUT") {
        return vaultYTLabel;
      } else {
        return LPassetLabel;
      }
    }
  }

  const renderBottomBalanceLabel = (): string => {
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        return LPassetLabel;
      } else {
        return vaultOTLabel;
      }
    } else {
      if (tradeDirection === "OUT") {
        return LPassetLabel;
      } else {
        return vaultYTLabel;
      }
    }
  }

  return (
    <FormWrapper>
      <LabelSet>
        <Label>
          Trade {activeToggle === "TRADEOT" ? "Ownership" : "Yield"} Tokens
        </Label>
        <GearIcon
          onClick={() => changeSlippageToggle(true)}
        />
      </LabelSet>
      <FieldWithLabel
        id="number-input"
        ref={inputRef}
        label={renderTopBalanceLabel()}
        value={displayString}
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* <Container align="right">
        <Label
          className="cursor-pointer"
          onClick={() => handleBalanceClick(params.vaultToken)}
        >
          Balance <span className="text-teak font-semibold">{" "}
          {walletInfoLoading
            ? loadingElement()
            : formatBalance(renderTopBalance())}
            </span>
        </Label>
      </Container> */}
      <Container padding="sm" align="center">
        <div
          className={cn(
            "border-4 border-bera-brown absolute size-10 rounded-full",
            "bg-input-base hover:bg-input-hover flex items-center justify-center z-10",
            "stroke-teak hover:stroke-teak",
            "cursor-pointer",
          )}
          onClick={() => flipTokens()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} className="absolute size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </Container>
      {/* <LabelSet>
        <Label>
          Minimum tokens received
        </Label>
      </LabelSet> */}
      <FieldWithLabel
        id="number-input"
        label={renderBottomBalanceLabel()}
        value={formatBalance(tradeOutput)}
        disabled={true}
      />
      <Container align="right">
        <Label
          className="cursor-pointer"
          onClick={() => handleBalanceClick(params.vaultToken)}
        >
          Balance
          <span className="text-teak font-semibold">{" "}
          {
            walletInfoLoading
            ? loadingElement()
            : formatBalance(renderBottomBalance())
          }
          </span>
        </Label>
      </Container>
      {tradeOutput >= 0 && (
        <Container direction="col" padding="md" align="center">
          <div className="flex flex-row justify-between items-center w-full">
            <Label>
              Predicted price impact
            </Label>
            <Label>
              {formatBalance(priceImpact)}%
            </Label>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <Label className="cursor-pointer">
              Implied APR
              <HoverText hoverText="The apr implied by the price at which your trade is predicted to execute" />
            </Label>
            <Label>
              {formatBalance(impliedApr)}%
            </Label>
          </div>
        </Container>
      )}
    </FormWrapper>
  );
};

TradeTab.displayName = "TradeTab";