"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { InfoDisplayPopup } from "../";
import { useDesktop, useGoldivault } from "../../../providers";
// import { GoldivaultPageMobile } from "../../goldivaultMobile";
import { Loading, TAndCs } from "../../utils";
import { VAULTS } from "@/app/(geo-check)/goldivault/_components/constant/vaults";
import { VaultDisplayCard } from "../vaultDisplayCard";


export const GoldivaultPage = () => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    wutPopup,
    setWutPopup,
    infoPopupToggle,
    setInfoPopupToggle,
    refreshVaultDisplayInfo,
  } = useGoldivault();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

  useEffect(() => {
    refreshVaultDisplayInfo();
    setPageLoading(false);
  }, []);

  const handlePopups = () => {
    if (wutPopup) {
      setWutPopup(false);
    }
    if (infoPopupToggle) {
      setInfoPopupToggle(false);
    }
  };

  if (pageLoading) {
    return (
      <Loading />
    )
  }

  if (isDesktop && signed !== "TRUE") {
    return (
      <TAndCs />
    )
  }

  const MATURE_ADDRESSES = ["rusd", "solvbtc", "unibtc", "rseth", "oribgt"];
  const MATURE_VAULTS = VAULTS.filter(vault => MATURE_ADDRESSES.includes(vault.address));
  const LIVE_VAULTS = VAULTS.filter(vault => !MATURE_ADDRESSES.includes(vault.address));

  return (
    <CsrPageLayout
      onPageClick={() => handlePopups()}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldivault-2.png"
    >
      {infoPopupToggle && <InfoDisplayPopup />}
      <div className="w-full px-8 md:px-20 py-6 md:py-10">
        <div
          style={{
            backdropFilter: "blur(18px)",
            backgroundColor: "rgba(26,20,12, 0.75)",
          }}
          className=" flex flex-col gap-3 rounded-3xl p-6 ">
          <div className="flex flex-row items-center gap-3">
            <h1
              id="page-title"
              className="text-HoneyYellow font-amaticbold text-6xl"
            >
              Goldivaults
            </h1>
            <img src="/images/icons/box.svg" alt="box" />
          </div>
          <div className="text-WarmText h-9 text-lg mb-6 sm:mb-0">
            Ooga booga. Money printer go brrrrr haha.
          </div>
          <div className="flex flex-row items-center gap-3 mx-auto mt-4">
            <h1
              id="page-title"
              className="text-HoneyYellow font-amaticbold text-4xl"
            >
              Live Vaults
            </h1>
          </div>
          <div className="w-full relative flex flex-wrap gap-6">
            {LIVE_VAULTS.map(
              ({ address, mouseFlag, tokenName, imageUrl, vaultName }) => (
                <VaultDisplayCard
                  key={address}
                  params={{ address, mouseFlag, tokenName, imageUrl, vaultName }}
                />
              )
            )}
          </div>
          <div className="flex flex-row items-center gap-3 mx-auto mt-4">
            <h1
              id="page-title"
              className="text-HoneyYellow font-amaticbold text-4xl"
            >
              Matured Vaults
            </h1>
          </div>
          <div className="w-full relative flex flex-wrap gap-6">
            {MATURE_VAULTS.map(
              ({ address, mouseFlag, tokenName, imageUrl, vaultName }) => (
                <VaultDisplayCard
                  key={address}
                  params={{ address, mouseFlag, tokenName, imageUrl, vaultName }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </CsrPageLayout>
  )
};
