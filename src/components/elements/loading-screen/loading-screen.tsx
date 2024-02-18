import { MentionLogo } from "@/assets/mention-logo";

import styles from "./styles/loading-screen.module.scss";

export const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <MentionLogo />
      </div>
    </div>
  );
};
