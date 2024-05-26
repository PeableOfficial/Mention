import { useRouter } from "next/navigation";

import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import {
  Avatar,
  UserModalWrapper,
  UserName,
  UserUsername,
} from "@/features/profile";

import { IPost } from "../types";

import { PostMedia } from "./post-media";
import styles from "./styles/quoted-post.module.scss";

export const QuotedPost = ({ post }: { post: IPost }) => {
  const router = useRouter();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/status/${post?.id}`);
      }}
      tabIndex={0}
      role="link"
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
          router.push(`/status/${post?.id}`);
        }
      }}
      className={styles.container}
    >
      <div className={styles.userDetails}>
        <UserModalWrapper userId={post?.author?.id} delay={500}>
          <div className={styles.avatar}>
            <Avatar userImage={post?.author?.avatar} />
          </div>
        </UserModalWrapper>

        <UserModalWrapper userId={post?.author?.id} delay={500}>
          <EllipsisWrapper>
            <UserName
              name={post?.author?.name}
              isVerified={post?.author.verified}
            />
          </EllipsisWrapper>
        </UserModalWrapper>

        <UserModalWrapper userId={post?.author?.id} delay={500}>
          <EllipsisWrapper>
            <UserUsername username={post?.author?.username} />
          </EllipsisWrapper>
        </UserModalWrapper>
        <span className={styles.dot}>·</span>
        <CreateDate date={post?.created_at} focus={false} hover={false} />
      </div>

      <div className={styles.post}>
        {post?.text && (
          <div className={styles.text}>{decodeURIComponent(post?.text)}</div>
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
