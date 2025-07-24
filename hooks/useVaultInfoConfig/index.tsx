import { useGoldivault } from "../../providers"
import { contracts } from "../../utils/addressi"

type VaultInfoConfigHookProps = {
  vaultToken: string;
}

export const useVaultInfoConfig = ({ vaultToken }: VaultInfoConfigHookProps) => {

  const {
    goldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoUnibtc,
    goldivaultWalletInfoRusd,
    goldivaultWalletInfoRseth,
    goldivaultWalletInfoOribgt,
    goldivaultWalletInfoWberaibgtlp,
    goldivaultWalletInfoStlbgt,
    goldivaultWalletInfoYbgt,
  } = useGoldivault()

  const vaultOT =
    vaultToken === "solvbtc"
      ? goldivaultWalletInfoSolvbtc.solvbtcot
      : vaultToken === "unibtc"
        ? goldivaultWalletInfoUnibtc.unibtcot
        : vaultToken === "rusd"
          ? goldivaultWalletInfoRusd.rusdot
            : vaultToken === "rseth"
              ? goldivaultWalletInfoRseth.rsethot
              : vaultToken === "oribgt"
                ? goldivaultWalletInfoOribgt.oribgtot
                : vaultToken === "wberaibgtlp"
                  ? goldivaultWalletInfoWberaibgtlp.wberaibgtlpot
                  : vaultToken === "stlbgt"
                    ? goldivaultWalletInfoStlbgt.stlbgtot
                    : vaultToken === "ybgt"
                      ? goldivaultWalletInfoYbgt.ybgtot
                      : {};

  const vaultYT =
    vaultToken === "solvbtc"
      ? goldivaultWalletInfoSolvbtc.solvbtcyt
      : vaultToken === "unibtc"
        ? goldivaultWalletInfoUnibtc.unibtcyt
        : vaultToken === "rusd"
          ? goldivaultWalletInfoRusd.rusdyt
            : vaultToken === "rseth"
              ? goldivaultWalletInfoRseth.rsethyt
              : vaultToken === "oribgt"
                ? goldivaultWalletInfoOribgt.oribgtyt
                : vaultToken === "wberaibgtlp"
                  ? goldivaultWalletInfoWberaibgtlp.wberaibgtlpyt
                  : vaultToken === "stlbgt"
                    ? goldivaultWalletInfoStlbgt.stlbgtyt
                    : vaultToken === "ybgt"
                      ? goldivaultWalletInfoYbgt.ybgtyt
                      : {};

  const vaultDT =
    vaultToken === "solvbtc"
      ? goldivaultWalletInfoSolvbtc.solvbtc
      : vaultToken === "unibtc"
        ? goldivaultWalletInfoUnibtc.unibtc
        : vaultToken === "rusd"
          ? goldivaultWalletInfoRusd.rusd
            : vaultToken === "rseth"
              ? goldivaultWalletInfoRseth.rseth
              : vaultToken === "oribgt"
                ? goldivaultWalletInfoOribgt.ibgt
                : vaultToken === "wberaibgtlp"
                  ? goldivaultWalletInfoWberaibgtlp.wberaibgtlp
                  : vaultToken === "stlbgt"
                    ? goldivaultWalletInfoStlbgt.lbgt
                    : vaultToken === "ybgt"
                      ? goldivaultWalletInfoYbgt.ybgt
                      : {};

  const vaultOTaddy =
    vaultToken === "solvbtc"
      ? contracts.solvbtcot.address
      : vaultToken === "unibtc"
        ? contracts.unibtcot.address
        : vaultToken === "rusd"
          ? contracts.rusdot.address
            : vaultToken === "rseth"
              ? contracts.rsethot.address
              : vaultToken === "oribgt"
                ? contracts.oribgtot.address
                : vaultToken === "wberaibgtlp"
                  ? contracts.wberaibgtlpot.address
                  : vaultToken === "stlbgt"
                    ? contracts.stlbgtot.address
                    : vaultToken === "ybgt"
                      ? contracts.ybgtot.address
                      : "";
                
  const vaultDTaddy =
    vaultToken === "solvbtc"
      ? contracts.solvbtc.address
      : vaultToken === "unibtc"
        ? contracts.unibtc.address
        : vaultToken === "rusd"
          ? contracts.rusd.address
            : vaultToken === "rseth"
              ? contracts.rseth.address
              : vaultToken === "oribgt"
                ? contracts.ibgt.address
                : vaultToken === "wberaibgtlp"
                  ? contracts.wberaibgtisland.address
                  : vaultToken === "stlbgt"
                    ? contracts.lbgt.address
                    : vaultToken === "ybgt"
                      ? contracts.ybgt.address
                      : "";

  const vaultDTAllowance =
    vaultToken === "solvbtc"
      ? goldivaultWalletInfoSolvbtc.solvbtcAllowance
      : vaultToken === "unibtc"
        ? goldivaultWalletInfoUnibtc.unibtcAllowance
        : vaultToken === "rusd"
          ? goldivaultWalletInfoRusd.rusdAllowance
            : vaultToken === "rseth"
              ? goldivaultWalletInfoRseth.rsethAllowance
              : vaultToken === "oribgt"
                ? goldivaultWalletInfoOribgt.ibgtAllowance
                : vaultToken === "wberaibgtlp"
                  ? goldivaultWalletInfoWberaibgtlp.wberaibgtlpAllowance
                  : vaultToken === "stlbgt"
                    ? goldivaultWalletInfoStlbgt.lbgtAllowance
                    : vaultToken === "ybgt"
                      ? goldivaultWalletInfoYbgt.ybgtAllowance
                      : 0;

  const vaultYTLabel = 
    vaultToken === "solvbtc"
      ? "solvBTC-YT"
      : vaultToken === "unibtc"
        ? "uniBTC-YT"
        : vaultToken === "rusd"
          ? "rUSD-YT"
            : vaultToken === "rseth"
              ? "rsETH-YT"
              : vaultToken === "oribgt"
                ? "oriBGT-YT"
                : vaultToken === "wberaibgtlp"
                  ? "WBERA-iBGT LP-YT"
                  : vaultToken === "stlbgt"
                    ? "stLBGT-YT"
                    : vaultToken === "ybgt"
                      ? "yBGT-YT"
                      : "";

  const vaultOTLabel = 
    vaultToken === "solvbtc"
      ? "solvBTC-OT"
      : vaultToken === "unibtc"
        ? "uniBTC-OT"
        : vaultToken === "rusd"
          ? "rUSD-OT"
            : vaultToken === "rseth"
              ? "rsETH-OT"
              : vaultToken === "oribgt"
                ? "oriBGT-OT"
                : vaultToken === "wberaibgtlp"
                  ? "WBERA-iBGT LP-OT"
                  : vaultToken === "stlbgt"
                    ? "stLBGT-OT"
                    : vaultToken === "ybgt"
                      ? "yBGT-OT"
                      : "";

  const vaultDTLabel = 
    vaultToken === "solvbtc"
      ? "solvBTC"
      : vaultToken === "unibtc"
        ? "uniBTC"
        : vaultToken === "rusd"
          ? "rUSD"
            : vaultToken === "rseth"
              ? "rsETH"
              : vaultToken === "oribgt"
                ? "iBGT"
                : vaultToken === "wberaibgtlp"
                  ? "WBERA-iBGT LP"
                  : vaultToken === "stlbgt"
                    ? "LBGT"
                    : vaultToken === "ybgt"
                      ? "yBGT"
                      : "";
                    
  const stakedYt =
    vaultToken === "oribgt"
      ? goldivaultWalletInfoOribgt.stakedYt
      : vaultToken === "wberaibgtlp"
        ? goldivaultWalletInfoWberaibgtlp.stakedYt
        : vaultToken === "stlbgt"
          ? goldivaultWalletInfoStlbgt.stakedYt
          : vaultToken === "ybgt"
            ? goldivaultWalletInfoYbgt.stakedYt
            : 0
  const justYt = 
    vaultToken === "oribgt"
      ? goldivaultWalletInfoOribgt.justYt
      : vaultToken === "wberaibgtlp"
        ? goldivaultWalletInfoWberaibgtlp.justYt
        : vaultToken === "stlbgt"
          ? goldivaultWalletInfoStlbgt.justYt
          : vaultToken === "ybgt"
            ? goldivaultWalletInfoYbgt.justYt
            : 0
  const claimable =
    vaultToken === "oribgt"
      ? goldivaultWalletInfoOribgt.claimable
      : vaultToken === "wberaibgtlp"
        ? goldivaultWalletInfoWberaibgtlp.claimable
        : vaultToken === "stlbgt"
          ? goldivaultWalletInfoStlbgt.claimable
          : vaultToken === "ybgt"
            ? goldivaultWalletInfoYbgt.claimable
            : 0

  const four626bool = vaultToken === "oribgt" || vaultToken === "wberaibgtlp" || vaultToken === "stlbgt" || vaultToken === "ybgt"

  const invalidVault =
    vaultToken !== "rseth" &&
    vaultToken !== "unibtc" &&
    vaultToken !== "rusd" &&
    vaultToken !== "oribgt" &&
    vaultToken !== "solvbtc" &&
    vaultToken !== "wberaibgtlp" &&
    vaultToken !== "stlbgt" &&
    vaultToken !== "ybgt"

  const vaultaddy = (vaultName: string): string => {
    return vaultName === "solvbtc"
    ? contracts.solvbtcVault.address
    : vaultName === "unibtc"
      ? contracts.unibtcVault.address
      : vaultName === "rusd"
        ? contracts.rusdVault.address
          : vaultName === "rseth"
            ? contracts.rsethVault.address
            : vaultName === "oribgt"
              ? contracts.oribgtVault.address
              : vaultName === "wberaibgtlp"
                ? contracts.wberaibgtlpVault.address
                : vaultName === "stlbgt"
                  ? contracts.stlbgtVault.address
                  : vaultName === "ybgt"
                    ? contracts.ybgtVault.address
                    : "";
  }

  const LPasset =
    vaultToken === "solvbtc"
      ? goldivaultWalletInfoSolvbtc.solvbtc
      : vaultToken === "unibtc"
        ? goldivaultWalletInfoUnibtc.unibtc
        : vaultToken === "rusd"
          ? goldivaultWalletInfoRusd.rusd
            : vaultToken === "rseth"
              ? goldivaultWalletInfoRseth.rseth
              : vaultToken === "oribgt"
                ? goldivaultWalletInfoOribgt.ibgt
                : vaultToken === "wberaibgtlp"
                  ? goldivaultWalletInfoWberaibgtlp.origamiwberaibgtlp
                  : vaultToken === "stlbgt"
                    ? goldivaultWalletInfoStlbgt.lbgt
                    : vaultToken === "ybgt"
                      ? goldivaultWalletInfoYbgt.ybgt
                      : {};

  const LPassetaddy =
    vaultToken === "solvbtc"
      ? contracts.solvbtc.address
      : vaultToken === "unibtc"
        ? contracts.unibtc.address
        : vaultToken === "rusd"
          ? contracts.rusd.address
            : vaultToken === "rseth"
              ? contracts.rseth.address
              : vaultToken === "oribgt"
                ? contracts.ibgt.address
                : vaultToken === "wberaibgtlp"
                  ? contracts.origamiwberaibgtisland.address
                  : vaultToken === "stlbgt"
                    ? contracts.lbgt.address
                    : vaultToken === "ybgt"
                      ? contracts.ybgt.address
                      : "";

  const LPassetLabel = 
    vaultToken === "solvbtc"
      ? "solvBTC"
      : vaultToken === "unibtc"
        ? "uniBTC"
        : vaultToken === "rusd"
          ? "rUSD"
            : vaultToken === "rseth"
              ? "rsETH"
              : vaultToken === "oribgt"
                ? "iBGT"
                : vaultToken === "wberaibgtlp"
                  ? "oAC-WBERA-iBGT LP"
                  : vaultToken === "stlbgt"
                    ? "LBGT"
                    : vaultToken === "ybgt"
                      ? "yBGT"
                      : "";

  const popupLPAssetAddy =
    vaultToken === "oribgt"
      ? contracts.oribgt.address
      : vaultToken === "stlbgt"
        ? contracts.stlbgt.address
        : ""
  
  const popupLPAssetLabel =
    vaultToken === "oribgt"
      ? "oriBGT"
      : vaultToken === "stlbgt"
        ? "stLBGT"
        : ""

  const dtPicSrc = 
    vaultToken === "oribgt"
      ? "/images/logo-ibgt.svg"
      : vaultToken === "stlbgt"
        ? "/images/logo-lbgt.svg"
        : ""

  const lpPicSrc = 
    vaultToken === "oribgt"
      ? "/images/logo-oribgt.svg"
      : vaultToken === "stlbgt"
        ? "/images/logo-lbgt.svg"
        : ""

  const zapOutAsset = 
    vaultToken === "oribgt"
      ? goldivaultWalletInfoOribgt.zapOutAsset
      : 0
  
  const zapOutAssetLabel =
    vaultToken === "oribgt"
      ? "Staked Steer LP"
      : ""
  
  const descriptionTitle = 
    vaultToken === "solvbtc"
      ? "solvBTC"
      : vaultToken === "unibtc"
        ? "uniBTC"
        : vaultToken === "rusd"
          ? "rUSD"
            : vaultToken === "rseth"
              ? "rsETH"
              : vaultToken === "oribgt"
                ? "oriBGT"
                : vaultToken === "wberaibgtlp"
                  ? "WBERA-iBGT LP"
                  : vaultToken === "stlbgt"
                    ? "LBGT"
                    : vaultToken === "ybgt"
                      ? "yBGT"
                      : "";
  
  const activeVaults = ["LBGT"]

  return {
    vaultOT,
    vaultYT,
    vaultDT,
    vaultOTaddy,
    vaultDTaddy,
    vaultDTAllowance,
    stakedYt,
    justYt,
    claimable,
    four626bool,
    vaultYTLabel,
    vaultOTLabel,
    vaultDTLabel,
    invalidVault,
    vaultaddy,
    LPasset,
    LPassetaddy,
    LPassetLabel,
    popupLPAssetAddy,
    popupLPAssetLabel,
    dtPicSrc,
    lpPicSrc,
    zapOutAsset,
    zapOutAssetLabel,
    descriptionTitle,
    activeVaults
  }
}