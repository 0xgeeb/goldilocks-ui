'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, children, pauseOnHover = false, reverse = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Marquee.displayName = 'Marquee';

interface MarqueeContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

export const MarqueeContent = React.forwardRef<HTMLDivElement, MarqueeContentProps>(
  ({ className, children, pauseOnHover = false, reverse = false, speed = 'normal', ...props }, ref) => {
    const speedClasses = {
      slow: 'animate-marquee-slow',
      normal: 'animate-marquee',
      fast: 'animate-marquee-fast',
    };

    return (
      <>
        <div
          ref={ref}
          className={cn(
            'flex shrink-0 justify-around gap-4',
            speedClasses[speed],
            reverse && '[animation-direction:reverse]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            className
          )}
          {...props}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            'flex shrink-0 justify-around gap-4',
            speedClasses[speed],
            reverse && '[animation-direction:reverse]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            className
          )}
        >
          {children}
        </div>
      </>
    );
  }
);
MarqueeContent.displayName = 'MarqueeContent';

interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MarqueeItem = React.forwardRef<HTMLDivElement, MarqueeItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex shrink-0 items-center justify-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MarqueeItem.displayName = 'MarqueeItem';

interface MarqueeFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  side: 'left' | 'right';
}

export const MarqueeFade = React.forwardRef<HTMLDivElement, MarqueeFadeProps>(
  ({ className, side, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'pointer-events-none absolute inset-y-0 z-10 w-1/12',
          side === 'left' 
            ? 'left-0 bg-gradient-to-r from-background to-transparent' 
            : 'right-0 bg-gradient-to-l from-background to-transparent',
          className
        )}
        {...props}
      />
    );
  }
);
MarqueeFade.displayName = 'MarqueeFade';

