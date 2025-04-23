"use client";

import { useState } from "react";

import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getPublicClient } from "@wagmi/core";

import { useGoldivaultTx } from "../../../hooks";
import { useGoldivault } from "../../../providers";
import { config } from "../../../providers/WagmiProvider";
import { contracts } from "../../../utils/addressi";

type VaultButtonProps = {
  params: {
    vaultToken: string;
    dt: string;
    ot: string;
    yt: string;
  };
};

const COLORS = {
  button: {
    base: "#322514",
    hover: "#4A3A23",
    active: "#5C462A",
    text: "#EFEFEF",
    disabled: "#4A4339",
    disabledText: "#808080",
  },
  beraBrown: {
    base: "#231A0F",
    dark: "#1A140C",
    border: "#352A1C",
  },
  teak: "#CFA08B",
  honeyYellow: "#E7B941",
  warmText: "#4A4339",
}

const BUTTON_CLASSES = `
    w-full h-[54px] rounded-xl transition duration-150
    bg-[${COLORS.button.base}] 
    text-${COLORS.button.text} font-inter text-lg font-bold
    disabled:text-${COLORS.button.disabledText}
    disabled:bg-[${COLORS.button.disabled}]
    hover:bg-[${COLORS.button.hover}]
    active:bg-[${COLORS.button.active}]
  `;

export const VaultButton = ({ params }: VaultButtonProps) => {
  const [honeyApproved, setHoneyApproved] = useState<boolean>(false);
  const [depositDTApproved, setDepositDTApproved] = useState<boolean>(false);

  const {
    deposit,
    redeemOT,
    tradeInput,
    tradeOutput,
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
    goldivaultWalletInfoWeeth,
    goldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoUnibtc,
    goldivaultWalletInfoRusd,
    goldivaultWalletInfoEbtc,
    goldivaultWalletInfoRseth,
    // getVaultWalletInfo,
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
  } = useGoldivault();

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
    sendClaimTx
  } = useGoldivaultTx();

  const { address, isConnected } = useAccount();

  const vaultOT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weot
      : params.vaultToken === "solvbtc"
        ? goldivaultWalletInfoSolvbtc.solvbtcot
        : params.vaultToken === "unibtc"
          ? goldivaultWalletInfoUnibtc.unibtcot
          : params.vaultToken === "rusd"
            ? goldivaultWalletInfoRusd.rusdot
            : params.vaultToken === "ebtc"
              ? goldivaultWalletInfoEbtc.ebtcot
              : params.vaultToken === "rseth"
                ? goldivaultWalletInfoRseth.rsethot
                : params.vaultToken === "oribgt"
                  ? goldivaultWalletInfoOribgt.oribgtot
                  : {};

  const vaultYT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weyt
      : params.vaultToken === "solvbtc"
        ? goldivaultWalletInfoSolvbtc.solvbtcyt
        : params.vaultToken === "unibtc"
          ? goldivaultWalletInfoUnibtc.unibtcyt
          : params.vaultToken === "rusd"
            ? goldivaultWalletInfoRusd.rusdyt
            : params.vaultToken === "ebtc"
              ? goldivaultWalletInfoEbtc.ebtcyt
              : params.vaultToken === "rseth"
                ? goldivaultWalletInfoRseth.rsethyt
                : params.vaultToken === "oribgt"
                  ? goldivaultWalletInfoOribgt.oribgtyt
                  : {};

  const vaultDT =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weeth
      : params.vaultToken === "solvbtc"
        ? goldivaultWalletInfoSolvbtc.solvbtc
        : params.vaultToken === "unibtc"
          ? goldivaultWalletInfoUnibtc.unibtc
          : params.vaultToken === "rusd"
            ? goldivaultWalletInfoRusd.rusd
            : params.vaultToken === "ebtc"
              ? goldivaultWalletInfoEbtc.ebtc
              : params.vaultToken === "rseth"
                ? goldivaultWalletInfoRseth.rseth
                : params.vaultToken === "oribgt"
                  ? goldivaultWalletInfoOribgt.ibgt
                  : {};

  const vaultOTaddy =
    params.vaultToken === "weeth"
      ? contracts.weot.address
      : params.vaultToken === "solvbtc"
        ? contracts.solvbtcot.address
        : params.vaultToken === "unibtc"
          ? contracts.unibtcot.address
          : params.vaultToken === "rusd"
            ? contracts.rusdot.address
            : params.vaultToken === "ebtc"
              ? contracts.ebtcot.address
              : params.vaultToken === "rseth"
                ? contracts.rsethot.address
                : params.vaultToken === "oribgt"
                  ? contracts.oribgtot.address
                  : "";

  const vaultDTaddy =
    params.vaultToken === "weeth"
      ? contracts.weeth.address
      : params.vaultToken === "solvbtc"
        ? contracts.solvbtc.address
        : params.vaultToken === "unibtc"
          ? contracts.unibtc.address
          : params.vaultToken === "rusd"
            ? contracts.rusd.address
            : params.vaultToken === "ebtc"
              ? contracts.ebtc.address
              : params.vaultToken === "rseth"
                ? contracts.rseth.address
                : params.vaultToken === "oribgt"
                  ? contracts.ibgt.address
                  : "";

  const vaultDTAllowance =
    params.vaultToken === "weeth"
      ? goldivaultWalletInfoWeeth.weethVaultAllowance
      : params.vaultToken === "solvbtc"
        ? goldivaultWalletInfoSolvbtc.solvbtcAllowance
        : params.vaultToken === "unibtc"
          ? goldivaultWalletInfoUnibtc.unibtcAllowance
          : params.vaultToken === "rusd"
            ? goldivaultWalletInfoRusd.rusdAllowance
            : params.vaultToken === "ebtc"
              ? goldivaultWalletInfoEbtc.ebtcAllowance
              : params.vaultToken === "rseth"
                ? goldivaultWalletInfoRseth.rsethAllowance
                : params.vaultToken === "oribgt"
                  ? goldivaultWalletInfoOribgt.ibgtAllowance
                  : 0;

  const vaultLPBalance = params.vaultToken === "rusd" ? goldivaultWalletInfoRusd.rusdaquabera : 0;

  // @note what is this?
  const four626bool = params.vaultToken === "oribgt"

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
      if(params.vaultToken === "oribgt") {
        stakingDepositTxFlow(button);
      }
      else {
        depositTxFlow(button);
      }
    }
    if (activeToggle === "REDEEMOT") {
      redeemOTFlow(button);
    }
    if (activeToggle === "TRADEOT") {
      tradeOTFlow(button);
    }
    if (activeToggle === "TRADEYT") {
      tradeYTFlow(button);
    }
    if (activeToggle === "ADDLIQ") {
      addLiqFlow(button);
    }
    if (activeToggle === "REMOVELIQ") {
      removeLiqFlow(button);
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
      button && (button.innerHTML = "Deposit");
      return;
    }
    if (deposit > vaultDT) {
      button && (button.innerHTML = "Not enough");
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
          button.innerHTML = "Confirming...";
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
            button.innerHTML = "Deposit";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "Deposit";
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
      button && (button.innerHTML = "redeem ot");
      return;
    }
    if (redeemOT > vaultOT) {
      button && (button.innerHTML = "not enough");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
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
          button.innerHTML = "redeem ot";
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "redeem ot";
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const tradeOTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = "trade ot");
      return;
    }
    let num;
    let addy;
    if (tradeDirection === "OUT") {
      num = vaultOT;
      addy = vaultOTaddy;
    } else {
      num = vaultDT;
      addy = vaultDTaddy;
    }
    if (tradeInput > num) {
      button && (button.innerHTML = "not enough");
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
          button.innerHTML = "confirming...";
        }
        let pathOne;
        let pathTwo;
        let tokenOne;
        let tokenTwo;
        if (tradeDirection === "OUT") {
          pathOne = vaultOTaddy;
          pathTwo = vaultDTaddy;
          tokenOne = params.ot;
          tokenTwo = params.dt;
        } else {
          pathOne = vaultDTaddy;
          pathTwo = vaultOTaddy;
          tokenOne = params.dt;
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
            button.innerHTML = "trade ot";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "trade ot";
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const getVaultType = (vault: string): string => {
    switch (vault) {
      // ETH Vaults
      case "weeth":
      case "rseth":
      case "rusd":
      case "oribgt":
        return "eth";
      // BTC Vaults
      case "ebtc":
      case "unibtc":
        return "btc";
      // Default to ETH
      default:
        return "eth";
    }
  };

  const tradeYTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = "trade yt");
      return;
    }
    // if (
    //   !checkVaultLiquidity(params.vaultToken, getVaultType(params.vaultToken))
    // ) {
    //   button && (button.innerHTML = "not enuf liq");
    //   return;
    // }
    if (priceImpact > slippage.amount) {
      button && (button.innerHTML = "raise slippage");
      return;
    }
    if (tradeDirection === "OUT") {
      if (tradeInput > vaultYT) {
        button && (button.innerHTML = "not enough");
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
            button.innerHTML = "confirming...";
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
              `You've successfully sold ${params.dt} yield tokens`,
              `You sold ${formatAsString(tradeInput)} YTs for ${formatAsString(afterBalance - vaultDT)} ${params.dt}`,
              sellTx,
            );
            if (button) {
              button.innerHTML = "trade yt";
            }
            refreshInfo();
            setTimeout(() => {
              openNotification(false, "", "", "");
            }, 10000);
          } else {
            if (button) {
              button.innerHTML = "trade yt";
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
        button && (button.innerHTML = "not enough");
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
              button.innerHTML = "confirming...";
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
                button.innerHTML = "trade yt";
              }
              refreshInfo();
              setTimeout(() => {
                openNotification(false, "", "", "");
              }, 10000);
            } else {
              if (button) {
                button.innerHTML = "trade yt";
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

  const addLiqFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = "Add Liq");
      return;
    }
    if (tradeInput > vaultDT) {
      button && (button.innerHTML = "Not Enough");
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
          button.innerHTML = "confirming...";
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
            button.innerHTML = "add liq";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "add liq";
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const removeLiqFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = "Remove Liq");
      return;
    }
    if (tradeInput > vaultLPBalance) {
      button && (button.innerHTML = "Not Enough");
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
          button.innerHTML = "Confirming...";
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
            button.innerHTML = "Remove Liq";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "Remove Liq";
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const stakingDepositTxFlow = async (button: HTMLElement | null) => {
    if (deposit == 0) {
      button && (button.innerHTML = "Deposit");
      return;
    }
    if (deposit > vaultDT) {
      button && (button.innerHTML = "Not Enough");
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
            button.innerHTML = "confirming...";
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
              button.innerHTML = "Deposit";
            }
            refreshInfo();
            setTimeout(() => {
              openNotification(false, "", "", "");
            }, 10000);
          } else {
            if (button) {
              button.innerHTML = "Deposit";
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

  const stakeYTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = "Stake YT");
      return;
    }
    if (tradeInput > goldivaultWalletInfoOribgt.justYt) {
      button && (button.innerHTML = "Not Enough");
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        tradeInput,
        'oriBGT-YT',
        address as string,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = "confirming...";
        }
        const stakeTx = await sendStakeYTTx(tradeInput);
        if (stakeTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            `You've successfully staked oriBGT-YT`,
            `You staked ${formatAsString(tradeInput)} oriBGT-YT`,
            stakeTx,
          );
          if (button) {
            button.innerHTML = "Stake YT";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "Stake YT";
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
      button && (button.innerHTML = "Unstake YT");
      return;
    }
    if (tradeInput > goldivaultWalletInfoOribgt.stakedYt) {
      button && (button.innerHTML = "Not Enough");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "Confirming...";
      }
      const unstakeTx = await sendUnstakeYTTx(tradeInput);
      if (unstakeTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully unstaked oriBGT-YT",
          `You unstaked ${formatAsString(tradeInput)} oriBGT-YT`,
          unstakeTx,
        );
        if (button) {
          button.innerHTML = "Unstake YT";
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "Unstake YT";
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  }

  const claimFlow = async (button: HTMLElement | null) => {
    if (goldivaultWalletInfoOribgt.claiamble == 0) {
      button && (button.innerHTML = "Claim");
      return;
    }
    setTxConfirming(true);
    if (button) {
      button.innerHTML = "confirming...";
    }
    const claimTx = await sendClaimTx();
    if (claimTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        "You've successfully claim oriBGT yield",
        `You claimed ${formatAsString(goldivaultWalletInfoOribgt.claimable)} oriBGT`,
        claimTx,
      );
      if (button) {
        button.innerHTML = "Claim";
      }
      refreshInfo();
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      if (button) {
        button.innerHTML = "Claim";
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
      leftButton.innerHTML = "Approving...";
      leftButton.style.backgroundColor = COLORS.button.disabled;
      leftButton.style.color = COLORS.button.disabledText;
    }
    if (rightButton) {
      rightButton.innerHTML = "Approving...";
      rightButton.style.backgroundColor = COLORS.button.disabled;
      rightButton.style.color = COLORS.button.disabledText;
    }
    let addy;
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        addy = vaultOTaddy;
      } else {
        addy = vaultDTaddy;
      }
    } else {
      if (tradeDirection === "OUT") {
        addy = vaultDTaddy;
      } else {
        addy = vaultDTaddy;
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
      await sendApproveTx(tradeInput, "rusdaqua", false);
    } else if (activeToggle === "REMOVELIQ") {
      await sendApproveTx(tradeInput, "rusdaqualp", false);
    } else if (activeToggle === "STAKE") {
      await sendApproveTx(tradeInput, "oriBGT-YT", false);
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
    swapButton && (swapButton.innerHTML = "deposit");
    setAllowanceButtons(false);
  };

  const handleRightButtonClick = async () => {
    const swapButton = document.getElementById("swap-button");
    const rightButton = document.getElementById("right-approve-button");
    const leftButton = document.getElementById("left-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "Approving...";
      leftButton.style.backgroundColor = COLORS.button.disabled;
      leftButton.style.color = COLORS.button.disabledText;
    }
    if (rightButton) {
      rightButton.innerHTML = "Approving...";
      rightButton.style.backgroundColor = COLORS.button.disabled;
      rightButton.style.color = COLORS.button.disabledText;
    }
    let addy;
    if (activeToggle === "TRADEOT") {
      if (tradeDirection === "OUT") {
        addy = vaultOTaddy;
      } else {
        addy = vaultDTaddy;
      }
    } else {
      if (tradeDirection === "OUT") {
        addy = vaultDTaddy;
      } else {
        addy = vaultDTaddy;
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
      await sendApproveTx(0, "rusdaqua", true);
    } else if (activeToggle === "REMOVELIQ") {
      await sendApproveTx(0, "rusdaqualp", true);
    } else if (activeToggle === "STAKE") {
      await sendApproveTx(0, "oriBGT-YT", true)
    } else {
      if(depositDTApproved) {
        await sendApproveTx(0, params.yt, true);
      }
      else {
        await sendApproveTx(0, params.vaultToken, true);
      }
    }
    // updateAllowance(100000000)
    swapButton && (swapButton.innerHTML = "deposit");
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
        return `Approve ${params.vaultToken}`;
      }
      return "Deposit";
    } else if (activeToggle === "REDEEMOT") {
      return "Redeem OT";
    } else if (activeToggle === "TRADEOT") {
      return "Trade OT";
    } else if (activeToggle === "ADDLIQ") {
      return "Add Liquidity";
    } else if (activeToggle === "REMOVELIQ") {
      return "Remove Liquidity";
    } else if (activeToggle === "STAKE") {
      return "Stake YT";
    } else if (activeToggle === "UNSTAKE") {
      return "Unstake YT";
    } else if (activeToggle === "CLAIM") {
      return "Claim";
    } else {
      return "Trade YT";
    }
  };

  return (
    <>
      {allowanceButtons && (
        <div>
          <button
            className={BUTTON_CLASSES}
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            Approve Tx
          </button>
          <button
            className={BUTTON_CLASSES}
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
              /**
               * uppercase min-w-64 min-h-12 cursor-pointer border-2 border-black
                  bg-[#E7B941] font-baloo text-[4vw] text-black hover:scale-110 
                  hover:border-[#E7B941] hover:bg-[#033E5E] hover:text-[#E7B941]
                  md:text-[3vw] lg:left-[41.6%] lg:top-[72.5%] lg:w-[16.6%] lg:text-[2vw
               */
              <button
                className={BUTTON_CLASSES}
                id="deposit-button"
                onClick={() => {
                  const button = document.getElementById("deposit-button");

                  if (!account) {
                    if (button && button.innerHTML === "connect wallet") {
                      openConnectModal();
                    } else {
                      button && (button.innerHTML = "connect wallet");
                    }
                  } else if (chain?.name !== "Berachain") {
                    if (button && button.innerHTML === "where berachain") {
                      openChainModal();
                    } else {
                      button && (button.innerHTML = "where berachain");
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
