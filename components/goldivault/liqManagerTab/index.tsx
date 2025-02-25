"use client"

import { useGoldivault } from "../../../providers"

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
    <div className="relative flex h-[100%] w-[100%] flex-col">
      <div className="relative m-auto h-[50%] w-[75%] py-[3.5%]">
        <div className="w-[100%] flex flex-row justify-between">
          <h1 className="mb-[2.5%] font-baloo text-[2.5vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
            {activeToggle === 'ADDLIQ' ? "Deposit" : "Withdraw"} Liquidity
          </h1>
          <img
            className="h-6 w-6 cursor-pointer hover:animate-spin lg:h-8 lg:w-8"
            src="/images/icon-settings.png"
            alt="settings"
            onClick={() => changeSlippageToggle(true)}
          />
        </div>
        <div className="flex h-[50%] w-[100%] flex-row items-center justify-between border-2 border-black bg-white pl-[3.5%] pr-[1%]">
          <input
            className="h-[100%] w-full border-none bg-transparent font-baloo text-[4vw] font-bold focus:outline-none lg:text-[2vw]"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={displayString}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span className="text-nowrap font-baloo text-[2.5vw] font-bold md:text-[2vw] lg:text-[1vw]">
            {renderTopBalanceLabel()}
          </span>
        </div>
        <h1
          className="absolute right-0 mt-[2.5%] cursor-pointer font-baloo text-[2.5vw] font-medium text-white hover:scale-110 md:text-[2vw] lg:mt-[1%] lg:text-[1vw]"
          onClick={() => handleBalanceClick(params.vaultToken)}
        >
          balance:{" "}
          {walletInfoLoading
            ? loadingElement()
            : formatBalance(renderTopBalance())}
        </h1>
      </div>
    </div>
  )
}