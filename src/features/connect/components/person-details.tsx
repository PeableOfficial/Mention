import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { FollowButton } from "@/components/elements/follow-button";
import {
  Avatar,
  following,
  IUser,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import styles from "./styles/person-details.module.scss";

export const PersonDetails = ({ author }: { author: IUser }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const isFollowing = following({
    user: author,
    session_owner_id: session?.user?.id,
  });

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          router.push(`/${author?.screen_name}`);
        }
      }}
      onClick={() => {
        router.push(`/${author?.screen_name}`);
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
              <LinkToProfile username={author?.screen_name}>
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
                <UserScreenName screenName={author?.screen_name} />
              </EllipsisWrapper>
            </UserModalWrapper>
          </div>

          <FollowButton
            user_id={author?.id}
            session_owner_id={session?.user?.id}
            isFollowing={isFollowing}
            username={author?.screen_name}
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
