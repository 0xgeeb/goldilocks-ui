export const Footer = () => {
  return (
    <>
      <img
        className="absolute bottom-[1%] left-[2%] h-10 w-10 cursor-pointer hover:animate-spin xl:bottom-[3%] xl:left-[3%]"
        src="/images/icon-share.png"
        alt="share"
      />
      <div className="absolute bottom-[1%] right-[2%] flex flex-row items-center text-[#D9C6BA] xl:bottom-[3%] xl:right-[3%]">
        <span className="mr-3 font-amatic text-[2.8vw] xl:text-[1.7vw] 2xl:mr-6 2xl:text-[1.3vw]">
          OOGA BOOGA
        </span>
        <a
          className="cursor-pointer hover:scale-110"
          href="https://x.com/goldilocksmoney"
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-8 w-8" src="/images/icon-x.png" alt="x" />
        </a>
        <a
          className="cursor-pointer hover:scale-110"
          href="https://discord.gg/3cdn88Mbq8"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-8 w-8"
            src="/images/icon-discord.png"
            alt="discord"
          />
        </a>
        <span className="ml-3 font-baloo text-[1.5vw] xl:text-[0.9vw] 2xl:ml-6 2xl:text-[0.7vw]">
          © 2024 Goldilocks DAO. All rights reserved.
        </span>
      </div>
    </>
  );
};
