export const VAULTS = [
  {
    address: "oribgt",
    mouseFlag: "oribgtvaultinfo",
    tokenName: "oriBGT",
    imageUrl: "logo-oribgt.svg",
    vaultName: "oriBGT Vault",
  },
  // {
  //   address: "janoribgt",
  //   mouseFlag: "janoribgtvaultinfo",
  //   tokenName: "oriBGT",
  //   imageUrl: "logo-oribgt.svg",
  //   vaultName: "oriBGT Vault",
  // },
  {
    address: "rusd",
    mouseFlag: "rusdvaultinfo",
    tokenName: "rUSD",
    imageUrl: "rusd-logo.png",
    vaultName: "Reservoir Points Vault",
  },
  {
    address: "unibtc",
    mouseFlag: "unibtcvaultinfo",
    tokenName: "uniBTC",
    imageUrl: "unibtc-logo.png",
    vaultName: "Bedrock Points Vault",
  },
  {
    address: "rseth",
    mouseFlag: "rsethvaultinfo",
    tokenName: "rsETH",
    imageUrl: "rseth_logo.png",
    vaultName: "KelpDAO Points Vault",
  },
  {
    address: "solvbtc",
    mouseFlag: "solvbtcvaultinfo",
    tokenName: "SolvBTC.BBN",
    imageUrl: "solvbtc-logo.png",
    vaultName: "Solv Points Vault",
  },
  {
    address: "stlbgt",
    mouseFlag: "stlbgtvaultinfo",
    tokenName: "LBGT",
    imageUrl: "logo-lbgt.svg",
    vaultName: "Staked LBGT Vault"
  },
  // {
  //   address: "ybgt",
  //   mouseFlag: "ybgtvaultinfo",
  //   tokenName: "yBGT",
  //   imageUrl: "logo-ybgt.png",
  //   vaultName: "Staked yBGT Vault"
  // },
  // {
  //   address: "wberaibgtlp",
  //   mouseFlag: "wberaibgtlpinfo",
  //   tokenName: "WBERA-iBGT",
  //   imageUrl: "logo-oribgt.svg",
  //   vaultName: "WBERA-iBGT LP Vault"
  // },
] as const;

export type VaultType = (typeof VAULTS)[number]["address"];
