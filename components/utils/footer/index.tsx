export const Footer = () => {
  return (
    <>
      <img className="absolute h-10 w-10 bottom-[1%] left-[2%] lg:bottom-[3%] lg:left-[3%]" src="/images/icon-share.png" alt="share" />
      <div className="absolute bottom-[1%] right-[2%] lg:bottom-[3%] lg:right-[3%] flex flex-row items-center text-[#D9C6BA]">
        <span className="font-amatic text-[2.4vw] lg:text-[1.7vw] 2xl:text-[1.3vw] mr-3 2xl:mr-6">OOGA BOOGA</span>
        <a className="cursor-pointer hover:scale-110" href="https://x.com/goldilocksmoney" target="_blank">
          <img className="w-8 h-8" src="/images/icon-x.png" alt="x" />
        </a>
        <a className="cursor-pointer hover:scale-110" href="https://discord.gg/3cdn88Mbq8" target="_blank">
          <img className="w-8 h-8" src="/images/icon-discord.png" alt="discord" />
        </a>
        <span className="text-[1.2vw] lg:text-[0.9vw] 2xl:text-[0.7vw] font-baloo ml-3 2xl:ml-6">© 2024 Goldilocks DAO. All rights reserved.</span>
      </div>
    </>
  )
}