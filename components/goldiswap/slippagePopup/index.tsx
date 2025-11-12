import { useGoldiswap } from "../../../providers";

export const SlippagePopup = () => {
  const { slippage, changeSlippage, changeSlippageToggle } = useGoldiswap();

  return (
    <div 
      className="absolute right-0 bottom-12 z-50 w-80 rounded-2xl shadow-2xl"
      style={{
        backgroundColor: "rgba(60, 50, 40, 0.95)",
        border: "2px solid rgba(205, 133, 63, 0.5)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative flex flex-col p-4 gap-4 font-baloo">
        <div className="flex justify-between items-center gap-4">
          <span className="text-HoneyYellow font-amaticbold text-2xl whitespace-nowrap">
            Set Slippage
          </span>
          <div className="relative flex-1 rounded-xl overflow-hidden"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(205, 133, 63, 0.3)",
            }}
          >
            <input
              className="w-full px-4 py-2 bg-transparent text-white text-lg font-semibold focus:outline-none"
              type="number"
              id="number-input"
              placeholder="0.5"
              value={slippage.displayString}
              onChange={(e) => {
                if (!e.target.value) {
                  changeSlippage(0, e.target.value);
                } else {
                  changeSlippage(parseFloat(e.target.value), e.target.value);
                }
              }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-HoneyYellow text-lg font-semibold">
              %
            </span>
          </div>
          <button
            className="text-white/70 hover:text-white text-xl cursor-pointer hover:scale-110 transition-all"
            onClick={() => changeSlippageToggle(false)}
          >
            ×
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className={`flex-1 py-1.5 rounded-lg font-baloo text-sm font-semibold transition-all border ${
              slippage.amount == 0.5
                ? "bg-HoneyYellow/20 text-HoneyYellow border-HoneyYellow/50"
                : "bg-black/20 text-white/60 border-amber-900/30 hover:bg-black/30"
            }`}
            onClick={() => changeSlippage(0.5, "0.5")}
          >
            DEFAULT
          </button>
          <button
            className={`flex-1 py-1.5 rounded-lg font-baloo text-sm font-semibold transition-all border ${
              slippage.amount != 0.5
                ? "bg-HoneyYellow/20 text-HoneyYellow border-HoneyYellow/50"
                : "bg-black/20 text-white/60 border-amber-900/30 hover:bg-black/30"
            }`}
            onClick={() => changeSlippage(0, "0")}
          >
            CUSTOM
          </button>
        </div>
      </div>
    </div>
  );
};
