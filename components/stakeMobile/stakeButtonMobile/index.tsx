import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useStakeTx } from "../../../hooks";
import { useStake } from "../../../providers";

export const StakeButtonMobile = () => {
  const {
    stakeInfo,
    stakeWalletInfo,
    setStake,
    setUnstake,
    setStir,
    setDisplayString,
    refreshStakeInfo,
    refreshStakeWalletInfo,
    updateAllowance,
    setAllowanceButtons,
    allowanceButtons,
    activeToggle,
    stake,
    unstake,
    stir,
    setTxConfirming,
    openNotification,
  } = useStake();

  const { address, isConnected } = useAccount();

  const {
    checkAllowance,
    sendApproveTx,
    sendStakeTx,
    sendUnstakeTx,
    sendStirTx,
    sendClaimTx,
  } = useStakeTx();

  const refreshInfo = () => {
    setDisplayString("");
    setStake(0);
    setUnstake(0);
    setStir(0);
    refreshStakeWalletInfo();
    refreshStakeInfo();
  };

  const handleButtonClick = async () => {
    const button = document.getElementById("stake-button");
    if (activeToggle === "STAKE") {
      stakeTxFlow(button);
    }
    if (activeToggle === "UNSTAKE") {
      unstakeTxFlow(button);
    }
    if (activeToggle === "STIR") {
      stirTxFlow(button);
    }
    if (activeToggle === "CLAIM") {
      claimTxFlow(button);
    }
  };

  const stakeTxFlow = async (button: HTMLElement | null) => {
    if (stake == 0) {
      button && (button.innerHTML = "stake");
      return;
    }
    if (stake > stakeWalletInfo.locks) {
      button && (button.innerHTML = "balance too low");
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        stake,
        "locks",
        address as string,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = "confirming...";
          button.style.backgroundColor = "#B35227";
          button.style.color = "#E7B941";
        }
        const stakeTx = await sendStakeTx(stake);
        if (stakeTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            "You've successfully staked $LOCKS",
            `You staked ${formatAsString(stake)} Locks`,
            stakeTx,
          );
          if (button) {
            button.innerHTML = "stake";
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "stake";
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const unstakeTxFlow = async (button: HTMLElement | null) => {
    if (unstake == 0) {
      button && (button.innerHTML = "unstake");
      return;
    }
    if (unstake > stakeWalletInfo.staked - stakeWalletInfo.locked) {
      button && (button.innerHTML = "balance too low");
      return;
    }
    if (unstake > stakeWalletInfo.staked) {
      button && (button.innerHTML = "balance too low");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
        button.style.backgroundColor = "#B35227";
        button.style.color = "#E7B941";
      }
      const unstakeTx = await sendUnstakeTx(unstake);
      if (unstakeTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully unstaked $LOCKS",
          `You unstaked ${formatAsString(unstake)} Locks`,
          unstakeTx,
        );
        if (button) {
          button.innerHTML = "unstake";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "unstake";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const stirTxFlow = async (button: HTMLElement | null) => {
    if (stir == 0) {
      button && (button.innerHTML = "stir");
      return;
    }
    if (stir > stakeWalletInfo.prg) {
      button && (button.innerHTML = "not enough prg");
      return;
    }
    if (stakeWalletInfo.honey < stir * (stakeInfo.fsl / stakeInfo.supply)) {
      button && (button.innerHTML = "not enough honey");
      return;
    } else {
      const sufficientAllowance: boolean | void = await checkAllowance(
        stir * (stakeInfo.fsl / stakeInfo.supply),
        "honey",
        address as string,
      );
      if (sufficientAllowance) {
        setTxConfirming(true);
        if (button) {
          button.innerHTML = "confirming...";
          button.style.backgroundColor = "#B35227";
          button.style.color = "#E7B941";
        }
        const stirTx = await sendStirTx(stir);
        if (stirTx === "balance") {
          button && (button.innerHTML = "need more honey");
          setTimeout(() => {
            button && (button.innerHTML = "stir");
          }, 10000);
        } else if (stirTx.substring(0, 2) === "0x") {
          setTxConfirming(false);
          openNotification(
            true,
            "You've successfully stirred $PRG",
            `You stirred ${formatAsString(stir)} Porridge with ${formatAsString(stir * (stakeInfo.fsl / stakeInfo.supply))} Honey`,
            stirTx,
          );
          if (button) {
            button.innerHTML = "stir";
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
          }
          refreshInfo();
          setTimeout(() => {
            openNotification(false, "", "", "");
          }, 10000);
        } else {
          if (button) {
            button.innerHTML = "stir";
            button.style.backgroundColor = "#E7B941";
            button.style.color = "black";
          }
          refreshInfo();
          setTxConfirming(false);
        }
      } else {
        setAllowanceButtons(true);
      }
    }
  };

  const claimTxFlow = async (button: HTMLElement | null) => {
    if (stakeWalletInfo.claimable == 0) {
      button && (button.innerHTML = "claim");
      return;
    } else {
      setTxConfirming(true);
      if (button) {
        button.innerHTML = "confirming...";
        button.style.backgroundColor = "#B35227";
        button.style.color = "#E7B941";
      }
      const claimTx = await sendClaimTx();
      if (claimTx.substring(0, 2) === "0x") {
        setTxConfirming(false);
        openNotification(
          true,
          "You've successfully claimed $PRG",
          `You claimed ${formatAsString(stakeWalletInfo.claimable)} Porridge`,
          claimTx,
        );
        if (button) {
          button.innerHTML = "claim";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        refreshInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "claim";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        refreshInfo();
        setTxConfirming(false);
      }
    }
  };

  const handleLeftButtonClick = async () => {
    const stakeButton = document.getElementById("stake-button");
    const leftButton = document.getElementById("left-approve-button");
    const rightButton = document.getElementById("right-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#B35227";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#B35227";
      rightButton.style.color = "#E7B941";
    }
    if (activeToggle === "STAKE") {
      await sendApproveTx(stake, "locks", false);
      updateAllowance("locks", stake + 0.01);
      stakeButton && (stakeButton.innerHTML = "stake");
      setAllowanceButtons(false);
    } else {
      await sendApproveTx(
        stir * (stakeInfo.fsl / stakeInfo.supply),
        "honey",
        false,
      );
      updateAllowance(
        "honey",
        stir * (stakeInfo.fsl / stakeInfo.supply) + 0.01,
      );
      stakeButton && (stakeButton.innerHTML = "stake");
      setAllowanceButtons(false);
    }
  };

  const handleRightButtonClick = async () => {
    const stakeButton = document.getElementById("stake-button");
    const rightButton = document.getElementById("right-approve-button");
    const leftButton = document.getElementById("left-approve-button");
    if (leftButton) {
      leftButton.innerHTML = "approving...";
      leftButton.style.backgroundColor = "#B35227";
      leftButton.style.color = "#E7B941";
    }
    if (rightButton) {
      rightButton.innerHTML = "approving...";
      rightButton.style.backgroundColor = "#B35227";
      rightButton.style.color = "#E7B941";
    }
    if (activeToggle === "STAKE") {
      await sendApproveTx(0, "locks", true);
      updateAllowance("locks", 100000000);
      stakeButton && (stakeButton.innerHTML = "repay");
      setAllowanceButtons(false);
    } else {
      await sendApproveTx(0, "honey", true);
      updateAllowance("honey", 100000000);
      stakeButton && (stakeButton.innerHTML = "repay");
      setAllowanceButtons(false);
    }
  };

  const renderButton = () => {
    if (activeToggle === "STAKE") {
      if (
        isConnected &&
        stake > stakeWalletInfo.locksPrgAllowance &&
        stakeWalletInfo.locks >= stake
      ) {
        return "approve locks";
      }
      return "stake";
    }
    if (activeToggle === "UNSTAKE") {
      return "unstake";
    }
    if (activeToggle === "STIR") {
      if (
        isConnected &&
        stir * (stakeInfo.fsl / stakeInfo.supply) >
          stakeWalletInfo.honeyPrgAllowance &&
        stakeWalletInfo.prg >= stir
      ) {
        return "approve honey";
      }
      return "stir";
    }
    if (activeToggle === "CLAIM") {
      return "claim";
    }
  };

  return (
    <>
      {allowanceButtons && (
        <div>
          <button
            className="absolute left-[23%] top-[49%] h-[8%] w-[23%] border-2 border-black bg-[#E7B941] font-amaticbold text-[5vw] focus:scale-110 focus:bg-[#4D0B24] focus:text-[#E7B941]"
            id="left-approve-button"
            onClick={() => handleLeftButtonClick()}
          >
            approve tx
          </button>
          <button
            className="absolute left-[54%] top-[49%] h-[8%] w-[23%] border-2 border-black bg-[#E7B941] font-amaticbold text-[5vw] focus:scale-110 focus:bg-[#4D0B24] focus:text-[#E7B941]"
            id="right-approve-button"
            onClick={() => handleRightButtonClick()}
          >
            approve infinite
          </button>
        </div>
      )}
      {!allowanceButtons && (
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openConnectModal }) => {
            return (
              <button
                className="absolute left-[23%] top-[49%] flex h-[8%] w-[54%] items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[9vw] focus:scale-110 focus:bg-[#4D0B24] focus:text-[#E7B941]"
                id="stake-button"
                onClick={() => {
                  const button = document.getElementById("stake-button");

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
