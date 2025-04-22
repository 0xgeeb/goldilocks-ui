"use client";

import { useEffect, useState } from "react";

import { formatAsString } from "@/app/_components/utils";

import { useGoldivault } from "../../../providers";
import { contracts } from "../../../utils/addressi";

type VaultInfoProps = {
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
    goldivaultInfoWeeth,
    goldivaultInfoSolvbtc,
    goldivaultInfoUnibtc,
    goldivaultInfoRusd,
    goldivaultInfoEbtc,
    goldivaultInfoRseth,
    goldivaultInfoOribgt,
    activeToggle,
  } = useGoldivault();

  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  function updateDimensions() {
    if (window.innerWidth > 1279) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }

  const data =
    params.vaultToken === "weeth"
      ? goldivaultInfoWeeth
      : params.vaultToken === "unibtc"
        ? goldivaultInfoUnibtc
        : params.vaultToken === "solvbtc"
          ? goldivaultInfoSolvbtc
          : params.vaultToken === "rusd"
            ? goldivaultInfoRusd
            : params.vaultToken === "ebtc"
              ? goldivaultInfoEbtc
              : params.vaultToken === "rseth"
                ? goldivaultInfoRseth
                : params.vaultToken === "oribgt"
                  ? goldivaultInfoOribgt
                  : {
                      endTime: 0,
                      fixedApr: 0,
                      impliedYield: 0,
                      leverage: 0,
                      otLiquidity: 0,
                      durationRatio: 0,
                      restakingYield: 0,
                    };

  const vaultOTaddy =
    params.vaultToken === "weeth"
      ? contracts.weot.address
      : params.vaultToken === "solvbtc"
        ? contracts.solvbtcot.address
        : params.vaultToken === "unibtc"
          ? contracts.unibtcot.address
          : params.vaultToken === "rusd"
            ? contracts.rusdot.address
            : params.vaultToken === "ebtc"
              ? contracts.ebtcot.address
              : params.vaultToken === "rseth"
                ? contracts.rsethot.address
                : params.vaultToken === "oribgt"
                  ? contracts.oribgtot.address
                  : "";

  const vaultYTaddy =
    params.vaultToken === "weeth"
      ? contracts.weyt.address
      : params.vaultToken === "solvbtc"
        ? contracts.solvbtcyt.address
        : params.vaultToken === "unibtc"
          ? contracts.unibtcyt.address
          : params.vaultToken === "rusd"
            ? contracts.rusdyt.address
            : params.vaultToken === "ebtc"
              ? contracts.ebtcyt.address
              : params.vaultToken === "rseth"
                ? contracts.rsethyt.address
                : params.vaultToken === "oribgt"
                  ? contracts.oribgtyt.address
                  : "";

  const vaultaddy =
    params.vaultToken === "weeth"
      ? contracts.weethVault.address
      : params.vaultToken === "solvbtc"
        ? contracts.solvbtcVault.address
        : params.vaultToken === "unibtc"
          ? contracts.unibtcVault.address
          : params.vaultToken === "rusd"
            ? contracts.rusdVault.address
            : params.vaultToken === "ebtc"
              ? contracts.ebtcVault.address
              : params.vaultToken === "rseth"
                ? contracts.rsethVault.address
                : params.vaultToken === "oribgt"
                  ? contracts.oribgtVault.address
                  : "";

  const vaultLPaddy =
    params.vaultToken === "rusd"
      ? contracts.vaultLPaddys.rusd
      : params.vaultToken === "weeth"
        ? contracts.vaultLPaddys.weeth
        : params.vaultToken === "ebtc"
          ? contracts.vaultLPaddys.ebtc
          : params.vaultToken === "rseth"
            ? contracts.vaultLPaddys.rseth
            : params.vaultToken === "unibtc"
              ? contracts.vaultLPaddys.unibtc
              : params.vaultToken === "solvbtc"
                ? contracts.vaultLPaddys.solvbtc
                : params.vaultToken === "oribgt"
                  ? contracts.vaultLPaddys.oribgt
                  : "";

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
    <div
      className={`${showInfo ? "" : "hidden"} absolute left-[71%] top-[18%] flex h-[47%] w-1/5 flex-col border-y-2 border-r-2 border-black bg-[#D5A774]/30 pt-[0.75%] font-baloo text-[0.85vw] font-medium text-white`}
    >
      <h1 className="mb-[1%] pl-[4%] text-[1.5vw]">
        Vault Info{" "}
        {activeToggle === "TRADEOT" && (
          <span className="ml-1 text-[1vw]">
            (1 OT = 1 {params.vaultToken} at maturity)
          </span>
        )}
      </h1>
      {infoLoading ? (
        loadingElement()
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
          ) :  params.vaultToken === "solvbtc" ? (
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
            <>
            </>
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

{
  /* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('otlpapr')}
    onMouseLeave={() => disableInfoPopup('otlpapr')}
  >
    LP APR
  </span>
  <span>~%</span>
</div> */
}
{
  /* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('tvlweeth')}
    onMouseLeave={() => disableInfoPopup('tvlweeth')}
  >
    Vault TVL
  </span>
  <span>${formatAsString(goldivaultInfoWeeth.vaultDeposits)}</span>
</div> */
}
{
  /* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('impliedyieldweeth')}
    onMouseLeave={() => disableInfoPopup('impliedyieldweeth')}
  >
    Implied Yield
  </span>
  <span>{formatAsString(goldivaultInfoWeeth.impliedYield)}%</span>
</div> */
}
{
  /* <div className="w-[100%] flex flex-row items-center justify-between px-[4%] my-[1%]">
  <span
    className="cursor-pointer hover:text-gray-400"
    onMouseEnter={() => enableInfoPopup('pointsperyt')}
    onMouseLeave={() => disableInfoPopup('pointsperyt')}
  >
    Etherfi points per YT
  </span>
  <span>~x</span>
</div> */
}
