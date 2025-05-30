import { useBorrow } from "../../../providers";

export const Notification = () => {
  const { notification, openNotification } = useBorrow();

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-around bg-[#E9D7A9] py-[2%]">
      <h1 className="font-amaticbold text-[7vw] md:text-[6vw] lg:text-[5vw] xl:text-[3vw]">
        SUCCESS!
      </h1>
      <span className="font-baloo text-[2.5vw] font-semibold md:text-[2.25vw] lg:text-[1.5vw] xl:text-[0.9vw]">
        {notification.action}
      </span>
      <span className="font-baloo text-[2.5vw] font-semibold md:text-[2.25vw] lg:text-[1.5vw] xl:text-[0.9vw]">
        {notification.result}
      </span>
      <a
        href={`https://berascan.com/tx/${notification.hash}`}
        target="_blank"
        className="h-[25%] w-[30%] border-2 border-black bg-[#E7B941] hover:scale-110 xl:h-[25%]"
        rel="noreferrer"
      >
        <button className="h-[100%] w-[100%] font-amaticbold text-[4vw] md:text-[3vw] lg:text-[2.5vw] xl:text-[1.5vw] cursor-pointer">
          VIEW TX
        </button>
      </a>
      <p
        className="absolute right-[3%] top-0 cursor-pointer font-baloo text-[3vw] hover:scale-125 lg:text-[2vw]"
        onClick={() => openNotification(false, "", "", "")}
      >
        x
      </p>
    </div>
  );
};
