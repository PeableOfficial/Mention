/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { CreatePostWrapper } from "@/features/create-post";

import { ShowArrowsIcon, HideArrowsIcon } from "../assets/double-arrows-icon";
import { usePost } from "../hooks/use-post";

import { Comments } from "./comments";
import { ImageCarousel } from "./image-carousel";
import { PostActions } from "./post-actions";
import { PostAuthor } from "./post-author";
import { PostCreationDate } from "./post-creation-date";
import { PostStatistics } from "./post-statistics";
import styles from "./styles/inspect-post-image-modal.module.scss";

export const InspectPostImageModal = ({
  postId,
  imageIndex,
  onClose,
}: {
  postId: string;
  imageIndex: number;
  onClose: () => void;
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const {
    data: post,
    isPending,
    isError,
  } = usePost({
    id: postId,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
      className={styles.container}
    >
      {isPending ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={styles.loading}
        >
          <button
            aria-label="Close"
            data-title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={styles.close}
          >
            <CloseIcon />
          </button>
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={styles.error}
        >
          <button
            aria-label="Close"
            data-title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={styles.close}
          >
            <CloseIcon />
          </button>
          <TryAgain />
        </div>
      ) : (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={styles.images}
          >
            <button
              aria-label="Close"
              data-title="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={styles.close}
            >
              <CloseIcon />
            </button>

            <button
              className={styles.toggleDetails}
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailsOpen((prev) => !prev);
              }}
              aria-label={
                isDetailsOpen ? "Hide post details" : "Show post details"
              }
              data-title={isDetailsOpen ? "Hide" : "Show"}
            >
              {isDetailsOpen ? <ShowArrowsIcon /> : <HideArrowsIcon />}
            </button>

            <div className={styles.imagesContainer}>
              <ImageCarousel images={post?.media} imageIndex={imageIndex} />
            </div>
            <div className={styles.postActions}>
              <PostActions post={post} showStats={true} />
            </div>
          </div>

          <AnimatePresence>
            {isDetailsOpen && (
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.2 }}
                className={styles.postDetails}
              >
                <div className={styles.postAuthor}>
                  <PostAuthor post={post} />
                </div>
                {post?.text && (
                  <div className={styles.text}>
                    {decodeURIComponent(post?.text)}
                  </div>
                )}

                <div className={styles.postDate}>
                  <PostCreationDate date={post?.created_at} />
                </div>

                <div className={styles.postStatistics}>
                  <PostStatistics
                    repost_count={post?._count?.reposts}
                    quote_count={post?._count?.quotes}
                    likes_count={post?._count?.likes}
                    bookmarks_count={post?._count?.bookmarks}
                  />
                </div>

                <div className={styles.postActions}>
                  <PostActions post={post} />
                </div>

                <CreatePostWrapper
                  in_reply_to_screen_name={post?.author?.screen_name}
                  in_reply_to_status_id={post?.id}
                  isInspectModal={true}
                />

                <div className={styles.comments}>
                  <Comments postId={post?.id} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};
