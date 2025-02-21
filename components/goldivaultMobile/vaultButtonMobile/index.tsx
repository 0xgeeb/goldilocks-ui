"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useGoldivault } from "../../../providers";
import { useGoldivaultTx } from "../../../hooks";
import { contracts } from "../../../utils/addressi";
import { formatEther, parseEther } from "viem"
import { getPublicClient } from "@wagmi/core"
import { config } from "../../../providers/WagmiProvider";

type VaultButtonProps = {
  params: {
    vaultToken: string;
    dt: string;
    ot: string;
    yt: string;
  };
};

export const VaultButtonMobile = ({ params }: VaultButtonProps) => {
  const [honeyApproved, setHoneyApproved] = useState<boolean>(false);

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
    refreshGoldivaultInfoWeeth,
    refreshGoldivaultWalletInfoWeeth,
    goldivaultWalletInfoWeeth,
    refreshGoldivaultInfoSolvbtc,
    refreshGoldivaultWalletInfoSolvbtc,
    goldivaultWalletInfoSolvbtc,
    refreshGoldivaultInfoUnibtc,
    refreshGoldivaultWalletInfoUnibtc,
    goldivaultWalletInfoUnibtc,
    refreshGoldivaultInfoRusd,
    refreshGoldivaultWalletInfoRusd,
    goldivaultWalletInfoRusd,
    refreshGoldivaultInfoEbtc,
    refreshGoldivaultWalletInfoEbtc,
    goldivaultWalletInfoEbtc,
    vaultSwapTxAmount,
    honeyApprovalAmount,
    otApprovalAmount,
    checkVaultLiquidity,
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
    sendRemoveLiqTx
  } = useGoldivaultTx();

  const { address, isConnected } = useAccount();

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  };

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
              : 0;

  const vaultDTBalance =
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
              : 0;

  const vaultLPBalance =
    params.vaultToken === "rusd"
      ? goldivaultWalletInfoRusd.rusdaquabera
      : 0

  const refreshInfo = () => {
    if (params.vaultToken === "weeth") {
      refreshGoldivaultInfoWeeth();
      refreshGoldivaultWalletInfoWeeth();
    } else if (params.vaultToken === "solvbtc") {
      refreshGoldivaultInfoSolvbtc();
      refreshGoldivaultWalletInfoSolvbtc();
    } else if (params.vaultToken === "rusd") {
      refreshGoldivaultInfoRusd();
      refreshGoldivaultWalletInfoRusd();
    } else if (params.vaultToken === "ebtc") {
      refreshGoldivaultInfoEbtc();
      refreshGoldivaultWalletInfoEbtc();
    } else {
      refreshGoldivaultInfoUnibtc();
      refreshGoldivaultWalletInfoUnibtc();
    }
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
      depositTxFlow(button);
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
      addLiqFlow(button)
    }
    if (activeToggle === "REMOVELIQ") {
      removeLiqFlow(button)
    }
  };

  const depositTxFlow = async (button: HTMLElement | null) => {
    if (deposit == 0) {
      button && (button.innerHTML = "deposit");
      return;
    }
    if (deposit > vaultDT) {
      button && (button.innerHTML = "not enough");
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
            button.innerHTML = "deposit";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "deposit";
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
    if (vault === "weeth") {
      return "eth";
    } else if (vault === "rseth") {
      return "eth";
    } else if (vault === "ebtc") {
      return "btc";
    } else if (vault === "unibtc") {
      return "btc";
    } else if (vault === "rusd") {
      return "eth";
    } else {
      return "eth";
    }
  };

  const tradeYTFlow = async (button: HTMLElement | null) => {
    if (tradeInput == 0) {
      button && (button.innerHTML = "trade yt");
      return;
    }
    if (
      !checkVaultLiquidity(params.vaultToken, getVaultType(params.vaultToken))
    ) {
      button && (button.innerHTML = "not enuf liq");
      return;
    }
    if (priceImpact > slippage.amount) {
      button && (button.innerHTML = "raise slippage");
      return;
    }
    if (tradeDirection === "OUT") {
      if (tradeInput > vaultYT) {
        button && (button.innerHTML = "not enough");
        return;
      } else {
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
              `You sold ${formatAsString(tradeInput)} YTs for ${formatAsString(afterBalance - vaultDTBalance)} ${params.dt}`,
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
        const sufficientAllowanceHoney: boolean | void = await checkAllowance(
          honeyApprovalAmount,
          params.vaultToken,
          address as string,
        );
        if (sufficientAllowanceHoney) {
          setHoneyApproved(true);
          const sufficientAllowanceOT: boolean | void = await checkAllowance(
            otApprovalAmount,
            params.ot,
            address as string,
          );
          if (sufficientAllowanceOT) {
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
                `You bought ${formatAsString(calledDtAmountMin)} YTs for ${formatAsString(vaultDTBalance - afterBalance)} ${params.dt}`,
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
        button && (button.innerHTML = "add liq");
        return;
      }
      if (tradeInput > vaultDT) {
        button && (button.innerHTML = "not enough");
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
            functionName: 'forwardDepositToICHIVault',
            args: [
              "0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6",
              "0x9Fbba6c87923af2561A2391198166b51Cf5736E8",
              contracts.rusd.address,
              parseEther(`${tradeInput}`),
              parseEther(`${0}`),
              address
            ],
            account: address
          })
          const lpAmount = parseFloat(formatEther(lpAmountResult.result as unknown as bigint)) * (1 - slippage.amount / 100)
          const addLiqTx = await sendAddLiqTx(tradeInput, lpAmount, address as `0x${string}`);
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
    }
  
    const removeLiqFlow = async (button: HTMLElement | null) => {
      if (tradeInput == 0) {
        button && (button.innerHTML = "remove liq");
        return;
      }
      if (tradeInput > vaultLPBalance) {
        button && (button.innerHTML = "not enough");
        return;
      } else {
        const sufficientAllowance: boolean | void = await checkAllowance(
          tradeInput,
          "rusdaqualp",
          address as string,
        );
        if(sufficientAllowance) {
          setTxConfirming(true);
          if (button) {
            button.innerHTML = "confirming...";
          }
          const client = getPublicClient(config);
          const lpAmountResult = await client.simulateContract({
            address: contracts.depositGuard.address as `0x${string}`,
            abi: contracts.depositGuard.abi,
            functionName: 'forwardWithdrawFromICHIVault',
            args: [
              "0x20a49a266AE70d07Ba066Ef1F8b6e670216Ab2a6",
              "0x9Fbba6c87923af2561A2391198166b51Cf5736E8",
              parseEther(`${tradeInput}`),
              address,
              parseEther(`${0}`),
              parseEther(`${0}`)
            ],
            account: address
          })
          const lpAmt1 = parseFloat(formatEther(lpAmountResult.result[0] as unknown as bigint)) * (1 - slippage.amount / 100)
          const lpAmt2 = parseFloat(formatEther(lpAmountResult.result[1] as unknown as bigint)) * (1 - slippage.amount / 100)
          const removeLiqTX = await sendRemoveLiqTx(tradeInput, address as `0x${string}`, lpAmt1, lpAmt2);
          if (removeLiqTX.substring(0, 2) === "0x") {
            setTxConfirming(false);
            openNotification(
              true,
              `You've successfully withdrew your LP`,
              `You withdrew liquidity with ${formatAsString(tradeInput)} LP tokens`,
              removeLiqTX,
            );
            if (button) {
              button.innerHTML = "remove liq";
            }
            refreshInfo();
            setTimeout(() => {
              openNotification(false, "", "", "");
            }, 10000);
          } else {
            if (button) {
              button.innerHTML = "remove liq"
            }
            refreshInfo();
            setTxConfirming(false);
          }
        }
        else {
          setAllowanceButtons(true)
        }
      }
    }

  const handleLeftButtonClick = async () => {
    const swapButton = document.getElementById("swap-button");
    const leftButton = document.getElementById("left-approve-button");
    const rightButton = document.getElementById("right-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#033E5E";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#033E5E";
      rightButton.style.color = "#E7B941";
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
      await sendApproveTx(tradeInput, "rusdaqua", false)
    } else if (activeToggle === "REMOVELIQ") {
      await sendApproveTx(tradeInput, "rusdaqualp", false)
    } else {
      await sendApproveTx(deposit, params.vaultToken, false);
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
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#033E5E";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#033E5E";
      rightButton.style.color = "#E7B941";
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
      await sendApproveTx(0, "rusdaqualp", true)
    } else {
      await sendApproveTx(0, params.vaultToken, true);
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
        return `approve ${params.vaultToken}`;
      }
      return "deposit";
    } else if (activeToggle === "REDEEMOT") {
      return "redeem ot";
    } else if (activeToggle === "TRADEOT") {
      return "trade ot";
    } else if (activeToggle === "ADDLIQ") {
      return "add liq";
    } else if (activeToggle === "REMOVELIQ") {
      return "remove liq";
    } else {
      return "trade yt";
    }
  };

  return (
    <>
      {allowanceButtons &&
        activeToggle !== "INFO" &&
        activeToggle !== "POOLS" && (
          <div>
            <button
              className="absolute left-[18%] top-[76%] h-[8%] w-[28%] border-2 border-black bg-[#E7B941] font-amaticbold text-[5vw]"
              id="left-approve-button"
              onClick={() => handleLeftButtonClick()}
            >
              approve tx
            </button>
            <button
              className="absolute left-[58%] top-[76%] h-[8%] w-[28%] border-2 border-black bg-[#E7B941] font-amaticbold text-[5vw]"
              id="right-approve-button"
              onClick={() => handleRightButtonClick()}
            >
              approve infinite
            </button>
          </div>
        )}
      {!allowanceButtons &&
        activeToggle !== "INFO" &&
        activeToggle !== "POOLS" && (
          <ConnectButton.Custom>
            {({ account, chain, openChainModal, openConnectModal }) => {
              return (
                <button
                  className="absolute left-[29%] top-[76%] h-[9%] w-[42%] border-2 border-black bg-[#E7B941] font-amaticbold text-[6vw] text-black"
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
