"use client";

import { useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import { notFound } from "next/navigation";

import { geoAtom } from "@/app/_components/atoms/geoAtom";
import { pageLoadingAtom } from "@/app/_components/atoms/pageLoadingAtom";
import CsrPageLayout from "@/app/_components/CsrPageLayout";

import {
  InfoPopup,
  PoolsPopup,
  SlippagePopup,
  Toggles,
  VaultBox,
  VaultButton,
  VaultInfo,
} from "../";
import { useDesktop, useGoldivault } from "../../../providers";
import { contracts } from "../../../utils/addressi";
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
    poolsPopupToggle,
    setPoolsPopupToggle,
    wutPopup,
    setWutPopup,
    infoPopupToggle,
    setInfoPopupToggle,
    checkSlippageAmount,
    slippage,
    changeSlippageToggle,
  } = useGoldivault();

  const { isDesktop } = useDesktop();

  const signed = useAtomValue(geoAtom);

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
    params.address !== "rusd" &&
    params.address !== "usdchoneylp"
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
    if (wutPopup) {
      setWutPopup(false);
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
          {infoPopupToggle && <InfoPopup />}
          <h1
            className="absolute right-[45%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:right-[47.5%] md:top-0 md:text-[7vw] lg:right-[78.5%] lg:top-[42%] lg:text-[6vw]"
            id="page-title"
          >
            VAULT
          </h1>
          {slippage.toggle && <SlippagePopup />}
          {params.address === "rseth" ? (
            <>
              <h1
                className="absolute right-[60%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:top-0 md:text-[7vw] lg:right-[78.25%] lg:top-1/4 lg:text-[6vw]"
                id="page-title"
              >
                rsETH
              </h1>
              <Toggles
                params={{
                  vaultToken: "rseth",
                }}
              />
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
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.rseth}`,
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "rseth",
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.rseth}`,
                  poolName: "rsETH / rsETH OT LP",
                  liqManagerUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/add/0x4186BFC76E2E237523CBC30FD220FE055156b41F/0xB1195a6cdB7ef8fB22671bd8321727dBB6DDDe03/500?chain=berachain_mainnet&maxPrice=1.005265",
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
              <Toggles
                params={{
                  vaultToken: "ebtc",
                }}
              />
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
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.ebtc}`,
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "ebtc",
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.ebtc}`,
                  poolName: "eBTC / eBTC OT LP",
                  liqManagerUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/add/0x657e8C867D8B37dCC18fA4Caead9C45EB088C642/0x96284cCFd80E546b8239b44f653b4B5Db3f21371/500?chain=berachain_mainnet",
                }}
              />
            </>
          ) : params.address === "usdchoneylp" ? (
            <>
              <h1
                className="absolute right-[60%] top-[1%] font-amaticbold text-[8vw] font-medium text-[#FFCD00] md:top-0 md:text-[7vw] lg:right-[78.25%] lg:top-1/4 lg:text-[6vw]"
                id="page-title"
              >
                USDC-HONEY LP
              </h1>
              <Toggles
                params={{
                  vaultToken: "usdchoneylp",
                }}
              />
              <VaultBox
                params={{
                  vaultToken: "usdchoneylp",
                  dt: "USDC-HONEY LP",
                  ot: "UHIOT",
                  yt: "UHIYT",
                }}
              />
              <VaultButton
                params={{
                  vaultToken: "usdchoneylp",
                  dt: "USDC-HONEY LP",
                  ot: "UHIOT",
                  yt: "UHIYT",
                }}
              />
              <VaultInfo
                params={{
                  vaultToken: "usdchoneylp",
                  protocolUrl: "https://infrared.finance/",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.usdchoneylp}`,
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "usdchoneylp",
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.usdchoneylp}`,
                  poolName: "USDC-HONEY LP / UHIOT LP",
                  liqManagerUrl:
                    "",
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
              <Toggles
                params={{
                  vaultToken: "unibtc",
                }}
              />
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
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.unibtc}`,
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "unibtc",
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.unibtc}`,
                  poolName: "uniBTC / uniBTC OT LP",
                  liqManagerUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/add/0xc3827a4bc8224ee2d116637023b124ced6db6e90/0xe771779b350d2cc291e9461387d7f41765a7cb8b/500?chain=berachain_mainnet&maxPrice=1.012541",
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
              <Toggles
                params={{
                  vaultToken: "solvbtc",
                }}
              />
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
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.solvbtc}`,
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "solvbtc",
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.solvbtc}`,
                  poolName: "solvBTC.BBN / solvBTC.BBN OT LP",
                  liqManagerUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/add/0xCC0966D8418d412c599A6421b760a847eB169A8c/0xA01cB564ecc3F58a4e2bA5fD59d13a6b998de9b8/500?chain=berachain_mainnet&maxPrice=1.013246",
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
              <Toggles
                params={{
                  vaultToken: "rusd",
                }}
              />
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
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.rusd}`,
                }}
              />
              {/* <PoolsPopup
                  params={{
                    vaultToken: "rusd",
                    poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.rusd}`,
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
              <Toggles
                params={{
                  vaultToken: "weeth",
                }}
              />
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
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.weeth}`,
                }}
              />
              <PoolsPopup
                params={{
                  vaultToken: "weeth",
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.weeth}`,
                  poolName: "weETH / weETH OT LP",
                  liqManagerUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/add/0x7DCC39B4d1C53CB31e1aBc0e358b43987FEF80f7/0x46C7BdE4422b6798A09e76B555F2fea8D7FfADdc/500?chain=berachain_mainnet&maxPrice=1.004768",
                }}
              />
            </>
          )}
        </>
      </CsrPageLayout>
    )
  ) : (
    <VaultPageMobile address={params.address} />
  );
};
