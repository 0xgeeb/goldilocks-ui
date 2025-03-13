export const Stats = () => {
  return (
    <div className="absolute bottom-[73%] right-[5%] flex h-[20%] w-[50%] items-end justify-around py-6 font-baloo text-[1.5vw] font-medium text-white">
      <span className="mb-4">my position</span>
      <span className="text-[2.25vw]">$500,000</span>
      <button className="mb-2 border-2 border-[#FFCD00] p-2 text-[1vw] font-semibold text-[#FFCD00] outline-hidden hover:border-black hover:bg-[#FFCD00] hover:text-black">
        DEETS
      </button>
      <span className="mb-4">claimable rewards</span>
      <span className="text-[2.25vw]">$69</span>
      <button className="mb-2 border-2 border-[#FFCD00] p-2 text-[1vw] font-semibold text-[#FFCD00] outline-hidden hover:border-black hover:bg-[#FFCD00] hover:text-black">
        CLAIM
      </button>
    </div>
  );
};
