"use client";

import { VaultDisplayCardMobile } from "../";

export const VaultDisplayMobile = () => {
  return (
    <div className="absolute left-[10%] top-[10%] h-[77.5%] w-[80%] tall:top-[10%] tall:h-[77.5%]">
      <div className="relative flex h-[100%] w-[100%] flex-wrap overflow-y-auto">
        {/* <VaultDisplayCardMobile
          params={{
            address: "weeth",
            tokenName: "weETH",
            imageUrl: "weeth-logo.png",
            vaultName: "Etherfi Points Vault",
          }}
        />
        <VaultDisplayCardMobile
          params={{
            address: "ebtc",
            tokenName: "eBTC",
            imageUrl: "ebtc-logo.png",
            vaultName: "EtherFi Points Vault",
          }}
        />
        <VaultDisplayCardMobile
        params={{
          address: "solvbtcbbn",
          tokenName: "SolvBTC.BBN",
          imageUrl: "solvbtc-logo.png",
          vaultName: "Solv Points Vault",
          }}
          /> */}
        <VaultDisplayCardMobile
          params={{
            address: "rusd",
            tokenName: "rUSD",
            imageUrl: "rusd-logo.png",
            vaultName: "Reservoir Points Vault",
          }}
        />
        <VaultDisplayCardMobile
          params={{
            address: "unibtc",
            tokenName: "uniBTC",
            imageUrl: "unibtc-logo.png",
            vaultName: "Bedrock Points Vault",
          }}
        />
        <VaultDisplayCardMobile
          params={{
            address: "rseth",
            tokenName: "rsETH",
            imageUrl: "rseth_logo.png",
            vaultName: "KelpDAO Points Vault",
          }}
        />
        {/* <VaultDisplayCardMobile
          params={{
            address: "oribgt",
            tokenName: "iBGT",
            imageUrl: "logo-ibgt.svg",
            vaultName: "oriBGT Vault",
          }}
        /> */}
      </div>
    </div>
  );
};
