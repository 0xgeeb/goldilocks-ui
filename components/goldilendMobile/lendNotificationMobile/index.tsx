import { useGoldilend } from "../../../providers"

export const LendNotificationMobile = () => {

  const { notification, openNotification } = useGoldilend()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] flex flex-col items-center justify-around relative px-[2%]">
      <h1 className="font-amaticbold text-[10vw]">SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[3.5vw] text-center">{notification.action}</span>
      <span className="font-baloo font-semibold text-[3.5vw] text-center">{notification.result}</span>
      <a 
        href={`https://sepolia.basescan.org/tx/${notification.hash}`}
        target="_blank"
        className="h-[17%] w-[50%] bg-[#E7B941] focus:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[5.5vw]">VIEW TX</button>
      </a>
      <p
        className="absolute top-[-2%] right-[2%] font-baloo text-[7vw] cursor-pointer focus:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}