"use client";

import { useEffect, useState, useRef } from "react";
import { useAccount } from "wagmi";
import { gsap } from 'gsap';

import { formatAsString } from "@/app/_components/utils";
import { useGoldiswap } from "../../../providers";

export const WalletBalance = () => {
  const [walletOpen, setWalletOpen] = useState<boolean>(false);
  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { isConnected } = useAccount();
  const { goldiswapWalletInfo, refreshGoldiswapWalletInfo } = useGoldiswap();

  useEffect(() => {
    refreshGoldiswapWalletInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const formatAsClaimable = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  const handleInfo = (num: number): string => {
    if (num > 0) {
      return formatAsString(num);
    } else {
      return "-";
    }
  };

  const handleInfoClaimable = (num: number): string => {
    if (num > 0) {
      return formatAsClaimable(num);
    } else {
      return "-";
    }
  };

  const walletItems = [
    { label: 'Locks Balance', value: handleInfo(goldiswapWalletInfo.locks), rotation: -8 },
    { label: 'Honey Balance', value: handleInfo(goldiswapWalletInfo.honey), rotation: 8 },
    { label: 'Porridge Balance', value: handleInfo(goldiswapWalletInfo.prg), rotation: -8 },
    { label: 'Staked Locks', value: handleInfo(goldiswapWalletInfo.staked), rotation: 8 },
    { label: 'Locked Locks', value: handleInfo(goldiswapWalletInfo.locked), rotation: -8 },
    { label: 'Borrowed Honey', value: handleInfo(goldiswapWalletInfo.borrowed), rotation: 8 },
    { label: 'Claimable Porridge', value: handleInfoClaimable(goldiswapWalletInfo.claimable), rotation: -8 },
  ];

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean);
    if (!bubbles.length) return;

    if (walletOpen) {
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      
      bubbles.forEach((bubble, i) => {
        gsap.to(bubble, {
          scale: 1,
          duration: 0.5,
          delay: i * 0.1,
          ease: 'back.out(1.5)'
        });
      });
    } else {
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
    }
  }, [walletOpen]);

  return (
    <>
      <style>{`
        @media (min-width: 900px) {
          .wallet-bubble-item {
            transform: rotate(var(--item-rot));
          }
          .wallet-bubble-item:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
          }
        }
      `}</style>

      <button
        onClick={() => setWalletOpen(!walletOpen)}
        className="rounded-xl px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-2"
        style={{
          backgroundColor: "rgba(60, 50, 40, 0.4)",
          border: "1px solid rgba(205, 133, 63, 0.3)",
        }}
      >
        <img src="/images/icons/box.svg" alt="box" className="w-5 h-5" />
        <span className="text-HoneyYellow font-amaticbold text-xl whitespace-nowrap">Check whatchu have</span>
      </button>

      {walletOpen && (
        <>
          {/* LEFT SIDE - LOCKS */}
          {/* LOCKS Icon + Text */}
          <div
            ref={el => { if (el) bubblesRef.current[0] = el; }}
            className="absolute left-16 top-54"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <img src="/images/logo-locks.png" alt="LOCKS" className="w-7 h-7 rounded-full" />
              <span className="text-HoneyYellow font-amaticbold text-xl">LOCKS</span>
            </div>
          </div>

          {/* LOCKS Balance */}
          <div
            ref={el => { if (el) bubblesRef.current[1] = el; }}
            className="absolute left-14 top-66"
            style={{ transform: 'rotate(3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Balance: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfo(goldiswapWalletInfo.locks)}</span>
            </div>
          </div>

          {/* LOCKS Staked */}
          <div
            ref={el => { if (el) bubblesRef.current[2] = el; }}
            className="absolute left-18 top-78"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Staked: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfo(goldiswapWalletInfo.staked)}</span>
            </div>
          </div>

          {/* LOCKS Locked */}
          <div
            ref={el => { if (el) bubblesRef.current[3] = el; }}
            className="absolute left-20 top-90"
            style={{ transform: 'rotate(3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Locked: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfo(goldiswapWalletInfo.locked)}</span>
            </div>
          </div>


          {/* LOCKS Unvested */}
          <div
            ref={el => { if (el) bubblesRef.current[3] = el; }}
            className="absolute left-18 top-102"
            style={{ transform: 'rotate(3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Unvested: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfo(69.69)}</span>
            </div>
          </div>

          {/* RIGHT SIDE - HONEY */}
          {/* HONEY Icon + Text */}
          <div
            ref={el => { if (el) bubblesRef.current[4] = el; }}
            className="absolute right-18 top-44"
            style={{ transform: 'rotate(3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <img src="/images/logo-honey.png" alt="HONEY" className="w-7 h-7 rounded-full" />
              <span className="text-HoneyYellow font-amaticbold text-xl">HONEY</span>
            </div>
          </div>

          {/* HONEY Balance */}
          <div
            ref={el => { if (el) bubblesRef.current[5] = el; }}
            className="absolute right-24 top-56"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Balance: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfo(goldiswapWalletInfo.honey)}</span>
            </div>
          </div>

          {/* HONEY Borrowed */}
          <div
            ref={el => { if (el) bubblesRef.current[6] = el; }}
            className="absolute right-10 top-68"
            style={{ transform: 'rotate(3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Borrowed: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfo(goldiswapWalletInfo.borrowed)}</span>
            </div>
          </div>

          {/* RIGHT SIDE - PRG */}
          {/* PRG Icon + Text */}
          <div
            ref={el => { if (el) bubblesRef.current[7] = el; }}
            className="absolute right-18 top-80"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <img src="/images/logo-porridge.png" alt="PRG" className="w-7 h-7 rounded-full" />
              <span className="text-HoneyYellow font-amaticbold text-xl">PRG</span>
            </div>
          </div>

          {/* PRG Balance */}
          <div
            ref={el => { if (el) bubblesRef.current[8] = el; }}
            className="absolute right-14 top-92"
            style={{ transform: 'rotate(3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Balance: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfo(goldiswapWalletInfo.prg)}</span>
            </div>
          </div>

          {/* PRG Claimable */}
          <div
            ref={el => { if (el) bubblesRef.current[9] = el; }}
            className="absolute right-12 top-104"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <div className="rounded-full shadow-lg px-4 py-2">
              <span className="text-white/70 font-baloo text-sm">Claimable: </span>
              <span className="text-HoneyYellow font-baloo text-sm font-semibold">{handleInfoClaimable(goldiswapWalletInfo.claimable)}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
