import { useGoldilend } from "../../../providers";

export const Toggles = () => {
  const { activeToggle, changeActiveToggle } = useGoldilend();

  const baseButtonClasses =
    "rounded-lg transition-all border-0 font-baloo cursor-pointer px-5 py-2 text-lg sm:px-6 sm:py-2.5 sm:text-xl lg:px-7 lg:py-3 relative";

  return (
    <div className="flex flex-wrap items-end gap-2 font-amaticbold text-lg sm:text-xl font-semibold">
      <button
        className={`${baseButtonClasses} ${
          activeToggle === "BORROW"
            ? "bg-HoneyYellow text-black shadow-[0_-2px_8px_rgba(251,191,36,0.3)]"
            : "text-white hover:bg-HoneyYellow/30 hover:text-black"
        }`}
        // onClick={() => changeActiveToggle("BORROW")} // commenting out to only enable ghoney deposits
      >
        Borrow
      </button>
      <button
        className={`${baseButtonClasses} ${
          activeToggle === "REPAY"
            ? "bg-HoneyYellow text-black shadow-[0_-2px_8px_rgba(251,191,36,0.3)]"
            : "text-white hover:bg-HoneyYellow/30 hover:text-black"
        }`}
        // onClick={() => changeActiveToggle("REPAY")} // commenting out to only enable ghoney deposits
      >
        Repay
      </button>
      <button
        className={`${baseButtonClasses} ${
          activeToggle === "AUCTIONS"
            ? "bg-HoneyYellow text-black shadow-[0_-2px_8px_rgba(251,191,36,0.3)]"
            : "text-white hover:bg-HoneyYellow/30 hover:text-black"
        }`}
        // onClick={() => changeActiveToggle("AUCTIONS")} // commenting out to only enable ghoney deposits
      >
        Auctions
      </button>
      <button
        className={`${baseButtonClasses} ${
          activeToggle === "GHONEY"
            ? "bg-HoneyYellow text-black shadow-[0_-2px_8px_rgba(251,191,36,0.3)]"
            : "text-white hover:bg-HoneyYellow/30 hover:text-black"
        }`}
        onClick={() => changeActiveToggle("GHONEY")}
      >
        gHoney
      </button>
    </div>
  );
};
