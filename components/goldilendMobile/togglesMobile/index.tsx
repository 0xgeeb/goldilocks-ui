import { cn } from "@/app/_components/utils";
import { useGoldilend } from "../../../providers";

const TABS = [
  { key: "BORROW", label: "Borrow" },
  { key: "REPAY", label: "Repay" },
  { key: "AUCTIONS", label: "Auctions" },
  { key: "GHONEY", label: "gHoney" },
];

export const TogglesMobile = () => {
  const { activeToggle, changeActiveToggle } = useGoldilend();

  return (
    <div className="flex w-full items-center gap-1.5 overflow-x-auto" id="hide-scrollbar">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={cn(
            "flex-1 rounded-lg border px-1.5 py-1.5 text-[12px] font-baloo font-semibold transition-all cursor-pointer whitespace-nowrap min-w-0",
            activeToggle === tab.key
              ? "bg-HoneyYellow text-black border-HoneyYellow/50"
              : "bg-black/20 text-white border-amber-900/30"
          )}
          onClick={() => tab.key === "GHONEY" && changeActiveToggle(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
