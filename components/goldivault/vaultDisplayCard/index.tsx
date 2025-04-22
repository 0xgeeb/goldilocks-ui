"use client";

import { formatAsString } from "@/app/_components/utils";

import { useGoldivault } from "../../../providers";

type VaultDisplayCardProps = {
  params: {
    address: string;
    mouseFlag: string;
    tokenName: string;
    imageUrl: string;
    vaultName: string;
  };
};

export const VaultDisplayCard = ({ params }: VaultDisplayCardProps) => {
  const { enableInfoPopup, disableInfoPopup, infoLoading, vaultDisplayInfo } =
    useGoldivault();

  const loadingElement = () => {
    return <span className="loader-small m-auto"></span>;
  };

  const vaultInfo =
    params.tokenName === "weETH"
      ? vaultDisplayInfo.weeth
      : params.tokenName === "rsETH"
        ? vaultDisplayInfo.rseth
        : params.tokenName === "eBTC"
          ? vaultDisplayInfo.ebtc
          : params.tokenName === "uniBTC"
            ? vaultDisplayInfo.unibtc
            : params.tokenName === "SolvBTC.BBN"
              ? vaultDisplayInfo.solvbtc
              : params.tokenName === "rUSD"
                ? vaultDisplayInfo.rusd
                : params.tokenName === "rsETH"
                  ? vaultDisplayInfo.rseth
                  : params.tokenName === "iBGT"
                    ? vaultDisplayInfo.oribgt
                    : {
                        fixedApr: 0,
                        daysTil: "ooga booga",
                        liquidity: 0,
                        ytPrice: 0,
                      };

  return (
    <a
      className="min-h-[302px] w-full p-5 lg:aspect-3/2 lg:p-2"
      href={`/goldivault/vault/${params.address}`}
      onMouseEnter={() => enableInfoPopup(params.mouseFlag)}
      onMouseLeave={() => disableInfoPopup(params.mouseFlag)}
    >
      <div
        className="relative size-full cursor-pointer border-2 border-[#FFCD00] bg-[#9A5816] hover:scale-105"
        id="card-div-shadow"
      >
        <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute right-0 bottom-2 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="font-baloo absolute inset-4 flex flex-col items-center justify-between border-2 border-[#FFCD00] bg-[#C8894A] px-[2.5%] py-[0.5%] font-semibold">
          <div className="flex w-full flex-row items-center justify-between">
            <span className="font-amatic text-[5vw] font-semibold md:text-[3.5vw] lg:text-[3.5vw]">
              {params.tokenName}
            </span>
            <img
              className={`size-[32px] rounded-full border-2 border-[#FFCD00] md:size-[48px] lg:size-[64px]`}
              src={`/images/${params.imageUrl}`}
              alt="token-logo"
            />
          </div>
          {infoLoading ? (
            loadingElement()
          ) : (
            <div className="flex w-[75%] flex-row items-start justify-between text-[1.5vw] lg:w-full lg:flex-col lg:text-[1vw]">
              <span>fixed APR: {formatAsString(vaultInfo.fixedApr)}%</span>
              <span>days until maturity: {vaultInfo.daysTil}</span>
              <span>liquidity: ${formatAsString(vaultInfo.liquidity)}</span>
            </div>
          )}
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-[1.5vw]">{params.vaultName}</span>
          </div>
        </div>
      </div>
    </a>
  );
};
