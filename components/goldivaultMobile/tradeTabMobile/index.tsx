"use client";

import { useEffect } from "react";
import { useGoldivault } from "../../../providers";

type TradeTabProps = {
  params: {
    vaultToken: string;
  };
};

export const TradeTabMobile = ({ params }: TradeTabProps) => {
  const {
    displayString,
    handleChange,
    walletInfoLoading,
    activeToggle,
    tradeDirection,
    goldivaultWalletInfoWeeth,
    goldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoUnibtc,
    goldivaultWalletInfoRusd,
    goldivaultWalletInfoEbtc,
    handleBalanceClick,
    outputTokensLoading,
    debouncedTradeInput,
    flipTokens,
    setTradeOutput,
    tradeOutput,
    setOutputTokensLoading,
    quoteV3Swap,
    debouncedSlippage,
    changeSlippageToggle
  } = useGoldivault();

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
    }
    else if (params.vaultToken === "ebtc") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "eBTCOT";
        } else {
          return "eBTC";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "eBTCYT";
        } else {
          return "eBTC";
        }
      }
    }

    return ''
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
    }
    else if (params.vaultToken === "ebtc") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "eBTC";
        } else {
          return "eBTCOT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "eBTC";
        } else {
          return "eBTCYT";
        }
      }
    }

    return ''
  };

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col">
      <div
        className="absolute left-[42.5%] top-[45%] z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl border-2 border-[#FFCD00] bg-[#033E5E]"
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
      <div className="relative mx-auto h-[50%] w-[95%] py-[3.5%]">
        <div className="w-[100%] flex flex-row justify-between">
          <h1 className="font-baloo text-[4vw] font-medium text-white">
            Trade Tokens
          </h1>
          <img
            className="size-5"
            src="/images/icon-settings-mobile.png"
            alt="settings"
            onClick={() => changeSlippageToggle(true)}
          />
        </div>
        <div className="mt-[5%] flex h-[50%] w-[100%] flex-row items-center justify-between border-2 border-black bg-white pl-[3.5%] pr-[1%]">
          <input
            className="h-[100%] w-full border-none bg-transparent font-baloo text-[5.5vw] font-bold focus:outline-none"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={displayString}
            onChange={(e) => handleChange(e.target.value)}
          />
          <span className="text-nowrap font-baloo text-[3.5vw] font-bold">
            {renderTopBalanceLabel()}
          </span>
        </div>
        <h1
          className="absolute right-0 mt-[2.5%] cursor-pointer font-baloo text-[4.5vw] font-medium text-white hover:scale-110"
          onClick={() => handleBalanceClick(params.vaultToken)}
        >
          balance:{" "}
          {walletInfoLoading
            ? loadingElement()
            : formatBalance(renderTopBalance())}
        </h1>
      </div>
      <div className="h-[50%] w-[100%] border-t-2 border-[#FFCD00]">
        <div className="relative mx-auto h-[100%] w-[95%] py-[3.5%]">
          <h1 className="mt-[2.5%] font-baloo text-[4vw] font-medium text-white">
            Estimated tokens received
          </h1>
          <div className="mt-[5%] flex h-[50%] w-[100%] flex-row items-center justify-between border-2 border-black bg-slate-200 pl-[3.5%] pr-[1%]">
            <span className="text-nowrap font-baloo text-[5.5vw] font-bold">
              {outputTokensLoading
                ? loadingElement()
                : formatBalance(tradeOutput)}
            </span>
            <span className="text-nowrap font-baloo text-[3.5vw] font-bold">
              {renderBottomBalanceLabel()}
            </span>
          </div>
          <h1 className="absolute right-0 mt-[2.5%] font-baloo text-[4.5vw] font-medium text-white">
            balance:{" "}
            {walletInfoLoading
              ? loadingElement()
              : formatBalance(renderBottomBalance())}
          </h1>
        </div>
      </div>
    </div>
  );
};
