export const StatsMobile = () => {

  return (
    <div className="absolute bottom-[86.5%] left-[10%] h-[5%] w-[80%] flex flex-col font-baloo font-medium text-white text-[3.5vw]">
      <div className="flex flex-row items-center justify-between">
        <span className="">my position</span>
        <span className="text-[5.5vw]">$500,000</span>
        <button className="outline-none border-2 border-[#FFCD00] text-[#FFCD00] text-[3vw] font-semibold py-1 px-2 hover:bg-[#FFCD00] hover:text-black hover:border-black">DEETS</button>
      </div>
      <div className="flex flex-row items-center justify-between mt-2">
        <span className="">claimable rewards</span>
        <span className="text-[5.5vw]">$69</span>
        <button className="outline-none border-2 border-[#FFCD00] text-[#FFCD00] text-[3vw] font-semibold py-1 px-2 hover:bg-[#FFCD00] hover:text-black hover:border-black">CLAIM</button>
      </div>
    </div>
  )
}