export const VaultDisplay = () => {

  return (
    <div className="absolute top-[32.5%] left-[7.5%] h-[40%] w-[85%]">
      <div className="relative w-[100%] h-[100%] flex flex-row items-center justify-around">
        <a className="w-[30%] h-[100%]" href="/goldivault/vault/honeywberaaddyplaceholder">
          <div className="w-[100%] h-[100%] bg-[#9A5816] border-2 border-[#FFCD00] relative hover:scale-105 cursor-pointer" id="card-div-shadow">
            <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
            <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
            <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
            <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
            <div className="absolute inset-4 bg-[#C8894A] border-2 border-[#FFCD00] flex flex-col items-center justify-between p-[5%] font-baloo font-semibold">
              <div className="flex flex-row w-[100%] justify-between">
                <span className="font-amatic font-semibold text-[4vw]">HONEY-WBERA</span>
                <div className="w-24 h-24 bg-black rounded-full border-2 border-[#FFCD00]"></div>
              </div>
              <div className="flex flex-row w-[100%] justify-between items-center">
                <span className="text-[1.5vw]">BEX LP on Infrared</span>
                <span></span>
              </div>
              <div className="flex flex-row w-[100%] justify-between items-center">
                <span className="text-[1vw]">Implied APR: 10%</span>
                <span className="text-[1.5vw]">APR: 5%</span>
              </div>
            </div>
          </div>
        </a>
        <div className="w-[30%] h-[100%] border-2 border-[#FFCD00] relative" id="card-div-shadow">
          <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute inset-4 border-2 border-[#FFCD00] flex items-center justify-center">
            <h1 className="text-center font-amatic text-[2vw] text-[#FFCD00]">MOAR VAULTS IN THE FUTURE...</h1>
          </div>
        </div>
        <div className="w-[30%] h-[100%] border-2 border-[#FFCD00] relative" id="card-div-shadow">
          <div className="absolute top-2 left-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute bottom-2 left-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute top-2 right-0 w-4 -skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute bottom-2 right-0 w-4 skew-y-[45deg] border-b-2 border-[#FFCD00]"></div>
          <div className="absolute inset-4 border-2 border-[#FFCD00] flex items-center justify-center">
            <h1 className="text-center font-amatic text-[2vw] text-[#FFCD00]">OR MAYBE NOT?...</h1>
          </div>
        </div>
      </div>
    </div>
  )
}