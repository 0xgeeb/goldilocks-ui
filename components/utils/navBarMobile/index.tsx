import { useDesktop } from "../../../providers";

export const NavBarMobile = () => {
  const { navButtonsOpen, setNavButtonsOpen } = useDesktop();

  return (
    <header className="flex h-[11%] w-[100%] flex-row items-center justify-between border-b-2 border-black bg-[#EEDCD2] px-[5%]">
      <a href="/" className="h-[100%]">
        <div className="flex h-[100%] max-w-16 flex-row items-center focus:opacity-30">
          <img
            className="h-[80%]"
            src="/images/logo-goldilocks.png"
            alt="logo"
          />
          <h1 className="ml-1 font-amaticbold text-[6vw] whitespace-nowrap">Goldilocks DAO</h1>
        </div>
      </a>
      {navButtonsOpen ? (
        <img
          className="h-[50%] cursor-pointer focus:scale-125"
          src="/images/icon-nav-close.png"
          alt="navclose"
          onClick={() => setNavButtonsOpen(!navButtonsOpen)}
        />
      ) : (
        <img
          className="h-[70%] cursor-pointer focus:scale-125"
          src="/images/icon-nav-button.png"
          alt="clawicon"
          onClick={() => setNavButtonsOpen(!navButtonsOpen)}
        />
      )}
    </header>
  );
};
