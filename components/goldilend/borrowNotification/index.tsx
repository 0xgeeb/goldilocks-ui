import { useGoldilend } from "../../../providers"

export const BorrowNotification = () => {

  const { notification, openNotification } = useGoldilend()

  return (
    <div className="w-[100%] h-[100%] bg-[#E9D7A9] relative">
      <div className="w-[100%] h-[80%] flex flex-col items-center justify-between">
        <h1 className="font-amaticbold text-[10vw] xl:text-[4vw] mt-[5%] xl:mt-[2%]">SUCCESS!</h1>
        <span className="font-baloo font-semibold text-[3vw] xl:text-[1.5vw]">{notification.action}</span>
        <span className="font-baloo font-semibold text-[3vw] xl:text-[1.5vw] mt-[3%]">{notification.result}</span>
        <a 
          href={`https://bartio.beratrail.io/tx/${notification.hash}`}
          target="_blank"
          className="h-[15%] w-[25%] xl:h-[20%] xl:w-[19%] mt-[3%] bg-[#E7B941] hover:scale-110 border-2 border-black"
        >
          <button className="w-[100%] h-[100%] font-amaticbold text-[4vw] xl:text-[2vw]">VIEW TX</button>
        </a>
      </div>
      <p
        className="absolute top-0 right-[3%] font-baloo text-[5vw] xl:text-[3vw] cursor-pointer hover:scale-125"
        onClick={() => openNotification(false, '', '', '')}
      >
        x
      </p>
    </div>
  )
}