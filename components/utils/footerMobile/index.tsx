export const FooterMobile = () => {
  return (
    <div className="absolute left-[5%] top-[90%] flex h-[9%] w-[90%] flex-col items-center justify-around tall:top-[88%]">
      <div className="flex w-[50%] flex-row items-center justify-between">
        <span className="font-amaticbold text-[6vw] text-[#D9C6BA]">
          ooga booga
        </span>
        <div className="flex w-[50%] flex-row items-center justify-end">
          <a
            className="w-[40%] cursor-pointer focus:scale-[150%]"
            href="https://x.com/goldilocksmoney"
            target="_blank"
            rel="noreferrer"
          >
            <img className="" src="/images/icon-x.png" alt="twitter" />
          </a>
          <a
            className="w-[40%] cursor-pointer focus:scale-[150%]"
            href="https://discord.gg/3cdn88Mbq8"
            target="_blank"
            rel="noreferrer"
          >
            <img className="" src="/images/icon-discord.png" alt="discord" />
          </a>
        </div>
      </div>
      <span className="font-baloo text-[3.2vw] font-semibold text-[#D9C6BA]">
        © 2024 Goldilocks DAO. All rights reserved.
      </span>
    </div>
  );
};
