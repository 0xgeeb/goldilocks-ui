"use client";
import React, { useEffect } from "react";
import {
  useGoldivault,
  COMMON_LABELS,
  VAULT_LABELS,
  HoverLabel,
} from "../../../../../../providers";
// import { vault_contracts } from "@/data/contracts";
import { VaultType } from "../../../_components/constant/vaults";
import { formatAsString } from "@/app/_components/utils";
import { HoverText } from "./InfoHover";
import { YtRoiCalculator } from "@/components/calculators/YtRoiCalculator";
import { PointsAprCalculator } from "@/components/calculators/PointsAprCalculator";

type InfoRowProps = {
  textA: string;
  textB: string;
  linkB: string;
};
const InfoRow: React.FC<InfoRowProps> = ({ textA, textB, linkB }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <dt className="font-baloo text-warm-text flex items-center text-left text-sm font-semibold">
        {textA}
      </dt>
      <dd className="text-md font-baloo text-HoneyYellow text-right font-semibold">
        <a
          className="mx-1 hover:underline"
          key="steer"
          href={linkB}
          target="_blank"
          rel="noopener noreferrer"
        >
          {textB}
        </a>
      </dd>
    </div>
  );
};

const VaultInfoPane: React.FC<{ vaultToken: string }> = ({ vaultToken }) => {
  const { infoLoading, getVaultInfo, refreshVaultInfo } = useGoldivault();

  useEffect(() => {
    refreshVaultInfo(vaultToken);
  }, []);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month}-${day}-${year}`;
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // convert to milliseconds
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds} UTC`;
  }

  // DYNAMICALLY fetch the vault info based on the vault token
  const data = getVaultInfo(vaultToken);

  // console.log("VAULT TOKEN", vaultToken);
  // console.log("VAULT CONTRACTS", vault_contracts[vaultToken]);
  // const vaultOTaddy = vault_contracts[vaultToken].ot.address;
  // const vaultYTaddy = vault_contracts[vaultToken].yt.address;
  // const vaultLPaddy = vault_contracts[vaultToken].vaultLP;
  // const vaultaddy = vault_contracts[vaultToken].vault.address;

  // console.log("DATA", data);
  // Push data to details array
  const details: Array<{ label: string; value: string; hoverText?: string }> =
    [];
  Object.keys(VAULT_LABELS[vaultToken].goldivaultInfo).forEach((key) => {
    // Depending on type of data (which we know based on the key), format the value.
    const formatData = (key: string, data: number) => {
      switch (key) {
        case "endTime":
          return vaultToken === "oribgt" ? formatDate(data) : formatTime(data);
        case "fixedApr":
          return `${vaultToken === "oribgt" ? formatAsString(data) + "%" : "N/A"}`;
        case "otLiquidity":
          return `$${formatAsString(data)}`;
        case "restakingYield":
          return `${formatAsString(data)}%`;
        default:
          return `${formatAsString(data)}x`;
      }
    };
    if (typeof VAULT_LABELS[vaultToken].goldivaultInfo[key] === "string") {
      details.push({
        label: VAULT_LABELS[vaultToken].goldivaultInfo[key] as string,
        value: formatData(key, data[key]),
      });
    } else {
      // If a hover label exists, we will add an icon next to the label that you can hover.
      details.push({
        label: (VAULT_LABELS[vaultToken].goldivaultInfo[key] as HoverLabel)
          .label,
        value: formatData(key, data[key]),
        hoverText: (VAULT_LABELS[vaultToken].goldivaultInfo[key] as HoverLabel)
          .hoverText,
      });
    }
  });

  // Push links to links array
  const links: Array<{ label: string; link: string }> = [];
  // cast vaultToken to keyof typeof VAULTS, as that's used in COMMON_LABELS for type safety.
  // unfortunately, it's not possible for us to get compelete type safety here, as we cannot
  // change the type of the vaultToken parameter to be a `keyof typeof VAULTS` across the entire
  // codebase.
  Object.keys(COMMON_LABELS(vaultToken as VaultType).contracts).forEach(
    (key) => {
      const contractKey = key as "vault" | "ot" | "yt" | "vaultLP";
      links.push({
        label: COMMON_LABELS(vaultToken as VaultType).contracts[contractKey]
          .label,
        link: COMMON_LABELS(vaultToken as VaultType).contracts[contractKey]
          .link,
      });
    },
  );

  return (
    <aside className="flex h-full w-full max-w-none min-w-80 flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-[rgba(0,0,0,0)] p-5 max-md:w-full sm:max-w-96 lg:max-w-none lg:border-[#352A1C]">
      <h2 className="font-amaticbold text-center text-4xl font-bold text-white">
        Vault Details
      </h2>
      <div className="h-0.5 w-[140px] bg-stone-800" />
      <dl className="flex h-full w-full flex-col items-center gap-3">
        {details.map((detail, index) => (
          <div key={index} className="flex w-full items-center justify-between">
            <dt className="flex items-center text-left text-xs font-semibold text-stone-700">
              {detail.label}
              {detail.hoverText && <HoverText hoverText={detail.hoverText} />}
            </dt>
            <dd className="text-right text-sm font-semibold text-amber-300">
              {infoLoading ? (
                // @todo Improve this. The loading state should be those greyed out pulsing boxes that represent loading values.
                <span className="h-2 w-5 animate-pulse rounded-md bg-stone-700 transition-all"></span>
              ) : (
                detail.value
              )}
            </dd>
          </div>
        ))}
        <div className="flex w-full items-center justify-between">
          <dt className="font-baloo text-warm-text flex items-center text-left text-sm font-semibold">
            Contracts
          </dt>
          <dd className="text-md font-baloo text-HoneyYellow text-right font-semibold">
            {links.map((link, index) => (
              <a
                className="mx-1 hover:underline"
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </dd>
        </div>
        {vaultToken === "oribgt" && (
          <>
            <InfoRow
              textA="Underlying protocol link"
              textB="Origami"
              linkB="https://origami.finance/collections/berachain-collection/80094-0x69f1E971257419B1E9C405A553f252c64A29A30a/info"
            />
            <InfoRow
              textA="Automated Liquidity Manager"
              textB="Steer Protocol"
              linkB="https://app.steer.finance/vault/0xDB78B4166580917c9604f8DdfBea5F49B493845c"
            />
            <InfoRow
              textA="OT chart link"
              textB="Dexscreener"
              linkB="https://dexscreener.com/berachain/0xCb2A95c52E718A6BA6AAb6587f1a3aFF4BfB0648"
            />
          </>
        )}
        {vaultToken === "rusd" && (
          <>
            <InfoRow
              textA="Underlying protocol link"
              textB="Reservoir"
              linkB="https://app.reservoir.xyz/"
            />
            <InfoRow
              textA="Automated Liquidity Manager"
              textB="Aquabera"
              linkB="https://app.aquabera.com/vault/0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"
            />
            <InfoRow
              textA="OT chart link"
              textB="Dexscreener"
              linkB="https://dexscreener.com/berachain/0x1a2A927F758AE242fB967481CF293D2a36883be6"
            />
          </>
        )}
        {vaultToken === "rseth" && (
          <>
            <InfoRow
              textA="Underlying protocol link"
              textB="KelpDAO"
              linkB="https://kerneldao.com/kelp/"
            />
            <InfoRow
              textA="OT chart link"
              textB="Dexscreener"
              linkB="https://dexscreener.com/berachain/0xE457b56a1f9379B604dFBcE809Da6fEA1dECE717"
            />
          </>
        )}
        {vaultToken === "unibtc" && (
          <>
            <InfoRow
              textA="Underlying protocol link"
              textB="Bedrock"
              linkB="https://app.bedrock.technology/"
            />
            <InfoRow
              textA="OT chart link"
              textB="Dexscreener"
              linkB="https://dexscreener.com/berachain/0x54577C10Dee86BE94Daf4706224cf5952D54C191"
            />
          </>
        )}
        {vaultToken === "solvbtc" && (
          <>
            <InfoRow
              textA="Underlying protocol link"
              textB="Solv"
              linkB="https://app.solv.finance/solvbtc?network=bera"
            />
            <InfoRow
              textA="OT chart link"
              textB="Dexscreener"
              linkB="https://dexscreener.com/berachain/0x8F513Fb5C947C20a01Dee083Cdb9250FBe73A6A8"
            />
          </>
        )}
        <div className="flex w-full items-center justify-between">
          <dt className="font-baloo text-warm-text flex items-center text-left text-sm font-semibold">
            Calculators
          </dt>
          <dd className="flex text-md font-semibold font-baloo">
            <YtRoiCalculator currentApr={data.fixedApr} />
            <PointsAprCalculator data={data} vault={vaultToken} />
          </dd>
        </div>
        <div className="flex w-full">
          <dt className="font-baloo text-warm-text flex items-center text-left text-sm font-semibold">
            Fees{" "}
            <HoverText
              hoverText={
                "3% of yield and points and 33% of LP trading fees (0.05%) and 0.5% fee on proceeds from YT trades"
              }
            />
          </dt>
        </div>
      </dl>
    </aside>
  );
};

export default VaultInfoPane;
