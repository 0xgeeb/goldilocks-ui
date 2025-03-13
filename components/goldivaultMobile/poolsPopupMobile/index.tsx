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

export const PoolsPopupMobile = ({ params }: PoolsPopupProps) => {
  const {
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
    <div className="relative flex size-full flex-col bg-[#033E5E]">
      <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[2.5%] py-[3%] font-baloo text-[3vw] font-semibold text-[#FFCD00]">
        <span>LIQUIDITY POOL</span>
        <span>TVL</span>
        <span>APR</span>
      </div>
      {infoLoading ? (
        loadingElement()
      ) : (
        <>
          <div className="flex flex-row items-center justify-between border-b-2 border-[#FFCD00] px-[2.5%] py-[3%] font-baloo text-[3vw] font-semibold text-[#FFCD00]">
            <a href={params.poolUrl} target="_blank" rel="noreferrer">
              <span className="hover:underline">{params.poolName}</span>
            </a>
            <span>${formatAsString(data.otLiquidity)}</span>
            <span>
              {`>`}
              {formatAsString(data.fixedApr)}%
            </span>
          </div>
          <div className="flex flex-row items-center justify-center px-[2.5%] py-[3%] font-baloo text-[3vw] font-semibold text-[#FFCD00]">
            <a href={params.liqManagerUrl} target="_blank" rel="noreferrer">
              <span className="hover:underline">ADD LIQUIDITY</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};
