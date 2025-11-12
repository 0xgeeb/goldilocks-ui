import { useDesktop } from "../../../providers";

export const NavBarMobile = () => {
  const { navButtonsOpen, setNavButtonsOpen } = useDesktop();

  return (
    <header className="flex h-[11%] w-[100%] flex-row items-center justify-between bg-black/85 px-[5%]">
      <a href="/" className="h-[100%]">
        <div className="flex h-[100%] max-w-16 flex-row items-center focus:opacity-30">
          <img
            className="h-[80%]"
            src="/images/logo-goldilocks.png"
            alt="logo"
          />
          <h1 className="ml-1 font-amaticbold text-[6vw] whitespace-nowrap text-HoneyYellow">Goldilocks DAO</h1>
        </div>
      </a>
      {navButtonsOpen ? (
        <img
          className="h-[50%] cursor-pointer focus:scale-125"
          src="/images/icon-nav-close.png"
          alt="navclose"
          onClick={() => setNavButtonsOpen(!navButtonsOpen)}
          style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(96%) saturate(1234%) hue-rotate(337deg) brightness(105%) contrast(95%)' }}
        />
      ) : (
        <img
          className="h-[70%] cursor-pointer focus:scale-125"
          src="/images/icon-nav-button.png"
          alt="clawicon"
          onClick={() => setNavButtonsOpen(!navButtonsOpen)}
          style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(96%) saturate(1234%) hue-rotate(337deg) brightness(105%) contrast(95%)' }}
        />
      )}
    </header>
  );
};
