import Image from "next/image";

import styles from "./styles/no-bookmarks.module.scss";

export const NoBookmarks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src="/empty_pinned_messages.svg"
            alt="No bookmarks"
            width={500}
            height={500}
          />
        </div>
        <h1>Save Posts for later</h1>
        <p>
          Don’t let the good ones fly away! Bookmark Posts to easily find them
          again in the future.
        </p>
      </div>
    </div>
  );
};
