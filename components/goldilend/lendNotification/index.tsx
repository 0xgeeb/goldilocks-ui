import { useGoldilend } from "../../../providers";

export const LendNotification = () => {
  const { notification, openNotification, lendActiveToggle } = useGoldilend();

  return (
    <div className="relative h-[100%] w-[100%] bg-[#E9D7A9]">
      <div className="flex h-[80%] w-[100%] flex-col items-center justify-between">
        <h1
          className={`font-amaticbold text-[6vw] xl:text-[3vw] ${lendActiveToggle === "CLAIM" ? "mt-[20%]" : "mt-[2%]"}`}
        >
          SUCCESS!
        </h1>
        <span className="font-baloo text-[2vw] font-semibold xl:text-[0.9vw]">
          {notification.action}
        </span>
        <span className="mt-[3%] font-baloo text-[2vw] font-semibold lg:mt-[1%] xl:text-[0.9vw]">
          {notification.result}
        </span>
        <a
          href={`https://berascan.com/tx/${notification.hash}`}
          target="_blank"
          className={`${lendActiveToggle === "CLAIM" ? "h-[15%] w-[30%]" : "h-[20%] w-[19%]"} mt-[3%] border-2 border-black bg-[#E7B941] hover:scale-110`}
          rel="noreferrer"
        >
          <button className="h-[100%] w-[100%] font-amaticbold text-[3vw] xl:text-[1.2vw] cursor-pointer">
            VIEW TX
          </button>
        </a>
      </div>
      <p
        className="absolute right-[3%] top-0 cursor-pointer font-baloo text-[3vw] hover:scale-125 lg:text-[2vw]"
        onClick={() => openNotification(false, "", "", "")}
      >
        x
      </p>
    </div>
  );
};
