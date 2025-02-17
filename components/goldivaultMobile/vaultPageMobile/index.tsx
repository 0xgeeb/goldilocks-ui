"use client";

import {
  SlippagePopupMobile,
  TogglesMobile,
  VaultBoxMobile,
  VaultButtonMobile,
} from "../";
import { useDesktop, useGoldivault } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";

type PageProps = {
  address: string;
};

export const VaultPageMobile = ({ address }: PageProps) => {
  const { slippage } = useGoldivault();

  const { navButtonsOpen } = useDesktop();

  return (
    <main className="h-screen w-screen">
      <NavBarMobile />
      {navButtonsOpen && <NavBarButtons />}
      {!navButtonsOpen && (
        <div className="relative h-[89%] w-full bg-[url('/images/bg-goldivault-mobile.png')] bg-cover">
          <a
            className="absolute left-[2.5%] top-[7.5%] h-[6%] w-[25%]"
            href="/goldivault/vaults"
          >
            <div className="flex size-full items-center justify-center border-2 border-[#FFCD00] bg-[#542E07]">
              <span className="text-center font-amaticbold text-[6vw] font-medium text-white">
                BACK
              </span>
            </div>
          </a>
          <h1
            className="absolute left-[6%] top-0 font-amaticbold text-[9vw] text-[#D9C6BA]"
            id="page-title"
          >
            Goldivaults -
          </h1>
          {slippage.toggle && <SlippagePopupMobile />}
          {address === "rseth" ? (
            <>
              <h1
                className="absolute left-[43%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
                id="page-title"
              >
                rsETH
              </h1>
              <VaultBoxMobile
                params={{
                  vaultToken: "rseth",
                  dt: "rsETH",
                  ot: "rsETH-OT",
                  yt: "rsETH-YT",
                  poolUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "rsETH / rsETH OT LP",
                  protocolUrl: "https://www.kelpdao.xyz/",
                  dexLink: "https://dexscreener.com/",
                  liqManagerUrl: ""
                }}
              />
              <VaultButtonMobile
                params={{
                  vaultToken: "rseth",
                  dt: "rsETH",
                  ot: "rsETH-OT",
                  yt: "rsETH-YT",
                }}
              />
            </>
          ) : address === "ebtc" ? (
            <>
              <h1
                className="absolute left-[43%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
                id="page-title"
              >
                eBTC
              </h1>
              <VaultBoxMobile
                params={{
                  vaultToken: "ebtc",
                  dt: "eBTC",
                  ot: "eBTC-OT",
                  yt: "eBTC-YT",
                  poolUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "eBTC / eBTC OT LP",
                  protocolUrl: "https://app.ether.fi/ebtc",
                  dexLink: "https://dexscreener.com/",
                  liqManagerUrl: ""
                }}
              />
              <VaultButtonMobile
                params={{
                  vaultToken: "ebtc",
                  dt: "eBTC",
                  ot: "eBTC-OT",
                  yt: "eBTC-YT",
                }}
              />
            </>
          ) : address === "unibtc" ? (
            <>
              <h1
                className="absolute left-[43%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
                id="page-title"
              >
                uniBTC
              </h1>
              <VaultBoxMobile
                params={{
                  vaultToken: "unibtc",
                  dt: "uniBTC",
                  ot: "uniBTC-OT",
                  yt: "uniBTC-YT",
                  poolUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "uniBTC / uniBTC OT LP",
                  protocolUrl: "https://app.bedrock.technology/",
                  dexLink: "https://dexscreener.com/",
                  liqManagerUrl: ""
                }}
              />
              <VaultButtonMobile
                params={{
                  vaultToken: "unibtc",
                  dt: "uniBTC",
                  ot: "uniBTC-OT",
                  yt: "uniBTC-YT",
                }}
              />
            </>
          ) : address === "solvbtcbbn" ? (
            <>
              <h1
                className="absolute left-[43%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
                id="page-title"
              >
                solvBTC.BBN
              </h1>
              <VaultBoxMobile
                params={{
                  vaultToken: "solvbtc",
                  dt: "solvBTC.BBN",
                  ot: "solvBTC.BBN-OT",
                  yt: "solvBTC.BBN-YT",
                  poolUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "solvBTC.BBN / solvBTC.BBN OT LP",
                  protocolUrl:
                    "https://app.solv.finance/solvbtc?network=ethereum",
                  dexLink: "https://dexscreener.com/",
                  liqManagerUrl: ""
                }}
              />
              <VaultButtonMobile
                params={{
                  vaultToken: "solvbtc",
                  dt: "solvBTC.BBN",
                  ot: "solvBTC.BBN-OT",
                  yt: "solvBTC.BBN-YT",
                }}
              />
            </>
          ) : address === "rusd" ? (
            <>
              <h1
                className="absolute left-[43%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
                id="page-title"
              >
                rUSD
              </h1>
              <VaultBoxMobile
                params={{
                  vaultToken: "rusd",
                  dt: "rUSD",
                  ot: "rUSD-OT",
                  yt: "rUSD-YT",
                  poolUrl:
                    "https://berascan.com/address/0x1a2A927F758AE242fB967481CF293D2a36883be6",
                  poolName: "rUSD / rUSD OT LP",
                  protocolUrl: "https://app.reservoir.xyz/",
                  dexLink: "https://dexscreener.com/berachain/0x1a2A927F758AE242fB967481CF293D2a36883be6",
                  liqManagerUrl: "https://app.aquabera.com/vault/0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6"
                }}
              />
              <VaultButtonMobile
                params={{
                  vaultToken: "rusd",
                  dt: "rUSD",
                  ot: "rUSD-OT",
                  yt: "rUSD-YT",
                }}
              />
            </>
          ) : (
            <>
              <h1
                className="absolute left-[43%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
                id="page-title"
              >
                weETH
              </h1>
              <VaultBoxMobile
                params={{
                  vaultToken: "weeth",
                  dt: "weETH",
                  ot: "weETH-OT",
                  yt: "weETH-YT",
                  poolUrl:
                    "https://app.kodiak.finance/#/liquidity/v3/18466?chain=berachain_bartio",
                  poolName: "weETH / weETH OT LP",
                  protocolUrl: "https://app.ether.fi/weeth",
                  dexLink: "https://dexscreener.com/",
                  liqManagerUrl: ""
                }}
              />
              <VaultButtonMobile
                params={{
                  vaultToken: "weeth",
                  dt: "weETH",
                  ot: "weETH-OT",
                  yt: "weETH-YT",
                }}
              />
            </>
          )}
          <TogglesMobile />
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
