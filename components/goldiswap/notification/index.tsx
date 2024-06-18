import { useGoldiswap } from "../../../providers"

export const Notification = () => {

  const { notification, openNotification } = useGoldiswap()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] flex flex-col items-center relative">
      <h1 className="font-amaticbold text-[8vw] lg:text-[5vw] mt-[8%] lg:mt-[2%]">SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[1.7vw] lg:text-[1vw]">{notification.action}</span>
      <span className="font-baloo font-semibold text-[1.7vw] lg:text-[1vw] mt-[4%] lg:mt-[1%]">{notification.result}</span>
      <a 
        href={`https://bartio.beratrail.io/tx/${notification.hash}`}
        target="_blank"
        className="h-[15%] w-[30%] lg:h-[18%] lg:w-[21%] mt-[8%] lg:mt-[4%] bg-[#E7B941] hover:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[2.5vw] lg:text-[1.5vw]">VIEW TX</button>
      </a>
      <p
        className="absolute top-0 right-[4%] lg:right-[3%] font-baloo text-[4vw] lg:text-[2vw] cursor-pointer hover:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}