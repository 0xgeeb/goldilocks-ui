"use client";

import { useRouter } from "next/navigation";

import { formatAsCurrency, formatAsPercent } from "@/app/_components/utils";

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

function Divider() {
  return <hr className="w-[140px] border-1 border-[#352A1C]" />;
}

function VaultInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-WarmText text-lg">{label}</div>
      <div className="text-HoneyYellow text-2xl">{value || <>&nbsp;</>}</div>
    </div>
  );
}
export const VaultDisplayCard = ({ params }: VaultDisplayCardProps) => {
  const { enableInfoPopup, disableInfoPopup, infoLoading, vaultDisplayInfo } =
    useGoldivault();

  const vaultInfo = (() => {
    switch (params.tokenName) {
      case "weETH":
        return vaultDisplayInfo.weeth;
      case "rsETH":
        return vaultDisplayInfo.rseth;
      case "eBTC":
        return vaultDisplayInfo.ebtc;
      case "uniBTC":
        return vaultDisplayInfo.unibtc;
      case "SolvBTC.BBN":
        return vaultDisplayInfo.solvbtc;
      case "rUSD":
        return vaultDisplayInfo.rusd;
      case "oriBGT":
        return vaultDisplayInfo.oribgt;
      default:
        return {
          fixedApr: 0,
          daysTil: "ooga booga",
          liquidity: 0,
          ytPrice: 0,
        };
    }
  })();

  const router = useRouter();

  return (
    <a
      className="block h-full mx-auto min-w-[300px] sm:min-w-[360px]"
      onClick={() => router.push(`/goldivault/vault/${params.address}`)}
      onMouseEnter={() => enableInfoPopup(params.mouseFlag)}
      onMouseLeave={() => disableInfoPopup(params.mouseFlag)}
    >
      <div
        className="rounded-xl5 size-full cursor-pointer rounded-2xl border-2 border-bera-brown-border bg-bera-brown-dark p-2 transition-all duration-300 ease-in-out hover:scale-[1.03]"
        id="card-div-shadow"
      >
        <div className="font-baloo flex h-full flex-col items-center justify-between gap-2.5 rounded-xl border-2 border-bera-brown-border p-6 font-semibold text-white">
          <div className="flex w-full flex-row items-center justify-center gap-3">
            <span className="font-amatic text-4xl font-semibold">
              {params.tokenName}
            </span>
            <img
              className="size-[48px] rounded-full border-2 border-[#FFCD00]"
              src={`/images/${params.imageUrl}`}
              alt="token-logo"
            />
          </div>
          <Divider />
          {infoLoading ? (
            <span className="loading loading-spinner loading-sm text-WarmText m-auto"></span>
          ) : (
            <div className="flex flex-col items-center gap-3 p-2.5">
              <VaultInfoItem
                label="Fixed APR"
                value={`${params.tokenName === "oriBGT" ? formatAsPercent(vaultInfo.fixedApr / 100) : "N/A"}`}
              />
              <VaultInfoItem
                label="days until maturity"
                value={vaultInfo.daysTil}
              />
              <VaultInfoItem
                label="liquidity"
                value={`${formatAsCurrency(vaultInfo.liquidity) || ""}`}
              />
            </div>
          )}
          <Divider />
          <div className="text-WarmText text-base">{params.vaultName}</div>
        </div>
      </div>
    </a>
  );
};
