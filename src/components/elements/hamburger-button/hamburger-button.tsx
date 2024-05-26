"use client";
import Link from "next/link";
import { useOxySession } from "@oxyhq/services";

import { MentionLogo } from "@/assets/mention-logo";
import { Avatar } from "@/features/profile";
import { useHamburger } from "@/stores/use-hamburger";

import styles from "./styles/hamburger-button.module.scss";

export const HamburgerButton = () => {
  const { session } = useOxySession();

  const openHamburger = useHamburger((state) => state.openHamburger);
  const isHamburgerOpen = useHamburger((state) => state.isHamburgerOpen);

  return (
    <>
      {session ? (
        <button
          aria-expanded={isHamburgerOpen}
          aria-haspopup="menu"
          aria-label={`Profile menu ${session?.user?.name}`}
          onClick={() => openHamburger()}
          className={styles.container}
        >
          <Avatar userImage={session?.user?.avatar as string} />
        </button>
      ) : (
        <div className={styles.logo}>
          <Link href={`/`}>
            <MentionLogo />
          </Link>
        </div>
      )}
    </>
  );
};
