"use client"

import { useGoldivault } from "../../../providers"

export const LiqManagerTab = () => {

  const {
    changeSlippageToggle,
    flipTokens,
    displayString,
    handleChange,
    activeToggle,
    walletInfoLoading,
    outputTokensLoading,
    goldivaultWalletInfoRusd,
    handleBalanceClick,
    tradeOutput
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
      // return goldivaultWalletInfoRusd.rusdotlp
      return 0
    }
  }

  const renderBottomBalance = () => {
    if (activeToggle === "ADDLIQ") {
      // return goldivaultWalletInfoRusd.rusdotlp
      return 0
    }
    else {
      return goldivaultWalletInfoRusd.rusd
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

  const renderBottomBalanceLabel = (): string => {
    if (activeToggle === "ADDLIQ") {
      return "rUSD / rUSD-OT LP"
    }
    else {
      return "rUSD"
    }
  }

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col">
      <img
        className="absolute left-[89%] top-[16%] h-6 w-6 cursor-pointer hover:scale-125 lg:left-[87.5%] lg:top-[5%] lg:h-7 lg:w-7"
        src="/images/icon-settings.png"
        alt="settings"
        onClick={() => changeSlippageToggle(true)}
      />
      <div
        className="absolute left-[47.27%] top-[44%] z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl border-2 border-[#FFCD00] bg-[#995816] hover:scale-[110%]"
        onClick={() => flipTokens()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFCD00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
      <div className="relative mx-auto h-[50%] w-[75%] py-[3.5%]">
        <h1 className="mb-[2.5%] font-baloo text-[2.5vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
          {activeToggle === 'ADDLIQ' ? "Deposit" : "Withdraw"} Liquidity
        </h1>
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
          // onClick={() => handleBalanceClick(params.vaultToken)}
          onClick={() => handleBalanceClick('rusd')}
        >
          balance:{" "}
          {walletInfoLoading
            ? loadingElement()
            : formatBalance(renderTopBalance())}
        </h1>
      </div>
      <div className="h-[50%] w-[100%] border-t-2 border-[#FFCD00] px-[12.5%] py-[3.5%]">
        <h1 className="mb-[2.5%] font-baloo text-[2.5vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
          {activeToggle === "TRADEOT"
            ? "Minimum tokens received"
            : "Predicted Output"}
        </h1>
        <div className="flex h-[50%] w-[100%] flex-row items-center justify-between border-2 border-black bg-slate-200 pl-[3.5%] pr-[1%]">
          <span className="text-nowrap font-baloo text-[4vw] font-bold lg:text-[2vw]">
            {outputTokensLoading
              ? loadingElement()
              : formatBalance(tradeOutput)}
          </span>
          <span className="text-nowrap font-baloo text-[2.5vw] font-bold md:text-[2vw] lg:text-[1vw]">
            {renderBottomBalanceLabel()}
          </span>
        </div>
        <h1 className="absolute right-0 mt-[2.5%] pr-[12.5%] font-baloo text-[2.5vw] font-medium text-white md:text-[2vw] lg:mt-[1%] lg:text-[1vw]">
          balance:{" "}
          {walletInfoLoading
            ? loadingElement()
            : formatBalance(renderBottomBalance())}
        </h1>
      </div>
    </div>
  )
}