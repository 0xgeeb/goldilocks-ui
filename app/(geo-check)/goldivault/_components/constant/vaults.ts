export const VAULTS = [
  {
    address: "oribgt",
    mouseFlag: "oribgtvaultinfo",
    tokenName: "oriBGT",
    imageUrl: "logo-oribgt.svg",
    vaultName: "oriBGT Vault",
  },
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
  }
] as const;

export type VaultType = (typeof VAULTS)[number]["address"];
