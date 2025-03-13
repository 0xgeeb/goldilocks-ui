"use client";

import { formatAsString } from "@/app/_components/utils";

import { useGoldivault } from "../../../providers";

type PoolsPopupProps = {
  params: {
    vaultToken: string;
    poolUrl: string;
    poolName: string;
    liqManagerUrl: string;
  };
};

export const PoolsPopup = ({ params }: PoolsPopupProps) => {
  const {
    poolsPopupToggle,
    setPoolsPopupToggle,
    infoLoading,
    goldivaultInfoWeeth,
    goldivaultInfoSolvbtc,
    goldivaultInfoUnibtc,
    goldivaultInfoRusd,
    goldivaultInfoEbtc,
    goldivaultInfoRseth,
    goldivaultInfoUsdchoneylp
  } = useGoldivault();

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

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
                : params.vaultToken === "usdchoneylp"
                  ? goldivaultInfoUsdchoneylp
                  : {};

  return (
    <>
      {poolsPopupToggle && (
        <div className="absolute z-50 size-full bg-black opacity-70"></div>
      )}
      {poolsPopupToggle && (
        <div className="absolute left-[10%] top-[15%] z-50 h-[52%] w-4/5 md:left-[15%] md:w-[70%] lg:left-[29%] lg:w-[42%]">
          <div className="relative size-full">
            <div
              className={`absolute inset-4 border-2 border-[#FFCD00] bg-[#033E5E]`}
            >
              <div className="relative flex size-full flex-col">
                <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[7.5%] py-[3%] font-baloo text-[2.5vw] font-semibold text-[#FFCD00] lg:text-[1.25vw]">
                  <span>LIQUIDITY POOL</span>
                  <span>TVL</span>
                  <span>APR</span>
                </div>
                {infoLoading ? (
                  loadingElement()
                ) : (
                  <>
                    <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[7.5%] py-[3%] font-baloo text-[2.5vw] font-semibold text-[#FFCD00] lg:text-[1.25vw]">
                      <a href={params.poolUrl} target="_blank" rel="noreferrer">
                        <span className="hover:underline">
                          {params.poolName}
                        </span>
                      </a>
                      <span>${formatAsString(data.otLiquidity)}</span>
                      <span>
                        {`>`}
                        {formatAsString(data.fixedApr)}%
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-center px-[7.5%] py-[3%] font-baloo text-[2.5vw] font-semibold text-[#FFCD00] lg:text-[1.25vw]">
                      <a
                        href={params.liqManagerUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="hover:underline">ADD LIQUIDITY</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="absolute right-[5%] top-[3%] z-40 flex h-[6%] w-[15%] cursor-pointer items-center justify-center border-2 border-[#FFCD00] bg-[#033E5E] text-[#FFCD00] hover:border-2 hover:border-[#033E5E] hover:bg-[#FFCD00] hover:text-[#033E5E] lg:right-[9%] lg:top-[6%] lg:h-[7%] lg:w-[10%]"
        onClick={() => setPoolsPopupToggle(!poolsPopupToggle)}
      >
        <span className="font-baloo text-[1.5vw] font-semibold lg:text-[1vw]">
          LIQUIDITY POOL
        </span>
      </div>
    </>
  );
};
