export const Stats = () => {

  return (
    <div className="absolute bottom-[73%] right-[5%] h-[20%] w-[50%] flex items-end justify-around py-6 font-baloo font-medium text-white text-[1.5vw]">
      <span className="mb-4">my position</span>
      <span className="text-[2.25vw]">$500,000</span>
      <button className="mb-2 outline-none border-2 border-[#FFCD00] text-[#FFCD00] text-[1vw] font-semibold p-2 hover:bg-[#FFCD00] hover:text-black hover:border-black">DEETS</button>
      <span className="mb-4">claimable rewards</span>
      <span className="text-[2.25vw]">$69</span>
      <button className="mb-2 outline-none border-2 border-[#FFCD00] text-[#FFCD00] text-[1vw] font-semibold p-2 hover:bg-[#FFCD00] hover:text-black hover:border-black">CLAIM</button>
    </div>
  )
}