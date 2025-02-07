import { useStake } from "../../../providers"

export const Notification = () => {

  const { notification, openNotification, activeToggle } = useStake()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] flex flex-col items-center relative justify-around py-[2%]">
      <h1 className="font-amaticbold text-[7vw] md:text-[6vw] lg:text-[5vw] xl:text-[3vw]">SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[2.5vw] md:text-[2.25vw] lg:text-[1.5vw] xl:text-[0.9vw]">{notification.action}</span>
      <span className="font-baloo font-semibold text-[2.5vw] md:text-[2.25vw] lg:text-[1.5vw] xl:text-[0.9vw]">{notification.result}</span>
      <a 
        href={`https://beratrail.io/tx/${notification.hash}`}
        target="_blank"
        className="h-[25%] xl:h-[25%] w-[30%] bg-[#E7B941] hover:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw]">VIEW TX</button>
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