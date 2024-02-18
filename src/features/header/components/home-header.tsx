import { HamburgerButton } from "@/components/elements/hamburger-button";
import { SortPosts } from "@/components/elements/sort-posts";

import { HeaderHeading } from "./header-heading";
import styles from "./styles/home-header.module.scss";

export const HomeHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />
      <HeaderHeading title="Home" />

      <div className={styles.star}>
        <SortPosts />
      </div>
    </div>
  );
};
