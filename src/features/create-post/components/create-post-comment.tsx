import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Avatar, UserName, UserUsername } from "@/features/profile";
import { IPost } from "@/features/posts";

import { CreatePostQuote } from "./create-post-quote";
import { ReplyingTo } from "./replying-to";
import styles from "./styles/create-post-comment.module.scss";

export const CreatePostComment = ({ post }: { post: IPost | null }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar userImage={post?.author?.avatar as string} />
        <div className={styles.divider}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.userDetails}>
          <EllipsisWrapper>
            <UserName
              name={post?.author?.name}
              isVerified={post?.author?.verified}
            />
          </EllipsisWrapper>

          <EllipsisWrapper>
            <UserUsername username={post?.author?.username} />
          </EllipsisWrapper>

          <span className={styles.dot}>·</span>
          <CreateDate date={post?.created_at} />
        </div>
        <div className={styles.post}>
          {post?.text && (
            <p className={styles.text}>{decodeURIComponent(post?.text)}</p>
          )}
        </div>

        {post?.quoted_post && (
          <div className={styles.quoted_post}>
            <CreatePostQuote post={post?.quoted_post} />
          </div>
        )}

        {post?.author?.email && (
          <div className={styles.replyingTo}>
            <ReplyingTo
              username={post?.author?.username}
              id={post?.author?.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};
