"use client";

import { useEffect, useRef } from "react";
import { useGoldivault } from "@/providers";
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
    goldivaultWalletInfoWeeth,
    goldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoUnibtc,
    goldivaultWalletInfoRusd,
    goldivaultWalletInfoEbtc,
    goldivaultWalletInfoRseth,
    goldivaultWalletInfoOribgt,
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

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
                  : params.vaultToken === "oribgt"
                    ? goldivaultWalletInfoOribgt.oribgtot
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
                  : params.vaultToken === "oribgt"
                    ? goldivaultWalletInfoOribgt.oribgtyt
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
                  : params.vaultToken === "oribgt"
                    ? goldivaultWalletInfoOribgt.ibgt
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

  const getfour626Bool = (vault: string): boolean => {
    if (vault === "oribgt") {
      return true
    }
    else {
      return false
    }
  }

  useEffect(() => {
    if (debouncedTradeInput > 0) {
      quoteV3Swap(params.vaultToken, getVaultType(params.vaultToken), getfour626Bool(params.vaultToken));
    } else {
      setTradeOutput(0);
      setOutputTokensLoading(false);
    }
  }, [debouncedTradeInput]);

  useEffect(() => {
    if(debouncedTradeInput > 0) {
      quoteV3Swap(params.vaultToken, getVaultType(params.vaultToken), getfour626Bool(params.vaultToken));
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
    else if (params.vaultToken === "rseth") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "rsETHOT";
        } else {
          return "rsETH";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "rsETHYT";
        } else {
          return "rsETH";
        }
      }
    }
    else if (params.vaultToken === "oribgt") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "oriBGT-OT";
        } else {
          return "iBGT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "oriBGT-YT";
        } else {
          return "iBGT";
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
    else if (params.vaultToken === "rseth") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "rsETH";
        } else {
          return "rsETHOT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "rsETH";
        } else {
          return "rsETHYT";
        }
      }
    }
    else if (params.vaultToken === "oribgt") {
      if (activeToggle === "TRADEOT") {
        if (tradeDirection === "OUT") {
          return "iBGT";
        } else {
          return "oriBGT-OT";
        }
      } else {
        if (tradeDirection === "OUT") {
          return "iBGT";
        } else {
          return "oriBGT-YT";
        }
      }
    }

    return ''
  };

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