import React, { FC } from "react";

import { cn } from "@/utils/cn";

interface IHeader extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Header: FC<IHeader> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "sticky xl:rounded-t-3xl top-0 z-sticky flex h-[calc(var(--tw-fs-kilo)+22px)] items-center bg-background/90 px-4 font-bold text-secondary-100 backdrop-blur-sm [&>h2]:text-h2 gap-5",
        className,
      )}
    >
      {children}
    </header>
  );
};
