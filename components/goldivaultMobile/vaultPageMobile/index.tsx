"use client";

import {
  SlippagePopupMobile,
  TogglesMobile,
  VaultBoxMobile,
  VaultButtonMobile,
} from "../";
import { useDesktop, useGoldivault } from "../../../providers";
import { FooterMobile, NavBarButtons, NavBarMobile } from "../../utils";
import { contracts } from "../../../utils/addressi"

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
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.rseth}`,
                  poolName: "rsETH / rsETH OT LP",
                  protocolUrl: "https://www.kelpdao.xyz/",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.rseth}`,
                  liqManagerUrl: "https://app.kodiak.finance/#/liquidity/v3/add/0x4186BFC76E2E237523CBC30FD220FE055156b41F/0xB1195a6cdB7ef8fB22671bd8321727dBB6DDDe03/500?chain=berachain_mainnet&maxPrice=1.005265"
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
              <TogglesMobile
                params={{
                  vaultToken: "rseth"
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
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.ebtc}`,
                  poolName: "eBTC / eBTC OT LP",
                  protocolUrl: "https://app.ether.fi/ebtc",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.ebtc}`,
                  liqManagerUrl: "https://app.kodiak.finance/#/liquidity/v3/add/0x657e8C867D8B37dCC18fA4Caead9C45EB088C642/0x96284cCFd80E546b8239b44f653b4B5Db3f21371/500?chain=berachain_mainnet"
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
              <TogglesMobile
                params={{
                  vaultToken: "ebtc"
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
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.unibtc}`,
                  poolName: "uniBTC / uniBTC OT LP",
                  protocolUrl: "https://app.bedrock.technology/",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.unibtc}`,
                  liqManagerUrl: "https://app.kodiak.finance/#/liquidity/v3/add/0xc3827a4bc8224ee2d116637023b124ced6db6e90/0xe771779b350d2cc291e9461387d7f41765a7cb8b/500?chain=berachain_mainnet&maxPrice=1.012541"
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
              <TogglesMobile
                params={{
                  vaultToken: "unibtc"
                }}
              />
            </>
          ) : address === "usdchoneylp" ? (
            <>
              <h1
                className="absolute left-[43%] top-0 font-amaticbold text-[9vw] text-[#E7B941]"
                id="page-title"
              >
                USDC-HONEY LP
              </h1>
              <VaultBoxMobile
                params={{
                  vaultToken: "usdchoneylp",
                  dt: "USDC-HONEY LP",
                  ot: "UHIOT",
                  yt: "UHIYT",
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.usdchoneylp}`,
                  poolName: "uniBTC / uniBTC OT LP",
                  protocolUrl: "https://infrared.finance/",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.usdchoneylp}`,
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
              <TogglesMobile
                params={{
                  vaultToken: "unibtc"
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
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.solvbtc}`,
                  poolName: "solvBTC.BBN / solvBTC.BBN OT LP",
                  protocolUrl: "https://app.solv.finance/solvbtc?network=ethereum",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.solvbtc}`,
                  liqManagerUrl: "https://app.kodiak.finance/#/liquidity/v3/add/0xCC0966D8418d412c599A6421b760a847eB169A8c/0xA01cB564ecc3F58a4e2bA5fD59d13a6b998de9b8/500?chain=berachain_mainnet&maxPrice=1.013246"
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
              <TogglesMobile
                params={{
                  vaultToken: "solvbtc"
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
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.rusd}`,
                  poolName: "rUSD / rUSD OT LP",
                  protocolUrl: "https://app.reservoir.xyz/",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.rusd}`,
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
              <TogglesMobile
                params={{
                  vaultToken: "rusd"
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
                  poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.weeth}`,
                  poolName: "weETH / weETH OT LP",
                  protocolUrl: "https://app.ether.fi/weeth",
                  dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.weeth}`,
                  liqManagerUrl: "https://app.kodiak.finance/#/liquidity/v3/add/0x7DCC39B4d1C53CB31e1aBc0e358b43987FEF80f7/0x46C7BdE4422b6798A09e76B555F2fea8D7FfADdc/500?chain=berachain_mainnet&maxPrice=1.004768"
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
              <TogglesMobile
                params={{
                  vaultToken: "weeth"
                }}
              />
            </>
          )}
          <FooterMobile />
        </div>
      )}
    </main>
  );
};
