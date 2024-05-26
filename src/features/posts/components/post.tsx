import { useRouter } from "next/navigation";
import Link from "next/link";

import { PinIcon } from "@/assets/pin-icon";
import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { ReplyingTo } from "@/features/create-post";
import {
  Avatar,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserUsername,
} from "@/features/profile";

import { IPost } from "../types";

import { PostOptions } from "./options/post-options";
import { PostActions } from "./post-actions";
import { PostMedia } from "./post-media";
import { QuotedPost } from "./quoted-post";
import styles from "./styles/post.module.scss";

export const Post = ({ post, pinned }: { post: IPost; pinned?: boolean }) => {
  const router = useRouter();

  const renderHashtags = (content: string) => {
    const hashtagRegex = /(#\w+)/g;
    return content.split(hashtagRegex).map((part, i) => {
      if (part.match(hashtagRegex)) {
        const hashtag = part.slice(1);
        return (
          <Link
            href={`/search?query=${hashtag}`}
            key={i}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[var(--clr-primary)] hover:underline">
              {part}
            </span>
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div
      onClick={() => router.push(`/status/${post.id}`)}
      tabIndex={0}
      role="link"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/status/${post.id}`);
        }
      }}
      className={styles.container}
    >
      {pinned && (
        <div className={styles.pin}>
          <PinIcon />
          Pinned
        </div>
      )}

      <div className={styles.postContainer}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <UserModalWrapper userId={post?.author?.id} delay={500}>
              <LinkToProfile username={post?.author?.username}>
                <Avatar userImage={post?.author?.avatar} />
              </LinkToProfile>
            </UserModalWrapper>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.user_details}>
            <UserModalWrapper userId={post?.author?.id} delay={500}>
              <LinkToProfile username={post?.author?.username}>
                <EllipsisWrapper>
                  <UserName
                    name={post?.author?.name}
                    isVerified={post?.author?.verified}
                    hover={true}
                  />
                </EllipsisWrapper>
              </LinkToProfile>
            </UserModalWrapper>

            <div className={styles.username_time}>
              <UserModalWrapper userId={post?.author?.id} delay={500}>
                <LinkToProfile username={post?.author?.username} tabIndex={-1}>
                  <EllipsisWrapper>
                    <UserUsername username={post?.author?.username} />
                  </EllipsisWrapper>
                </LinkToProfile>
              </UserModalWrapper>

              <span className={styles.dot}>·</span>

              <div className={styles.date}>
                <CreateDate date={post?.created_at} />
              </div>
            </div>
          </div>

          <div className={styles.options}>
            <PostOptions post={post} />
          </div>

          {post?.in_reply_to_status_id && (
            <div className={styles.replyingTo}>
              <ReplyingTo
                username={post?.in_reply_to_username}
                id={post?.author?.id}
              />
            </div>
          )}
          <div className={styles.post}>
            {post?.text && (
              <div className={styles.text}>
                <p>{renderHashtags(decodeURIComponent(post?.text))}</p>
              </div>
            )}
            {post?.media?.length > 0 && (
              <PostMedia media={post?.media} postId={post?.id} />
            )}
            {post?.quoted_post && (
              <div className={styles.quotedPost}>
                <QuotedPost post={post?.quoted_post} />
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <PostActions post={post} showStats={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
