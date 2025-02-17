export const BorrowPopup = () => {
  return (
    <div className="absolute right-[2%] top-[-2%] flex h-[11%] w-[40%] items-center justify-center border-2 border-black bg-[#FFE59F] px-2 font-baloo text-[2.25vw] font-semibold md:text-[2vw] lg:text-[1.5vw] xl:w-[30%] xl:text-[1.25vw] 2xl:w-[21%] 2xl:text-[0.9vw]">
      <span className="text-center">
        there is a 3% origination fee on all borrows, but there is no interest
        and loans cannot be liquidated
      </span>
    </div>
  );
};
