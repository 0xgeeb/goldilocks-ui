"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useAccount } from "wagmi";

import { formatAsString } from "@/app/_components/utils";
import SwapInput from "../../goldilend/swapInput";
import { GhoneyButton } from "../../goldilend"
import { useGoldilend } from "@/providers";

export const NewGHoneyTabMobile = () => {
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
    // Retry a few frames to ensure all 4 refs (token + balance pills) are attached before animating
    let attempts = 0;
    let rafId = 0;

    const tryAnimate = () => {
      const nodes = bubblesRef.current;
      const haveAll = !!(nodes[0] && nodes[1] && nodes[2] && nodes[3]);

      if (haveAll) {
        const bubbles = [nodes[0]!, nodes[1]!, nodes[2]!, nodes[3]!];
        gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
        bubbles.forEach((bubble, index) => {
          gsap.to(bubble, {
            scale: 1,
            duration: 0.4,
            delay: index * 0.1,
            ease: "back.out(1.4)",
          });
        });
        return;
      }

      if (attempts < 10) {
        attempts += 1;
        rafId = requestAnimationFrame(tryAnimate);
      }
    };

    rafId = requestAnimationFrame(tryAnimate);
    return () => cancelAnimationFrame(rafId);
  }, [goldilendWalletInfo.honey, goldilendWalletInfo.glhoney, lendActiveToggle]);

  const registerBubble =
    (index: number) => (element: HTMLDivElement | null) => {
      bubblesRef.current[index] = element;
    };

  const formatBalance = useCallback(
    (value: number) => {
      if (walletInfoLoading) return "-";
      return value > 0 ? formatAsString(value) : "-";
    },
    [walletInfoLoading],
  );

  const renderBalancePill = (value: number, ref?: (element: HTMLDivElement | null) => void, rotation?: string) => (
    <div ref={ref} className={`rounded-full border border-amber-700/30 bg-black/75 px-2.5 py-1 backdrop-blur flex items-center justify-center ${rotation || ""}`}>
      <span className="mr-1 font-baloo text-base text-white/70">Balance:</span>
      <span className="font-baloo text-base font-semibold text-HoneyYellow">{formatBalance(value)}</span>
    </div>
  );

  const topToken = lendActiveToggle === "DEPOSIT" ? "HONEY" : "gHoney";
  const bottomToken = lendActiveToggle === "DEPOSIT" ? "gHoney" : "HONEY";

  const flip = useCallback(() => {
    changeLendActiveToggle(lendActiveToggle === "DEPOSIT" ? "WITHDRAW" : "DEPOSIT");
  }, [lendActiveToggle, changeLendActiveToggle]);

  return (
    <div className="rounded-3xl border border-amber-800/40 bg-black/85 p-4 text-white shadow-[0_15px_35px_rgba(0,0,0,0.55)] space-y-4">
      <div className="relative rounded-3xl border border-amber-700/40 bg-black/80 p-4 text-white">
        {/* HONEY Token + Balance Bubbles - Above Input */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div
            ref={registerBubble(0)}
            className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-black/80 px-3 py-1.5 font-baloo text-base tracking-wide font-semibold text-HoneyYellow -rotate-6"
          >
            <img
              src={topToken === "HONEY" ? "/images/logo-honey.png" : "/images/bhoney-logo.png"}
              alt={topToken}
              className="h-6 w-6 rounded-full"
            />
            {topToken}
          </div>
          {renderBalancePill(
            lendActiveToggle === "DEPOSIT" ? goldilendWalletInfo.honey : goldilendWalletInfo.glhoney,
            registerBubble(1),
            "rotate-[-6deg]",
          )}
        </div>

        {/* Combined Input Box (like desktop) */}
        <div className="relative rounded-2xl border border-amber-600/30 bg-[#1c140c]/80 p-3">
          <div className="flex flex-col gap-3">
            <div className="relative">
              {/* Top Input */}
              <div className="relative mb-2 flex items-center gap-3 rounded-xl border border-amber-900/30 bg-black/20 p-3">
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
              </div>

              {/* Flip Arrow Button - Centered */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  aria-label="Flip tokens"
                  className="flex size-10 items-center justify-center rounded-full border border-amber-600/40 bg-amber-900/80 text-HoneyYellow shadow-lg transition-all hover:scale-110 hover:bg-amber-800 active:scale-95"
                  onClick={flip}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${
                      lendActiveToggle === "WITHDRAW" ? "rotate-180" : ""
                    }`}
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </button>
              </div>

              {/* Bottom Input */}
              <div className="relative mt-2 flex items-center gap-3 rounded-xl border border-amber-900/30 bg-black/20 p-3">
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
              </div>
            </div>
          </div>
        </div>

        {/* gHoney Token + Balance Bubbles - Below Input */}
        <div className="flex items-center justify-between gap-3 mt-3">
          <div
            ref={registerBubble(2)}
            className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-black/80 px-3 py-1.5 font-baloo text-base tracking-wide font-semibold text-HoneyYellow rotate-6"
          >
            <img
              src={bottomToken === "HONEY" ? "/images/logo-honey.png" : "/images/bhoney-logo.png"}
              alt={bottomToken}
              className="h-6 w-6 rounded-full"
            />
            {bottomToken}
          </div>
          {renderBalancePill(
            lendActiveToggle === "DEPOSIT" ? goldilendWalletInfo.glhoney : goldilendWalletInfo.honey,
            registerBubble(3),
            "rotate-6",
          )}
        </div>
      </div>
      <GhoneyButton />
    </div>
  );
};
