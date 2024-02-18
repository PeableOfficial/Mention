import { useSession } from "next-auth/react";

import { HeartIcon, HeartIconActive } from "@/assets/heart-icon";
import { useJoinMention } from "@/features/auth";

import { useLike } from "../../hooks/use-like";
import { IPost } from "../../types";

import styles from "./styles/actions.module.scss";

export const LikeButton = ({
  post,
  smallIcons = true,
  showStats = false,
}: {
  post?: IPost;
  smallIcons?: boolean;
  showStats?: boolean;
}) => {
  const { data: session } = useSession();
  const hasLiked = post?.likes?.some(
    (like) => like.user_id === session?.user?.id,
  );

  const setJoinMentionData = useJoinMention((state) => state.setData);

  const mutation = useLike();

  return (
    <button
      aria-label={hasLiked ? "Unlike" : "Like"}
      data-title={hasLiked ? "Unlike" : "Like"}
      tabIndex={0}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!session) {
          setJoinMentionData({
            isModalOpen: true,
            action: "like",
            user: post?.author?.name || "user",
          });
        }
        mutation.mutate({ postId: post?.id, userId: session?.user?.id });
      }}
      className={`${styles.container} ${styles.like} ${
        hasLiked ? styles.liked : ""
      } `}
    >
      <span
        className={`${styles.icon} ${
          smallIcons ? styles.smallIcon : styles.bigIcons
        }`}
      >
        {hasLiked ? <HeartIconActive /> : <HeartIcon />}
      </span>
      {showStats && post?.likes && post?.likes?.length > 0 && (
        <span className={styles.stats}>{post?.likes?.length}</span>
      )}
    </button>
  );
};
