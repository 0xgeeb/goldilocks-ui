export const FooterMobile = () => {

  return (
    <div className="absolute top-[88%] left-[20%] h-[9%] w-[65%] flex flex-col items-center justify-around">
      <div className="w-[70%] flex flex-row items-center justify-between">
        <span className="text-[6vw] font-amaticbold text-[#D9C6BA]">ooga booga</span>
        <div className="flex flex-row items-center justify-end w-[50%]">
          <a className="focus:scale-[150%] cursor-pointer w-[40%]" href="https:x.com/goldilocksmoney" target="_blank"><img className="" src="/images/icon-x.png" alt="twitter" /></a>
          <a className="focus:scale-[150%] cursor-pointer w-[40%]" href="https://discord.gg/3cdn88Mbq8" target="_blank"><img className="" src="/images/icon-discord.png" alt="discord" /></a>
        </div>
      </div>
      <span className="text-[3.2vw] font-semibold font-baloo text-[#D9C6BA]">© 2024 Goldilocks DAO. All rights reserved.</span>
    </div>
  )
}