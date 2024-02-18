"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { RepostIcon } from "@/assets/repost-icon";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { useJoinMention } from "@/features/auth";
import { useCreatePostModal } from "@/stores/use-create-post-modal";

import { QuotePostIcon } from "../../assets/quote-post-icon";
import { useRepost } from "../../hooks/use-repost";
import { IPost } from "../../types";

import styles from "./styles/actions.module.scss";

export const RepostButton = ({
  post,
  showStats,
}: {
  post: IPost;
  showStats: boolean;
}) => {
  const { data: session } = useSession();
  const hasReposted = post?.reposts?.some(
    (repost) => repost?.user_id === session?.user?.id,
  );

  const setData = useCreatePostModal((state) => state.setData);
  const setJoinMentionData = useJoinMention((state) => state.setData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const repostMutation = useRepost(setIsModalOpen);

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label={hasReposted ? "Undo repost" : "Repost"}
        data-title={hasReposted ? "Undo repost" : "Repost"}
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!session) {
            setJoinMentionData({
              isModalOpen: true,
              action: "repost",
              user: post?.author?.name,
            });
          } else setIsModalOpen(true);
        }}
        className={`${styles.repost} ${hasReposted ? styles.reposted : ""}`}
      >
        <span className={styles.icon}>
          <RepostIcon />
        </span>
        {showStats && post && post?.reposts?.length > 0 && (
          <span className={styles.stats}>{post?.reposts?.length}</span>
        )}
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            background="none"
            onClose={() => {
              setIsModalOpen(false);
            }}
          >
            <Menu
              onClose={() => setIsModalOpen(false)}
              ref={buttonRef}
              trackScroll={true}
            >
              <MenuItem
                onClick={() => {
                  repostMutation.mutate({
                    postId: post?.id,
                    userId: session?.user?.id,
                  });
                }}
              >
                <RepostIcon /> {hasReposted ? `Undo repost` : `Repost`}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setData({
                    in_reply_to_screen_name: null,
                    in_reply_to_status_id: null,
                    parent_post: null,
                    quoted_post: post,
                    placeholder: "Add a comment!",
                  });
                  setIsModalOpen(false);
                }}
              >
                <QuotePostIcon /> Quote Post
              </MenuItem>
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
