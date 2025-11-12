import { cn } from "@/app/_components/utils";

type Props = {
  type: "honey" | "locks";
};

function InputLogo({ type }: Props) {
  const tokenName = type === "honey" ? "HONEY" : "LOCKS";

  return (
    <div className={cn(`flex flex-row items-center w-32`)}>
      <img
        className="size-8"
        src={`/images/logo-${type}.png`}
        alt="coinlogo"
      />
      <h1 className="ml-3 font-baloo text-xl font-semibold text-HoneyYellow whitespace-nowrap">
        {tokenName}
      </h1>
    </div>
  );
}

export default InputLogo;
