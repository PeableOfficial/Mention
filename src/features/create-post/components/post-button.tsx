"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

import { Button } from "@/components/elements/button";
import { Modal } from "@/components/elements/modal";
import { Tooltip } from "@/components/elements/tooltip";
import { useCreatePostModal } from "@/stores/use-create-post-modal";

import { PenIcon } from "../assets/pen-icon";

import { CreatePostModal } from "./create-post-modal";

export const PostButton = () => {
  const { data: session } = useSession();

  const isModalOpen = useCreatePostModal((state) => state.isModalOpen);
  const openModal = useCreatePostModal((state) => state.openModal);
  const closeModal = useCreatePostModal((state) => state.closeModal);

  if (!session) return null;

  return (
    <>
      <Tooltip
        maxWidth={1300}
        text="Post"
        className="mt-4 max-w-[234px] xxl:w-full"
      >
        <Button
          aria-label="Post"
          onClick={() => {
            openModal();
          }}
          className="w-full bg-primary-100 p-[0.9em] hover:bg-primary-200 focus-visible:outline-secondary-100 active:bg-primary-300"
        >
          <span className="fill-white xxl:hidden [&>svg]:size-h1">
            <PenIcon />
          </span>
          <span className="text-white hidden text-base font-bold xxl:inline">
            Post
          </span>
        </Button>
      </Tooltip>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={closeModal}
            disableScroll={true}
            background="var(--clr-modal-background)"
            focusOnElement={`textarea`}
          >
            <CreatePostModal />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
