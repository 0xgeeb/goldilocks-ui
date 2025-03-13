type Props = {
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  balance: string | JSX.Element;
  walletInfoLoading: boolean;
  unitPrice?: number;
};

function SwapInput({
  isLoading,
  value,
  onChange,
  balance,
  walletInfoLoading,
  unitPrice,
}: Props) {
  const loadingElement = () => {
    return <span className="loader-small ml-3"></span>;
  };

  const amount = unitPrice ? unitPrice * parseFloat(value) : NaN;

  return (
    <div className="relative flex size-full flex-col justify-center px-4 py-2.5">
      {isLoading ? (
        <span className="loader-small"></span>
      ) : (
        <input
          className="w-[90%] border-none bg-transparent font-baloo text-[4.5vw] font-bold focus:outline-hidden md:text-[4vw] lg:text-[3.5vw] xl:text-[2.25vw] 2xl:text-[2vw] tall:top-[15%] tall:text-[5.5vw] tall:md:text-[4vw] tall:lg:text-[3.5vw] tall:xl:text-[2.5vw] tall:2xl:text-[2vw]"
          type="number"
          id="number-input"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <div className="absolute bottom-0 left-0 flex w-full justify-between px-4 font-baloo text-[2vw] font-bold text-[#7F7F7F] md:text-[1.75vw] lg:text-[1.25vw] xl:text-[0.9vw] tall:text-[2.5vw] tall:md:text-[1.75vw] tall:lg:text-[1.25vw] tall:xl:text-[0.9vw]">
        <div>{!isNaN(amount) ? `$${amount.toFixed(2)}` : null}</div>
        <div>balance: {walletInfoLoading ? loadingElement() : balance}</div>
      </div>
    </div>
  );
}

export default SwapInput;
