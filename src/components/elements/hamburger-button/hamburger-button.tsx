"use client";
import Link from "next/link";
import { PEABLE_SERVICES_URL } from "@/config";
import { usePeableSession } from "@peable/services";

import { MentionLogo } from "@/assets/mention-logo";
import { Avatar } from "@/features/profile";
import { useHamburger } from "@/stores/use-hamburger";

import styles from "./styles/hamburger-button.module.scss";

export const HamburgerButton = () => {
  const { session } = usePeableSession({
    SERVICES_URL: PEABLE_SERVICES_URL,
  });

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
          <Avatar userImage={session?.user?.profile_image_url} />
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
