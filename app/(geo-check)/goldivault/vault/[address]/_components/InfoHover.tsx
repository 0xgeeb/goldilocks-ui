import React, { SVGProps, forwardRef } from 'react';
import { cn } from "@/app/_components/utils"; // Assuming you have this utility

// Properly typed InfoIcon component with customization options
interface InfoIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const InfoIcon = forwardRef<SVGSVGElement, InfoIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg 
        ref={ref}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={cn("size-4 ml-1 text-stone-500 hover:text-stone-400", className)}
        {...props}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" 
        />
      </svg>
    );
  }
);

InfoIcon.displayName = 'InfoIcon';

// Enhanced HoverText component with TypeScript
interface HoverTextProps {
  hoverText: string;
  maxWidth?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

export const HoverText = forwardRef<HTMLDivElement, HoverTextProps>(
  ({ 
    hoverText, 
    maxWidth = "200px", 
    position = "top", 
    className,
    iconClassName,
    tooltipClassName
  }, ref) => {
    // Position classes based on the position prop
    const positionClasses = {
      top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
      bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
      left: "right-full mr-2 top-1/2 -translate-y-1/2",
      right: "left-full ml-2 top-1/2 -translate-y-1/2"
    };
    
    return (
      <div ref={ref} className={cn("group relative inline-block", className)}>
        <InfoIcon className={iconClassName} />
        <div className={cn(
            "absolute hidden group-hover:block min-w-48",
            positionClasses[position],
            tooltipClassName
          )}
        >
          <div 
            className="bg-bera-brown-dark border-2 rounded-2xl text-white text-xs py-2 px-3 border-bera-brown-border shadow-lg"
            style={{ maxWidth }}
          >
            {hoverText}
          </div>
        </div>
      </div>
    );
  }
);

HoverText.displayName = 'HoverText';