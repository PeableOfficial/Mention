/* eslint-disable jsx-a11y/mouse-events-have-key-events */
"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { UserModal } from "./user-modal";

export const UserModalWrapper = ({
  children,
  userId,
  delay,
}: {
  children: React.ReactNode;
  userId: string;
  delay: number;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        collisionPadding={15}
        className="w-72 rounded-2xl border-0 bg-[var(--clr-background)] p-0 shadow-[0_0_10px_-2px_var(--clr-tertiary)] group-hover:visible group-hover:opacity-100 group-hover:delay-500"
      >
        <UserModal userId={userId} />
      </HoverCardContent>
    </HoverCard>
  );
};
