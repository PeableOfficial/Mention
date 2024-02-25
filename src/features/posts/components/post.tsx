import { useRouter } from "next/navigation";

import { PinIcon } from "@/assets/pin-icon";
import { CreateDate } from "@/components/elements/create-date";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { ReplyingTo } from "@/features/create-post";
import {
  Avatar,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { IPost } from "../types";

import { PostOptions } from "./options/post-options";
import { PostActions } from "./post-actions";
import { PostMedia } from "./post-media";
import { QuotedPost } from "./quoted-post";
import styles from "./styles/post.module.scss";

export const Post = ({ post, pinned }: { post: IPost; pinned?: boolean }) => {
  const router = useRouter();

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
              <LinkToProfile username={post?.author?.screen_name}>
                <Avatar userImage={post?.author?.profile_image_url} />
              </LinkToProfile>
            </UserModalWrapper>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.user_details}>
            <UserModalWrapper userId={post?.author?.id} delay={500}>
              <LinkToProfile username={post?.author?.screen_name}>
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
                <LinkToProfile
                  username={post?.author?.screen_name}
                  tabIndex={-1}
                >
                  <EllipsisWrapper>
                    <UserScreenName screenName={post?.author?.screen_name} />
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
                screen_name={post?.in_reply_to_screen_name}
                id={post?.author?.id}
              />
            </div>
          )}
          <div className={styles.post}>
            {post?.text && (
              <div className={styles.text}>
                <p>{decodeURIComponent(post?.text)}</p>
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
