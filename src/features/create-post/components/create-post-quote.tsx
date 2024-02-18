import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { PostMedia } from "@/features/posts";
import { IPost } from "@/features/posts";
import { Avatar, UserName, UserScreenName } from "@/features/profile";

import styles from "./styles/create-post-quote.module.scss";

export const CreatePostQuote = ({ post }: { post: IPost }) => {
  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <span className={styles.avatar}>
          <Avatar userImage={post?.author?.profile_image_url} />
        </span>

        <EllipsisWrapper>
          <UserName
            name={post?.author?.name}
            isVerified={post?.author?.verified}
          />
        </EllipsisWrapper>

        <EllipsisWrapper>
          <UserScreenName screenName={post?.author?.screen_name} />
        </EllipsisWrapper>

        <span className={styles.dot}>·</span>
        <CreateDate date={post?.created_at} focus={false} hover={false} />
      </div>

      <div className={styles.post}>
        {post?.text && (
          <p className={styles.text}>
            {decodeURIComponent(post?.text)}{" "}
            {post?.quoted_post && (
              <span>{`mention.com/${post.author?.email?.split(
                "@",
              )[0]}/s...`}</span>
            )}
          </p>
        )}

        {post?.media?.length > 0 && (
          <div className={styles.media}>
            <PostMedia media={post?.media} postId={post?.id} />
          </div>
        )}
      </div>
    </div>
  );
};
