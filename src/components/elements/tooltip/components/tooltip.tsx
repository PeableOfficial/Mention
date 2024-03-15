/* eslint-disable jsx-a11y/mouse-events-have-key-events */
"use client";
import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ITooltip extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  delay?: number;
  minWidth?: number;
  maxWidth?: number;
  offset?: number;
  children: React.ReactNode;
}

export const Tooltip: React.FC<ITooltip> = ({ children, text }) => {
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  );
};
