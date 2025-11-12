"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "lucide-react";
import { useGoldiswap } from "../../../providers";

export const Toggles = () => {
  const { activeToggle, changeActiveToggle } = useGoldiswap();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2 font-baloo text-sm font-semibold">
      <button
        className={`px-6 py-2 rounded-lg transition-all border ${
          activeToggle !== "REDEEM"
            ? "bg-HoneyYellow/20 text-HoneyYellow border-HoneyYellow/50"
            : "bg-black/20 text-white/60 border-amber-900/30 hover:bg-black/30"
        }`}
        onClick={() => changeActiveToggle("BUY")}
      >
        Swap
      </button>
      <button
        className={`px-6 py-2 rounded-lg transition-all border group relative ${
          activeToggle === "REDEEM"
            ? "bg-HoneyYellow/20 text-HoneyYellow border-HoneyYellow/50"
            : "bg-black/20 text-white/60 border-amber-900/30 hover:bg-black/30"
        }`}
        onClick={() => changeActiveToggle("REDEEM")}
      >
        Redeem
        <svg className="absolute -top-1 -right-1 w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1" fill="rgba(0, 0, 0, 0.6)"/>
          <text x="8" y="11.5" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor">?</text>
        </svg>
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-50"
          style={{
            backgroundColor: "rgba(60, 50, 40, 0.95)",
            border: "2px solid rgba(205, 133, 63, 0.5)",
          }}
        >
          <p className="text-white/90 text-sm font-baloo whitespace-nowrap">
            Burn <img src="/images/logo-locks.png" alt="LOCKS" className="w-4 h-4 rounded-full inline-block mx-0.5" /> <span className="text-HoneyYellow font-semibold">LOCKS</span>
          </p>
          <p className="text-white/90 text-sm font-baloo whitespace-nowrap">
            to receive floor price value
          </p>
          <div 
            className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-0.5 w-2.5 h-2.5 rotate-45"
            style={{
              backgroundColor: "rgba(60, 50, 40, 0.95)",
              borderLeft: "2px solid rgba(205, 133, 63, 0.5)",
              borderTop: "2px solid rgba(205, 133, 63, 0.5)",
            }}
          />
        </div>
      </button>
        <button
          className="px-6 py-2 rounded-lg transition-all border bg-black/20 text-white/60 border-amber-900/30 hover:bg-black/30"
          onClick={() => setIsVideoOpen(true)}
        >
          How it works?
        </button>
      </div>
      
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 aspect-video w-full max-w-3xl md:mx-0"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 rounded-full p-2 text-white hover:text-HoneyYellow transition-colors z-10"
                style={{
                  backgroundColor: "rgba(60, 50, 40, 0.9)",
                  border: "2px solid rgba(205, 133, 63, 0.5)",
                }}
              >
                <XIcon className="size-6" />
              </button>
              <div 
                className="relative isolate z-[1] size-full overflow-hidden rounded-2xl"
                style={{
                  border: "2px solid rgba(205, 133, 63, 0.5)",
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/LlXa3YKp3us"
                  title="How Goldiswap Works"
                  className="size-full rounded-2xl"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
