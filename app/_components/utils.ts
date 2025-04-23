import { ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";

dayjs.extend(relativeTime);

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatAsString = (num: number): string => {
  return num?.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

export const formatAsCurrency = (
  num: number,
  currency: string = "USD",
): string => {
  return num?.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  });
};

export const formatAsPercent = (num: number): string => {
  return num?.toLocaleString("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
  });
};

export const formatDate = (timestamp: number): string => {
  return dayjs(timestamp * 1000).format("MM-DD-YYYY");
};

export const getRelativeDate = (timestamp: number): string => {
  return dayjs(timestamp * 1000).fromNow();
};
