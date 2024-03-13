import Link from "next/link";

import styles from "./styles/replying-to.module.scss";

export const ReplyingTo = ({
  username,
  id,
}: {
  username: string | null;
  id?: string | null;
}) => {
  return (
    <div className={styles.container}>
      Replying to{" "}
      {id ? (
        <Link
          className={styles.link}
          onClick={(e) => e.stopPropagation()}
          href={`/${id}`}
        >
          @{username}
        </Link>
      ) : (
        <span className={styles.username}>@{username}</span>
      )}
    </div>
  );
};
