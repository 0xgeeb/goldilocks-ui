import { useBorrow } from "../../../providers";

export const NotificationMobile = () => {
  const { notification, openNotification } = useBorrow();

  return (
    <div className="relative flex h-[100%] w-[100%] flex-col items-center bg-[#E9D7A9] px-[2%]">
      <h1 className="mt-[5%] font-amaticbold text-[11vw] tall:mt-[15%]">
        SUCCESS!
      </h1>
      <span className="mt-[5%] text-center font-baloo text-[4vw] font-semibold">
        {notification.action}
      </span>
      <span className="mt-[1%] text-center font-baloo text-[4vw] font-semibold">
        {notification.result}
      </span>
      <a
        href={`https://berascan.com/tx/${notification.hash}`}
        target="_blank"
        className="mt-[10%] h-[17%] w-[50%] border-2 border-black bg-[#E7B941] focus:scale-110"
        rel="noreferrer"
      >
        <button className="h-[100%] w-[100%] font-amaticbold text-[6vw]">
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
