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
}: Props) {
  return (
    <div className="relative flex items-center">
      {isLoading ? (
        <span className="loader-small"></span>
      ) : (
        <input
          className="w-full border-none bg-transparent font-baloo text-2xl md:text-3xl font-bold text-white placeholder:text-white/30 focus:outline-none"
          type="number"
          id="number-input"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default SwapInput;
