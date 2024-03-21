"use client";
import React from "react";
import { useLocale } from "@/app/LocaleContext";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { SortPosts } from "@/components/elements/sort-posts";
import { FeedSelector } from "@/components/elements/feeds-selector";
import { CreatePost } from "@/features/create-post";
import { Header } from "@/features/header";
import { Posts } from "@/features/posts";

import styles from "./styles/home.module.scss";

export const HomeClientPage = () => {
  const { t } = useLocale();
  return (
    <div className={styles.container}>
      <Header>
        <HamburgerButton />
        <h2>{t("pages.home.title")}</h2>
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
