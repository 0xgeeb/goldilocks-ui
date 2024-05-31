import { useGoldilend } from "../../../providers"

export const LendNotification = () => {

  const { notification, openNotification, lendActiveToggle } = useGoldilend()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] relative">
      <div className="w-[100%] h-[80%] flex flex-col items-center justify-between">
        <h1 className={`font-amaticbold text-[5vw] lg:text-[2.8vw] ${lendActiveToggle === 'CLAIM' ? "mt-[20%]" : "mt-[2%]"}`}>SUCCESS!</h1>
        <span className="font-baloo font-semibold text-[1.5vw] lg:text-[0.9vw]">{notification.action}</span>
        <span className="font-baloo font-semibold text-[1.5vw] lg:text-[0.9vw] mt-[3%] lg:mt-[1%]">{notification.result}</span>
        <a 
          href={`https://sepolia.basescan.org/tx/${notification.hash}`}
          target="_blank"
          className={`${lendActiveToggle === 'CLAIM' ? "h-[15%] w-[30%]" : "h-[20%] w-[19%]"}   mt-[3%] bg-[#E7B941] hover:scale-110 border-2 border-black`}
        >
          <button className="w-[100%] h-[100%] font-amaticbold text-[1.2vw]">VIEW TX</button>
        </a>
      </div>
      <p
        className="absolute top-0 right-[3%] font-baloo text-[3vw] lg:text-[2vw] cursor-pointer hover:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}