"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useGoldivault } from "../../../providers";
import {
  TradeTabMobile,
  NotificationMobile,
  VaultInfoMobile,
  LiqManagerTabMobile,
  PoolsPopupMobile
} from "..";

type VaultBoxProps = {
  params: {
    vaultToken: string;
    dt: string;
    ot: string;
    yt: string;
    poolUrl: string;
    poolName: string;
    protocolUrl: string;
    dexLink: string;
    liqManagerUrl: string;
  };
};

export const VaultBoxMobile = ({ params }: VaultBoxProps) => {

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
    refreshGoldivaultInfoRseth,
    refreshGoldivaultWalletInfoRseth,
    goldivaultWalletInfoRseth,
    refreshGoldivaultInfoUsdchoneylp,
    refreshGoldivaultWalletInfoUsdchoneylp,
    goldivaultWalletInfoUsdchoneylp,
    activeToggle,
    calculateOTRedeem,
    notification,
    walletInfoLoading,
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
                : params.vaultToken === "rseth"
                  ? goldivaultWalletInfoRseth.rsethot
                  : params.vaultToken === "usdchoneylp"
                    ? goldivaultWalletInfoUsdchoneylp.usdchoneylpot
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
                : params.vaultToken === "rseth"
                  ? goldivaultWalletInfoRseth.rsethyt
                  : params.vaultToken === "usdchoneylp"
                    ? goldivaultWalletInfoUsdchoneylp.usdchoneylpyt
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
                : params.vaultToken === "rseth"
                  ? goldivaultWalletInfoRseth.rseth
                  : params.vaultToken === "usdchoneylp"
                    ? goldivaultWalletInfoUsdchoneylp.usdchoneylp
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
    } else if (params.vaultToken === "rseth") {
      refreshGoldivaultInfoRseth()
      refreshGoldivaultWalletInfoRseth()
    } else if (params.vaultToken === "usdchoneylp") {
      refreshGoldivaultInfoUsdchoneylp()
      refreshGoldivaultWalletInfoUsdchoneylp()
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
    <div className="absolute left-[5%] top-[15%] h-[57.5%] w-[90%]">
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
            <NotificationMobile />
          ) : activeToggle === "TRADEOT" || activeToggle === "TRADEYT" ? (
            <TradeTabMobile
              params={{
                vaultToken: params.vaultToken,
              }}
            />
          ) : activeToggle === "INFO" ? (
            <VaultInfoMobile
              params={{
                vaultToken: params.vaultToken,
                protocolUrl: params.protocolUrl,
                dexLink: params.dexLink,
              }}
            />
          ) : activeToggle === "ADDLIQ" || activeToggle === "REMOVELIQ" ? (
            <LiqManagerTabMobile
              params={{
                vaultToken: params.vaultToken,
              }}
            />
          ) : activeToggle === "POOLS" ? (
            <PoolsPopupMobile
              params={{
                vaultToken: params.vaultToken,
                poolUrl: params.poolUrl,
                poolName: params.poolName,
                liqManagerUrl: params.liqManagerUrl
              }}
            />
          ) : (
            <div className="relative flex h-[100%] w-[100%] flex-col">
              <div className="absolute left-[42.5%] top-[45%] z-10 flex h-10 w-10 items-center justify-center rounded-3xl border-2 border-[#FFCD00] bg-[#033E5E]">
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
              <div className="relative mx-auto h-[50%] w-[95%] py-[3.5%]">
                <h1 className="font-baloo text-[4vw] font-medium text-white">
                  {renderTopLabel()}
                </h1>
                <div className="mt-[5%] flex h-[50%] w-[100%] flex-row items-center justify-between border-2 border-black bg-white pl-[3.5%] pr-[1%]">
                  <input
                    className="h-[100%] w-full border-none bg-transparent font-baloo text-[5.5vw] font-bold focus:outline-hidden"
                    type="number"
                    id="number-input"
                    placeholder="0.00"
                    value={displayString}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  <span className="text-nowrap font-baloo text-[3.5vw] font-bold">
                    {renderBalanceLabel()}
                  </span>
                </div>
                <h1
                  className="absolute right-0 mt-[2.5%] font-baloo text-[4.5vw] font-medium text-white"
                  onClick={() => handleBalanceClick(params.vaultToken)}
                >
                  balance:{" "}
                  {walletInfoLoading
                    ? loadingElement()
                    : formatBalance(renderBalance())}
                </h1>
              </div>
              <div className="h-[50%] w-[100%] border-t-2 border-[#FFCD00] p-[3.5%]">
                <div className="mt-[2.5%] flex flex-row justify-between">
                  <h1
                    className={`${activeToggle === "REDEEMOT" ? "text-[3vw]" : "text-[4vw]"} font-baloo font-medium text-white`}
                  >
                    Estimated tokens received
                  </h1>
                  {activeToggle === "REDEEMOT" && (
                    <h1 className="font-baloo text-[3vw] font-medium text-white">
                      Estimated tokens burned
                    </h1>
                  )}
                </div>
                <div className="mt-[5%] flex h-[50%] w-[100%] flex-row items-center justify-between">
                  <div className="flex h-[100%] w-[47.5%] flex-row items-center justify-between border-2 border-black bg-slate-200 px-[1%]">
                    <span className="text-nowrap font-baloo text-[4.5vw] font-bold">
                      {outputTokensLoading
                        ? loadingElement()
                        : formatBalance(otAmount)}
                    </span>
                    <span
                      className={`text-nowrap font-baloo font-bold ${activeToggle === "REDEEMOT" ? "text-[3.5vw]" : "text-[4vw]"}`}
                    >
                      {activeToggle === "DEPOSIT" ? "OT" : params.dt}
                    </span>
                  </div>
                  <div
                    className={`flex h-[100%] w-[47.5%] flex-row items-center justify-between border-2 border-black ${activeToggle === "REDEEMOT" ? "bg-red-400" : "bg-slate-200"} px-[3.5%]`}
                  >
                    <span className="text-nowrap font-baloo text-[4.5vw] font-bold">
                      {outputTokensLoading
                        ? loadingElement()
                        : ytAmount > 0
                          ? ytAmount.toFixed(4)
                          : ytAmount}
                    </span>
                    <span
                      className={`text-nowrap font-baloo font-bold ${activeToggle === "REDEEMOT" ? "text-[3.5vw]" : "text-[4vw]"}`}
                    >
                      YT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
