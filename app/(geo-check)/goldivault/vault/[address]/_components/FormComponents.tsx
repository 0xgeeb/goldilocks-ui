import React, {
  InputHTMLAttributes,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  forwardRef,
  SVGProps
} from 'react';

import {
  INPUT_FIELD_PARENT_CLASSES,
  INPUT_FIELD_CLASSES,
  INPUT_LABEL_CLASSES,
  LABEL_CLASSES
} from "./styles";
import { cn } from "@/app/_components/utils";

const BASE_Y_PADDING = "py-1";

// ========================== FIELD WITH LABEL ==========================
interface FieldWithLabelProps<T extends HTMLInputElement = HTMLInputElement> 
  extends Omit<InputHTMLAttributes<T>, 'id'> {
  id: string;
  label: string;
}

export const FieldWithLabel = forwardRef<
  HTMLInputElement, 
  FieldWithLabelProps
>(({ id, label, ...props }, ref) => {
  return (
    <div className={INPUT_FIELD_PARENT_CLASSES}>
      <input
        id={id}
        ref={ref}
        className={INPUT_FIELD_CLASSES}
        {...props}
      />
      <label
        htmlFor={id}
        className={INPUT_LABEL_CLASSES}
      >
        {label}
      </label>
    </div>
  );
});

FieldWithLabel.displayName = 'FieldWithLabel';

// ========================== LABEL SET ==========================
interface LabelSetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const LabelSet = forwardRef<HTMLDivElement, LabelSetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          BASE_Y_PADDING,
          "flex flex-row items-center justify-between",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LabelSet.displayName = "LabelSet"

// ========================== LABEL ==========================
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  className?: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label 
        ref={ref}
        className={cn(LABEL_CLASSES, className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

// ========================== ELEMENT SET ==========================
interface ElementSetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const ElementSet = forwardRef<HTMLDivElement, ElementSetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(
          BASE_Y_PADDING,
          "flex flex-row items-center justify-center gap-2",
          className
        )} {...props}>
        {children}
      </div>
    );
  }
);

ElementSet.displayName = "ElementSet";

// ========================== CONTAINER ==========================
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  align?: "center" | "left" | "right" | "between";
  padding?: "none" | "sm" | "md" | "lg";
  direction?: "row" | "col";
  className?: string;
}

export const Container = ({ children, align, padding, direction, className, ...props }: ContainerProps) => {
  return (
    <div className={cn(
        BASE_Y_PADDING,
        "relative flex flex-row items-center justify-center gap-2",
        direction === "row" && "flex-row",
        direction === "col" && "flex-col",
        align === "center" && "justify-center",
        align === "left" && "justify-start",
        align === "right" && "justify-end",
        align === "between" && "justify-between",
        padding === "none" && "p-0",
        padding === "sm" && "p-1",
        padding === "md" && "p-2",
        padding === "lg" && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ========================== FORM WRAPPER ==========================
interface FormWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const FormWrapper = forwardRef<HTMLDivElement, FormWrapperProps>(  
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(
        "flex flex-col justify-center my-4",
        className
      )} {...props}>
        {children}
      </div>
    );
  }
);

FormWrapper.displayName = "FormWrapper";

// ========================== GEAR ICON ==========================
interface GearIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  onClick?: () => void;
}

export const GearIcon = forwardRef<SVGSVGElement, GearIconProps>(({ className, onClick, ...props }, ref) => {
  return (
    <svg 
      ref={ref}
      xmlns="http://www.w3.org/2000/svg" 
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      className={cn("stroke-warm-text hover:stroke-teak transition duration-150 size-6 cursor-pointer hover:scale-110", className)}
      onClick={onClick}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
});

GearIcon.displayName = "GearIcon";