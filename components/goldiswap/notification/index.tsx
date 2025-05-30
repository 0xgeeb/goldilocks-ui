import { useGoldiswap } from "../../../providers";

export const Notification = () => {
  const { notification, openNotification } = useGoldiswap();

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-around bg-[#E9D7A9] py-[4%]">
      <h1 className="font-amaticbold text-[10vw] md:text-[8vw] lg:text-[6vw] xl:text-[4vw]">
        SUCCESS!
      </h1>
      <span className="font-baloo text-[3vw] font-semibold md:text-[2.5vw] lg:text-[1.5vw] xl:text-[1vw]">
        {notification.action}
      </span>
      <span className="font-baloo text-[3vw] font-semibold md:text-[2.5vw] lg:text-[1.5vw] xl:text-[1vw]">
        {notification.result}
      </span>
      <a
        href={`https://berascan.com/tx/${notification.hash}`}
        target="_blank"
        className="h-[15%] w-[30%] border-2 border-black bg-[#E7B941] hover:scale-110 xl:h-[20%]"
        rel="noreferrer"
      >
        <button className="h-[100%] w-[100%] font-amaticbold text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] cursor-pointer">
          VIEW TX
        </button>
      </a>
      <p
        className="absolute right-[4%] top-0 cursor-pointer font-baloo text-[4vw] hover:scale-125 lg:right-[3%] lg:text-[3vw]"
        onClick={() => openNotification(false, "", "", "")}
      >
        x
      </p>
    </div>
  );
};
