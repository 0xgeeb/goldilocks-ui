"use client";

import { useGoldivault } from "../../../providers";
import { contracts } from "../../../utils/addressi";

type VaultInfoProps = {
  params: {
    vaultToken: string;
    protocolUrl: string;
    dexLink: string;
  };
};

export const VaultInfoMobile = ({ params }: VaultInfoProps) => {
  const {
    infoLoading,
    goldivaultInfoWeeth,
    goldivaultInfoSolvbtc,
    goldivaultInfoUnibtc,
    goldivaultInfoRusd,
    goldivaultInfoEbtc
  } = useGoldivault();

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
              : {
                  endTime: 0,
                  vaultDeposits: 0,
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
              : "";

  const vaultLPaddy =
    params.vaultToken === "rusd"
      ? "0x1a2A927F758AE242fB967481CF293D2a36883be6"
      : params.vaultToken === "weeth"
        ? "0xD26503C0447bEF83e978e7b872cb2d6b9B35262c"
        : params.vaultToken === "ebtc"
          ? "0x339b8859a691eb5c8E8E576E6Caf4c3556711e34"
          : ""

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

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

  return (
    <div className="flex h-[100%] w-[100%] flex-col font-baloo text-[4vw] font-medium">
      <h1 className="mb-[1%] pl-[4%] text-[6.5vw]">Vault Info</h1>
      {infoLoading ? (
        loadingElement()
      ) : (
        <div className="flex h-full w-[100%] flex-col overflow-y-auto">
          <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
            <span className="cursor-pointer hover:text-gray-400">
              Vault Maturity:
            </span>
            <span>
              {formatDate(data.endTime)} ({getRelativeDate(data.endTime)})
            </span>
          </div>
          <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
            <span className="cursor-pointer hover:text-gray-400">
              Fixed APR/Implied Yield:
            </span>
            <span>{formatAsString(data.fixedApr)}%</span>
          </div>
          {params.vaultToken === "weeth" ? (
            <>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Etherfi Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Etherfi Points Leverage:
                </span>
                <span>{formatAsString(data.leverage)}x</span>
              </div>
            </>
          ) : params.vaultToken === "ebtc" ? (
            <>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Babylon Points Leverage:
                </span>
                <span>{formatAsString(data.babylonLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Lombard Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Lombard Points Leverage:
                </span>
                <span>{formatAsString(data.lombardLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Symbiotic Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Symbiotic Points Leverage:
                </span>
                <span>{formatAsString(data.symbioticLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Veda Points Multiplier:
                </span>
                <span>3x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Veda Points Leverage:
                </span>
                <span>{formatAsString(data.vedaLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Karak Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Karak Points Leverage:
                </span>
                <span>{formatAsString(data.karakLeverage)}x</span>
              </div>
            </>
          ) : params.vaultToken === "rseth" ? (
            <>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  KelpDAO Points Multiplier:
                </span>
                <span>2x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  KelpDAO Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  EigenLayer Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  EigenLayer Points Leverage:
                </span>
                <span>69x</span>
              </div>
            </>
          ) : params.vaultToken === "unibtc" ? (
            <>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Bedrock Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Bedrock Points Leverage:
                </span>
                <span>{formatAsString(data.bedrockLeverage)}x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Babylon Points Leverage:
                </span>
                <span>{formatAsString(data.babylonLeverage)}x</span>
              </div>
            </>
          ) : params.vaultToken === "rusd" ? (
            <>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Reservoir Points Multiplier:
                </span>
                <span>2.25x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Reservoir Points Leverage:
                </span>
                <span>{formatAsString(data.reservoirLeverage)}x</span>
              </div>
            </>
          ) : (
            <>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Babylon Points Multiplier:
                </span>
                <span>1x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Babylon Points Leverage:
                </span>
                <span>69x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Solv Points Multiplier:
                </span>
                <span>4x</span>
              </div>
              <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
                <span className="cursor-pointer hover:text-gray-400">
                  Solv Points Leverage:
                </span>
                <span>69x</span>
              </div>
            </>
          )}
          <div className="my-[1%] flex w-[100%] flex-row items-center justify-between bg-[#DEB486] bg-opacity-50 px-[4%]">
            <span>Liquidity:</span>
            <span>${formatAsString(data.otLiquidity)}</span>
          </div>
          {(params.vaultToken === "weeth" || params.vaultToken === "rseth") && (
            <div className="my-[1%] flex w-[100%] flex-row items-center justify-between bg-[#DEB486] bg-opacity-50 px-[4%]">
              <span>Current restaking yield:</span>
              <span>{formatAsString(data.restakingYield)}%</span>
            </div>
          )}
          <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
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
          <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
            <a href={params.dexLink} target="_blank" rel="noreferrer">
              <span className="cursor-pointer hover:opacity-50">
                Link to OT chart
              </span>
            </a>
            <span></span>
          </div>
          <div className="my-[1%] flex w-[100%] flex-row items-center justify-between px-[4%]">
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
