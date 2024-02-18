"use client";
import { motion } from "framer-motion";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useCreatePostModal } from "@/stores/use-create-post-modal";

import { CreatePost } from "./create-post";
import { CreatePostComment } from "./create-post-comment";
import styles from "./styles/create-post-modal.module.scss";

export const CreatePostModal = () => {
  const data = useCreatePostModal((state) => state.data);
  const closeModal = useCreatePostModal((state) => state.closeModal);

  const innerWidth = window.innerWidth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 200, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 200, scale: 0.8 }}
      transition={{
        ease: "easeOut",
        duration: 0.2,
      }}
      className={styles.container}
    >
      <div className={styles.wrapper}>
        <div className={styles.closeButtonContainer}>
          <button
            data-title={innerWidth < 700 ? "Back" : "Close"}
            onClick={() => closeModal()}
            className={styles.close}
          >
            <span className={styles.arrow}>
              <BackArrowIcon />
            </span>
            <span className={styles.x}>
              <CloseIcon />
            </span>
          </button>
        </div>
        {data.parent_post && <CreatePostComment post={data.parent_post} />}

        <CreatePost
          quoted_post={data.quoted_post}
          in_reply_to_screen_name={data.in_reply_to_screen_name}
          in_reply_to_status_id={data.in_reply_to_status_id}
          placeholder={data.placeholder}
          container="modal"
          inputId="post-text-modal"
        />
      </div>
    </motion.div>
  );
};
