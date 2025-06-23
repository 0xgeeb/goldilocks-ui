export const FooterMobile = () => {
  return (
    <div className="font-amatic flex w-full flex-col items-center justify-center bg-black py-4 mt-8">
      <div className="flex items-center gap-3 text-white">
        <div className="flex gap-4 uppercase font-bold text-xl">
          <div className="hover:text-HoneyYellow cursor-pointer">About</div>
          <div className="hover:text-HoneyYellow cursor-pointer">Disclaimer</div>
          <div className="hover:text-HoneyYellow cursor-pointer">Legal</div>
        </div>
      </div>
      <div className="flex mt-2 gap-3">
        <a
          className="cursor-pointer hover:scale-110"
          href="https://x.com/goldilocksmoney"
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-6 w-6" src="/images/icon-x.png" alt="x" />
        </a>
        <a
          className="cursor-pointer hover:scale-110"
          href="https://discord.gg/3cdn88Mbq8"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-6 w-6"
            src="/images/icon-discord.png"
            alt="discord"
          />
        </a>
      </div>
      <div className="text-lg text-[#8D8D8D] mt-2">
        © 2025 Goldilocks DAO. All rights reserved.
      </div>
    </div>
  );
};
