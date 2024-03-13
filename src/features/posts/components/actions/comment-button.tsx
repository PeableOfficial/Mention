"use client";
import { useSession } from "next-auth/react";

import { CommentIcon } from "@/assets/comment-icon";
import { useJoinMention } from "@/features/auth";
import { useCreatePostModal } from "@/stores/use-create-post-modal";

import { IPost } from "../../types";

import styles from "./styles/actions.module.scss";

export const CommentButton = ({
  post,
  showStats = false,
}: {
  post: IPost;
  showStats: boolean;
}) => {
  const { data: session } = useSession();

  const setData = useCreatePostModal((state) => state.setData);
  const setJoinMentionData = useJoinMention((state) => state.setData);

  return (
    <button
      aria-label="Reply"
      data-title="Reply"
      tabIndex={0}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();

        if (!session) {
          setJoinMentionData({
            isModalOpen: true,
            action: "comment",
            user: post?.author?.name,
          });
        } else {
          setData({
            quoted_post: null,
            parent_post: post,
            in_reply_to_username: post?.author?.username ?? null,
            in_reply_to_status_id: post?.id,
            placeholder: `Post your reply`,
          });
        }
      }}
      className={`${styles.container} ${styles.comment}`}
    >
      <span className={`${styles.icon}`}>
        <CommentIcon />
      </span>
      {showStats && post?._count?.comments > 0 && (
        <span className={styles.stats}>{post?._count?.comments}</span>
      )}
    </button>
  );
};
