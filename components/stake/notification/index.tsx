import { useStake } from "../../../providers"

export const Notification = () => {

  const { notification, openNotification, activeToggle } = useStake()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] flex flex-col items-center relative">
      <h1 className={`font-amaticbold text-[5vw] lg:text-[2.8vw] ${activeToggle === 'CLAIM' ? "mt-[10%]" : "mt-[2%] lg:mt-[1%]"}`}>SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[1.5vw] lg:text-[0.9vw]">{notification.action}</span>
      <span className="font-baloo font-semibold text-[1.5vw] lg:text-[0.9vw] mt-[3%] lg:mt-[1%]">{notification.result}</span>
      <a 
        href={`https://sepolia.basescan.org/tx/${notification.hash}`}
        target="_blank"
        className="h-[16%] lg:h-[18%] w-[25%] lg:w-[19%] mt-[6%] lg:mt-[3%] bg-[#E7B941] hover:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[2.2vw] lg:text-[1.2vw]">VIEW TX</button>
      </a>
      <p
        className="absolute top-0 right-[3%] font-baloo text-[3vw] lg:text-[2vw] cursor-pointer hover:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}