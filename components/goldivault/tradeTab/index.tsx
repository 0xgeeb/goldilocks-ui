"use client";

import { useEffect } from "react";
import { useGoldivault } from "../../../providers";

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
    goldivaultWalletInfoWeeth,
    goldivaultWalletInfoBhoney,
    goldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoUnibtc,
    goldivaultWalletInfoRusd,
    handleBalanceClick,
    outputTokensLoading,
    debouncedTradeInput,
    flipTokens,
    setTradeOutput,
    tradeOutput,
    setOutputTokensLoading,
    quoteV3Swap,
    changeSlippageToggle,
    priceImpact,
    impliedApr,
    enableInfoPopup,
    disableInfoPopup,
    debouncedSlippage
  } = useGoldivault();

  const vaultOT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weot
      : params.vaultToken === "bhoney"
        ? goldivaultWalletInfoBhoney.bhot
        : params.vaultToken === "solvbtc"
          ? goldivaultWalletInfoSolvbtc.solvbtcot
          : params.vaultToken === "unibtc"
            ? goldivaultWalletInfoUnibtc.unibtcot
            : params.vaultToken === "rusd"
              ? goldivaultWalletInfoRusd.rusdot
              : {};

  const vaultYT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weyt
      : params.vaultToken === "bhoney"
        ? goldivaultWalletInfoBhoney.bhyt
        : params.vaultToken === "solvbtc"
          ? goldivaultWalletInfoSolvbtc.solvbtcyt
          : params.vaultToken === "unibtc"
            ? goldivaultWalletInfoUnibtc.unibtcyt
            : params.vaultToken === "rusd"
              ? goldivaultWalletInfoRusd.rusdyt
              : {};

  const vaultDT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weeth
      : params.vaultToken === "bhoney"
        ? goldivaultWalletInfoBhoney.honey
        : params.vaultToken === "solvbtc"
          ? goldivaultWalletInfoSolvbtc.solvbtc
          : params.vaultToken === "unibtc"
            ? goldivaultWalletInfoUnibtc.unibtc
            : params.vaultToken === "rusd"
              ? goldivaultWalletInfoRusd.rusd
              : {};

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
      quoteV3Swap(params.vaultToken, getVaultType(params.vaultToken));
    } else {
      setTradeOutput(0);
      setOutputTokensLoading(false);
    }
  }, [debouncedTradeInput]);

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      quoteV3Swap(params.vaultToken, getVaultType(params.vaultToken))
    }
    else {
      setTradeOutput(0)
      setOutputTokensLoading(false)
    }
  }, [debouncedSlippage])

  const renderTopBalance = () => {
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        return vaultOT;
      } else {
        return vaultDT;
      }
    } else {
      if (tradeDirection === "OUT") {
        return vaultYT;
      } else {
        return vaultDT;
      }
    }
  };

  const renderBottomBalance = () => {
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        return vaultDT;
      } else {
        return vaultOT;
      }
    } else {
      if (tradeDirection === "OUT") {
        return vaultDT;
      } else {
        return vaultYT;
      }
    }
  };

  const renderTopBalanceLabel = (): string => {
    if (params.vaultToken === "weeth") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "WEOT";
        } else {
          return "weETH";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "WEYT";
        } else {
          return "weETH";
        }
      }
    } else if (params.vaultToken === "solvbtc") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "solvBTCOT";
        } else {
          return "solvBTC";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "solvBTCYT";
        } else {
          return "solvBTC";
        }
      }
    } else if (params.vaultToken === "unibtc") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "uniBTCOT";
        } else {
          return "uniBTC";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "uniBTCYT";
        } else {
          return "uniBTC";
        }
      }
    } else if (params.vaultToken === "rusd") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "rUSDOT";
        } else {
          return "rUSD";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "rUSDYT";
        } else {
          return "rUSD";
        }
      }
    } else {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "BHOT";
        } else {
          return "honey";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "BHYT";
        } else {
          return "honey";
        }
      }
    }
  };

  const renderBottomBalanceLabel = (): string => {
    if (params.vaultToken === "weeth") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "weETH";
        } else {
          return "WEOT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "weETH";
        } else {
          return "WEYT";
        }
      }
    } else if (params.vaultToken === "solvbtc") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "solvBTC";
        } else {
          return "solvBTCOT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "solvBTC";
        } else {
          return "solvBTCYT";
        }
      }
    } else if (params.vaultToken === "unibtc") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "uniBTC";
        } else {
          return "uniBTCOT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "uniBTC";
        } else {
          return "uniBTCYT";
        }
      }
    } else if (params.vaultToken === "rusd") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "rUSD";
        } else {
          return "rUSDOT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "rUSD";
        } else {
          return "rUSDYT";
        }
      }
    } else {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "honey";
        } else {
          return "BHOT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "honey";
        } else {
          return "BHYT";
        }
      }
    }
  };

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col">
      <img
        className="absolute left-[89%] top-[16%] h-6 w-6 cursor-pointer hover:scale-125 lg:left-[87.5%] lg:top-[5%] lg:h-7 lg:w-7"
        src="/images/icon-settings.png"
        alt="settings"
        onClick={() => changeSlippageToggle(true)}
      />
      <div
        className="absolute left-[47.27%] top-[44%] z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl border-2 border-[#FFCD00] bg-[#033E5E] hover:scale-[140%]"
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
          Trade Tokens
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
          onClick={() => handleBalanceClick(params.vaultToken)}
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
      {tradeOutput > 0 && (
        <div className="absolute bottom-0 left-[1%] z-50 flex flex-col font-baloo text-[1.5vw] font-medium text-white lg:text-[0.8vw]">
          <span
            className="cursor-pointer hover:text-gray-400"
            onMouseEnter={() => enableInfoPopup("impliedapr")}
            onMouseLeave={() => disableInfoPopup("impliedapr")}
          >
            implied apr: {formatBalance(impliedApr)}%
          </span>
          <span>predicted price impact: {formatBalance(priceImpact)}%</span>
        </div>
      )}
    </div>
  );
};
