import { useDesktop } from "../../../providers"

export const NavBarMobile = () => {

  const {
    navButtonsOpen,
    setNavButtonsOpen
  } = useDesktop()

  return (
    <header className="w-[100%] h-[11%] bg-[#EEDCD2] flex flex-row items-center justify-between px-[5%] border-b-2 border-black">
      <a href="/" className="h-[100%]">
        <div className="flex flex-row items-center h-[100%] focus:opacity-30">
          <img className="h-[80%]" src="/images/logo-goldilocks.png" alt="logo" />
          <h1 className="font-amaticbold text-[6vw] ml-1">Goldilocks DAO</h1>
        </div>
      </a>
      {
        navButtonsOpen ?
        <img
          className="h-[50%] focus:scale-125 cursor-pointer"
          src="/images/icon-nav-close.png"
          alt="navclose"
          onClick={() => setNavButtonsOpen(!navButtonsOpen)}
        /> :
        <img 
          className="h-[70%] focus:scale-125 cursor-pointer" 
          src="/images/icon-nav-button.png" 
          alt="clawicon"
          onClick={() => setNavButtonsOpen(!navButtonsOpen)}
        />
      }
    </header>
  )
}