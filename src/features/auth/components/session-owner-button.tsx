"use client";
import { AnimatePresence } from "framer-motion";
import { useOxySession } from "@oxyhq/services";
import { useRef, useState } from "react";

import { useUser } from "@/features/profile";

import { DotIcon } from "@/assets/dot-icon";
import { Button } from "@/components/elements/button";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import { Avatar, UserName, UserUsername } from "@/features/profile";

import { SessionOwnerModal } from "./session-owner-modal";

export const SessionOwnerButton = () => {
  const { session } = useOxySession();
  const { data: user } = useUser({ id: session?.user?.id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Tooltip text="Accounts" maxWidth={1300} className="mb-4 w-full">
        <Button
          aria-label="Account menu"
          onClick={openModal}
          ref={buttonRef}
          aria-haspopup="menu"
          aria-expanded={isModalOpen}
          className="p-[0.75em] hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600 xxl:flex xxl:w-full xxl:gap-3"
        >
          <Avatar userImage={session?.user?.avatar as string} />
          <div className="hidden flex-1 flex-col xxl:flex">
            <UserName
              name={session?.user?.name}
              isVerified={session?.user?.verified}
            />

            <EllipsisWrapper>
              <UserUsername username={user?.username} />
            </EllipsisWrapper>
          </div>
          <div className="hidden fill-secondary-100 xxl:inline [&>svg]:size-h2">
            <DotIcon />
          </div>
        </Button>
      </Tooltip>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            background="none"
            minViewportWidth={500}
          >
            <SessionOwnerModal
              ref={buttonRef}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
