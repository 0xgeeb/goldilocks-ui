"use client";

import { useState } from "react";

import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

import { formatAsString, formatAsSmallNum } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getPublicClient } from "@wagmi/core";
import { createWalletClient, custom } from "viem"
import { BerachainMainnet } from "@/utils/customChains";

import { useGoldivaultTx, useVaultInfoConfig } from "@/hooks";
import { useGoldivault } from "@/providers";
import { config } from "@/providers/WagmiProvider";
import { contracts } from "@/utils/addressi";

import { BUTTON_CLASSES, COLORS } from "./styles"
import { cn } from "@/app/_components/utils";
type VaultButtonProps = {
  params: {
    vaultToken: string;
    dt: string;
    ot: string;
    yt: string;
  };
};

const BUTTON_TEXT = {
  connect: "Connect Wallet",
  // Deposit
  deposit: "Deposit",
  // LIQ
  addLiq: "Add Liquidity",
  removeLiq: "Remove Liquidity",
  // OT
  tradeOT: "Trade OT",
  redeemOT: "Redeem OT",
  stakeOT: "Stake OT",
  unstakeOT: "Unstake OT",
  // YT
  tradeYT: "Trade YT",
  redeemYT: "Redeem YT",
  stakeYT: "Stake YT",
  unstakeYT: "Unstake YT",
  // Zap
  zapIn: "Zap Liquidity",
  zapOut: "Unzap Liquidity",
  // Not enough
  notEnough: "Not Enough...",
  notEnoughOT: "Not Enough OT",
  notEnoughYT: "Not Enough YT",
  // Active states
  approving: "Approving...",
  confirming: "Confirming...",
  // Dynamic
  ybgt: "getting styBGT...",
  withdrawybgt: "withdrawing yBGT...",
  approve: (token: string) => `Approve ${token}`,
  raiseSlippage: "Raise Slippage",
  claim: "Claim",
  where: "Where Berachain??",
}

function TxButton({ params }: VaultButtonProps) {
  const [honeyApproved, setHoneyApproved] = useState<boolean>(false);
  const [depositDTApproved, setDepositDTApproved] = useState<boolean>(false);

  const walletClient = createWalletClient({
  chain: BerachainMainnet,
  transport: custom(window.ethereum!)
})

  const {
    deposit,
    redeemOT,
    tradeInput,
    tradeOutput,
    otAmount,
    ytAmount,
    debouncedDeposit,
    outputTokensLoading,
    setTxConfirming,
    openNotification,
    allowanceButtons,
    setAllowanceButtons,
    activeToggle,
    setDisplayString,
    setDeposit,
    setRedeemOT,
    setOtAmount,
    setYtAmount,
    setOutputTokensLoading,
    setTradeInput,
    setTradeOutput,
    tradeDirection,
    goldivaultWalletInfoRusd,
    refreshVaultInfo,
    refreshVaultWalletInfo,
    goldivaultWalletInfoOribgt,
    vaultSwapTxAmount,
    honeyApprovalAmount,
    otApprovalAmount,
    // checkVaultLiquidity,
    slippage,
    priceImpact,
    calledDtAmountMin,
    setBuyOtPopup,
    setSellOtPopup,
    zapPopup,
    zap,
    debouncedZap,
    redeemYT,
    selectedZapAsset
  } = useGoldivault();

  const {
    vaultOT,
    vaultYT,
    vaultDT,
    vaultOTaddy,
    vaultDTAllowance,
    stakedYt,
    justYt,
    claimable,
    four626bool,
    vaultYTLabel,
    vaultDTLabel,
    vaultOTLabel,
    LPasset,
    LPassetaddy,
    LPassetLabel,
    zapOutAssetLabel,
    popupLPAsset,
    zapInCalls,
    zapOutCalls,
    zapOutAsset,
    zapInAssetLabel,
    popupLPAssetLabel,
    islandSlug,
    kodiakIslandAddy
  } = useVaultInfoConfig({ vaultToken: params.vaultToken})

  const {
    checkAllowance,
    checkRouterV2Allowance,
    sendApproveTx,
    sendRouterV2ApproveTx,
    sendDepositTx,
    sendRedeemOTTx,
    sendV3TradeTx,
    sendBuyYTTx,
    sendSellYTTx,
    sendAddLiqTx,
    sendRemoveLiqTx,
    sendStakeYTTx,
    sendUnstakeYTTx,
    sendClaimTx,
    sendAddSteerLiqTx,
    sendRemoveSteerLiqTx,
    send4626DepositTx,
    send4626RedeemTx,
    sendAddKodiakLiqTx,
    sendRemoveKodiakLiqTx
  } = useGoldivaultTx();

  const { address, isConnected } = useAccount();

  const vaultLPBalance = params.vaultToken === "rusd" ? goldivaultWalletInfoRusd.rusdaquabera : 0;

  const refreshInfo = () => {
    refreshVaultInfo(params.vaultToken);
    refreshVaultWalletInfo(params.vaultToken);

    setDisplayString("");
    setDeposit(0);
    setRedeemOT(0);
    setOtAmount(0);
    setYtAmount(0);
    setTradeInput(0);
    setTradeOutput(0);
    setOutputTokensLoading(false);
  };

  const handleButtonClick = () => {
    const button = document.getElementById("deposit-button");
    if (outputTokensLoading) {
      return;
    }
    if (activeToggle === "DEPOSIT") {
      if(four626bool) {
        if(params.vaultToken === "ybgt") {
          ybgtDepositTxFlow(button)
        }
        else {
          stakingDepositTxFlow(button);
        }
      }
      else {
        depositTxFlow(button);
      }
    }
    if (activeToggle === "REDEEMOT") {
      if(params.vaultToken === "ybgt") {
        redeemYbgtOTFlow(button)
      }
      else {
        redeemOTFlow(button);
      }
    }
    if (activeToggle === "TRADEOT") {
      if(params.vaultToken === "oribgt" || params.vaultToken === "stlbgt" || params.vaultToken === "ybgt") {
        if(tradeDirection === "IN") {
          buyDepositOTFlow(button)
        }
        else {
          sellRedeemOTFlow(button)
        }
      }
      else {
        tradeOTFlow(button);
      }
    }
    if (activeToggle === "TRADEYT") {
      tradeYTFlow(button);
    }
    if (activeToggle === "ADDLIQ") {
      if(zapPopup) {
        zapInFlow(button)
      }
      else if(params.vaultToken === "oribgt") {
        addSteerLiqFlow(button)
      }
      else if(params.vaultToken === "stlbgt" || params.vaultToken === "ybgt") {
        addKodiakLiqFlow(button)
      }
      else {
        addAquaberaLiqFlow(button);
      }
    }
    if (activeToggle === "REMOVELIQ") {
      if(zapPopup) {
        zapOutFlow(button)
      }
      else if(params.vaultToken === "oribgt") {
        removeSteerLiqFlow(button)
      }
      else if(params.vaultToken === "stlbgt" || params.vaultToken === "ybgt") {
        removeKodiakLiqFlow(button)
      }
      else {
        removeAquaberaLiqFlow(button);
      }
    }
    if (activeToggle === "STAKE") {
      stakeYTFlow(button)
    }
    if (activeToggle === "UNSTAKE") {
      unstakeYTFlow(button)
    }
    if (activeToggle === "CLAIM") {
      claimFlow(button)
    }
  };

  const depositTxFlow = async (button: HTMLElement | null) => {
    if (deposit == 0) {
      button && (button.innerHTML = BUTTON_TEXT.deposit);
      return;
    }
    if (deposit > vaultDT) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        deposit,
        params.vaultToken,
        address as string,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = BUTTON_TEXT.confirming;
        }
        const depositTx = await sendDepositTx(deposit, params.vaultToken);
        if (depositTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            `You've successfully deposited ${params.dt} tokens`,
            `You deposited ${formatAsString(deposit)} ${params.dt}`,
            depositTx,
          );
          if (button) {
            button.innerHTML = BUTTON_TEXT.deposit;
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = BUTTON_TEXT.deposit;
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const redeemOTFlow = async (button: HTMLElement | null) => {
    if (redeemOT == 0) {
      button && (button.innerHTML = BUTTON_TEXT.redeemOT);
      return;
    }
    if (redeemOT > vaultOT) {
      button && (button.innerHTML = BUTTON_TEXT.notEnoughOT);
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = BUTTON_TEXT.confirming;
      }
      const redeemOTTx = await sendRedeemOTTx(redeemOT, params.vaultToken);
      if (redeemOTTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully redeemed your ownership tokens",
          `You redeemed ${formatAsString(redeemOT)} ownership tokens`,
          redeemOTTx,
        );
        if (button) {
          button.innerHTML = "Redeem OT";
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "Redeem OT";
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const tradeOTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = "Trade OT");
      return;
    }
    let num;
    let addy;
    if (tradeDirection === "OUT") {
      num = vaultOT;
      addy = vaultOTaddy;
    } else {
      num = LPasset;
      addy = LPassetaddy;
    }
    if (tradeInput > num) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkRouterV2Allowance(
        tradeInput,
        addy,
        address as string,
        getVaultType(params.vaultToken),
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = BUTTON_TEXT.confirming;
        }
        let pathOne;
        let pathTwo;
        let tokenOne;
        let tokenTwo;
        if (tradeDirection === "OUT") {
          pathOne = vaultOTaddy;
          pathTwo = LPassetaddy;
          tokenOne = params.ot;
          tokenTwo = LPassetLabel;
        } else {
          pathOne = LPassetaddy;
          pathTwo = vaultOTaddy;
          tokenOne = LPassetLabel;
          tokenTwo = params.ot;
        }
        const tradeTx = await sendV3TradeTx(
          tradeInput,
          tradeOutput,
          pathOne,
          pathTwo,
          address as string,
          getVaultType(params.vaultToken),
        );
        if (tradeTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            `You've successfully swapped ${tokenOne}`,
            `You swapped ${formatAsString(tradeInput)} ${tokenOne} for ${formatAsString(tradeOutput)} ${tokenTwo}`,
            tradeTx,
          );
          if (button) {
            button.innerHTML = BUTTON_TEXT.tradeOT;
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = BUTTON_TEXT.tradeOT;
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const buyDepositOTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.tradeOT);
      return;
    }
    setBuyOtPopup(true)
  }

  const sellRedeemOTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.tradeOT);
      return;
    }
    setSellOtPopup(true)
  }

  const getVaultType = (vault: string): string => {
    switch (vault) {
      // ETH Vaults
      case "rseth":
      case "rusd":
      case "oribgt":
        return "eth";
      // BTC Vaults
      case "unibtc":
        return "btc";
      // Default to ETH
      default:
        return "eth";
    }
  };

  const tradeYTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.tradeYT);
      return;
    }
    // if (
    //   !checkVaultLiquidity(params.vaultToken, getVaultType(params.vaultToken))
    // ) {
    //   button && (button.innerHTML = "not enuf liq");
    //   return;
    // }
    if (priceImpact > slippage.amount) {
      button && (button.innerHTML = BUTTON_TEXT.raiseSlippage);
      return;
    }
    if (tradeDirection === "OUT") {
      if (tradeInput > vaultYT) {
        button && (button.innerHTML = BUTTON_TEXT.notEnough);
        return;
      }
      else {
        const sufficientAllowance: boolean | void = await checkAllowance(
          honeyApprovalAmount,
          params.vaultToken,
          address as string,
        );
        if (sufficientAllowance) {
          setTxConfirming(true);
          if (button) {
            button.innerHTML = BUTTON_TEXT.confirming;
          }
          const [sellTx, afterBalance] = await sendSellYTTx(
            tradeInput,
            calledDtAmountMin,
            vaultSwapTxAmount,
            address as string,
            getVaultType(params.vaultToken),
            params.vaultToken,
          );
          if (sellTx.substring(0, 2) === "0x") {
            setTxConfirming(false);
            openNotification(
              true,
              `You've successfully sold ${LPassetLabel} yield tokens`,
              `You sold ${formatAsString(tradeInput)} YTs for ${formatAsString(afterBalance - LPasset)} ${LPassetLabel}`,
              sellTx,
            );
            if (button) {
              button.innerHTML = BUTTON_TEXT.tradeYT;
            }
            refreshInfo();
            setTimeout(() => {
              openNotification(false, "", "", "");
            }, 10000);
          } else {
            if (button) {
              button.innerHTML = BUTTON_TEXT.tradeYT;
            }
            refreshInfo();
            setTxConfirming(false);
          }
        } else {
          setAllowanceButtons(true);
        }
      }
    } else {
      if (tradeInput > vaultDT) {
        button && (button.innerHTML = BUTTON_TEXT.notEnough);
        return;
      } else {
        const sufficientAllowanceDT: boolean | void = await checkAllowance(
          honeyApprovalAmount,
          params.vaultToken,
          address as string,
        );
        if (sufficientAllowanceDT) {
          setHoneyApproved(true);
          const sufficientAllowanceOT: boolean | void = await checkAllowance(
            otApprovalAmount,
            params.ot,
            address as string,
          );
          if (sufficientAllowanceOT || four626bool) {
            setTxConfirming(true);
            if (button) {
              button.innerHTML = BUTTON_TEXT.confirming;
            }
            const [buyTx, afterBalance] = await sendBuyYTTx(
              calledDtAmountMin,
              tradeInput,
              vaultSwapTxAmount,
              address as string,
              getVaultType(params.vaultToken),
              params.vaultToken,
            );
            if (buyTx.substring(0, 2) === "0x") {
              setTxConfirming(false);
              openNotification(
                true,
                `You've successfully bought ${params.dt} yield tokens`,
                `You bought ${formatAsString(calledDtAmountMin)} YTs for ${formatAsString(vaultDT - afterBalance)} ${params.dt}`,
                buyTx,
              );
              if (button) {
                button.innerHTML = BUTTON_TEXT.tradeYT;
              }
              refreshInfo();
              setTimeout(() => {
                openNotification(false, "", "", "");
              }, 10000);
            } else {
              if (button) {
                button.innerHTML = BUTTON_TEXT.tradeYT;
              }
              refreshInfo();
              setTxConfirming(false);
            }
          } else {
            setAllowanceButtons(true);
          }
        } else {
          setAllowanceButtons(true);
        }
      }
    }
  };

  const addAquaberaLiqFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.addLiq);
      return;
    }
    if (tradeInput > vaultDT) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        tradeInput,
        "rusdaqua",
        address as string,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = BUTTON_TEXT.confirming;
        }
        const client = getPublicClient(config);
        const lpAmountResult = await client.simulateContract({
          address: contracts.depositGuard.address as `0x${string}`,
          abi: contracts.depositGuard.abi,
          functionName: "forwardDepositToICHIVault",
          args: [
            "0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6",
            "0x9Fbba6c87923af2561A2391198166b51Cf5736E8",
            contracts.rusd.address,
            parseEther(`${tradeInput}`),
            parseEther(`${0}`),
            address,
          ],
          account: address,
        });
        const lpAmount =
          parseFloat(formatEther(lpAmountResult.result as unknown as bigint)) *
          (1 - slippage.amount / 100);
        const addLiqTx = await sendAddLiqTx(
          tradeInput,
          lpAmount,
          address as `0x${string}`,
        );
        if (addLiqTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            `You've successfully deposited ${params.dt} tokens into the LP`,
            `You deposited ${formatAsString(tradeInput)} ${params.dt}`,
            addLiqTx,
          );
          if (button) {
            button.innerHTML = BUTTON_TEXT.addLiq;
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = BUTTON_TEXT.addLiq;
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const removeAquaberaLiqFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.removeLiq);
      return;
    }
    if (tradeInput > vaultLPBalance) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        tradeInput,
        "rusdaqualp",
        address as string,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = BUTTON_TEXT.confirming;
        }
        const client = getPublicClient(config);
        const lpAmountResult = await client.simulateContract({
          address: contracts.depositGuard.address as `0x${string}`,
          abi: contracts.depositGuard.abi,
          functionName: "forwardWithdrawFromICHIVault",
          args: [
            "0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6",
            "0x9Fbba6c87923af2561A2391198166b51Cf5736E8",
            parseEther(`${tradeInput}`),
            address,
            parseEther(`${0}`),
            parseEther(`${0}`),
          ],
          account: address,
        });
        const lpAmt1 =
          parseFloat(
            formatEther(lpAmountResult.result[0] as unknown as bigint),
          ) *
          (1 - slippage.amount / 100);
        const lpAmt2 =
          parseFloat(
            formatEther(lpAmountResult.result[1] as unknown as bigint),
          ) *
          (1 - slippage.amount / 100);
        const removeLiqTX = await sendRemoveLiqTx(
          tradeInput,
          address as `0x${string}`,
          lpAmt1,
          lpAmt2,
        );
        if (removeLiqTX.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            `You've successfully withdrew your LP`,
            `You withdrew liquidity with ${formatAsString(tradeInput)} LP tokens`,
            removeLiqTX,
          );
          if (button) {
            button.innerHTML = BUTTON_TEXT.removeLiq;
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = BUTTON_TEXT.removeLiq;
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const addSteerLiqFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.addLiq);
      return;
    }
    if(tradeInput > goldivaultWalletInfoOribgt.oribgt) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    }
    if(tradeOutput > goldivaultWalletInfoOribgt.oribgtot) {
      button && (button.innerHTML = BUTTON_TEXT.notEnoughOT);
      return;
    }
    const sufficientDTAllowance: boolean | void = await checkAllowance(
      tradeInput,
      'steeroribgt',
      address as string
    )
    if(sufficientDTAllowance) {
      setDepositDTApproved(true)
      const sufficientOTAllowance: boolean | void = await checkAllowance(
        tradeOutput,
        'steeroribgtot',
        address as string
      )
      if(sufficientOTAllowance) {
        setTxConfirming(true)
        if (button) {
          button.innerHTML = BUTTON_TEXT.confirming;
        }
        const addLiqTx = await sendAddSteerLiqTx(tradeInput, tradeOutput, address as `0x${string}`)
        if(addLiqTx.substring(0, 2) === "0x") {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully added liquidity",
            `You added ${formatAsSmallNum(tradeInput)} oriBGT and ${formatAsSmallNum(tradeOutput)} oriBGT-OT of liquidity`,
            addLiqTx
          )
          if (button) {
            button.innerHTML = BUTTON_TEXT.addLiq;
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        }
        else {
          if (button) {
            button.innerHTML = BUTTON_TEXT.addLiq;
          }
          refreshInfo();
          setTxConfirming(false);
        }
      }
      else {
        setAllowanceButtons(true)
      }
    }
    else {
      setAllowanceButtons(true)
    }
  }

  const addKodiakLiqFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.addLiq);
      return;
    }
    if(tradeInput > popupLPAsset) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    }
    if(tradeOutput > vaultOT) {
      button && (button.innerHTML = BUTTON_TEXT.notEnoughOT);
      return;
    }
    const sufficientDTAllowance: boolean | void = await checkAllowance(
      tradeInput,
      islandSlug,
      address as string
    )
    if(sufficientDTAllowance) {
      setDepositDTApproved(true)
      const sufficientOTAllowance: boolean | void = await checkAllowance(
        tradeOutput,
        islandSlug + 'ot',
        address as string
      )
      if(sufficientOTAllowance) {
        setTxConfirming(true)
        if (button) {
          button.innerHTML = BUTTON_TEXT.confirming;
        }
        const token0 = params.vaultToken === "stlbgt" ? tradeOutput : tradeInput
        const token1 = params.vaultToken === "stlbgt" ? tradeInput : tradeOutput
        const addLiqTx = await sendAddKodiakLiqTx(token0, token1, redeemYT, address as `0x${string}`, kodiakIslandAddy)
        if(addLiqTx.substring(0, 2) === "0x") {
          setTxConfirming(false)
          openNotification(
            true,
            "You've successfully added liquidity",
            `You added ${formatAsSmallNum(tradeInput)} ${popupLPAssetLabel} and ${formatAsSmallNum(tradeOutput)} ${vaultOTLabel} of liquidity`,
            addLiqTx
          )
          if (button) {
            button.innerHTML = BUTTON_TEXT.addLiq;
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        }
        else {
          if (button) {
            button.innerHTML = BUTTON_TEXT.addLiq;
          }
          refreshInfo();
          setTxConfirming(false);
        }
      }
      else {
        setAllowanceButtons(true)
      }
    }
    else {
      setAllowanceButtons(true)
    }
  }

  const removeSteerLiqFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.removeLiq);
      return;
    }
    if(tradeInput > goldivaultWalletInfoOribgt.steerLP) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    }
    setTxConfirming(true);
    if (button) {
      button.innerHTML = BUTTON_TEXT.confirming;
    }
    const removeLiqTx = await sendRemoveSteerLiqTx(tradeInput, address as `0x${string}`)
    if(removeLiqTx.substring(0, 2) === "0x") {
      setTxConfirming(false)
      openNotification(
        true,
        "You've successfully removed liquidity",
        `You removed ${formatAsSmallNum(otAmount)} oriBGT and ${formatAsSmallNum(ytAmount)} oriBGT-OT of liquidity`,
        removeLiqTx
      )
      if (button) {
        button.innerHTML = BUTTON_TEXT.removeLiq;
      }
      refreshInfo()
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    }
    else {
      if (button) {
        button.innerHTML = BUTTON_TEXT.removeLiq;
      }
      refreshInfo();
      setTxConfirming(false);
    }
  }

  const removeKodiakLiqFlow = async (button: HTMLElement | null) => {
    if(tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.removeLiq);
      return;
    }
    if(tradeInput > zapOutAsset) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    }
    const sufficientAllowance: boolean | void = await checkAllowance(
      tradeInput,
      islandSlug + 'lp',
      address as string
    )
    if(sufficientAllowance) {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = BUTTON_TEXT.confirming;
      }
      const token0 = params.vaultToken === "stlbgt" ? ytAmount : otAmount
      const token1 = params.vaultToken === "stlbgt" ? otAmount : ytAmount
      const removeLiqTx = await sendRemoveKodiakLiqTx(tradeInput, token0, token1, address as `0x${string}`, kodiakIslandAddy)
      if(removeLiqTx.substring(0, 2) === "0x") {
        setTxConfirming(false)
        openNotification(
          true,
          "You've successfully removed liquidity",
          `You removed ${formatAsSmallNum(otAmount)} ${popupLPAssetLabel} and ${formatAsSmallNum(ytAmount)} ${vaultOTLabel} of liquidity`,
          removeLiqTx
        )
        if (button) {
          button.innerHTML = BUTTON_TEXT.removeLiq;
        }
        refreshInfo()
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      }
      else {
        if (button) {
          button.innerHTML = BUTTON_TEXT.removeLiq;
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
    else {
      setAllowanceButtons(true)
    }
  }

  const stakingDepositTxFlow = async (button: HTMLElement | null) => {
    if (deposit == 0) {
      button && (button.innerHTML = BUTTON_TEXT.deposit);
      return;
    }
    if (deposit > vaultDT) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      const sufficientDTAllowance: boolean | void = await checkAllowance(
        deposit,
        params.vaultToken,
        address as string,
      );
      if (sufficientDTAllowance) {
        setDepositDTApproved(true);
        const sufficientYTAllowance: boolean | void = await checkAllowance(
          deposit,
          params.yt,
          address as string
        );
        if(sufficientYTAllowance) {
          setTxConfirming(true);
          if (button) {
            button.innerHTML = BUTTON_TEXT.confirming;
          }
          const depositTx = await sendDepositTx(deposit, params.vaultToken);
          if (depositTx.substring(0, 2) === "0x") {
            setTxConfirming(false);
            openNotification(
              true,
              `You've successfully deposited ${params.dt} tokens`,
              `You deposited ${formatAsString(deposit)} ${params.dt}`,
              depositTx,
            );
            if (button) {
              button.innerHTML = BUTTON_TEXT.deposit;
            }
            refreshInfo();
            setTimeout(() => {
              openNotification(false, "", "", "");
            }, 10000);
          } else {
            if (button) {
              button.innerHTML = BUTTON_TEXT.deposit;
            }
            refreshInfo();
            setTxConfirming(false);
          }
        }
        else {
          setAllowanceButtons(true);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const ybgtDepositTxFlow = async (button: HTMLElement | null) => {
    if (deposit == 0) {
      button && (button.innerHTML = BUTTON_TEXT.deposit);
      return;
    }
    if (deposit > vaultDT) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      const sufficientDTAllowance: boolean | void = await checkAllowance(
        deposit,
        params.vaultToken,
        address as string,
      );
      if (sufficientDTAllowance) {
        setDepositDTApproved(true);
        const sufficientYTAllowance: boolean | void = await checkAllowance(
          deposit,
          params.yt,
          address as string
        );
        if(sufficientYTAllowance) {
          if (button) {
            button.innerHTML = BUTTON_TEXT.ybgt;
          }
          await sendApproveTx(deposit, "yBGT", false)
          await send4626DepositTx(deposit, address as `0x${string}`, "ybgt")
          setTxConfirming(true);
          if (button) {
            button.innerHTML = BUTTON_TEXT.confirming;
          }
          const depositTx = await sendDepositTx(deposit, params.vaultToken);
          if (depositTx.substring(0, 2) === "0x") {
            setTxConfirming(false);
            openNotification(
              true,
              `You've successfully deposited ${params.dt} tokens`,
              `You deposited ${formatAsString(deposit)} ${params.dt}`,
              depositTx,
            );
            if (button) {
              button.innerHTML = BUTTON_TEXT.deposit;
            }
            refreshInfo();
            setTimeout(() => {
              openNotification(false, "", "", "");
            }, 10000);
          } else {
            if (button) {
              button.innerHTML = BUTTON_TEXT.deposit;
            }
            refreshInfo();
            setTxConfirming(false);
          }
        }
        else {
          setAllowanceButtons(true);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  }

  const redeemYbgtOTFlow = async (button: HTMLElement | null) => {
    if (redeemOT == 0) {
      button && (button.innerHTML = BUTTON_TEXT.redeemOT);
      return;
    }
    if (redeemOT > vaultOT) {
      button && (button.innerHTML = BUTTON_TEXT.notEnoughOT);
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = BUTTON_TEXT.confirming;
      }
      const redeemOTTx = await sendRedeemOTTx(redeemOT, params.vaultToken);
      if(button) {
        button.innerHTML = BUTTON_TEXT.withdrawybgt
      }
      await send4626RedeemTx(redeemOT, address as `0x${string}`, "ybgt")
      if (redeemOTTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully redeemed your ownership tokens",
          `You redeemed ${formatAsString(redeemOT)} ownership tokens`,
          redeemOTTx,
        );
        if (button) {
          button.innerHTML = "Redeem OT";
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "Redeem OT";
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const stakeYTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.stakeYT);
      return;
    }
    if (tradeInput > justYt) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        tradeInput,
        vaultYTLabel,
        address as string,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = BUTTON_TEXT.confirming;
        }
        const stakeTx = await sendStakeYTTx(tradeInput, params.vaultToken);
        if (stakeTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            `You've successfully staked ${vaultYTLabel}`,
            `You staked ${formatAsString(tradeInput)} ${vaultYTLabel}`,
            stakeTx,
          );
          if (button) {
            button.innerHTML = BUTTON_TEXT.stakeYT;
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = BUTTON_TEXT.stakeYT;
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  }

  const unstakeYTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = BUTTON_TEXT.unstakeYT);
      return;
    }
    if (tradeInput > stakedYt) {
      button && (button.innerHTML = BUTTON_TEXT.notEnough);
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = BUTTON_TEXT.confirming;
      }
      const unstakeTx = await sendUnstakeYTTx(tradeInput, params.vaultToken);
      if (unstakeTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          `You've successfully unstaked ${vaultYTLabel}`,
          `You unstaked ${formatAsString(tradeInput)} ${vaultYTLabel}`,
          unstakeTx,
        );
        if (button) {
          button.innerHTML = BUTTON_TEXT.unstakeYT;
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = BUTTON_TEXT.unstakeYT;
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  }

  const claimFlow = async (button: HTMLElement | null) => {
    if (claimable == 0) {
      button && (button.innerHTML = BUTTON_TEXT.claim);
      return;
    }
    setTxConfirming(true);
    if (button) {
      button.innerHTML = BUTTON_TEXT.confirming;
    }
    const claimTx = await sendClaimTx(params.vaultToken);
    if(params.vaultToken === "ybgt") {
      if(button) {
        button.innerHTML = BUTTON_TEXT.withdrawybgt
      }
      await send4626RedeemTx(claimable, address as `0x${string}`, "ybgt")
    }
    if (claimTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        `You've successfully claimed ${vaultDTLabel} yield`,
        `You claimed ${formatAsString(claimable)} ${vaultDTLabel}`,
        claimTx,
      );
      if (button) {
        button.innerHTML = BUTTON_TEXT.claim;
      }
      refreshInfo();
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      if (button) {
        button.innerHTML = BUTTON_TEXT.claim;
      }
      refreshInfo();
      setTxConfirming(false);
    }
  }

  const zapInFlow = async (button: HTMLElement | null) => {
    // (i) Deposit % (determined by current ratio) into origami for oriBGT
    // (ii) Deposit remainder into goldivault for oriBGT-OT/YT
    // (iii) Deposit both into Steer to get the LP token
    // (iv) stake LP token in reward vault
    if(zap == 0) {
      button && (button.innerHTML = BUTTON_TEXT.zapIn);
      return;
    }
    setTxConfirming(true);
    if (button) {
      button.innerHTML = BUTTON_TEXT.confirming;
    }
    const [account] = await walletClient.getAddresses()
    const { id: zapTx } = await walletClient.sendCalls({
      account: account,
      calls: zapInCalls(account)
    })
    if(zapTx.substring(0, 2) === "0x") {
      setTxConfirming(false)
      openNotification(
        true,
        "You have successfully zapped liquidity",
        `You zapped ${formatAsString(zap)} ${zapInAssetLabel(selectedZapAsset)}`,
        zapTx
      )
      if (button) {
        button.innerHTML = BUTTON_TEXT.zapIn
      }
      refreshInfo();
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    }
    else {
      if (button) {
        button.innerHTML = BUTTON_TEXT.zapIn;
      }
      refreshInfo();
      setTxConfirming(false);
    }
  }

  const zapOutFlow = async (button: HTMLElement | null) => {
    // (i) unstake from reward vault
    // (ii) withdraw LP from steer
    // (iii) redeem OT/YT for iBGT
    // (iv) redeem oriBGT for iBGT
    if(zap == 0) {
      button && (button.innerHTML = BUTTON_TEXT.zapOut);
      return;
    }
    setTxConfirming(true)
    if (button) {
      button.innerHTML = BUTTON_TEXT.confirming;
    }
    const [account] = await walletClient.getAddresses()
    const { id: zapOutTx } = await walletClient.sendCalls({
      account: account,
      calls: zapOutCalls(account, debouncedZap)
    })
    if(zapOutTx.substring(0, 2) === "0x") {
      setTxConfirming(false)
      openNotification(
        true,
        "You have successfully unzapped liquidity",
        `You unzapped ${formatAsString(zap)} ${zapOutAssetLabel}`,
        zapOutTx
      )
      if (button) {
        button.innerHTML = BUTTON_TEXT.zapOut
      }
      refreshInfo();
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    }
    else {
      if (button) {
        button.innerHTML = BUTTON_TEXT.zapOut;
      }
      refreshInfo();
      setTxConfirming(false);
    }
  }

  const handleLeftButtonClick = async () => {
    const swapButton = document.getElementById("swap-button");
    const leftButton = document.getElementById("left-approve-button");
    const rightButton = document.getElementById("right-approve-button");
    if (leftButton) {
      leftButton.innerHTML = BUTTON_TEXT.approving;
      leftButton.style.backgroundColor = COLORS.button.disabled;
      leftButton.style.color = COLORS.button.disabledText;
    }
    if (rightButton) {
      rightButton.innerHTML = BUTTON_TEXT.approving;
      rightButton.style.backgroundColor = COLORS.button.disabled;
      rightButton.style.color = COLORS.button.disabledText;
    }
    let addy;
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        addy = vaultOTaddy;
      } else {
        addy = LPassetaddy;
      }
    } else {
      if (tradeDirection === "OUT") {
        addy = LPassetaddy;
      } else {
        addy = LPassetaddy;
      }
    }
    if (activeToggle === "TRADEOT") {
      await sendRouterV2ApproveTx(
        tradeInput,
        addy,
        false,
        getVaultType(params.vaultToken),
      );
    } else if (activeToggle === "TRADEYT") {
      if (tradeDirection === "OUT") {
        await sendApproveTx(honeyApprovalAmount, params.vaultToken, false);
      } else {
        if (honeyApproved) {
          await sendApproveTx(otApprovalAmount, params.ot, false);
        } else {
          await sendApproveTx(honeyApprovalAmount, params.vaultToken, false);
        }
      }
    } else if (activeToggle === "ADDLIQ") {
      if(params.vaultToken === "rusd") {
        await sendApproveTx(tradeInput, "rusdaqua", false);
      }
      else {
        if(depositDTApproved) {
          await sendApproveTx(tradeOutput, islandSlug + 'ot', false)
        }
        else {
          await sendApproveTx(tradeInput, islandSlug, false)
        }
      }
    } else if (activeToggle === "REMOVELIQ") {
      if(params.vaultToken === "rusd") {
        await sendApproveTx(tradeInput, "rusdaqualp", false);
      }
      else {
        await sendApproveTx(tradeInput, islandSlug + 'lp', false)
      }
    } else if (activeToggle === "STAKE") {
      await sendApproveTx(tradeInput, vaultYTLabel, false);
    } else {
      if(depositDTApproved) {
        await sendApproveTx(deposit, params.yt, false);
      }
      else {
        await sendApproveTx(deposit, params.vaultToken, false);
      }
    }
    //todo: wat
    // updateAllowance(honeyBuy + 0.01)
    swapButton && (swapButton.innerHTML = BUTTON_TEXT.deposit);
    setAllowanceButtons(false);
  };

  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById("swap-button");
    const rightButton = document.getElementById("right-approve-button");
    const leftButton = document.getElementById("left-approve-button");
    if (leftButton) {
      leftButton.innerHTML = BUTTON_TEXT.approving;
      leftButton.style.backgroundColor = COLORS.button.disabled;
      leftButton.style.color = COLORS.button.disabledText;
    }
    if (rightButton) {
      rightButton.innerHTML = BUTTON_TEXT.approving;
      rightButton.style.backgroundColor = COLORS.button.disabled;
      rightButton.style.color = COLORS.button.disabledText;
    }
    let addy;
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        addy = vaultOTaddy;
      } else {
        addy = LPassetaddy;
      }
    } else {
      if (tradeDirection === "OUT") {
        addy = LPassetaddy;
      } else {
        addy = LPassetaddy;
      }
    }
    if (activeToggle === "TRADEOT") {
      await sendRouterV2ApproveTx(
        0,
        addy,
        true,
        getVaultType(params.vaultToken),
      );
    } else if (activeToggle === "TRADEYT") {
      if (tradeDirection === "OUT") {
        await sendApproveTx(0, params.vaultToken, true);
      } else {
        if (honeyApproved) {
          await sendApproveTx(0, params.ot, true);
        } else {
          await sendApproveTx(0, params.vaultToken, true);
        }
      }
    } else if (activeToggle === "ADDLIQ") {
      if(params.vaultToken === "rusd") {
        await sendApproveTx(0, "rusdaqua", true);
      }
      else {
        if(depositDTApproved) {
          await sendApproveTx(0, "steeroribgtot", true)
        }
        else {
          await sendApproveTx(0, "steeroribgt", true)
        }
      }
    } else if (activeToggle === "REMOVELIQ") {
      if(params.vaultToken === "rusd") {
        await sendApproveTx(0, "rusdaqualp", true);
      }
      else {
        await sendApproveTx(0, islandSlug + 'ot', true)
      }
    } else if (activeToggle === "STAKE") {
      await sendApproveTx(0, vaultYTLabel, true)
    } else {
      if(depositDTApproved) {
        await sendApproveTx(0, params.yt, true);
      }
      else {
        await sendApproveTx(0, params.vaultToken, true);
      }
    }
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = BUTTON_TEXT.deposit);
    setAllowanceButtons(false);
  };

  const renderButton = (): string => {
    if (activeToggle === "DEPOSIT") {
      if (
        isConnected &&
        debouncedDeposit > vaultDTAllowance &&
        vaultDT >= debouncedDeposit &&
        deposit > vaultDT
      ) {
        return BUTTON_TEXT.approve(params.vaultToken);
      }
      return BUTTON_TEXT.deposit;
    } else if (activeToggle === "REDEEMOT") {
      return BUTTON_TEXT.redeemOT;
    } else if (activeToggle === "TRADEOT") {
      return BUTTON_TEXT.tradeOT;
    } else if (activeToggle === "ADDLIQ" && !zapPopup) {
      return BUTTON_TEXT.addLiq;
    } else if (activeToggle === "ADDLIQ" && zapPopup) {
      return BUTTON_TEXT.zapIn;
    } else if (activeToggle === "REMOVELIQ" && !zapPopup) {
      return BUTTON_TEXT.removeLiq;
    } else if (activeToggle === "REMOVELIQ" && zapPopup) {
      return BUTTON_TEXT.zapOut;
    } else if (activeToggle === "STAKE") {
      return BUTTON_TEXT.stakeYT;
    } else if (activeToggle === "UNSTAKE") {
      return BUTTON_TEXT.unstakeYT;
    } else if (activeToggle === "CLAIM") {
      return BUTTON_TEXT.claim;
    } else {
      return BUTTON_TEXT.tradeYT;
    }
  };

  return (
    <>
      {allowanceButtons && (
        <div>
          <button
            className={cn(BUTTON_CLASSES)}
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            Approve Tx
          </button>
          <button
            className={`${cn(BUTTON_CLASSES)} mt-2`}
            id="right-approve-button"
            onClick={() => handleRightButtonClick()}
          >
            Approve Infinite
          </button>
        </div>
      )}
      {!allowanceButtons && (
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openConnectModal }) => {
            return (
              <button
              className={cn(BUTTON_CLASSES)}
                id="deposit-button"
                onClick={() => {
                  const button = document.getElementById("deposit-button");

                  if (!account) {
                    if (button && button.innerHTML === BUTTON_TEXT.connect) {
                      openConnectModal();
                    } else {
                      button && (button.innerHTML = BUTTON_TEXT.connect);
                    }
                  } else if (chain?.name !== "Berachain") {
                    if (button && button.innerHTML === BUTTON_TEXT.where) {
                      openChainModal();
                    } else {
                      button && (button.innerHTML = BUTTON_TEXT.where);
                    }
                  } else {
                    handleButtonClick();
                  }
                }}
              >
                {renderButton()}
              </button>
            );
          }}
        </ConnectButton.Custom>
      )}
    </>
  );
};

export default TxButton;
