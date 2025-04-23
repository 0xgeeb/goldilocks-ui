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

export const VaultDisplayCardMobile = ({ params }: VaultDisplayCardProps) => {
  const { infoLoading, vaultDisplayInfo } = useGoldivault();

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

  function Divider() {
    return <hr className="w-full border-1 border-[#352A1C]" />;
  }

  function VaultInfoItem({ label, value }: { label: string; value: string }) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-WarmText text-base">{label}</div>
        <div className="text-HoneyYellow text-lg">{value}</div>
      </div>
    );
  }
  
  return (
    <a
      className="block w-full"
      href={`/goldivault/vault/${params.address}`}
    >
      <div
        className="rounded-xl5 w-full cursor-pointer rounded-xl border-2 border-[#352A1C] bg-[#1A140C] p-2 transition-all duration-300 ease-in-out hover:scale-[1.03]"
        id="card-div-shadow"
      >
        <div className="font-baloo flex flex-col items-center justify-between gap-2 rounded-xl border-2 border-[#352A1C] p-4 font-semibold text-white">
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <span className="font-amatic text-3xl font-semibold">
              {params.tokenName}
            </span>
            <img
              className="size-[40px] rounded-full border-2 border-[#FFCD00]"
              src={`/images/${params.imageUrl}`}
              alt="token-logo"
            />
          </div>
          <Divider />
          {infoLoading ? (
            <span className="loading loading-spinner loading-sm text-WarmText m-auto"></span>
          ) : (
            <div className="flex flex-col items-center gap-2 p-2">
              <VaultInfoItem
                label="Fixed APR"
                value={`${formatAsString(vaultInfo.fixedApr)}%`}
              />
              <VaultInfoItem
                label="days until maturity"
                value={vaultInfo.daysTil}
              />
              <VaultInfoItem
                label="liquidity"
                value={`$${formatAsString(vaultInfo.liquidity)}`}
              />
            </div>
          )}
          <Divider />
          <div className="text-WarmText text-sm">{params.vaultName}</div>
        </div>
      </div>
    </a>
  );
};
