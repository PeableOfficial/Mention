import { IPost } from "../types";

import { CommentButton } from "./actions/comment-button";
import { ContributeButton } from "./actions/contribute-button";
import { LikeButton } from "./actions/like-button";
import { RepostButton } from "./actions/repost-button";
import { ShareButton } from "./actions/share-button";
import styles from "./styles/post-actions.module.scss";

export const PostActions = ({
  post,
  showStats = false,
}: {
  post: IPost;
  showStats?: boolean | undefined;
}) => {
  return (
    <div
      aria-label={`${post?.comments?.length} replies, ${post?.quotes?.length} Reposts, ${post?.likes?.length} Likes`}
      role="group"
      className={`${styles.container} ${
        showStats ? styles.post : styles.postDetails
      }`}
    >
      <CommentButton post={post} showStats={showStats} />
      <RepostButton post={post} showStats={showStats} />
      <LikeButton post={post} smallIcons={false} showStats={showStats} />
      <ContributeButton />
      <ShareButton post={post} />
    </div>
  );
};
