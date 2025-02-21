"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";
import { notFound } from "next/navigation";

import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import {
  BurnPopup,
  ExpirePopup,
  InfoPopup,
  PoolsPopup,
  SlippagePopup,
  Toggles,
  VaultBox,
  VaultButton,
  VaultInfo,
} from "../";
import { useDesktop, useGeo, useGoldivault } from "../../../providers";
import { VaultPageMobile } from "../../goldivaultMobile";
import { Loading, TAndCs } from "../../utils";

type Props = {
  params: {
    address: string;
  };
};

export const VaultPage = ({ params }: Props) => {
  const [pageLoading, setPageLoading] = useAtom(pageLoadingAtom);

  const {
    burnPopupToggle,
    setBurnPopupToggle,
    poolsPopupToggle,
    setPoolsPopupToggle,
    wutPopup,
    setWutPopup,
    expirePopupToggle,
    setExpirePopupToggle,
    infoPopupToggle,
    setInfoPopupToggle,
    checkSlippageAmount,
    slippage,
    changeSlippageToggle,
  } = useGoldivault();

  const { isDesktop } = useDesktop();

  const { signed } = useGeo();

  useEffect(() => {
    checkSlippageAmount();
    setPageLoading(false);
  }, []);

  if (
    params.address !== "weeth" &&
    params.address !== "rseth" &&
    params.address !== "ebtc" &&
    params.address !== "unibtc" &&
    params.address !== "solvbtcbbn" &&
    params.address !== "rusd"
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
    let slipLeft = 0.45;
    let slipRight = 0.64;
    let slipUp = 0.32;
    let slipDown = 0.54;

    if (window.innerWidth > 1024) {
      slipLeft = 0.45;
      slipRight = 0.64;
      slipUp = 0.32;
      slipDown = 0.54;
    } else {
      slipLeft = 0.33;
      slipRight = 0.7;
      slipUp = 0.33;
      slipDown = 0.53;
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
    if (burnPopupToggle) {
      setBurnPopupToggle(false);
    }
    if (wutPopup) {
      setWutPopup(false);
    }
    if (expirePopupToggle) {
      setExpirePopupToggle(false);
    }
    if (infoPopupToggle) {
      setInfoPopupToggle(false);
    }
  };

  return pageLoading ? (
    <Loading />
  ) : isDesktop ? (
    signed !== "TRUE" ? (
      <TAndCs />
    ) : (
      <CsrPageLayout
        onPageClick={(e) => handlePopups(e)}
        wutPopup={wutPopup}
        setWutPopup={setWutPopup}
        bgImageUrl="/images/bg-goldivault.png"
      >
        <>
          <a
            className="absolute right-[80%] top-[3%] h-[6%] w-[15%] lg:right-[77%] lg:top-[15%] lg:h-[7.5%] lg:w-[12.5%]"
            href="/goldivault/vaults"
          >
            <div className="flex size-full cursor-pointer items-center justify-center border-2 border-[#FFCD00] bg-[#542E07] hover:scale-110">
              <span className="text-center font-baloo text-[1.5vw] font-semibold text-white lg:text-[0.9vw]">
                BACK TO VAULTS
              </span>
            </div>
          </a>
          {burnPopupToggle && <BurnPopup />}
          {expirePopupToggle && <ExpirePopup />}
          {infoPopupToggle && <InfoPopup />}
          <h1
            className="absolute right-[45%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:right-[47.5%] md:top-0 md:text-[7vw] lg:right-[78.5%] lg:top-[42%] lg:text-[6vw]"
            id="page-title"
          >
            VAULT
          </h1>
          <Toggles />
          {slippage.toggle && <SlippagePopup />}
          {
            params.address === "rseth" ? (
              <>
                <h1
                  className="absolute right-[60%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:top-0 md:text-[7vw] lg:right-[78.25%] lg:top-1/4 lg:text-[6vw]"
                  id="page-title"
                >
                  rsETH
                </h1>
                <VaultBox
                  params={{
                    vaultToken: "rseth",
                    dt: "rsETH",
                    ot: "rsETH-OT",
                    yt: "rsETH-YT",
                  }}
                />
                <VaultButton
                  params={{
                    vaultToken: "rseth",
                    dt: "rsETH",
                    ot: "rsETH-OT",
                    yt: "rsETH-YT",
                  }}
                />
                <VaultInfo
                  params={{
                    vaultToken: "rseth",
                    protocolUrl: "https://www.kelpdao.xyz/",
                    dexLink: "https://dexscreener.com/",
                  }}
                />
                <PoolsPopup
                  params={{
                    vaultToken: "rseth",
                    poolUrl:
                      "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                    poolName: "rsETH / rsETH OT LP",
                    liqManagerUrl: ""
                  }}
                />
              </>
            ) : params.address === "ebtc" ? (
              <>
                <h1
                  className="absolute right-[60%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:top-0 md:text-[7vw] lg:right-[78.25%] lg:top-1/4 lg:text-[6vw]"
                  id="page-title"
                >
                  eBTC
                </h1>
                <VaultBox
                  params={{
                    vaultToken: "ebtc",
                    dt: "eBTC",
                    ot: "eBTC-OT",
                    yt: "eBTC-YT",
                  }}
                />
                <VaultButton
                  params={{
                    vaultToken: "ebtc",
                    dt: "eBTC",
                    ot: "eBTC-OT",
                    yt: "eBTC-YT",
                  }}
                />
                <VaultInfo
                  params={{
                    vaultToken: "ebtc",
                    protocolUrl: "https://app.ether.fi/ebtc",
                    dexLink: "https://dexscreener.com/",
                  }}
                />
                <PoolsPopup
                  params={{
                    vaultToken: "ebtc",
                    poolUrl:
                      "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                    poolName: "eBTC / eBTC OT LP",
                    liqManagerUrl: ""
                  }}
                />
              </>
            ) : params.address === "unibtc" ? (
              <>
                <h1
                  className="absolute right-[60%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:top-0 md:text-[7vw] lg:right-[78.25%] lg:top-1/4 lg:text-[6vw]"
                  id="page-title"
                >
                  uniBTC
                </h1>
                <VaultBox
                  params={{
                    vaultToken: "unibtc",
                    dt: "uniBTC",
                    ot: "uniBTC-OT",
                    yt: "uniBTC-YT",
                  }}
                />
                <VaultButton
                  params={{
                    vaultToken: "unibtc",
                    dt: "uniBTC",
                    ot: "uniBTC-OT",
                    yt: "uniBTC-YT",
                  }}
                />
                <VaultInfo
                  params={{
                    vaultToken: "unibtc",
                    protocolUrl: "https://app.bedrock.technology/",
                    dexLink: "https://dexscreener.com/",
                  }}
                />
                <PoolsPopup
                  params={{
                    vaultToken: "unibtc",
                    poolUrl:
                      "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                    poolName: "uniBTC / uniBTC OT LP",
                    liqManagerUrl: ""
                  }}
                />
              </>
            ) : params.address === "solvbtcbbn" ? (
              <>
                <h1
                  className="absolute right-[60%] top-[1%] font-amaticbold text-[7.5vw] font-medium text-[#FFCD00] md:top-0 md:text-[6.5vw] lg:right-[78.25%] lg:top-1/4 lg:text-[5.5vw]"
                  id="page-title"
                >
                  solvBTC.BBN
                </h1>
                <VaultBox
                  params={{
                    vaultToken: "solvbtc",
                    dt: "solvBTC.BBN",
                    ot: "solvBTC.BBN-OT",
                    yt: "solvBTC.BBN-YT",
                  }}
                />
                <VaultButton
                  params={{
                    vaultToken: "solvbtc",
                    dt: "solvBTC.BBN",
                    ot: "solvBTC.BBN-OT",
                    yt: "solvBTC.BBN-YT",
                  }}
                />
                <VaultInfo
                  params={{
                    vaultToken: "solvbtc",
                    protocolUrl:
                      "https://app.solv.finance/solvbtc?network=ethereum",
                    dexLink: "https://dexscreener.com/",
                  }}
                />
                <PoolsPopup
                  params={{
                    vaultToken: "solvbtc",
                    poolUrl:
                      "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                    poolName: "solvBTC.BBN / solvBTC.BBN OT LP",
                    liqManagerUrl: ""
                  }}
                />
              </>
            ) : params.address === "rusd" ? (
              <>
                <h1
                  className="absolute right-[60%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:top-0 md:text-[7vw] lg:right-[78.25%] lg:top-1/4 lg:text-[6vw]"
                  id="page-title"
                >
                  rUSD
                </h1>
                <VaultBox
                  params={{
                    vaultToken: "rusd",
                    dt: "rUSD",
                    ot: "rUSD-OT",
                    yt: "rUSD-YT",
                  }}
                />
                <VaultButton
                  params={{
                    vaultToken: "rusd",
                    dt: "rUSD",
                    ot: "rUSD-OT",
                    yt: "rUSD-YT",
                  }}
                />
                <VaultInfo
                  params={{
                    vaultToken: "rusd",
                    protocolUrl: "https://app.reservoir.xyz/",
                    dexLink: "https://dexscreener.com/berachain/0x1a2A927F758AE242fB967481CF293D2a36883be6",
                  }}
                />
                {/* <PoolsPopup
                  params={{
                    vaultToken: "rusd",
                    poolUrl:
                      "https://berascan.com/address/0x1a2A927F758AE242fB967481CF293D2a36883be6",
                    poolName: "rUSD / rUSD OT LP",
                    liqManagerUrl: "https://app.aquabera.com/vault/0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"
                  }}
                /> */}
              </>
            ) : (
              <>
                <h1
                  className="absolute right-[60%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:top-0 md:text-[7vw] lg:right-[78.25%] lg:top-1/4 lg:text-[6vw]"
                  id="page-title"
                >
                  weETH
                </h1>
                <VaultBox
                  params={{
                    vaultToken: "weeth",
                    dt: "weETH",
                    ot: "weETH-OT",
                    yt: "weETH-YT",
                  }}
                />
                <VaultButton
                  params={{
                    vaultToken: "weeth",
                    dt: "weETH",
                    ot: "weETH-OT",
                    yt: "weETH-YT",
                  }}
                />
                <VaultInfo
                  params={{
                    vaultToken: "weeth",
                    protocolUrl: "https://app.ether.fi/weeth",
                    dexLink: "https://dexscreener.com/",
                  }}
                />
                <PoolsPopup
                  params={{
                    vaultToken: "weeth",
                    poolUrl:
                      "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                    poolName: "weETH / weETH OT LP",
                    liqManagerUrl: ""
                  }}
                />
              </>
            )
          }
        </>
      </CsrPageLayout>
    )
  ) : (
    <VaultPageMobile address={params.address} />
  );
};
