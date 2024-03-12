import Link from "next/link";

import { MentionLogo } from "@/assets/mention-logo";

import styles from "./styles/logo.module.scss";

export const Logo = () => {
  return (
    <h1 className={styles.container}>
      <Link href={`/home`} aria-label="Mention">
        <MentionLogo />
      </Link>
    </h1>
  );
};
