import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { useUser } from "@/features/profile";

import { BellActive, Bell } from "../assets/bell-icon";
import { Bookmark, BookmarkActive } from "../assets/bookmark-icon";
import { Envelope, EnvelopeActive } from "../assets/envelope-icon";
import { Gear, GearActive } from "../assets/gear-icon";
import { Hashtag, HashtagActive } from "../assets/hashtag-icon";
import { HomeActive, Home } from "../assets/home-icon";
import { User, UserActive } from "../assets/user-icon";

import NavItem from "./navbar-item";
import styles from "./styles/navbar.module.scss";

export const Navbar = () => {
  const pathname = usePathname();
  const path = pathname?.split("/")[1];
  const { data: session } = useSession();
  const { data: user } = useUser({ id: session?.user?.id });

  return (
    <nav aria-label="Primary" className={styles.container}>
      {session && (
        <NavItem
          icon={pathname === `/home` ? <HomeActive /> : <Home />}
          title={`Home`}
          path={`home`}
          isActive={pathname === `/home`}
        />
      )}

      <NavItem
        icon={pathname === `/explore` ? <HashtagActive /> : <Hashtag />}
        title={`Explore`}
        path={`explore`}
        isActive={pathname === `/explore`}
      />

      {session && (
        <NavItem
          icon={pathname === `/notifications` ? <BellActive /> : <Bell />}
          title={`Notifications`}
          path={`notifications`}
          isActive={pathname === `/notifications`}
        />
      )}

      {session && (
        <NavItem
          icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
          title={`Messages`}
          path={`messages`}
          isActive={pathname === `/messages`}
        />
      )}

      {session && (
        <NavItem
          icon={pathname === `/bookmarks` ? <BookmarkActive /> : <Bookmark />}
          title={`Bookmarks`}
          path={`bookmarks`}
          isActive={pathname === `/bookmarks`}
        />
      )}

      {session && (
        <NavItem
          icon={path === `${user?.screen_name}` ? <UserActive /> : <User />}
          title={`Profile`}
          path={`${user?.screen_name}`}
          isActive={path === `${user?.screen_name}`}
        />
      )}

      <NavItem
        icon={pathname === `/settings` ? <GearActive /> : <Gear />}
        title={`Settings`}
        path={`settings`}
        isActive={pathname === `/settings`}
      />
    </nav>
  );
};
