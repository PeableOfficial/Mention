"use client";
import { CreatePost } from "@/features/create-post";
import { Header, HomeHeader } from "@/features/header";
import { Posts } from "@/features/posts";

import styles from "./styles/home.module.scss";

export const HomeClientPage = () => {
  return (
    <div className={styles.container}>
      <Header>
        <HomeHeader />
      </Header>

      <div className={styles.createPost}>
        <CreatePost />
      </div>
      <div className={styles.feed}>
        <Posts />
      </div>
    </div>
  );
};
