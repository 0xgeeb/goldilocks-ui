"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAccount } from "wagmi";

import { cn, formatAsString } from "@/app/_components/utils";
import SwapInput from "../swapInput";
import { GhoneyButton } from "../"
import { useGoldilend } from "@/providers";

export const NewGHoneyTab = () => {
  const {
    lendActiveToggle,
    changeLendActiveToggle,
    displayString,
    handleStakeChange,
    handleStakeBalance,
    walletInfoLoading,
    handlePercentageButtons,
    goldilendWalletInfo,
    refreshGoldilendWalletInfo,
  } = useGoldilend();

  const { isConnected } = useAccount();
  const bubblesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    refreshGoldilendWalletInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isConnected) {
      refreshGoldilendWalletInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean);
    if (!bubbles.length) return;

    gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
    bubbles.forEach((bubble, index) => {
      gsap.to(bubble, {
        scale: 1,
        duration: 0.4,
        delay: index * 0.1,
        ease: "back.out(1.4)",
      });
    });
  }, [goldilendWalletInfo.honey, goldilendWalletInfo.glhoney, lendActiveToggle]);

  const registerBubble =
    (index: number) => (element: HTMLDivElement | null) => {
      bubblesRef.current[index] = element;
    };

  const formatBalance = (value: number) => {
    if (walletInfoLoading) {
      return "-";
    }

    return value > 0 ? formatAsString(value) : "-";
  };

  const topToken = lendActiveToggle === "DEPOSIT" ? "HONEY" : "gHoney";
  const bottomToken = lendActiveToggle === "DEPOSIT" ? "gHoney" : "HONEY";

  const flip = useCallback(() => {
    changeLendActiveToggle(lendActiveToggle === "DEPOSIT" ? "WITHDRAW" : "DEPOSIT");
  }, [lendActiveToggle, changeLendActiveToggle]);

  return (
    <div className="relative w-full rounded-3xl border border-amber-600/30 bg-black/20 p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-6">
        <div className="relative w-full rounded-2xl border border-amber-600/30 bg-[#1c140c]/80 p-3 sm:p-4">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <div className="relative mb-2 flex items-center gap-4 rounded-xl border border-amber-900/30 bg-black/20 p-3">
                <div
                  ref={registerBubble(0)}
                  className="flex min-w-[140px] shrink-0 items-center justify-center gap-2 rounded-full border border-amber-700/40 bg-black/75 px-3 py-1.5 backdrop-blur rotate-[-8deg]"
                >
                  <img
                    src={topToken === "HONEY" ? "/images/logo-honey.png" : "/images/bhoney-logo.png"}
                    alt={topToken}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="font-baloo text-lg font-semibold tracking-widest text-HoneyYellow">{topToken}</span>
                </div>

                <div
                  className="flex min-h-[2.5rem] flex-1 items-center"
                  onMouseDown={(e) => {
                    if (e.detail > 1) {
                      e.preventDefault();
                    }
                  }}
                >
                  <SwapInput
                    isLoading={false}
                    value={displayString}
                    onChange={(v) => handleStakeChange(v, lendActiveToggle)}
                    balance={handleStakeBalance(lendActiveToggle === "DEPOSIT" ? "HONEY" : "gHoney") as unknown as string}
                    walletInfoLoading={walletInfoLoading}
                  />
                </div>

                <button
                  type="button"
                  className="w-16 shrink-0 rounded-lg border border-amber-600/30 bg-amber-600/40 py-1.5 font-baloo text-sm font-semibold text-amber-200 transition-colors hover:bg-amber-700/60 cursor-pointer"
                  onClick={() => handlePercentageButtons(4)}
                >
                  MAX
                </button>

                <div
                  ref={registerBubble(1)}
                  className="pointer-events-none absolute right-[100px] top-[18px] z-10"
                >
                  <div className="flex items-center justify-center gap-1 rounded-full border border-amber-700/30 bg-black/75 px-4 py-2 backdrop-blur rotate-[-6deg] drop-shadow-xl">
                    <span className="font-baloo text-base font-semibold text-white/70">Balance:</span>
                    <span className="font-baloo text-base font-semibold text-HoneyYellow">
                      {formatBalance(lendActiveToggle === "DEPOSIT" ? goldilendWalletInfo.honey : goldilendWalletInfo.glhoney)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-amber-600/40 bg-amber-900/80 shadow-lg transition-all hover:scale-110 hover:bg-amber-800"
                  onClick={flip}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      "transition-transform duration-300",
                      lendActiveToggle === "WITHDRAW" ? "rotate-180" : "",
                    )}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </div>

              <div className="relative mt-2 flex items-center gap-4 rounded-xl border border-amber-900/30 bg-black/20 p-3">
                <div
                  ref={registerBubble(2)}
                  className="flex min-w-[140px] shrink-0 items-center justify-center gap-2 rounded-full border border-amber-700/40 bg-black/75 px-3 py-1.5 backdrop-blur rotate-6"
                >
                  <img
                    src={bottomToken === "HONEY" ? "/images/logo-honey.png" : "/images/bhoney-logo.png"}
                    alt={bottomToken}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="font-baloo text-lg font-semibold tracking-widest text-HoneyYellow">{bottomToken}</span>
                </div>

                <div
                  className="flex min-h-[2.5rem] flex-1 items-center"
                  onMouseDown={(e) => {
                    if (e.detail > 1) {
                      e.preventDefault();
                    }
                  }}
                >
                  <SwapInput
                    isLoading={false}
                    value={displayString}
                    onChange={(v) => handleStakeChange(v, lendActiveToggle)}
                    balance={handleStakeBalance(lendActiveToggle === "DEPOSIT" ? "gHoney" : "HONEY") as unknown as string}
                    walletInfoLoading={walletInfoLoading}
                  />
                </div>

                <div
                  ref={registerBubble(3)}
                  className="pointer-events-none absolute bottom-[15px] right-[48px] z-10"
                >
                  <div className="flex items-center justify-center gap-1 rounded-full border border-amber-700/30 bg-black/75 px-4 py-2 backdrop-blur rotate-6 drop-shadow-xl">
                    <span className="font-baloo text-base font-semibold text-white/70">Balance:</span>
                    <span className="font-baloo text-base font-semibold text-HoneyYellow">
                      {formatBalance(lendActiveToggle === "DEPOSIT" ? goldilendWalletInfo.glhoney : goldilendWalletInfo.honey)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="font-amaticbold text-center text-HoneyYellow text-lg sm:text-xl leading-tight">
          Please note; conversion of gHoney to HONEY is subject to available liquidity at the time of transaction.
        </p>
        <GhoneyButton />
        <p className="font-baloo text-center text-HoneyYellow text-[10px] leading-tight italic">
            Depositors should be aware of the possibility of bad debt. This can occur when a liquidated loan auction is unsuccessful and there is insufficient HONEY in the insurance fund to repay the balance of the unpaid loan. In this event, there is a possibility that gHoney redemptions will become unavailable.
        </p>
      </div>
    </div>
  );
};
