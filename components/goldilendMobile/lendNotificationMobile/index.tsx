import { useGoldilend } from "../../../providers";

export const LendNotificationMobile = () => {
  const { notification, openNotification } = useGoldilend();

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-around bg-[#E9D7A9] px-[2%]">
      <h1 className="font-amaticbold text-[10vw]">SUCCESS!</h1>
      <span className="text-center font-baloo text-[3.5vw] font-semibold">
        {notification.action}
      </span>
      <span className="text-center font-baloo text-[3.5vw] font-semibold">
        {notification.result}
      </span>
      <a
        href={`https://berascan.com/tx/${notification.hash}`}
        target="_blank"
        className="h-[17%] w-[50%] border-2 border-black bg-[#E7B941] focus:scale-110"
        rel="noreferrer"
      >
        <button className="h-[100%] w-[100%] font-amaticbold text-[5.5vw]">
          VIEW TX
        </button>
      </a>
      <p
        className="absolute right-[2%] top-[-2%] cursor-pointer font-baloo text-[7vw] focus:scale-125"
        onClick={() => openNotification(false, "", "", "")}
      >
        x
      </p>
    </div>
  );
};
