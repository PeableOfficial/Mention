import { useRouter } from "next/navigation";

import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import {
  Avatar,
  IUser,
  LinkToProfile,
  UserJoinDate,
  UserName,
  UserScreenName,
} from "@/features/profile";

import styles from "./styles/conversation-member-details.module.scss";

export const ConversationMemberDetails = ({
  user,
}: {
  user: IUser | undefined;
}) => {
  const router = useRouter();

  return (
    <div
      role="button"
      onClick={() => router.push(`/${user?.id}`)}
      onKeyDown={() => router.push(`/${user?.id}`)}
      tabIndex={0}
      className={styles.container}
    >
      <div className={styles.avatar}>
        <LinkToProfile username={user?.screen_name}>
          <Avatar userImage={user?.profile_image_url ?? ""} />
        </LinkToProfile>
      </div>
      <LinkToProfile username={user?.screen_name}>
        <EllipsisWrapper>
          <UserName name={user?.name} isVerified={user?.verified} />
        </EllipsisWrapper>
      </LinkToProfile>
      <div className={styles.username}>
        <LinkToProfile username={user?.screen_name}>
          <EllipsisWrapper>
            <UserScreenName screenName={user?.screen_name} />
          </EllipsisWrapper>
        </LinkToProfile>
      </div>
      {user?.description && (
        <div className={styles.bio}>
          <p>{user?.description}</p>
        </div>
      )}

      <div className={styles.stats}>
        <UserJoinDate showIcon={false} date={user?.created_at} />
        <span className={styles.dot}>·</span>
        <span className={styles.followers}>
          {user?.followers?.length ?? 0} Followers
        </span>
      </div>

      <p className={styles.followersInfo}>
        Not followed by anyone you&apos;re following
      </p>
    </div>
  );
};
