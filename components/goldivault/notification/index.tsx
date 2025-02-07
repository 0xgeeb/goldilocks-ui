import { useGoldivault } from "../../../providers"

export const Notification = () => {

  const { notification, openNotification } = useGoldivault()

  return (
    <div className="w-[100%] h-[100%] bg-[#C8894A] flex flex-col items-center relative justify-around py-[4%]">
      <h1 className="font-amaticbold text-[10vw] md:text-[8vw] lg:text-[6vw] xl:text-[4vw]">SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[3vw] md:text-[2.5vw] lg:text-[1.5vw] xl:text-[1vw]">{notification.action}</span>
      <span className="font-baloo font-semibold text-[3vw] md:text-[2.5vw] lg:text-[1.5vw] xl:text-[1vw]">{notification.result}</span>
      <a 
        href={`https://beratrail.io/tx/${notification.hash}`}
        target="_blank"
        className="h-[15%] xl:h-[20%] w-[30%] bg-[#E7B941] hover:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw]">VIEW TX</button>
      </a>
      <p
        className="absolute top-0 right-[4%] lg:right-[3%] font-baloo text-[4vw] lg:text-[3vw] cursor-pointer hover:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}