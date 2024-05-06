import { useBorrow } from "../../../providers"

export const Notification = () => {

  const { notification, openNotification } = useBorrow()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] flex flex-col items-center relative">
      <h1 className="font-amaticbold text-[2.8vw] mt-[1%]">SUCCESS!</h1>
      <span className="font-baloo font-semibold text-[0.9vw]">{notification.action}</span>
      <span className="font-baloo font-semibold text-[0.9vw] mt-[1%]">{notification.result}</span>
      <a 
        href={`https://artio.beratrail.io/tx/${notification.hash}`}
        target="_blank"
        className="h-[18%] w-[19%] mt-[3%] bg-[#E7B941] hover:scale-110 border-2 border-black"
      >
        <button className="w-[100%] h-[100%] font-amaticbold text-[1.2vw]">VIEW TX</button>
      </a>
      <p
        className="absolute top-0 right-[3%] font-baloo text-[2vw] cursor-pointer hover:scale-110"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}