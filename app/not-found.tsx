import { NavBar } from "../components/utils/navBar"

export default function NotFound() {

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="w-[100%] h-[85%] flex flex-col items-center justify-center bg-[#EEDCD2]">
        <h1 className="font-amaticbold text-[7vw] text-[#E7B941]">where r u</h1>
        <img className="h-[60%]" src="/images/icon-not-found.png" alt="icon" />
      </div>
    </div>
  )
}