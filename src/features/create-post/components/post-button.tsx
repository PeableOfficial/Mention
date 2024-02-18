"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

import { Modal } from "@/components/elements/modal";
import { useCreatePostModal } from "@/stores/use-create-post-modal";

import { PenIcon } from "../assets/pen-icon";

import { CreatePostModal } from "./create-post-modal";
import styles from "./styles/post-button.module.scss";

export const PostButton = () => {
  const { data: session } = useSession();

  const isModalOpen = useCreatePostModal((state) => state.isModalOpen);
  const openModal = useCreatePostModal((state) => state.openModal);
  const closeModal = useCreatePostModal((state) => state.closeModal);

  if (!session) return null;

  return (
    <>
      <button
        aria-label="Post"
        data-title="Post"
        onClick={() => {
          openModal();
        }}
        className={styles.container}
      >
        <span className={styles.icon}>
          <PenIcon />
        </span>
        <span className={styles.text}>Post</span>
      </button>

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
