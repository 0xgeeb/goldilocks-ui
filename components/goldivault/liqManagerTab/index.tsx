"use client"

import { useGoldivault } from "@/providers"
import {
  FieldWithLabel,
  Label,
  LabelSet,
  Container,
  GearIcon,
  FormWrapper
} from "@/app/(geo-check)/goldivault/vault/[address]/_components/FormComponents";


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
    handleBalanceClick
  } = useGoldivault()

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>;
  };

  const formatBalance = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const renderTopBalance = () => {
    if (activeToggle === "ADDLIQ") {
      return goldivaultWalletInfoRusd.rusd
    }
    else {
      return goldivaultWalletInfoRusd.rusdaquabera
    }
  }

  const renderTopBalanceLabel = (): string => {
    if (activeToggle === "ADDLIQ") {
      return "rUSD"
    }
    else {
      return "rUSD / rUSD-OT LP"
    }
  }

  return (
    <FormWrapper>
      <LabelSet>
        <Label>
          {activeToggle === 'ADDLIQ' ? "Deposit" : "Withdraw"} Liquidity
        </Label>
        <GearIcon
          onClick={() => changeSlippageToggle(true)}
        />
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
    </FormWrapper>
  )
}

LiqManagerTab.displayName = "LiqManagerTab";