"use client"

// import { useState } from "react";

import { useGoldilend } from "@/providers";
import { NewBorrowTab } from "../newBorrowTab";
import { NewRepayTab } from "../newRepayTab";
import { NewLiquidateTab } from "../newLiquidateTab";

type LabelStringType = string;
export const TAB_LABELS:
  Record<
    string,
    {
      label: LabelStringType,
      children: { mode: LabelStringType, label: LabelStringType }[]
    }
  > = {
  "BORROW": {
    "label": "Borrow",
    "children": [
      { mode: "BORROW", label: "Borrow" },
      { mode: "REPAY", label: "Repay" },
    ],
  },
  // "REPAY": {
  //   "label": "Repay",
  //   "children": [],
  // }
  // "YIELD": {
  //   "label": "Yield",
  //   "children": [
  //     { mode: "CLAIM", label: "Claim" },
  //     { mode: "STAKE", label: "Stake" },
  //     { mode: "UNSTAKE", label: "Unstake" }
  //   ],
  // }
}

export const NewBorrowBox = () => {
    const { activeToggle } = useGoldilend()
    return (
      <div 
        className="relative w-full rounded-3xl border border-amber-600/30 bg-black/20 p-4 sm:p-6"
        style={{
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-2">
          {
            activeToggle === "BORROW" ?
              <NewBorrowTab /> :
            activeToggle === "REPAY" ?
              <NewRepayTab /> :
              <NewLiquidateTab />
          }
        </div>
      </div>
    )
}

/**
 * A set of mini sub-tabs within each main tab.
 * @param currentTab - The current main tab.
 * @returns 
 */
// Removed internal ModeSelector UI; page header toggles control the mode

// Collapsed to a single outer container styled like swap
