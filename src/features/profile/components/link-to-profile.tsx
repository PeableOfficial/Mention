import Link from "next/link";

import styles from "./styles/link-to-profile.module.scss";

export const LinkToProfile = ({
  username,
  tabIndex = 0,
  onClick,
  children,
}: {
  username: string | undefined;
  tabIndex?: number;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick();
        }
      }}
      className={styles.container}
      tabIndex={tabIndex}
      href={`/${username}`}
    >
      {children}
    </Link>
  );
};
