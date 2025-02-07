import { useGoldiswap } from "../../../providers"

export const NotificationMobile = () => {

  const { notification, openNotification } = useGoldiswap()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] flex flex-col items-center relative px-[2%]">
      <h1 className="font-amaticbold text-[15vw] mt-[25%]">SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[3vw] mt-[2%]">{notification.action}</span>
      <span className="font-baloo font-semibold text-[3vw] mt-[10%]">{notification.result}</span>
      <a 
        href={`https://beratrail.io/tx/${notification.hash}`}
        target="_blank"
        className="h-[11%] w-[50%] mt-[20%] bg-[#E7B941] focus:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[5vw]">VIEW TX</button>
      </a>
      <p
        className="absolute top-[-1%] right-[3%] font-baloo text-[7vw] cursor-pointer focus:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}