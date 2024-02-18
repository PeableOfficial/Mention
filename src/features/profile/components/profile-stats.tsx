"use client";
import Link from "next/link";

import { IUser } from "../types";

import styles from "./styles/profile-stats.module.scss";

export const ProfileStats = ({
  user,
  pathname,
}: {
  user: IUser;
  pathname: string;
}) => {
  const statsData = [
    { title: "Posts", amount: "100", href: `/${user.screen_name}` },
    { title: "Likes", amount: "2K", href: `/${user.screen_name}/likes` },
    {
      title: "Followers",
      amount: user?._count?.followers || "0",
      href: `/${user.screen_name}/followers`,
    },
    {
      title: "Following",
      amount: user?._count?.following || "0",
      href: `/${user.screen_name}/following`,
    },
    { title: "Media", amount: "10", href: `/${user.screen_name}/media` },
    { title: "Reposts", amount: "1K", href: `/${user.screen_name}/reposts` },
    {
      title: "Replies",
      amount: "1K",
      href: `/${user.screen_name}/with-replies`,
    },
  ];

  return (
    <div className={styles.stats}>
      {statsData.map((stat, index) => (
        <Link
          key={index}
          href={stat.href}
          className={`${styles.stat} ${
            pathname === stat.href ? styles.active : ""
          }`}
        >
          <p className={styles.amount}>{stat.amount}</p>
          <p className={styles.title}>{stat.title}</p>
        </Link>
      ))}
    </div>
  );
};
