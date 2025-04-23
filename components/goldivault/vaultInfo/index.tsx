"use client";

import {
  formatAsString,
  formatDate,
  getRelativeDate,
} from "@/app/_components/utils";

import { useGoldivault } from "../../../providers";
// import { contracts } from "../../../utils/addressi";
import { vault_contracts } from "@/data/contracts";

type VaultInfoProps = {
  vaultToken: string;
  params: {
    vaultToken: string;
    protocolUrl: string;
    dexLink: string;
  };
};

export const VaultInfo = ({ params }: VaultInfoProps) => {
  const {
    enableInfoPopup,
    disableInfoPopup,
    infoLoading,
    activeToggle,
    getVaultInfo, // @momo We introduce a new helper function to make it easy to grab info without a lot of repetitive switch or if statements
  } = useGoldivault();

  // DYNAMICALLY fetch the vault info based on the vault token
  const data = getVaultInfo(params.vaultToken);

  console.log("VAULT TOKEN", params.vaultToken);
  console.log("VAULT CONTRACTS", vault_contracts[params.vaultToken]);
  const vaultOTaddy = vault_contracts[params.vaultToken].ot.address;
  const vaultYTaddy = vault_contracts[params.vaultToken].yt.address;
  const vaultLPaddy = vault_contracts[params.vaultToken].vaultLP;
  const vaultaddy = vault_contracts[params.vaultToken].vault.address;
  // @momo We also introduce a new vault_contracts object that maps vault tokens to their contract addresses, for the same reasons as above

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${month}-${day}-${year}`;
  };

  const getRelativeDate = (timestamp: number): string => {
    const now = Date.now();
    const diffInMilliseconds = timestamp * 1000 - now;
    const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "today";
    } else if (diffInDays > 0) {
      return `${Math.abs(diffInDays)} day${diffInDays === 1 ? "" : "s"}`;
    } else {
      return `${Math.abs(diffInDays)} day${diffInDays === -1 ? "" : "s"} ago`;
    }
  };

  return (
    <div className="font-baloo flex flex-col text-[0.85vw] font-medium text-white">
      <h1 className="mb-[1%] pl-[4%] text-[1.5vw]">
        Vault Info{" "}
        {activeToggle === "TRADEOT" && (
          <span className="ml-1 text-[1vw]">
            (1 OT = 1 {params.vaultToken} at maturity)
          </span>
        )}
      </h1>
      {infoLoading ? (
        <span className="loading loading-spinner loading-sm text-WarmText m-auto"></span>
      ) : (
        <div className="flex size-full flex-col overflow-y-auto">
          <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup("vaultmaturity")}
              onMouseLeave={() => disableInfoPopup("vaultmaturity")}
            >
              Vault Maturity:
            </span>
            <span>
              {formatDate(data.endTime)} ({getRelativeDate(data.endTime)})
            </span>
          </div>
          <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
            <span
              className="cursor-pointer hover:text-gray-400"
              onMouseEnter={() => enableInfoPopup("fixedaprweeth")}
              onMouseLeave={() => disableInfoPopup("fixedaprweeth")}
            >
              Fixed APR/Implied Yield:
            </span>
            <span>{formatAsString(data.fixedApr)}%</span>
          </div>
          {params.vaultToken === "weeth" ? (
            <>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierweeth")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierweeth")}
                >
                  Etherfi Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Etherfi Points Leverage:
                </span>
                <span>{formatAsString(data.leverage)}x</span>
              </div>
            </>
          ) : params.vaultToken === "ebtc" ? (
            <>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierebtc")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierebtc")}
                >
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Babylon Points Leverage:
                </span>
                <span>{formatAsString(data.babylonLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierebtc")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierebtc")}
                >
                  Lombard Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Lombard Points Leverage:
                </span>
                <span>{formatAsString(data.lombardLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierebtc")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierebtc")}
                >
                  Symbiotic Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Symbiotic Points Leverage:
                </span>
                <span>{formatAsString(data.symbioticLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierebtc")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierebtc")}
                >
                  Veda Points Multiplier:
                </span>
                <span>3x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Veda Points Leverage:
                </span>
                <span>{formatAsString(data.vedaLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierebtc")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierebtc")}
                >
                  Karak Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Karak Points Leverage:
                </span>
                <span>{formatAsString(data.karakLeverage)}x</span>
              </div>
            </>
          ) : params.vaultToken === "rseth" ? (
            <>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierrseth")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierrseth")}
                >
                  KelpDAO Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  KelpDAO Points Leverage:
                </span>
                <span>{formatAsString(data.kelpLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierrseth")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierrseth")}
                >
                  EigenLayer Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  EigenLayer Points Leverage:
                </span>
                <span>{formatAsString(data.eigenLeverage)}x</span>
              </div>
            </>
          ) : params.vaultToken === "unibtc" ? (
            <>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierunibtc")}
                  onMouseLeave={() =>
                    disableInfoPopup("pointsmultiplierunibtc")
                  }
                >
                  Bedrock Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Bedrock Points Leverage:
                </span>
                <span>{formatAsString(data.bedrockLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierunibtc")}
                  onMouseLeave={() =>
                    disableInfoPopup("pointsmultiplierunibtc")
                  }
                >
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Babylon Points Leverage:
                </span>
                <span>{formatAsString(data.babylonLeverage)}x</span>
              </div>
            </>
        /**
         * 
         **/  
        ) : params.vaultToken === "rusd" ? (
            <>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplierrusd")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplierrusd")}
                >
                  Reservoir Points Multiplier:
                </span>
                <span>2.25x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Reservoir Points Leverage:
                </span>
                <span>{formatAsString(data.reservoirLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("lpapr")}
                  onMouseLeave={() => disableInfoPopup("lpapr")}
                >
                  LP APR:
                </span>
                <span>
                  {`>`}
                  {formatAsString(data.fixedApr)}%
                </span>
              </div>
            </>
          ) : params.vaultToken === "solvbtc" ? (
            <>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplier")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplier")}
                >
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Babylon Points Leverage:
                </span>
                <span>{formatAsString(data.babylonLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsmultiplier")}
                  onMouseLeave={() => disableInfoPopup("pointsmultiplier")}
                >
                  Solv Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("pointsleverage")}
                  onMouseLeave={() => disableInfoPopup("pointsleverage")}
                >
                  Solv Points Leverage:
                </span>
                <span>{formatAsString(data.solvLeverage)}x</span>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="my-[1%] flex w-full flex-row items-center justify-between bg-[#DEB486]/50 px-[4%]">
            <span>Liquidity:</span>
            <span>${formatAsString(data.otLiquidity)}</span>
          </div>
          {(params.vaultToken === "weeth" || params.vaultToken === "rseth") && (
            <div className="my-[1%] flex w-full flex-row items-center justify-between bg-[#DEB486]/50 px-[4%]">
              <span>Current restaking yield:</span>
              <span>{formatAsString(data.restakingYield)}%</span>
            </div>
          )}
          <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
            <span>Contract addresses:</span>
            <a
              href={`https://berascan.com/address/${vaultaddy}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="cursor-pointer hover:opacity-50">Vault</span>
            </a>
            <a
              href={`https://berascan.com/address/${vaultOTaddy}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="cursor-pointer hover:opacity-50">OT</span>
            </a>
            <a
              href={`https://berascan.com/address/${vaultYTaddy}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="cursor-pointer hover:opacity-50">YT</span>
            </a>
            <a
              href={`https://berascan.com/address/${vaultLPaddy}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="cursor-pointer hover:opacity-50">LP</span>
            </a>
          </div>
          {params.vaultToken === "rusd" && (
            <>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span>Automated liquidity manager:</span>
                <a
                  href="https://app.aquabera.com/vault/0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="cursor-pointer hover:opacity-50">
                    Aquabera
                  </span>
                </a>
              </div>
              <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
                <span
                  className="cursor-pointer hover:text-gray-400"
                  onMouseEnter={() => enableInfoPopup("fees")}
                  onMouseLeave={() => disableInfoPopup("fees")}
                >
                  Fees
                </span>
                <span></span>
              </div>
            </>
          )}
          <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
            <a href={params.dexLink} target="_blank" rel="noreferrer">
              <span className="cursor-pointer hover:opacity-50">
                Link to OT chart
              </span>
            </a>
            <span></span>
          </div>
          <div className="my-[1%] flex w-full flex-row items-center justify-between px-[4%]">
            <a href={params.protocolUrl} target="_blank" rel="noreferrer">
              <span className="cursor-pointer hover:opacity-50">
                Link to underlying protocol
              </span>
            </a>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};