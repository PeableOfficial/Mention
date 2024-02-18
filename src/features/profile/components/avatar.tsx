import Image from "next/image";

import styles from "./styles/avatar.module.scss";

export const Avatar = ({ userImage }: { userImage: string | null }) => {
  return (
    <div className={styles.container}>
      <Image
        src={userImage || `/avatar.svg`}
        alt="Profile picture"
        draggable={true}
        fill={true}
        sizes="var(--avatar-size)"
      />
    </div>
  );
};
