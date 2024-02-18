"use client";
import { useSession } from "next-auth/react";

import { useCreatePostModal } from "@/stores/use-create-post-modal";

import { PenIcon } from "../assets/pen-icon";

import styles from "./styles/mobile-post-button.module.scss";

export const MobilePostButton = () => {
  const { data: session } = useSession();
  const openModal = useCreatePostModal((state) => state.openModal);

  if (!session) return null;

  return (
    <button
      aria-label="Compose a Post"
      data-title="Post"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
      className={styles.container}
    >
      <PenIcon />
    </button>
  );
};
