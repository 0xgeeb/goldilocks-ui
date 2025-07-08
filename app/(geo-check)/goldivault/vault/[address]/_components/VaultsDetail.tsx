import { useState } from "react";

import { cn } from "@/app/_components/utils";
import { ClassValue } from "clsx";
import {
  VAULT_DETAIL_CONFIGS,
  VaultDetailKey,
} from "../../../_components/constant/vaultDetailConfigs";

import { useGoldivault, VaultTab } from "@/providers";

import { Notification } from "@/components/goldivault"
import VaultsDetailTabs from "./VaultsDetailTabs";
import VaultDetails from "./VaultInfoPane";
import TxButton from "./TxButton";
import VaultForm from "./VaultForm";

type Props = {
  address: VaultDetailKey;
};

/**
 * Pane-Type: Label
 */

type Label = string;

export const TAB_LABELS:
  Record<
    string,
    {
      label: Label,
      children: { mode: VaultTab, label: Label }[]
    }
  > = {
  "DEPOSIT": {
    "label": "Deposit",
    "children": [
      { mode: "DEPOSIT", label: "Deposit" },
      { mode: "REDEEMOT", label: "Redeem OT" },
    ],
  },
  "TRADE": {
    "label": "Trade",
    "children": [
      { mode: "TRADEOT", label: "Trade OT" },
      { mode: "TRADEYT", label: "Trade YT" },
    ],
  },
  "LIQUIDITY": {
    "label": "Liquidity",
    "children": [
      { mode: "ADDLIQ", label: "Add" },
      { mode: "REMOVELIQ", label: "Remove" },
    ],
  },
  "YIELD": {
    "label": "Yield",
    "children": [
      { mode: "CLAIM", label: "Claim" },
      { mode: "STAKE", label: "Stake" },
      { mode: "UNSTAKE", label: "Unstake" }
    ],
  }
}

function VaultsDetail({ address }: Props) {
  const { notification } = useGoldivault()
  const [activePane, setActivePane] = useState<keyof typeof TAB_LABELS>("DEPOSIT");
  const config = VAULT_DETAIL_CONFIGS[address];
  const { title, params } = config;

  return (
    <>
      <div className="flex flex-col lg:flex-row size-full gap-2.5 rounded-2xl border-2 border-[#352A1C] p-2 bg-bera-brown-dark">
        {/** NAV TABS */}
        <Frame border="xl" className="w-full lg:basis-2/3 flex flex-col gap-2">
          <VaultsDetailTabs currentTab={activePane} setTab={setActivePane} vaultToken={title} />
          {
            notification.toggle ?
            <Notification /> :
            <div className="
              w-full h-full rounded-xl bg-bera-brown flex flex-col gap-3
              justify-center items-center px-20 py-4 max-sm:px-4 
            ">
              
              <div className="flex flex-col items-center justify-between h-full">
                <ModeSelector currentTab={activePane} />
                <VaultForm
                  params={{
                    vaultToken: params.vaultToken,
                    dt: params.dt,
                    ot: params.ot,
                    yt: params.yt,
                  }}
                />
                <TxButton
                  params={{
                    vaultToken: params.vaultToken,
                    dt: params.dt,
                    ot: params.ot,
                    yt: params.yt,
                  }}
                />
              </div>
            </div>
          }
        </Frame>
        {/** INFO PANE */}
        <Frame className="w-full flex flex-row items-center justify-center align-center lg:basis-1/3 p-0">
          <VaultDetails vaultToken={params.vaultToken} />
        </Frame>
      </div>
    </>
  );
}

export default VaultsDetail;

/**
 * A set of mini sub-tabs within each main tab.
 * @param currentTab - The current main tab.
 * @returns 
 */
function ModeSelector({ currentTab }: { currentTab: string }) {
  const { activeToggle, changeActiveToggle } = useGoldivault();

  // console.log("Current Tab>", currentTab);
  // console.log("Active Toggle>", activeToggle);
  const tabs = TAB_LABELS[currentTab].children;

  return (
    <div className="flex flex-row gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          className={cn(
            "transition duration-150 text-md font-baloo font-semibold border-b-2 cursor-pointer hover:scale-105",
            activeToggle === tab.mode ? "text-white border-white" : "text-teak hover:text-white border-[rgba(0,0,0,0)]"
          )}
          onClick={() => changeActiveToggle(tab.mode)}
        >{tab.label}</button>
      ))}
    </div>
  );
};

function Frame({
  children,
  border,
  className,
}: {
  children?: React.ReactNode;
  // If we define a border, define it by radius. If we omit, we don't want a border
  border?: '3xl' | '2xl' | 'xl' | 'lg' | undefined
  className?: ClassValue;
}) {
  return (
    <div
      className={cn(
        `${border ? "rounded-" + border : "border-none"} border-2 border-[#352A1C] p-2`,
        className,
      )}
    >
      {children}
    </div>
  );
}
