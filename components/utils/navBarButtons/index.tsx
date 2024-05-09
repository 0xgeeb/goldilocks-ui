import { ConnectButton } from "@rainbow-me/rainbowkit"

export const NavBarButtons = () => {

  return (
    <div className="h-[89%] w-[100%] bg-[#E4B19B]">
      <div className="h-[100%] w-[100%] py-[8%] flex flex-col items-center justify-between">
        <div className="w-[100%] h-[83%] flex flex-col items-center justify-between font-amaticbold text-[8vw]">
          <ConnectButton.Custom>
            {({
              account,
              mounted,
              openConnectModal
            }) => {
              return (
                !mounted ?
                  <button 
                    className="bg-[#E7B941] border-2 border-black hover:bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[50%]"
                  >
                    ...
                  </button>
                :
                !account ?
                  <button 
                    className="bg-[#E7B941] border-2 border-black hover:bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[50%]"
                    onClick={openConnectModal}
                  >
                    Connect
                  </button>
                :
                  <button 
                    className="border-2 border-black bg-[#F3AA8A] hover:scale-[110%] cursor-pointer w-[50%]"
                  >
                    {`${account.address.slice(0, 5)}...${account?.address.slice(-3)}`}
                  </button>
              )
            }}
          </ConnectButton.Custom>
          <a href="/wut" className="hover:scale-[150%] cursor-pointer"><span>Wut Is This?</span></a>
          <a href="/goldiswap" className="hover:scale-[150%] cursor-pointer"><span>Goldiswap</span></a>
          <a href="/stake" className="hover:scale-[150%] cursor-pointer"><span>Stake</span></a>
          <a href="/borrow" className="hover:scale-[150%] cursor-pointer"><span>Borrow</span></a>
          <a href="/goldilend" className="hover:scale-[150%] cursor-pointer"><span>Goldilend</span></a>
          <a href="/goldivaults" className="hover:scale-[150%] cursor-pointer"><span>Goldivaults</span></a>
        </div>
        <div className="w-[50%] h-[10%] flex flex-row items-center justify-between">
          <h1 className="font-amaticbold text-[7vw]">ooga booga</h1>
          <div className="h-[100%] w-[40%] mt-2 flex flex-row items-center">
            <a className="hover:scale-[150%] cursor-pointer w-[55%] mr-2" href="https:x.com/goldilocksmoney" target="_blank"><img className="" src="/images/icon-x-dark.png" alt="twitter" /></a>
            <a className="hover:scale-[150%] cursor-pointer w-[30%]" href="https://discord.gg/3cdn88Mbq8" target="_blank"><img className="" src="/images/icon-discord-dark.png" alt="discord" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}