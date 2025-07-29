import { useGoldivault } from "../../providers"
import { contracts } from "../../utils/addressi"
import { parseEther } from "viem"

type VaultInfoConfigHookProps = {
  vaultToken: string;
}

export const useVaultInfoConfig = ({ vaultToken }: VaultInfoConfigHookProps) => {

  const oribgtRewardVault = '0xeEE277a91F9F50cda5d188522C921820a848cD99'

  const {
    goldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoUnibtc,
    goldivaultWalletInfoRusd,
    goldivaultWalletInfoRseth,
    goldivaultWalletInfoOribgt,
    goldivaultWalletInfoWberaibgtlp,
    goldivaultWalletInfoStlbgt,
    goldivaultWalletInfoYbgt,
    zapInfo,
    selectedZapAsset
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
                      ? goldivaultWalletInfoYbgt.stybgt
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
                      ? contracts.stybgt.address
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
                      ? "styBGT"
                      : "";

  const popupLPAsset =
    vaultToken === "oribgt"
      ? goldivaultWalletInfoOribgt.oribgt
      : vaultToken === "stlbgt"
        ? goldivaultWalletInfoStlbgt.stlbgt
        : vaultToken === "ybgt"
          ? goldivaultWalletInfoYbgt.ysysybgt
          : 0

  const popupLPAssetAddy =
    vaultToken === "oribgt"
      ? contracts.oribgt.address
      : vaultToken === "stlbgt"
        ? contracts.stlbgt.address
        : vaultToken === "ybgt"
          ? contracts.ysysybgt.address
          : ""
  
  const popupLPAssetLabel =
    vaultToken === "rusd"
      ? "rUSD"
      : vaultToken === "oribgt"
        ? "oriBGT"
        : vaultToken === "stlbgt"
          ? "stLBGT"
          : vaultToken === "ybgt"
            ? "ysysyBGT"
            : ""

  const popupDTLabel = 
    vaultToken === "oribgt"
      ? "iBGT"
        : vaultToken === "stlbgt"
          ? "LBGT"
          : vaultToken === "ybgt"
            ? "styBGT"
            : "";

  const dtPicSrc = 
    vaultToken === "oribgt"
      ? "/images/logo-ibgt.svg"
      : vaultToken === "stlbgt"
        ? "/images/logo-lbgt.svg"
        : vaultToken === "ybgt"
          ? "/images/logo-ybgt.png"
          : ""

  const lpPicSrc = 
    vaultToken === "oribgt"
      ? "/images/logo-oribgt.svg"
      : vaultToken === "stlbgt"
        ? "/images/logo-lbgt.svg"
        : vaultToken === "ybgt"
          ? "/images/logo-ybgt.png"
          : ""

  const zapInAssetLabel = (initialAsset: string): string => {
    return vaultToken === "oribgt"
      ? "iBGT"
      : vaultToken === "stlbgt"
        ? initialAsset === "LBGT" ? "LBGT" : "stLBGT"
        : vaultToken === "ybgt"
          ? "yBGT"
          : "";
  }

  const zapOutAsset = 
    vaultToken === "oribgt"
      ? goldivaultWalletInfoOribgt.zapOutAsset
      : vaultToken === "stlbgt"
        ? goldivaultWalletInfoStlbgt.kodiakIsland
        : vaultToken === "ybgt"
          ? goldivaultWalletInfoYbgt.kodiakIsland
          : 0
  
  const zapOutAssetLabel =
    vaultToken === "oribgt"
      ? "Staked Steer LP"
      : vaultToken === "stlbgt"
        ? "stLBGT / stLBGT-OT LP"
        : vaultToken === "ybgt"
          ? "ysysyBGT / yBGT-OT LP"
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
  
  const islandSlug =
    vaultToken === "oribgt"
      ? "steeroribgt"
      : vaultToken === "stlbgt"
        ? "kodiakstlbgt"
        : vaultToken === "ybgt"
          ? "kodiakybgt"
          : ""
        
  const kodiakIslandAddy = 
    vaultToken === "stlbgt"
      ? contracts.stlbgtKodiakIsland.address
      : vaultToken === "ybgt"
        ? contracts.ybgtKodiakIsland.address
        : ""
  
  // const activeVaults = ["oriBGT", "LBGT", "yBGT"]
  const activeVaultTokens = ["stlbgt"]
  const activeVaults = ["LBGT"]
  const zappableVaults = ["oribgt", "stlbgt", "ybgt"]

  const zapInSteps =
    vaultToken === "oribgt"
      ? "1. Deposit iBGT into Origami for oriBGT 2. Deposit oriBGT into Goldilocks for oriBGT-OT 3. LP oriBGT and oriBGT-OT into Steer 4. Stake Steer LP tokens into reward vault"
      : vaultToken === "stlbgt"
        ? "1. Stake LBGT for stLBGT 2. Deposit stLBGT into Goldilocks for stLBGT-OT and stLBGT-YT 3. LP stLBGT and stLBGT-OT into the Kodiak Island"
        : vaultToken === "ybgt"
          ? "1. Stake yBGT for styBGT 2. Stake styBGT for ysysyBGT 3. Deposit ysysyBGT into Goldivaults for OT and YT 4. LP ysysyBGT receipt token and OT "
          : ""

  const zapOutSteps =
    vaultToken === "oribgt"
      ? "1. Unstake Steer LP tokens from reward vault 2. Remove oriBGT and oriBGT-OT liquidity from Steer 3. Redeem oriBGT-OT from Goldilocks 4. Redeem oriBGT from Origami"
      : vaultToken === "stlbgt"
        ? "1. Withdraw liquidity from Kodiak Island 2. Redeem stLBGT-OT from Goldilocks 3. Redeem stLBGT from Berapaw"
        : vaultToken === "ybgt"
          ? "1. Withdraw liquidity from Kodiak Island 2. Redeem OT from Goldilocks 3. Redeem ysysyBGT from Bearn"
          : ""

  const zapInCalls = (account: string): any[] => {
    return vaultToken === "oribgt"
      ? [
          {
            // approve ibgt for oribgt
            to: contracts.ibgt.address as `0x${string}`,
            abi: contracts.ibgt.abi,
            functionName: 'approve',
            args: [contracts.oribgt.address, parseEther(`${zapInfo.dtFour626}`)]
          },
          {
            // deposit to oribgt
            to: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'deposit',
            args: [parseEther(`${zapInfo.dtFour626}`), account]
          },
          {
            // approve ibgt for goldivault
            to: contracts.ibgt.address as `0x${string}`,
            abi: contracts.ibgt.abi,
            functionName: 'approve',
            args: [contracts.oribgtVault.address, parseEther(`${zapInfo.dtGoldivault}`)]
          },
          {
            // deposit to goldivault
            to: contracts.oribgtVault.address as `0x${string}`,
            abi: contracts.oribgtVault.abi,
            functionName: 'deposit',
            args: [parseEther(`${zapInfo.dtGoldivault}`)]
          },
          {
            // approve oribgt for steer
            to: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'approve',
            args: [contracts.steerPeriphery.address, parseEther(`${zapInfo.convertedDTLP}`)]
          },
          {
            // approve oribgt-ot for steer
            to: contracts.oribgtot.address as `0x${string}`,
            abi: contracts.oribgtot.abi,
            functionName: 'approve',
            args: [contracts.steerPeriphery.address, parseEther(`${zapInfo.dtGoldivault}`)]
          },
          {
            // add liq to steer
            to: contracts.steerPeriphery.address as `0x${string}`,
            abi: contracts.steerPeriphery.abi,
            functionName: "deposit",
            args: [
              contracts.steerOribgtPool.address as `0x${string}`,
              parseEther(`${zapInfo.convertedDTLP}`),
              parseEther(`${zapInfo.dtGoldivault}`),
              parseEther(`${0}`),
              parseEther(`${0}`),
              account as `0x${string}`
            ]
          },
          {
            // approve lp token for reward vault
            to: contracts.steerOribgtPool.address as `0x${string}`,
            abi: contracts.ibgt.abi,
            functionName: 'approve',
            args: [oribgtRewardVault, parseEther(`${zapInfo.estimatedLP}`)]
          },
          {
            // stake lp token in reward vault
            // example https://berascan.com/tx/0x81c784f3800fce4396e9438efadde89aad03903ede89a43542130830c3264cea
            to: oribgtRewardVault as `0x${string}`,
            abi: [{ "name": "stake", "type": "function", "stateMutability": "nonpayable", "inputs": [{ "name": "amount", "type": "uint256" }], "outputs": [] }],
            functionName: 'stake',
            args: [parseEther(`${zapInfo.estimatedLP * .99}`)]
          }
        ]
      : vaultToken === "stlbgt"
        ? [
            ...(selectedZapAsset === "stLBGT" ? [
              {
                // redeem stlbgt for lbgt
                to: contracts.stlbgt.address as `0x${string}`,
                abi: contracts.oribgt.abi,
                functionName: 'redeem',
                args: [parseEther(`${zapInfo.stakedRedeem}`), account, account]
              }
            ] : []),
            {
              // approve lbgt for stlbgt
              to: contracts.lbgt.address as `0x${string}`,
              abi: contracts.lbgt.abi,
              functionName: 'approve',
              args: [contracts.stlbgt.address, parseEther(`${zapInfo.dtFour626}`)]
            },
            {
              // deposit to stlbgt
              to: contracts.stlbgt.address as `0x${string}`,
              abi: contracts.oribgt.abi,
              functionName: 'deposit',
              args: [parseEther(`${zapInfo.dtFour626}`), account]
            },
            {
              // approve lbgt for goldivault
              to: contracts.lbgt.address as `0x${string}`,
              abi: contracts.lbgt.abi,
              functionName: 'approve',
              args: [contracts.stlbgtVault.address, parseEther(`${zapInfo.dtGoldivault}`)]
            },
            {
              // deposit to goldivault
              to: contracts.stlbgtVault.address as `0x${string}`,
              abi: contracts.stlbgtVault.abi,
              functionName: 'deposit',
              args: [parseEther(`${zapInfo.dtGoldivault}`)]
            },
            {
              // approve stlbgt for kodiak
              to: contracts.stlbgt.address as `0x${string}`,
              abi: contracts.stlbgt.abi,
              functionName: 'approve',
              args: [contracts.baultRouter.address, parseEther(`${zapInfo.convertedDTLP}`)]
            },
            {
              // approve stlbgt-ot for kodiak
              to: contracts.stlbgtot.address as `0x${string}`,
              abi: contracts.stlbgtot.abi,
              functionName: 'approve',
              args: [contracts.baultRouter.address, parseEther(`${zapInfo.dtGoldivault}`)]
            },
            {
              // add liq to kodiak
              to: contracts.baultRouter.address as `0x${string}`,
              abi: contracts.baultRouter.abi,
              functionName: "addLiquidity",
              args: [
                contracts.stlbgtKodiakIsland.address as `0x${string}`,
                parseEther(`${zapInfo.dtGoldivault}`),
                parseEther(`${zapInfo.convertedDTLP}`),
                parseEther(`${zapInfo.dtGoldivault * 0.99}`),
                parseEther(`${zapInfo.convertedDTLP * 0.99}`),
                parseEther(`${zapInfo.estimatedLP * 0.99}`),
                account as `0x${string}`
              ]
            }
          ]
        : vaultToken === "ybgt"
          ? [
            {
              // approve ybgt
              to: contracts.ybgt.address as `0x${string}`,
              abi: contracts.ybgt.abi,
              functionName: "approve",
              args: [contracts.stybgt.address, parseEther(`${zapInfo.dtFour626}`)]
            },
            {
              // stake ybgt
              to: contracts.stybgt.address as `0x${string}`,
              abi: contracts.stybgt.abi,
              functionName: "deposit",
              args: [parseEther(`${zapInfo.dtFour626}`), account]
            },
            {
              // approve stybgt
              to: contracts.stybgt.address as `0x${string}`,
              abi: contracts.stybgt.abi,
              functionName: "approve",
              args: [contracts.ysysybgt.address, parseEther(`${zapInfo.dtFour626}`)]
            },
            {
              // stake stybgt
              to: contracts.ysysybgt.address as `0x${string}`,
              abi: contracts.ysysybgt.abi,
              functionName: "deposit",
              args: [parseEther(`${zapInfo.dtFour626}`), account]
            },
            {
              // approve stybgt
              to: contracts.stybgt.address as `0x${string}`,
              abi: contracts.stybgt.abi,
              functionName: "approve",
              args: [contracts.ybgtVault.address, parseEther(`${zapInfo.dtGoldivault}`)]
            },
            {
              // deposit stybgt
              to: contracts.ybgtVault.address as `0x${string}`,
              abi: contracts.ybgtVault.abi,
              functionName: "deposit",
              args: [parseEther(`${zapInfo.dtGoldivault}`)]
            },
            {
              // approve ysysybgt
              to: contracts.ysysybgt.address as `0x${string}`,
              abi: contracts.ysysybgt.abi,
              functionName: "approve",
              args: [contracts.baultRouter.address, parseEther(`${zapInfo.convertedDTLP}`)]
            },
            {
              // approve ybgt-ot
              to: contracts.ybgtot.address as `0x${string}`,
              abi: contracts.ybgtot.abi,
              functionName: "approve",
              args: [contracts.baultRouter.address, parseEther(`${zapInfo.dtGoldivault}`)]
            },
            {
              // add liq to kodiak
              to: contracts.baultRouter.address as `0x${string}`,
              abi: contracts.baultRouter.abi,
              functionName: "addLiquidity",
              args: [
                contracts.ybgtKodiakIsland.address as `0x${string}`,
                parseEther(`${zapInfo.convertedDTLP}`),
                parseEther(`${zapInfo.dtGoldivault}`),
                parseEther(`${zapInfo.convertedDTLP * 0.99}`),
                parseEther(`${zapInfo.dtGoldivault * 0.99}`),
                parseEther(`${zapInfo.estimatedLP * 0.99}`),
                account as `0x${string}`
              ]
            }
            ]
          : []
  }

  const zapOutCalls = (account: string, debouncedZap: number): any[] => {
    return vaultToken === "oribgt"
      ? [
          {
            // unstake from reward vault
            to: oribgtRewardVault as `0x${string}`,
            abi: [{ "name": "withdraw", "type": "function", "stateMutability": "nonpayable", "inputs": [{ "name": "amount", "type": "uint256" }], "outputs": [] }],
            functionName: 'withdraw',
            args: [parseEther(`${debouncedZap}`)]
          },
          {
            // remove liquidity from steer
            to: contracts.steerOribgtPool.address as `0x${string}`,
            abi: [{"inputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}],
            functionName: 'withdraw',
            args: [
              parseEther(`${debouncedZap}`),
              parseEther(`${0}`),
              parseEther(`${0}`),
              account as `0x${string}`
            ]
          },
          {
            // redeem from origami
            to: contracts.oribgt.address as `0x${string}`,
            abi: contracts.oribgt.abi,
            functionName: 'redeem',
            args: [parseEther(`${zapInfo.dtOut}`), account, account]
          },
          {
            // redeem from goldilocks
            to: contracts.oribgtVault.address as `0x${string}`,
            abi: contracts.oribgtVault.abi,
            functionName: 'redeemOwnership',
            args: [parseEther(`${zapInfo.otOut}`)]
          }
        ]
      : vaultToken === "stlbgt"
        ? [
            {
              // approve LP from router
              to: contracts.stlbgtKodiakIsland.address as `0x${string}`,
              abi: contracts.stlbgtKodiakIsland.abi,
              functionName: "approve",
              args: [contracts.baultRouter.address, parseEther(`${debouncedZap}`)]
            },
            {
              // remove liquidity from kodiak
              to: contracts.baultRouter.address as `0x${string}`,
              abi: contracts.baultRouter.abi,
              functionName: "removeLiquidity",
              args: [
                contracts.stlbgtKodiakIsland.address as `0x${string}`,
                parseEther(`${debouncedZap}`),
                parseEther(`${zapInfo.otOut * 0.99}`),
                parseEther(`${zapInfo.dtOut * 0.99}`),
                account as `0x${string}`
              ]
            },
            {
              // redeem from stlbgt
              to: contracts.stlbgt.address as `0x${string}`,
              abi: contracts.oribgt.abi,
              functionName: 'redeem',
              args: [parseEther(`${zapInfo.dtOut}`), account, account]
            },
            {
              // redeem from goldilocks
              to: contracts.stlbgtVault.address as `0x${string}`,
              abi: contracts.stlbgtVault.abi,
              functionName: 'redeemOwnership',
              args: [parseEther(`${zapInfo.otOut}`)]
            }
          ]
        : vaultToken === "ybgt"
          ? [
              {
                // remove liquidity from kodiak
                to: contracts.baultRouter.address as `0x${string}`,
                abi: contracts.baultRouter.abi,
                functionName: "removeLiquidity",
                args: [
                  contracts.ybgtKodiakIsland.address as `0x${string}`,
                  parseEther(`${debouncedZap}`),
                  parseEther(`${zapInfo.dtOut * 0.99}`),
                  parseEther(`${zapInfo.otOut * 0.99}`),
                  account as `0x${string}`
                ]
              },
              {
                // redeem from ysysybgt
                to: contracts.ysysybgt.address as `0x${string}`,
                abi: contracts.ysysybgt.abi,
                functionName: "redeem",
                args: [parseEther(`${zapInfo.dtOut}`), account, account]
              },
              {
                // redeem from goldilocks
                to: contracts.ybgtVault.address as `0x${string}`,
                abi: contracts.ybgtVault.abi,
                functionName: "redeemOwnership",
                args: [parseEther(`${zapInfo.otOut}`)]
              }
            ]
          : []
  }

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
    popupLPAsset,
    popupLPAssetAddy,
    popupLPAssetLabel,
    dtPicSrc,
    lpPicSrc,
    zapInAssetLabel,
    zapOutAsset,
    zapOutAssetLabel,
    descriptionTitle,
    activeVaultTokens,
    activeVaults,
    zapInSteps,
    zapOutSteps,
    zappableVaults,
    zapInCalls,
    zapOutCalls,
    islandSlug,
    kodiakIslandAddy,
    popupDTLabel
  }
}