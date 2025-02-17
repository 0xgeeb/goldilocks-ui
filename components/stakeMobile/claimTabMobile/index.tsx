import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useStake } from "../../../providers";
import { useStakeTx } from "../../../hooks";
import {
  WalletBalanceMobilePopup,
  NotificationMobile,
} from "../../stakeMobile";

export const ClaimTabMobile = () => {
  const {
    txConfirming,
    notification,
    walletInfoLoading,
    setTxConfirming,
    openNotification,
    refreshStakeWalletInfo,
    balanceMobileToggle,
    stakeWalletInfo,
  } = useStake();

  const { sendClaimTx } = useStakeTx();

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  const formatAsString = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  const handleInfo = (num: number) => {
    if (walletInfoLoading) {
      return loadingElement();
    } else if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const claimTxFlow = async () => {
    const button = document.getElementById("claim-button");

    if (stakeWalletInfo.claimable == 0) {
      button && (button.innerHTML = "no claim");
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
        refreshStakeWalletInfo();
        setTimeout(() => {
          openNotification(false, "", "", "");
        }, 10000);
      } else {
        if (button) {
          button.innerHTML = "claim";
          button.style.backgroundColor = "#E7B941";
          button.style.color = "black";
        }
        setTxConfirming(false);
      }
    }
  };

  return (
    <div className="absolute left-[15.5%] top-[7.5%] z-20 h-[55%] w-[69%] border-2 border-black bg-[#EEDCD2]">
      <div className="absolute left-0 top-3 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 left-0 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute right-0 top-3 w-6 -skew-y-[45deg] border-b-2 border-black"></div>
      <div className="absolute bottom-3 right-0 w-6 skew-y-[45deg] border-b-2 border-black"></div>
      <div
        className={`absolute inset-3 ${txConfirming ? "border-l-2 border-r-2 border-black" : "border-2 border-black"} bg-[#D9C6BA]`}
      >
        {txConfirming ? (
          <img
            className="h-[100%] w-[100%]"
            src="/images/bg-transaction-mobile.png"
            alt="tx"
          />
        ) : notification.toggle ? (
          <NotificationMobile />
        ) : balanceMobileToggle ? (
          <WalletBalanceMobilePopup />
        ) : (
          <div className="relative flex h-[100%] w-[100%] flex-col items-center px-[4%] font-baloo font-semibold">
            <h1 className="font-amaticbold text-[14vw]">claim yield</h1>
            <div className="mt-[10%] flex w-[100%] flex-col justify-between">
              <span className="text-[4.5vw] text-[#9C4924]">
                Porridge Yield
              </span>
              <div className="mt-[2%] flex w-[100%] flex-row justify-between text-[3.5vw]">
                <span>$PRG balance:</span>
                <span>{handleInfo(stakeWalletInfo.prg)}</span>
              </div>
              <div className="flex w-[100%] flex-row justify-between text-[3.5vw]">
                <span>claimable $PRG:</span>
                <span>{handleInfo(stakeWalletInfo.claimable)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {!txConfirming && !notification.toggle && !balanceMobileToggle && (
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openConnectModal }) => {
            return (
              <button
                className="absolute left-[20%] top-[67.5%] flex h-[15%] w-[60%] items-center justify-center border-2 border-black bg-[#E7B941] font-amaticbold text-[9vw] hover:scale-110 hover:bg-[#C9E3B9]"
                id="claim-button"
                onClick={() => {
                  const button = document.getElementById("claim-button");

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
                    claimTxFlow();
                  }
                }}
              >
                claim
              </button>
            );
          }}
        </ConnectButton.Custom>
      )}
    </div>
  );
};
