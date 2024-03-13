import styles from "./styles/user-username.module.scss";

export const UserUsername = ({
  username,
}: {
  username: string | undefined;
}) => {
  return <span className={styles.container}>@{username}</span>;
};
