"use client";

import { VAULTS } from "@/app/(geo-check)/goldivault/_components/constant/vaults";
import { VaultDisplayCardMobile } from "@/components/goldivaultMobile";

export const VaultDisplayMobile = () => {

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {VAULTS.map(
          ({ address, mouseFlag, tokenName, imageUrl, vaultName }) => (
            <VaultDisplayCardMobile
              key={address}
              // @ts-ignore
              params={{ address, mouseFlag, tokenName, imageUrl, vaultName }}
            />
          ),
        )}
      </div>
    </div>
  );
};
