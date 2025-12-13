"use client";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { contracts } from "../../../utils/addressi";

const getSelectedBeraContractAddress = (beraName: string): string => {
  if (!beraName) return contracts.bandbear.address;

  const collectionName = beraName.split(" #")[0];

  const contractMap: Record<string, string> = {
    "Fake Bear": contracts.fakebear.address,
    "Bit Bear": contracts.bitbear.address,
    "Baby Bear": contracts.babybear.address,
    "Boo Bear": contracts.boobear.address,
    "Bond Bear": contracts.bondbear.address,
    "Band Bear": contracts.bandbear.address,
    "Bong Bear": contracts.bongbear.address,
  };

  return contractMap[collectionName] || contracts.bandbear.address;
};

const BORROW_LABEL = "Deposit & Borrow";

export const BorrowButtonMobile = () => {
  const {
    selectedBera,
    loanExpiration,
    loanAmount,
    loanInterest,
    borrowLimit,
    setTxConfirming,
    changeActiveToggle,
    openNotification,
    activeToggle,
    selectedPartners,
    boostMag,
    userBoost,
    updateOwnedBeras,
    updateOwnedPartners,
    findLoans,
  } = useGoldilend();

  const { address } = useAccount();

  const {
    checkLoanAllowance,
    sendGoldilendNFTApproveTx,
    sendBorrowTx,
    sendBoostTx,
    sendWithdrawBoostTx,
  } = useGoldilendTx();

  const checkSelectedPartners = (partnerName: string): boolean => {
    return selectedPartners.some((partner) => partner.name === partnerName);
  };

  const parseDate = (dateString: string): number => {
    const dateParts = dateString.split("-");
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const timestamp = parsedDate.getTime();
    const currentTimestamp = Date.now();
    return Math.floor((timestamp - currentTimestamp) / 1000);
  };

  const checkDate = (dateString: string): boolean => {
    const dateParts = dateString.split("-");
    const [month, day, year] = dateParts.map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const timestamp = parsedDate.getTime();
    const timestampDigits = Math.floor(timestamp / 1000);
    if (dateParts.length !== 3) return false;
    if (Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(year)) return false;
    if (Number.isNaN(parsedDate.getTime())) return false;
    if (timestampDigits < Math.floor(Date.now() / 1000)) return false;

    // Check if the date is at least the next calendar day
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to start of tomorrow

    if (parsedDate < tomorrow) {
      return false;
    }
    return true;
  };

  const borrowTxFlow = async (button: HTMLElement | null) => {
    setTxConfirming(true);
    if (button) {
      button.innerHTML = "Confirming...";
    }
    const borrowTx = await sendBorrowTx(
      loanAmount,
      selectedBera,
      parseDate(loanExpiration) > 86400 ? parseDate(loanExpiration) : 86400,
    );
    if (borrowTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        "You've successfully created a loan",
        `You borrowed ${formatAsString(loanAmount - loanInterest)} HONEY against your bera`,
        borrowTx,
      );
      if (button) {
        button.innerHTML = BORROW_LABEL;
      }
      updateOwnedBeras(selectedBera);
      findLoans();
      changeActiveToggle("BORROW");
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      if (button) {
        button.innerHTML = BORROW_LABEL;
      }
      changeActiveToggle("BORROW");
      setTxConfirming(false);
    }
  };

  const handleBorrowButton = async () => {
    const button = document.getElementById("borrow-button");
    if (!button) return;

    if (loanAmount === 0) {
      button.innerHTML = "no loan";
      return;
    }
    if (!checkDate(loanExpiration)) {
      button.innerHTML = "invalid expiration";
      return;
    }
    if (selectedBera.name === "") {
      button.innerHTML = "no collateral";
      return;
    }
    if (loanAmount + loanInterest > borrowLimit) {
      button.innerHTML = "exceeds limit";
      return;
    }

    const selectedBeraContract = getSelectedBeraContractAddress(selectedBera.name);
    const isApproved = await checkLoanAllowance(
      address as `0x${string}`,
      selectedBeraContract
    );

    if (isApproved) {
      await borrowTxFlow(button);
    } else {
      button.innerHTML = "approving...";
      await sendGoldilendNFTApproveTx(selectedBeraContract);
      button.innerHTML = BORROW_LABEL;
    }
  };

  const handleWithdrawButtonClick = async () => {
    const button = document.getElementById("borrow-button-withdraw");
    if (!button) return;
    if (userBoost.partnerNFTs.length === 0) {
      button.innerHTML = "No boost deposited";
      return;
    }
    button.innerHTML = "Withdrawing...";
    const withdrawTx = await sendWithdrawBoostTx();
    if (withdrawTx.substring(0, 2) === "0x") {
      openNotification(
        true,
        "Boost withdrawn",
        "Your boost has been withdrawn",
        withdrawTx,
      );
      button.innerHTML = "Withdraw boost";
      updateOwnedPartners(selectedPartners);
      changeActiveToggle("BOOST");
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      button.innerHTML = "Withdraw boost";
      changeActiveToggle("BOOST");
    }
  };

  const handleButtonClick = async () => {
      await handleBorrowButton();
  };

  const renderButtonLabel = (): string => {
    if (activeToggle === "BORROW") {
      return BORROW_LABEL;
    }
    if (userBoost.partnerNFTs.length > 0 && selectedPartners.length === 0) {
      return "My boost";
    }
    return "Create boost";
  };

  if (
    activeToggle === "BOOST" &&
    userBoost.partnerNFTs.length > 1
  ) {
    return (
      <div className="mt-6 flex flex-col gap-3">
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openConnectModal }) => (
            <button
              className="w-full rounded-xl border border-HoneyYellow/60 bg-HoneyYellow px-4 py-3 font-amaticbold text-4xl text-black shadow-lg transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              id="borrow-button"
              onClick={() => {
                const button = document.getElementById("borrow-button");
                if (!button) return;

                if (!account) {
                  if (button.innerHTML.toLowerCase() === "connect wallet") {
                    openConnectModal();
                  } else {
                    button.innerHTML = "Connect wallet";
                  }
                } else if (chain?.name !== "Berachain") {
                  if (button.innerHTML.toLowerCase() === "where berachain") {
                    openChainModal();
                  } else {
                    button.innerHTML = "Where Berachain";
                  }
                } else {
                  handleButtonClick();
                }
              }}
            >
              Add to boost
            </button>
          )}
        </ConnectButton.Custom>
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openConnectModal }) => (
            <button
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-amaticbold text-4xl text-white shadow-lg transition hover:border-HoneyYellow/60 hover:bg-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
              id="borrow-button-withdraw"
              onClick={() => {
                const button = document.getElementById("borrow-button-withdraw");
                if (!button) return;

                if (!account) {
                  if (button.innerHTML.toLowerCase() === "connect wallet") {
                    openConnectModal();
                  } else {
                    button.innerHTML = "Connect wallet";
                  }
                } else if (chain?.name !== "Berachain") {
                  if (button.innerHTML.toLowerCase() === "where berachain") {
                    openChainModal();
                  } else {
                    button.innerHTML = "Where Berachain";
                  }
                } else {
                  handleWithdrawButtonClick();
                }
              }}
            >
              Withdraw boost
            </button>
          )}
        </ConnectButton.Custom>
      </div>
    );
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal }) => (
        <button
          className="mt-6 w-full rounded-xl border border-HoneyYellow/60 bg-HoneyYellow px-4 py-3 font-amaticbold text-4xl text-black shadow-lg transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          id="borrow-button"
          onClick={() => {
            const button = document.getElementById("borrow-button");
            if (!button) return;

            if (!account) {
              if (button.innerHTML.toLowerCase() === "connect wallet") {
                openConnectModal();
              } else {
                button.innerHTML = "Connect wallet";
              }
            } else if (chain?.name !== "Berachain") {
              if (button.innerHTML.toLowerCase() === "where berachain") {
                openChainModal();
              } else {
                button.innerHTML = "Where Berachain";
              }
            } else {
              handleButtonClick();
            }
          }}
        >
          {renderButtonLabel()}
        </button>
      )}
    </ConnectButton.Custom>
  );
};
