"use client";
import { PEABLE_SERVICES_URL } from "@/config";
import { usePeableSession } from "@peable/services";

import { SessionOwnerButton } from "@/features/auth";
import { PostButton } from "@/features/create-post";
import { Navbar } from "@/features/navbar";

import { Logo } from "./logo";
import styles from "./styles/sidebar.module.scss";

export const Sidebar = () => {
  const { session } = usePeableSession({
    SERVICES_URL: PEABLE_SERVICES_URL,
  });

  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      {session && (
        <div className={styles.postButton}>
          <PostButton />
        </div>
      )}
      {session && (
        <div className={styles.user}>
          <SessionOwnerButton />
        </div>
      )}
    </header>
  );
};
