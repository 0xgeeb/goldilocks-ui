import { useGoldiswap } from "../../../providers";

export const SlippagePopupMobile = () => {
  const { slippage, changeSlippage, changeSlippageToggle } = useGoldiswap();

  return (
    <div className="absolute right-[7%] top-[6%] z-20 h-[19.7%] w-[60%] border-2 border-black bg-[#B95500]">
      <div className="relative flex h-[100%] w-[100%] flex-col items-center font-baloo font-semibold">
        <span className="mt-[8%] text-[4vw] text-white">Set Slippage:</span>
        <div className="relative mt-[4%] h-[50%] w-[60%] border-2 border-black bg-white">
          <input
            className="absolute left-[10%] top-[2%] h-[50%] w-[100%] bg-transparent text-[4vw] focus:outline-hidden"
            type="number"
            id="number-input"
            value={slippage.displayString}
            onChange={(e) => {
              if (!e.target.value) {
                changeSlippage(0, e.target.value);
              } else {
                changeSlippage(parseFloat(e.target.value), e.target.value);
              }
            }}
          />
          <div className="absolute bottom-0 flex h-[50%] w-[100%] flex-row border-t-2 border-black bg-[#DCC2A8]">
            <div
              className={`${slippage.amount == 0.5 ? "bg-[#E7B941]" : ""} flex h-[100%] w-[50%] cursor-pointer items-center justify-center border-r-2 border-black hover:bg-[#F3AA8A]`}
              onClick={() => changeSlippage(0.5, "0.5")}
            >
              <span className="font-baloo text-[3vw]">DEFAULT</span>
            </div>
            <div
              className={`${slippage.amount == 0.5 ? "" : "bg-[#E7B941]"} flex h-[100%] w-[50%] cursor-pointer items-center justify-center hover:bg-[#F3AA8A]`}
              onClick={() => changeSlippage(0, "0")}
            >
              <span className="font-baloo text-[3vw]">CUSTOM</span>
            </div>
          </div>
          <span className="absolute right-[10%] top-[10%] text-[4vw]">%</span>
        </div>
        <p
          className="absolute right-[4%] top-0 cursor-pointer font-baloo text-[5vw] hover:scale-110"
          onClick={() => changeSlippageToggle(false)}
        >
          x
        </p>
      </div>
    </div>
  );
};
