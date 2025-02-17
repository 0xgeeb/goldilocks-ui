import { useGoldivault } from "../../../providers";

export const SlippagePopup = () => {
  const { slippage, changeSlippage, changeSlippageToggle } = useGoldivault();

  return (
    <div className="absolute left-[30%] top-[18%] z-50 h-[30%] w-[40%] border-2 border-black bg-[#B95500] xl:left-[38%] xl:w-[24%] 2xl:left-[45%] 2xl:top-[18%] 2xl:w-[19%] tall:h-[22%]">
      <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-between py-[5%] font-baloo font-semibold">
        <span className="text-[3.5vw] text-white md:text-[2.5vw] xl:text-[1.75vw] 2xl:text-[1.25vw]">
          Set Slippage:
        </span>
        <div className="relative h-[60%] w-[70%] border-2 border-black bg-white md:w-[60%]">
          <input
            className="absolute left-[6%] top-[2%] h-[50%] w-[100%] bg-transparent text-[3vw] focus:outline-none xl:text-[2.2vw] 2xl:left-[10%] 2xl:text-[1.4vw]"
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
              <span className="font-baloo text-[2vw] md:text-[1.75vw] xl:text-[1.25vw] 2xl:text-[0.8vw]">
                DEFAULT
              </span>
            </div>
            <div
              className={`${slippage.amount == 0.5 ? "" : "bg-[#E7B941]"} flex h-[100%] w-[50%] cursor-pointer items-center justify-center hover:bg-[#F3AA8A]`}
              onClick={() => changeSlippage(0, "0")}
            >
              <span className="font-baloo text-[2vw] md:text-[1.75vw] xl:text-[1.25vw] 2xl:text-[0.8vw]">
                CUSTOM
              </span>
            </div>
          </div>
          <span className="absolute right-[10%] top-[10%] text-[3vw] md:text-[2.5vw] xl:text-[1.75vw] 2xl:text-[1.25vw]">
            %
          </span>
        </div>
        <p
          className="absolute right-[3%] top-0 cursor-pointer font-baloo text-[3vw] hover:scale-110 md:text-[2.5vw] 2xl:right-[4%] 2xl:text-[1.5vw]"
          onClick={() => changeSlippageToggle(false)}
        >
          x
        </p>
      </div>
    </div>
  );
};
