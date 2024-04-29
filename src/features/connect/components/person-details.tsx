import { useRouter } from "next/navigation";
import { usePeableSession } from "@peable/services";

import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { FollowButton } from "@/components/elements/follow-button";
import {
  Avatar,
  following,
  IUser,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserUsername,
} from "@/features/profile";

import styles from "./styles/person-details.module.scss";

export const PersonDetails = ({ IUser: author }: { IUser: IUser }) => {
  const { session } = usePeableSession();
  const router = useRouter();

  const isFollowing = following({
    user: author,
    session_owner_id: session?.user?.id as string,
  });

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/${author?.username}`);
        }
      }}
      onClick={() => {
        router.push(`/${author?.username}`);
      }}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <UserModalWrapper userId={author?.id} delay={500}>
          <Avatar userImage={author?.profile_image_url} />
        </UserModalWrapper>
      </div>

      <div className={styles.info}>
        <div className={styles.user_details}>
          <div className={styles.name}>
            <UserModalWrapper userId={author?.id} delay={500}>
              <LinkToProfile username={author?.username}>
                <EllipsisWrapper>
                  <UserName
                    name={author?.name}
                    isVerified={author?.verified}
                    hover={true}
                  />
                </EllipsisWrapper>
              </LinkToProfile>
            </UserModalWrapper>

            <UserModalWrapper userId={author?.id} delay={500}>
              <EllipsisWrapper>
                <UserUsername username={author?.username} />
              </EllipsisWrapper>
            </UserModalWrapper>
          </div>

          <FollowButton
            user_id={author?.id}
            session_owner_id={session?.user?.id as string}
            isFollowing={isFollowing}
            username={author?.username}
          />
        </div>

        {author?.description && (
          <div className={styles.secondary}>
            <span className={styles.description}>{author?.description}</span>
          </div>
        )}
      </div>
    </div>
  );
};
