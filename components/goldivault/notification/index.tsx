import { useGoldivault } from "../../../providers";

export const Notification = () => {
  const { notification, openNotification } = useGoldivault();

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col items-center justify-around rounded-2xl border-2 border-[#352A1C] py-[8%] xl:py-[4%] text-HoneyYellow">
      <h1 className="font-amaticbold text-white text-6xl">
        SUCCESS!
      </h1>
      <span className="font-baloo text-lg font-medium">
        {notification.action}
      </span>
      <span className="font-baloo text-lg font-medium">
        {notification.result}
      </span>
      <a
        href={`https://berascan.com/tx/${notification.hash}`}
        target="_blank"
        rel="noreferrer"
      >
        <button className="font-amaticbold text-white hover:underline hover:scale-110 cursor-pointer text-3xl">
          VIEW TX
        </button>
      </a>
      <p
        className="absolute right-[4%] top-0 cursor-pointer font-baloo text-HoneyYellow hover:text-white text-[4vw] hover:scale-125 lg:right-[3%] lg:text-[3vw]"
        onClick={() => openNotification(false, "", "", "")}
      >
        x
      </p>
    </div>
  );
};
