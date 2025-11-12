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
  janoribgt: {
    title: "oriBGT",
    titleSize: "text-[8vw] md:text-[7vw] lg:text-[6vw]",
    params: {
      vaultToken: "janoribgt",
      dt: "iBGT",
      ot: "janoriBGT-OT",
      yt: "janoriBGT-YT",
      protocolUrl: "https://origami.finance/",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.janoribgt}`,
      poolName: "iBGT LP / oriBGT-OT LP",
      liqManagerUrl:
        "https://app.kodiak.finance/#/liquidity/v3/add/0x0EF5A21Aa086DF1c29fbe0B34aE32A8676D935E7/0x0d1E753a25fEa614826607726EE4BF69407F4119/500?chain=berachain_mainnet",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.janoribgt}`,
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
  stlbgt: {
    title: "LBGT",
    titleSize: "text-[7.5vw] md:text-[6.5vw] lg:text-[5.5vw]",
    params: {
      vaultToken: "stlbgt",
      dt: "LBGT",
      ot: "stLBGT-OT",
      yt: "stLBGT-YT",
      protocolUrl: "https://www.berapaw.com/",
      dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.stlbgt}`,
      poolName: "stLBGT / stLBGT-OT",
      liqManagerUrl: "",
      poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.stlbgt}`,
    }
  },
  // ybgt: {
  //   title: "yBGT",
  //   titleSize: "text-[7.5vw] md:text-[6.5vw] lg:text-[5.5vw]",
  //   params: {
  //     vaultToken: "ybgt",
  //     dt: "yBGT",
  //     ot: "yBGT-OT",
  //     yt: "yBGT-YT",
  //     protocolUrl: "https://bearn.sucks/",
  //     dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.ybgt}`,
  //     poolName: "styBGT / yBGT-OT",
  //     liqManagerUrl: "",
  //     poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.ybgt}`,
  //   }
  // },
  // wberaibgtlp: {
  //   title: "WBERA-iBGT LP",
  //   titleSize: "text-[7.5vw] md:text-[6.5vw] lg:text-[5.5vw]",
  //   params: {
  //     vaultToken: "wberaibgtlp",
  //     dt: "WBERA-iBGT LP",
  //     ot: "WBERA-iBGT LP-OT",
  //     yt: "WBERA-iBGT LP-YT",
  //     protocolUrl: "https://origami.finance/",
  //     dexLink: `https://dexscreener.com/berachain/${contracts.vaultLPaddys.wberaibgtlp}`,
  //     poolName: "WBERA-iBGT LP / WBERA-iBGT OT LP",
  //     liqManagerUrl: "",
  //     poolUrl: `https://berascan.com/address/${contracts.vaultLPaddys.wberaibgtlp}`,
  //   },
  // },
} as const;

export type VaultDetailKey = keyof typeof VAULT_DETAIL_CONFIGS;
