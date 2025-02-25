import { cn } from "@/app/_components/utils";

type Props = {
  type: "honey" | "locks";
};

function InputLogo({ type }: Props) {
  const tokenName = type === "honey" ? "HONEY" : "LOCKS";

  return (
    <div className={cn(`flex h-1/2 flex-row items-center`)}>
      <img
        className="size-6 md:size-8"
        src={`/images/logo-${type}.png`}
        alt="coinlogo"
      />
      <h1 className="ml-1 font-baloo text-[3vw] font-semibold md:text-[2.4vw] lg:ml-3 lg:text-[1.4vw]">
        {tokenName}
      </h1>
    </div>
  );
}

export default InputLogo;
