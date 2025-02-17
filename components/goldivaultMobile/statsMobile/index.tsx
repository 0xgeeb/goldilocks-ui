export const StatsMobile = () => {
  return (
    <div className="absolute bottom-[86.5%] left-[10%] flex h-[5%] w-[80%] flex-col font-baloo text-[3.5vw] font-medium text-white">
      <div className="flex flex-row items-center justify-between">
        <span className="">my position</span>
        <span className="text-[5.5vw]">$500,000</span>
        <button className="border-2 border-[#FFCD00] px-2 py-1 text-[3vw] font-semibold text-[#FFCD00] outline-none hover:border-black hover:bg-[#FFCD00] hover:text-black">
          DEETS
        </button>
      </div>
      <div className="mt-2 flex flex-row items-center justify-between">
        <span className="">claimable rewards</span>
        <span className="text-[5.5vw]">$69</span>
        <button className="border-2 border-[#FFCD00] px-2 py-1 text-[3vw] font-semibold text-[#FFCD00] outline-none hover:border-black hover:bg-[#FFCD00] hover:text-black">
          CLAIM
        </button>
      </div>
    </div>
  );
};
