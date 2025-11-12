export const COLORS = {
  button: {
    base: "#322514",
    hover: "#47351E",
    active: "#5C462A",
    text: "#EFEFEF",
    disabled: "#2C2215",
    disabledText: "#5E5E5E",
  },
  input: {
    base: "#322514",
    text: "#EFEFEF",
    disabled: "#2C2215",
    disabledText: "#5E5E5E",
  },
  label: {
    base: "#5C5347",
    bright: "#FFFFFF",
    disabled: "#5E5E5E",
  },
  beraBrown: {
    base: "#231A0F",
    dark: "#1A140C",
    border: "#352A1C",
  },
  teak: "#CFA08B",
  honeyYellow: "#E7B941",
  warmText: "#5C5347",
} as const;

export const BUTTON_CLASSES = [
  "w-full",
  "h-[54px]",
  "rounded-xl",
  "transition",
  "duration-150",
  "bg-button-base",
  "text-button-text",
  "font-inter",
  "text-lg",
  "font-bold",
  "disabled:text-button-disabledText",
  "disabled:bg-button-disabled",
  "hover:bg-button-hover",
  "active:bg-button-active",
  "cursor-pointer"
].join(" ");

export const SHORT_BUTTON_CLASSES = [
  "w-full",
  "h-[48px]",
  "my-4",
  "rounded-xl",
  "transition",
  "duration-150",
  "bg-button-base",
  "text-button-text",
  "font-inter",
  "text-lg",
  "font-bold",
  "disabled:text-button-disabledText",
  "disabled:bg-button-disabled",
  "hover:bg-button-hover",
  "active:bg-button-active",
  "cursor-pointer"
].join(" ");

export const LABEL_CLASSES = [
  "text-xs",
  "font-semibold",
  "text-warm-text"
].join(" ");

export const INPUT_LABEL_CLASSES = [
  "text-sm",
  "font-bold",
  "text-teak",
  "absolute",
  "right-0",
  "top-1/2",
  "transform",
  "-translate-y-1/2",
  "my-auto",
  "mr-4",
  "pointer-events-none",
].join(" ");

export const INPUT_FIELD_PARENT_CLASSES = [
  "w-full",
  "relative",
  "rounded-xl",
  "h-[48px]",
  "text-input-text",
  "overflow-hidden",
].join(" ");

export const INPUT_FIELD_CLASSES = [
  "w-full",
  "h-full",
  "text-lg",
  "px-4",
  "pr-28",
  "font-bold",
  "text-input-text",
  "focus:outline-none",
  "bg-input-base",
  "disabled:bg-input-disabled",
  "disabled:text-input-disabledText",
  "hover:bg-input-hover",
].join(" ");