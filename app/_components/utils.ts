import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatAsString = (num: number): string => {
  return num?.toLocaleString("en-US", { maximumFractionDigits: 2 });
};
