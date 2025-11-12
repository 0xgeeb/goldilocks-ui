import { useGoldilend } from "../../../providers";

export const BorrowNotification = () => {
  const { notification, openNotification } = useGoldilend();

  return (
    <div className="relative h-[100%] w-[100%] bg-[#E9D7A9]">
      <div className="flex h-[80%] w-[100%] flex-col items-center justify-between">
        <h1 className="mt-[5%] font-amaticbold text-[10vw] xl:mt-[2%] xl:text-[4vw]">
          SUCCESS!
        </h1>
        <span className="font-baloo text-[3vw] font-semibold xl:text-[1.5vw]">
          {notification.action}
        </span>
        <span className="mt-[3%] font-baloo text-[3vw] font-semibold xl:text-[1.5vw]">
          {notification.result}
        </span>
        <a
          href={`https://berascan.com/tx/${notification.hash}`}
          target="_blank"
          className="mt-[3%] h-[15%] w-[25%] border-2 border-black bg-[#E7B941] hover:scale-110 xl:h-[20%] xl:w-[19%]"
          rel="noreferrer"
        >
          <button className="h-[100%] w-[100%] font-amaticbold text-[4vw] xl:text-[2vw] cursor-pointer">
            VIEW TX
          </button>
        </a>
      </div>
      <p
        className="absolute right-[3%] top-0 cursor-pointer font-baloo text-[5vw] hover:scale-125 xl:text-[3vw]"
        onClick={() => openNotification(false, "", "", "")}
      >
        x
      </p>
    </div>
  );
};
