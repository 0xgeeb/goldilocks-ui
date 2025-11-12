import { useGoldilend } from "../../../providers";
import { BorrowTabMobile, BoostTabMobile } from "../";

export const BorrowBoxMobile = () => {
  const { activeToggle } = useGoldilend();

  if (activeToggle === "BORROW") {
    return <BorrowTabMobile />;
  }

  return <BoostTabMobile />;
};
