"use client";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { SortPosts } from "@/components/elements/sort-posts";
import { FeedSelector } from "@/components/elements/feeds-selector";
import { CreatePost } from "@/features/create-post";
import { Header } from "@/features/header";
import { Posts } from "@/features/posts";

import styles from "./styles/home.module.scss";

export const HomeClientPage = () => {
  return (
    <div className={styles.container}>
      <Header>
        <HamburgerButton />
        <h2>Home</h2>
        <div className="ml-auto flex">
          <SortPosts />
          <FeedSelector />
        </div>
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
