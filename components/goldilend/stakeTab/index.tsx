import { useGoldilend } from "../../../providers";
import { LendNotification } from "../../goldilend";

export const StakeTab = () => {
  const {
    lendActiveToggle,
    handlePercentageButtons,
    displayString,
    handleStakeChange,
    handleStakeBalance,
    txConfirming,
    notification,
    walletInfoLoading,
  } = useGoldilend();

  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  return txConfirming ? (
    <img
      className="h-[100%] w-[100%]"
      src="/images/bg-transaction.png"
      alt="tx"
    />
  ) : notification.toggle ? (
    <LendNotification />
  ) : (
    <div className="relative flex h-[100%] w-[100%] flex-col">
      <div className="absolute right-0 top-0 flex h-[14.9%] w-[38%] flex-row border-b-2 border-l-2 border-black font-baloo text-[2vw] font-semibold xl:w-[33.61%] xl:text-[1vw]">
        <div
          className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#DCC2A8] hover:bg-[#F3AA8A]"
          onClick={() => handlePercentageButtons(1)}
        >
          25%
        </div>
        <div
          className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D5A774] hover:bg-[#F3AA8A]"
          onClick={() => handlePercentageButtons(2)}
        >
          50%
        </div>
        <div
          className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center border-r-2 border-black bg-[#D19A5B] hover:bg-[#F3AA8A]"
          onClick={() => handlePercentageButtons(3)}
        >
          75%
        </div>
        <div
          className="flex h-[100%] w-[25%] cursor-pointer items-center justify-center bg-[#CC8634] hover:bg-[#F3AA8A]"
          onClick={() => handlePercentageButtons(4)}
        >
          MAX
        </div>
      </div>
      <div className="absolute left-[2%] top-[38%] flex flex-row items-center xl:left-[3%]">
        <img className="h-8 w-8" src="/images/logo-gibgt.png" alt="coinlogo" />
        <h1 className="ml-1 mt-1 font-baloo text-[3vw] font-semibold xl:text-[1.8vw]">
          WBERA
        </h1>
      </div>
      <div className="absolute left-[30%] top-[30%] h-[36%] w-[65%] border-2 border-black bg-white xl:left-[22%] xl:w-[55.6%]">
        <div className="relative h-[100%] w-[100%]">
          <input
            className="absolute left-[7.5%] top-[17%] w-[90%] border-none bg-transparent font-baloo text-[4vw] font-bold focus:outline-hidden xl:left-[5%] xl:text-[2vw]"
            type="number"
            id="number-input"
            placeholder="0.00"
            value={displayString}
            onChange={(e) => handleStakeChange(e.target.value, "STAKE")}
          />
          <span className="absolute bottom-0 right-[3%] font-baloo text-[1.8vw] font-bold text-[#7F7F7F] xl:text-[0.9vw]">
            {lendActiveToggle === "UNSTAKE" ? "staked wbera" : "balance"}:{" "}
            {walletInfoLoading ? loadingElement() : handleStakeBalance("STAKE")}
          </span>
        </div>
      </div>
    </div>
  );
};
