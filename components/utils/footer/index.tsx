export const Footer = () => {
  return (
    <div className="font-amatic relative flex h-[70px] w-full flex-col items-center justify-center bg-black py-3">
      <div className="flex items-center gap-3 text-white">
        <div className="flex gap-4 text-xl font-bold uppercase">
          <a
            href="https://goldilocks.gitbook.io/goldidocs"
            target="_blank"
            rel="noreferrer"
          >
            <div className="hover:text-HoneyYellow cursor-pointer">About</div>
          </a>
          <a
            href="/tandcs"
            target="_blank"
            rel="noreferrer"
          >
            <div className="hover:text-HoneyYellow cursor-pointer">Legal</div>
          </a>
        </div>
        <div className="ml-2 flex flex-row items-center gap-2">
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
      </div>
      <div className="mt-1 text-base text-[#8D8D8D]">
        © 2024 Goldilocks DAO. All rights reserved.
      </div>
    </div>
  );
};
