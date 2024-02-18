"use client";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/elements/modal";

import { PostStatisticsModal } from "./post-statistics-modal";
import styles from "./styles/post-statistics.module.scss";

export const PostStatistics = ({
  repost_count = 0,
  quote_count = 0,
  likes_count = 0,
  bookmarks_count = 0,
}: {
  repost_count: number | undefined;
  quote_count: number | undefined;
  likes_count: number | undefined;
  bookmarks_count: number | undefined;
}) => {
  const pathname = usePathname();
  const postId = pathname.split(`/`)[2];

  const [statisticsModal, setStatisticsModal] = useState<{
    isOpen: boolean;
    title: "likes" | "reposts" | null;
  }>({
    isOpen: false,
    title: null,
  });

  const isVisible =
    repost_count > 0 ||
    quote_count > 0 ||
    likes_count > 0 ||
    bookmarks_count > 0;

  if (!isVisible) return null;

  return (
    <>
      <div
        role="group"
        className={`${styles.container} ${
          isVisible ? styles.show : styles.hide
        }`}
      >
        {repost_count > 0 && (
          <button
            onClick={() => {
              setStatisticsModal({ isOpen: true, title: `reposts` });
            }}
            className={styles.statistic}
          >
            <strong>{repost_count}</strong>{" "}
            <span>{repost_count === 1 ? `Repost` : `Reposts`}</span>
          </button>
        )}

        {quote_count > 0 && (
          <Link href={`/status/${postId}/quotes`} className={styles.statistic}>
            <strong>{quote_count}</strong>{" "}
            <span>{quote_count === 1 ? `Quote Post` : `Quote Posts`}</span>
          </Link>
        )}

        {likes_count > 0 && (
          <button
            onClick={() => {
              setStatisticsModal({ isOpen: true, title: `likes` });
            }}
            className={styles.statistic}
          >
            <strong>{likes_count}</strong>{" "}
            <span>{likes_count === 1 ? `Like` : `Likes`}</span>
          </button>
        )}

        {bookmarks_count > 0 && (
          <div className={styles.statistic}>
            <strong>{bookmarks_count}</strong>{" "}
            <span>{bookmarks_count === 1 ? `Bookmark` : `Bookmarks`}</span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {statisticsModal.isOpen && (
          <Modal
            onClose={() => {
              setStatisticsModal({ isOpen: false, title: null });
            }}
            disableScroll={true}
            background="var(--clr-modal-background)"
          >
            <PostStatisticsModal
              onClose={() => {
                setStatisticsModal({ isOpen: false, title: null });
              }}
              title={statisticsModal.title}
              postId={postId}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
