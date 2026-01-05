import { ReactNode } from "react";

interface ParallaxElementProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  direction?: "up" | "down";
}

export const ParallaxElement = ({ 
  children, 
  className = "",
}: ParallaxElementProps) => {
  // Performance optimization: Removed active scroll listeners/measurements
  // to prevent Forced Reflows and Layout Thrashing on initial load.
  return (
    <div className={className}>
      {children}
    </div>
  );
};
