"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import { notFound } from "next/navigation";

import {
  VAULT_DETAIL_CONFIGS,
  VaultDetailKey,
} from "@/app/(geo-check)/goldivault/_components/constant/vaultDetailConfigs";
import { VAULTS } from "@/app/(geo-check)/goldivault/_components/constant/vaults";
import VaultsCardLayout from "@/app/(geo-check)/goldivault/_components/VaultsCardLayout";
import VaultsDetail from "@/app/(geo-check)/goldivault/vault/[address]/_components/VaultsDetail";
import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import { InfoPopup, SlippagePopup, BuyOTPopup, SellOTPopup, YtChart } from "../";
import { useGoldivault } from "../../../providers";
import { Loading, TAndCs } from "../../utils";

type Props = {
  params: {
    address: string;
  };
};

export const VaultPage = ({ params }: Props) => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    poolsPopupToggle,
    setPoolsPopupToggle,
    wutPopup,
    setWutPopup,
    infoPopupToggle,
    setInfoPopupToggle,
    checkSlippageAmount,
    slippage,
    changeSlippageToggle,
    buyOtPopup,
    sellOtPopup,
    getChartData,
    getAssetPrice
  } = useGoldivault();

  const signed = useAtomValue(geoAtom);

  useEffect(() => {
    checkSlippageAmount();
    getChartData(params.address);
    getAssetPrice(params.address)
    setPageLoading(false);
  }, []);

  if (
    params.address !== "rseth" &&
    params.address !== "unibtc" &&
    params.address !== "rusd" &&
    params.address !== "oribgt" &&
    params.address !== "solvbtc"
  ) {
    notFound();
  }

  const insidePools = (e: any): boolean => {
    let slipLeft;
    let slipRight;
    let slipUp;
    let slipDown;

    if (window.innerWidth < 768) {
      slipLeft = 0.1;
      slipRight = 0.9;
      slipUp = 0.26;
      slipDown = 0.78;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      slipLeft = 0.15;
      slipRight = 0.85;
      slipUp = 0.26;
      slipDown = 0.78;
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      slipLeft = 0.29;
      slipRight = 0.71;
      slipUp = 0.26;
      slipDown = 0.78;
    } else {
      slipLeft = 0.29;
      slipRight = 0.71;
      slipUp = 0.3;
      slipDown = 0.82;
    }

    if (
      e.clientX > window.innerWidth * slipLeft &&
      e.clientX < window.innerWidth * slipRight &&
      e.clientY > window.innerHeight * slipUp &&
      e.clientY < window.innerHeight * slipDown
    ) {
      return true;
    } else {
      return false;
    }
  };

  const insideSlippage = (e: any): boolean => {
    let slipLeft
    let slipRight
    let slipUp
    let slipDown

    if (window.innerWidth > 1024) {
      slipLeft = 0.35;
      slipRight = 0.7;
      slipUp = 0.26;
      slipDown = 0.54;
    } else {
      slipLeft = 0.22;
      slipRight = 0.925;
      slipUp = 0.165;
      slipDown = 0.5;
    }

    if (
      e.clientX > window.innerWidth * slipLeft &&
      e.clientX < window.innerWidth * slipRight &&
      e.clientY > window.innerHeight * slipUp &&
      e.clientY < window.innerHeight * slipDown
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handlePopups = (e: any) => {
    if (slippage.toggle && !insideSlippage(e)) {
      changeSlippageToggle(false);
    }
    if (poolsPopupToggle && !insidePools(e)) {
      setPoolsPopupToggle(false);
    }
    if (wutPopup) {
      setWutPopup(false);
    }
    if (infoPopupToggle) {
      setInfoPopupToggle(false);
    }
  };

  if (pageLoading) {
    return <Loading />;
  }

  if (signed !== "TRUE") {
    return <TAndCs />;
  }

  return (
    <CsrPageLayout
      onPageClick={(e) => handlePopups(e)}
      wutPopup={wutPopup}
      setWutPopup={setWutPopup}
      bgImageUrl="/images/bg-goldivault-2.png"
        // maskBg={`linear-gradient(#1D160DE5, #1D160DE5)`}
      >
        <VaultsCardLayout
          title={`${VAULT_DETAIL_CONFIGS[params.address as VaultDetailKey].title} Vault`}
          icon={
            <img
              className="size-[64px] rounded-full border-2 border-[#FFCD00]"
              src={`/images/${VAULTS.find((vault) => vault.address === params.address)?.imageUrl}`}
              alt={params.address}
            />
          }
        >
          {infoPopupToggle && <InfoPopup />}
          {slippage.toggle && <SlippagePopup />}
          {buyOtPopup && <BuyOTPopup />}
          {sellOtPopup && <SellOTPopup />}
        <VaultsDetail address={params.address as VaultDetailKey} />
      </VaultsCardLayout>
      <YtChart token={params.address} />
    </CsrPageLayout>
  );
};
