"use client";

import { VaultDisplayCard } from "../";

export const VaultDisplay = () => {
  return (
    <div className="absolute left-[7.5%] top-[20%] h-[65%] w-[85%] p-2 lg:top-[29%] lg:h-[55%]">
      <div className="relative grid size-full grid-cols-1 flex-wrap gap-6 overflow-y-auto pb-16 [mask-image:linear-gradient(to_bottom,black_calc(100%-6rem),transparent)] lg:grid-cols-3">
        {/* <VaultDisplayCard
          params={{
            address: "weeth",
            mouseFlag: "weethvaultinfo",
            tokenName: "weETH",
            imageUrl: "weeth-logo.png",
            vaultName: "Etherfi Points Vault",
          }}
        />
        <VaultDisplayCard
          params={{
            address: "ebtc",
            mouseFlag: "ebtcvaultinfo",
            tokenName: "eBTC",
            imageUrl: "ebtc-logo.png",
            vaultName: "EtherFi Points Vault",
          }}
        /> */}
        {/* <VaultDisplayCard
          params={{
            address: "rseth",
            mouseFlag: "rsethvaultinfo",
            tokenName: "rsETH",
            imageUrl: "rseth_logo.png",
            vaultName: "KelpDAO Points Vault",
          }}
        />
        <VaultDisplayCard
          params={{
            address: "unibtc",
            mouseFlag: "unibtcvaultinfo",
            tokenName: "uniBTC",
            imageUrl: "unibtc-logo.png",
            vaultName: "Bedrock Points Vault",
          }}
        />
        <VaultDisplayCard
          params={{
            address: "solvbtcbbn",
            mouseFlag: "solvbtcvaultinfo",
            tokenName: "SolvBTC.BBN",
            imageUrl: "solvbtc-logo.png",
            vaultName: "Solv Points Vault",
          }}
        /> */}
        <VaultDisplayCard
          params={{
            address: "rusd",
            mouseFlag: "rusdvaultinfo",
            tokenName: "rUSD",
            imageUrl: "rusd-logo.png",
            vaultName: "Reservoir Points Vault",
          }}
        />
      </div>
    </div>
  );
};
