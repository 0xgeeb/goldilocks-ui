import { useGoldiswap } from "../../../providers";

export const NotificationMobile = () => {
  const { notification, openNotification } = useGoldiswap();

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col items-center bg-[#E9D7A9] px-[2%]">
      <h1 className="mt-[25%] font-amaticbold text-[15vw]">SUCCESS!</h1>
      <span className="mt-[2%] font-baloo text-[3vw] font-semibold">
        {notification.action}
      </span>
      <span className="mt-[10%] font-baloo text-[3vw] font-semibold">
        {notification.result}
      </span>
      <a
        href={`https://berascan.com/tx/${notification.hash}`}
        target="_blank"
        className="mt-[20%] h-[11%] w-[50%] border-2 border-black bg-[#E7B941] focus:scale-110"
        rel="noreferrer"
      >
        <button className="h-[100%] w-[100%] font-amaticbold text-[5vw]">
          VIEW TX
        </button>
      </a>
      <p
        className="absolute right-[3%] top-[-1%] cursor-pointer font-baloo text-[7vw] focus:scale-125"
        onClick={() => openNotification(false, "", "", "")}
      >
        x
      </p>
    </div>
  );
};
