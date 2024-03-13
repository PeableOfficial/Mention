import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { PostOptions } from "@/features/posts";
import { IPost } from "@/features/posts";
import {
  Avatar,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserUsername,
} from "@/features/profile";

import styles from "./styles/post-author.module.scss";

export const PostAuthor = ({ post }: { post: IPost }) => {
  return (
    <div className={styles.container}>
      <UserModalWrapper userId={post?.author?.id} delay={500}>
        <LinkToProfile tabIndex={-1} username={post?.author?.username}>
          <Avatar userImage={post?.author?.profile_image_url} />
        </LinkToProfile>
      </UserModalWrapper>

      <div className={styles.userInfo}>
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

        <UserModalWrapper userId={post?.author?.id} delay={500}>
          <LinkToProfile tabIndex={-1} username={post?.author?.username}>
            <EllipsisWrapper>
              <UserUsername username={post?.author?.username} />
            </EllipsisWrapper>
          </LinkToProfile>
        </UserModalWrapper>
      </div>

      <div className={styles.options}>
        <PostOptions post={post} />
      </div>
    </div>
  );
};
