import { useGoldiswap } from "../../../providers"

export const Notification = () => {

  const { notification, openNotification } = useGoldiswap()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] flex flex-col items-center relative">
      <h1 className="font-amaticbold text-[5vw] mt-[2%]">SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[1vw]">{notification.action}</span>
      <span className="font-baloo font-semibold text-[1vw] mt-[1%]">{notification.result}</span>
      <a 
        href={`https://artio.beratrail.io/tx/${notification.hash}`}
        target="_blank"
        className="h-[18%] w-[21%] mt-[4%] bg-[#E7B941] hover:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[1.5vw]">VIEW TX</button>
      </a>
      <p
        className="absolute top-0 right-[3%] font-baloo text-[2vw] cursor-pointer hover:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}