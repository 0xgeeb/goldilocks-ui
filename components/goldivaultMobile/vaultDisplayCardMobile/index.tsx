"use client";

import { formatAsString } from "@/app/_components/utils";

import { useGoldivault } from "../../../providers";

type VaultDisplayCardProps = {
  params: {
    address: string;
    tokenName: string;
    imageUrl: string;
    vaultName: string;
  };
};

export const VaultDisplayCardMobile = ({ params }: VaultDisplayCardProps) => {
  const { infoLoading, vaultDisplayInfo } = useGoldivault();

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
                  : {
                      fixedApr: 0,
                      daysTil: "ooga booga",
                      liquidity: 0,
                      ytPrice: 0,
                    };

  return (
    <a
      className="my-2 h-[32%] w-full"
      href={`/goldivault/vault/${params.address}`}
    >
      <div
        className="relative size-full cursor-pointer border-2 border-[#FFCD00] bg-[#9A5816]"
        id="card-div-shadow"
      >
        <div className="absolute left-0 top-1 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 left-0 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute right-0 top-1 w-2 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute bottom-1 right-0 w-2 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
        <div className="absolute inset-2 flex flex-col items-center justify-between border-2 border-[#FFCD00] bg-[#C8894A] p-[2%] font-baloo font-semibold">
          <div className="flex w-full flex-row justify-between">
            <span className="font-amatic text-[8vw] font-semibold tall:text-[10vw]">
              {params.tokenName}
            </span>
            <img
              className="size-10 rounded-full border-2 border-[#FFCD00] tall:size-12"
              src={`/images/${params.imageUrl}`}
              alt="token-logo"
            />
          </div>
          {infoLoading ? (
            loadingElement()
          ) : (
            <div className="flex w-full flex-col items-start justify-between text-[3vw]">
              <span>fixed APR: {formatAsString(vaultInfo.fixedApr)}%</span>
              <span>days until maturity: {vaultInfo.daysTil}</span>
              <span>liquidity: ${formatAsString(vaultInfo.liquidity)}</span>
            </div>
          )}
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-[4vw] tall:text-[5vw]">
              {params.vaultName}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};
