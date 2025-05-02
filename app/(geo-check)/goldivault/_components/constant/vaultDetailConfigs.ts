import { contracts } from "@/utils/addressi";

export const VAULT_DETAIL_CONFIGS = {
  rseth: {
    title: "rsETH",
    titleSize: "text-[8vw] md:text-[7vw] lg:text-[6vw]",
    params: {
      vaultToken: "rseth",
      dt: "rsETH",
      ot: "rsETH-OT",
      yt: "rsETH-YT",
      protocolUrl: "https://www.kelpdao.xyz/",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.rseth}`,
      poolName: "rsETH / rsETH OT LP",
      liqManagerUrl:
        "https://app.kodiak.finance/#/liquidity/v3/add/0x4186BFC76E2E237523CBC30FD220FE055156b41F/0xB1195a6cdB7ef8fB22671bd8321727dBB6DDDe03/500?chain=berachain_mainnet&maxPrice=1.005265",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.rseth}`,
    },
  },
  ebtc: {
    title: "eBTC",
    titleSize: "text-[8vw] md:text-[7vw] lg:text-[6vw]",
    params: {
      vaultToken: "ebtc",
      dt: "eBTC",
      ot: "eBTC-OT",
      yt: "eBTC-YT",
      protocolUrl: "https://app.ether.fi/ebtc",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.ebtc}`,
      poolName: "eBTC / eBTC OT LP",
      liqManagerUrl:
        "https://app.kodiak.finance/#/liquidity/v3/add/0x657e8C867D8B37dCC18fA4Caead9C45EB088C642/0x96284cCFd80E546b8239b44f653b4B5Db3f21371/500?chain=berachain_mainnet",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.ebtc}`,
    },
  },
  weeth: {
    title: "weETH",
    titleSize: "text-[8vw] md:text-[7vw] lg:text-[6vw]",
    params: {
      vaultToken: "weeth",
      dt: "weETH",
      ot: "weETH-OT",
      yt: "weETH-YT",
      protocolUrl: "https://app.ether.fi/weeth",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.weeth}`,
      poolName: "weETH / weETH OT LP",
      liqManagerUrl:
        "https://app.kodiak.finance/#/liquidity/v3/add/0x5D8a5599D781CC50A234D73ac94F4da62c001D8B/0xE021C1dA35a6d93D79C4a432E6E96c8667dB8959/500?chain=berachain_mainnet",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.weeth}`,
    },
  },
  oribgt: {
    title: "oriBGT",
    titleSize: "text-[8vw] md:text-[7vw] lg:text-[6vw]",
    params: {
      vaultToken: "oribgt",
      dt: "iBGT",
      ot: "oriBGT-OT",
      yt: "oriBGT-YT",
      protocolUrl: "https://origami.finance/",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.oribgt}`,
      poolName: "iBGT LP / oriBGT-OT LP",
      liqManagerUrl:
        "https://app.kodiak.finance/#/liquidity/v3/add/0x0EF5A21Aa086DF1c29fbe0B34aE32A8676D935E7/0x0d1E753a25fEa614826607726EE4BF69407F4119/500?chain=berachain_mainnet",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.oribgt}`,
    },
  },
  unibtc: {
    title: "uniBTC",
    titleSize: "text-[8vw] md:text-[7vw] lg:text-[6vw]",
    params: {
      vaultToken: "unibtc",
      dt: "uniBTC",
      ot: "uniBTC-OT",
      yt: "uniBTC-YT",
      protocolUrl: "https://app.bedrock.technology/",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.unibtc}`,
      poolName: "uniBTC / uniBTC OT LP",
      liqManagerUrl:
        "https://app.kodiak.finance/#/liquidity/v3/add/0xc3827a4bc8224ee2d116637023b124ced6db6e90/0xe771779b350d2cc291e9461387d7f41765a7cb8b/500?chain=berachain_mainnet&maxPrice=1.012541",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.unibtc}`,
    },
  },
  solvbtc: {
    title: "solvBTC.BBN",
    titleSize: "text-[7.5vw] md:text-[6.5vw] lg:text-[5.5vw]",
    params: {
      vaultToken: "solvbtc",
      dt: "solvBTC.BBN",
      ot: "solvBTC.BBN-OT",
      yt: "solvBTC.BBN-YT",
      protocolUrl: "https://app.solv.finance/solvbtc?network=ethereum",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.solvbtc}`,
      poolName: "solvBTC.BBN / solvBTC.BBN OT LP",
      liqManagerUrl:
        "https://app.kodiak.finance/#/liquidity/v3/add/0xCC0966D8418d412c599A6421b760a847eB169A8c/0xA01cB564ecc3F58a4e2bA5fD59d13a6b998de9b8/500?chain=berachain_mainnet&maxPrice=1.013246",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.solvbtc}`,
    },
  },
  rusd: {
    title: "rUSD",
    titleSize: "text-[8vw] md:text-[7vw] lg:text-[6vw]",
    params: {
      vaultToken: "rusd",
      dt: "rUSD",
      ot: "rUSD-OT",
      yt: "rUSD-YT",
      protocolUrl: "https://app.reservoir.xyz/",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.rusd}`,
      poolName: "rUSD / rUSD OT LP",
      liqManagerUrl: "",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.rusd}`,
    },
  },
} as const;

export type VaultDetailKey = keyof typeof VAULT_DETAIL_CONFIGS;
