"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldivault } from "../../../providers";
import {
  TradeTab,
  Notification,
  LiqManagerTab
} from "..";

type VaultBoxProps = {
  params: {
    vaultToken: string;
    dt: string;
    ot: string;
    yt: string;
  };
};

export const VaultBox = ({ params }: VaultBoxProps) => {
  const {
    displayString,
    handleChange,
    handleBalanceClick,
    debouncedDeposit,
    debouncedRedeemOT,
    calculateDeposit,
    calculateYTRedeem,
    debouncedRedeemYT,
    outputTokensLoading,
    setOutputTokensLoading,
    otAmount,
    ytAmount,
    setOtAmount,
    setYtAmount,
    txConfirming,
    refreshGoldivaultInfoWeeth,
    refreshGoldivaultWalletInfoWeeth,
    goldivaultWalletInfoWeeth,
    refreshGoldivaultInfoSolvbtc,
    refreshGoldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoSolvbtc,
    refreshGoldivaultInfoUnibtc,
    refreshGoldivaultWalletInfoUnibtc,
    goldivaultWalletInfoUnibtc,
    refreshGoldivaultInfoRusd,
    refreshGoldivaultWalletInfoRusd,
    goldivaultWalletInfoRusd,
    refreshGoldivaultInfoEbtc,
    refreshGoldivaultWalletInfoEbtc,
    goldivaultWalletInfoEbtc,
    activeToggle,
    calculateOTRedeem,
    notification,
    burnPopupToggle,
    setBurnPopupToggle,
    expirePopupToggle,
    setExpirePopupToggle,
    walletInfoLoading,
    redeemYTAmounts,
  } = useGoldivault();

  const { isConnected } = useAccount();

  const loadingElement = () => {
    return <span className="loader-balance mt-1"></span>;
  };

  const formatBalance = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const vaultOT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weot
        : params.vaultToken === "solvbtc"
          ? goldivaultWalletInfoSolvbtc.solvbtcot
          : params.vaultToken === "unibtc"
            ? goldivaultWalletInfoUnibtc.unibtcot
            : params.vaultToken === "rusd"
              ? goldivaultWalletInfoRusd.rusdot
              : params.vaultToken === "ebtc"
                ? goldivaultWalletInfoEbtc.ebtcot
              : {};

  const vaultYT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weyt
        : params.vaultToken === "solvbtc"
          ? goldivaultWalletInfoSolvbtc.solvbtcyt
          : params.vaultToken === "unibtc"
            ? goldivaultWalletInfoUnibtc.unibtcyt
            : params.vaultToken === "rusd"
              ? goldivaultWalletInfoRusd.rusdyt
              : params.vaultToken === "ebtc"
                ? goldivaultWalletInfoEbtc.ebtcyt
              : {};

  const vaultDT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weeth
        : params.vaultToken === "solvbtc"
          ? goldivaultWalletInfoSolvbtc.solvbtc
          : params.vaultToken === "unibtc"
            ? goldivaultWalletInfoUnibtc.unibtc
            : params.vaultToken === "rusd"
              ? goldivaultWalletInfoRusd.rusd
              : params.vaultToken === "ebtc"
                ? goldivaultWalletInfoEbtc.ebtc
              : {};

  useEffect(() => {
    if (params.vaultToken === "weeth") {
      refreshGoldivaultInfoWeeth();
      refreshGoldivaultWalletInfoWeeth();
    } else if (params.vaultToken === "solvbtc") {
      refreshGoldivaultInfoSolvbtc();
      refreshGoldivaultWalletInfoSolvbtc();
    } else if (params.vaultToken === "rusd") {
      refreshGoldivaultInfoRusd();
      refreshGoldivaultWalletInfoRusd();
    } else if (params.vaultToken === "ebtc") {
      refreshGoldivaultInfoEbtc();
      refreshGoldivaultWalletInfoEbtc();
    } else {
      refreshGoldivaultInfoUnibtc();
      refreshGoldivaultWalletInfoUnibtc();
    }
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
      return "Deposit Tokens";
    } else if (activeToggle === "REDEEMOT") {
      return "Redeem Ownership Tokens & Burn Yield Tokens";
    } else {
      return "Redeem Yield Tokens";
    }
  };

  const renderBalance = () => {
    if (activeToggle === "DEPOSIT") {
      return vaultDT;
    } else if (activeToggle === "REDEEMOT") {
      return vaultOT;
    } else {
      return vaultYT;
    }
  };

  const renderBalanceLabel = (): string => {
    if (activeToggle === "DEPOSIT") {
      return params.dt;
    } else if (activeToggle === "REDEEMOT") {
      return params.ot;
    } else {
      return params.yt;
    }
  };

  return (
    <div className="absolute left-[10%] top-[15%] h-[52%] w-[80%] md:left-[15%] md:w-[70%] lg:left-[29%] lg:w-[42%]">
      <div className="relative h-[100%] w-[100%] border-2 border-[#FFCD00] bg-[#995816]">
        <div className="absolute left-0 top-2 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute right-0 top-2 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div
          className={`absolute inset-4 border-2 border-[#FFCD00] bg-[#C8894A]`}
        >
          {txConfirming ? (
            <img
              className="h-[100%] w-[100%]"
              src="/images/bg-transaction.png"
              alt="tx"
            />
          ) : notification.toggle ? (
            <Notification />
          ) : activeToggle === "TRADEOT" || activeToggle === "TRADEYT" ? (
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
          ) : (
            <div className="relative flex h-[100%] w-[100%] flex-col">
              <div className="absolute left-[47.27%] top-[44%] z-10 flex h-10 w-10 items-center justify-center rounded-3xl border-2 border-[#FFCD00] bg-[#033E5E]">
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
                <h1 className="mb-[2.5%] font-baloo text-[2.25vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
                  {renderTopLabel()}
                  {activeToggle === "REDEEMOT" && (
                    <span
                      className="ml-2 cursor-pointer rounded-full border-2 border-white px-2 hover:bg-black"
                      onClick={() => setBurnPopupToggle(!burnPopupToggle)}
                    >
                      ?
                    </span>
                  )}
                  {activeToggle === "REDEEMYT" && (
                    <span
                      className="ml-2 cursor-pointer rounded-full border-2 border-white px-2 hover:bg-black"
                      onClick={() => setExpirePopupToggle(!expirePopupToggle)}
                    >
                      ?
                    </span>
                  )}
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
                    {renderBalanceLabel()}
                  </span>
                </div>
                <h1
                  className="absolute right-0 mt-[2.5%] cursor-pointer font-baloo text-[2.5vw] font-medium text-white hover:scale-110 md:text-[2vw] lg:mt-[1%] lg:text-[1vw]"
                  onClick={() => handleBalanceClick(params.vaultToken)}
                >
                  balance:{" "}
                  {walletInfoLoading
                    ? loadingElement()
                    : formatBalance(renderBalance())}
                </h1>
              </div>
              <div className="h-[50%] w-[100%] border-t-2 border-[#FFCD00] px-[12.5%] py-[3.5%]">
                <div className="mb-[2.5%] flex flex-row justify-between">
                  <h1 className="font-baloo text-[2.25vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
                    {activeToggle === "REDEEMYT"
                      ? "Tokens received"
                      : "Estimated tokens received"}
                  </h1>
                  {activeToggle === "REDEEMOT" && (
                    <h1 className="font-baloo text-[2.5vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
                      Estimated tokens burned
                    </h1>
                  )}
                  {activeToggle === "REDEEMYT" && (
                    <h1 className="font-baloo text-[2.5vw] font-medium text-white md:text-[2vw] lg:text-[1vw]">
                      Estimated value
                    </h1>
                  )}
                </div>
                {activeToggle === "REDEEMYT" ? (
                  <div className="flex h-[50%] w-[100%] flex-row items-center justify-between">
                    <div className="flex h-[100%] w-[42.5%] flex-row items-center justify-around">
                      <div className="flex flex-col items-center">
                        <img
                          className="h-10 w-10"
                          src="/images/logo-ibgt.svg"
                          alt="ibgt"
                        />
                        <span className="mt-[5%] font-baloo text-[1.5vw] font-medium text-white lg:text-[1vw]">
                          iBGT:{" "}
                          {outputTokensLoading
                            ? loadingElement()
                            : redeemYTAmounts.ibgt > 0
                              ? redeemYTAmounts.ibgt.toFixed(4)
                              : redeemYTAmounts.ibgt}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          className="h-10 w-10"
                          src="/images/logo-honey.png"
                          alt="honey"
                        />
                        <span className="mt-[5%] font-baloo text-[1.5vw] font-medium text-white lg:text-[1vw]">
                          Honey:{" "}
                          {outputTokensLoading
                            ? loadingElement()
                            : redeemYTAmounts.honey > 0
                              ? redeemYTAmounts.honey.toFixed(4)
                              : redeemYTAmounts.honey}
                        </span>
                      </div>
                    </div>
                    <div className="flex h-[100%] w-[47.5%] flex-row items-center justify-between border-2 border-black bg-slate-200 px-[3.5%]">
                      <span className="text-nowrap font-baloo text-[3vw] font-bold lg:text-[1.25vw]">
                        {outputTokensLoading
                          ? loadingElement()
                          : redeemYTAmounts.value > 0
                            ? redeemYTAmounts.value.toFixed(4)
                            : redeemYTAmounts.value}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[50%] w-[100%] flex-row items-center justify-between">
                    <div className="flex h-[100%] w-[47.5%] flex-row items-center justify-between border-2 border-black bg-slate-200 px-[3.5%]">
                      <span className="text-nowrap font-baloo text-[3vw] font-bold lg:text-[1.25vw]">
                        {outputTokensLoading
                          ? loadingElement()
                          : formatBalance(otAmount)}
                      </span>
                      <span
                        className={`text-nowrap font-baloo font-bold ${activeToggle === "REDEEMOT" ? "text-[2vw] lg:text-[1vw]" : "text-[2.25vw] lg:text-[1.25vw]"}`}
                      >
                        {activeToggle === "DEPOSIT" ? "OT" : params.dt}
                      </span>
                    </div>
                    <div
                      className={`flex h-[100%] w-[47.5%] flex-row items-center justify-between border-2 border-black ${activeToggle === "REDEEMOT" ? "bg-red-400" : "bg-slate-200"} px-[3.5%]`}
                    >
                      <span className="text-nowrap font-baloo text-[3vw] font-bold lg:text-[1.25vw]">
                        {outputTokensLoading
                          ? loadingElement()
                          : formatBalance(ytAmount)}
                      </span>
                      <span
                        className={`text-nowrap font-baloo font-bold ${activeToggle === "REDEEMOT" ? "text-[2vw] lg:text-[1vw]" : "text-[2.25vw] lg:text-[1.25vw]"}`}
                      >
                        YT
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
