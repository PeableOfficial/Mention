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
        className="shadow-[0_0_10px_-2px_var(--clr-tertiary)] p-0 w-72 border-0 rounded-2xl bg-[var(--clr-background)] group-hover:visible group-hover:opacity-100 group-hover:delay-500"
      >
        <UserModal userId={userId} />
      </HoverCardContent>
    </HoverCard>
  );
};
