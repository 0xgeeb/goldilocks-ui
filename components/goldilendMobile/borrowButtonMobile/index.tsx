"use client";

import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useGoldilendTx } from "../../../hooks";
import { useGoldilend } from "../../../providers";
import { contracts } from "../../../utils/addressi";

const BORROW_LABEL = "Deposit & Borrow";

export const BorrowButtonMobile = () => {
  const {
    selectedBera,
    loanExpiration,
    loanAmount,
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
    checkBoostAllowance,
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
    if (timestampDigits < Math.floor(Date.now() / 1000) + 86400 * 7) return false;
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
      parseDate(loanExpiration),
    );
    if (borrowTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        "You've successfully created a loan",
        `You borrowed ${formatAsString(loanAmount)} iBGT against your bera`,
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
      button.innerHTML = "Enter amount";
      return;
    }
    if (!checkDate(loanExpiration)) {
      button.innerHTML = "Invalid expiration";
      return;
    }
    if (selectedBera.name === "") {
      button.innerHTML = "Select collateral";
      return;
    }

    const [bondFlag, bandFlag] = await checkLoanAllowance(address as `0x${string}`);
    const needsBondApproval = !bondFlag && selectedBera.name === "BondBera";
    const needsBandApproval = !bandFlag && selectedBera.name === "BandBera";

    if (!needsBondApproval && !needsBandApproval) {
      await borrowTxFlow(button);
      return;
    }

    button.innerHTML = "Approving...";
    if (needsBondApproval) {
      await sendGoldilendNFTApproveTx(contracts.bondbear.address);
    }
    if (needsBandApproval) {
      await sendGoldilendNFTApproveTx(contracts.bandbear.address);
    }
    button.innerHTML = BORROW_LABEL;
  };

  const handleBoostButton = async () => {
    const button = document.getElementById("borrow-button");
    if (!button) return;

    if (selectedPartners.length === 0) {
      button.innerHTML = "Select partners";
      return;
    }

    const allowances = await checkBoostAllowance(address as `0x${string}`);
    const approvalsNeeded = allowances.filter((allowance) => allowance === false);

    if (approvalsNeeded.length > 0) {
      button.innerHTML = "Approving...";
      if (!checkSelectedPartners("Beradrome")) {
        const beradromeAddress = boostMag.partners.multiSig.partnerAddress;
        await sendBoostTx(beradromeAddress);
      }
      if (!checkSelectedPartners("Honeycomb")) {
        const honeycombAddress = boostMag.partners.honeycomb.partnerAddress;
        await sendBoostTx(honeycombAddress);
      }
      button.innerHTML = "Create boost";
      return;
    }

    button.innerHTML = "Confirming...";
    const boostTx = await sendBoostTx(
      boostMag.partners.honeycomb.partnerAddress,
    );
    if (boostTx.substring(0, 2) === "0x") {
      setTxConfirming(false);
      openNotification(
        true,
        "Boost applied",
        "Your boost has been applied to your loan",
        boostTx,
      );
      button.innerHTML = "Create boost";
      updateOwnedPartners(selectedPartners);
      changeActiveToggle("BOOST");
      setTimeout(() => {
        openNotification(false, "", "", "");
      }, 10000);
    } else {
      button.innerHTML = "Create boost";
      changeActiveToggle("BOOST");
      setTxConfirming(false);
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
    if (activeToggle === "BORROW") {
      await handleBorrowButton();
    } else {
      await handleBoostButton();
    }
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
