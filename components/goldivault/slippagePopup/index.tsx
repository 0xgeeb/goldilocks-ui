import { useGoldivault } from "../../../providers";
import {
  FieldWithLabel,
  Label,
  Container,
  FormWrapper
} from "../../../app/(geo-check)/goldivault/vault/[address]/_components/FormComponents";

export const SlippagePopup = () => {
  const { slippage, changeSlippage, changeSlippageToggle } = useGoldivault();

  return (
    <div className="absolute z-60 mt-[15%] sm:mt-[5%] ml-[12.5%] sm:ml-[25%] w-3/4 sm:w-1/2 max-w-5xl flex flex-col items-center rounded-2xl border-2 border-[#352A1C] p-2 bg-bera-brown-dark">
      <FormWrapper>
        <h1 id="page-title" className="text-HoneyYellow font-amaticbold mb-6 text-5xl mx-auto">Set Slippage:</h1>
        <FieldWithLabel
          id="number-input"
          label={"%"}
          value={slippage.displayString}
          onChange={(e) => {
            if (!e.target.value) {
              changeSlippage(0, e.target.value);
            } else {
              changeSlippage(parseFloat(e.target.value), e.target.value);
            }
          }}
        />
        <Container align="center" padding="md">
          <div className="flex flex-row justify-between items-center w-3/4 mt-6">
            <Label
              className={`${slippage.amount == 0.5 && "text-white"} cursor-pointer text-2xl hover:text-white`}
              onClick={() => changeSlippage(0.5, "0.5")}
            >
              <span>Default</span>
            </Label>
            <Label
              className={`${slippage.amount !== 0.5 && "text-white"} cursor-pointer text-2xl hover:text-white`}
              onClick={() => changeSlippage(0, "0")}
            >
              <span>Custom</span>
            </Label>
          </div>
        </Container>
      </FormWrapper>
      <span
        className="absolute right-[5%] top-[5%] cursor-pointer fill-warm-text hover:fill-white"
        onClick={() => changeSlippageToggle(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-10">
          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </span>
      {/* <p
        className="absolute right-[3%] top-0 cursor-pointer hover:scale-110 text-4xl hover:text-white"
        onClick={() => changeSlippageToggle(false)}
      >
        x
      </p> */}
    </div>
  );
};
