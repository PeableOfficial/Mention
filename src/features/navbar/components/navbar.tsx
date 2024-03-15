import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { useUser } from "@/features/profile";

import { Tooltip } from "@/components/elements/tooltip";

import { ActivityActive, Activity } from "../assets/activity-icon";
import { Bookmark, BookmarkActive } from "../assets/bookmark-icon";
import { Envelope, EnvelopeActive } from "../assets/envelope-icon";
import { Gear, GearActive } from "../assets/gear-icon";
import { Hashtag, HashtagActive } from "../assets/hashtag-icon";
import { HomeActive, Home } from "../assets/home-icon";
import { User, UserActive } from "../assets/user-icon";
import { useLocale } from "@/app/LocaleContext";

import NavItem from "./navbar-item";

export const Navbar = () => {
  const { t } = useLocale();
  const pathname = usePathname();
  const path = pathname?.split("/")[1];
  const { data: session } = useSession();
  const { data: user } = useUser({ id: session?.user?.id });

  return (
    <nav
      aria-label="Primary"
      className="flex flex-col items-center xxl:items-start"
    >
      {session && (
        <Tooltip text="Home" maxWidth={1300}>
          <NavItem
            href={`/home`}
            icon={pathname === `/home` ? <HomeActive /> : <Home />}
            text={t("navbar.home.text")}
            aria-label={t("navbar.home.label")}
            isActive={pathname === `/home`}
          />
        </Tooltip>
      )}

      <Tooltip text="Explore" maxWidth={1300}>
        <NavItem
          href={`/explore`}
          icon={pathname === `/explore` ? <HashtagActive /> : <Hashtag />}
          text={t("navbar.explore.text")}
          aria-label={t("navbar.explore.label")}
          isActive={pathname === `/explore`}
        />
      </Tooltip>

      {session && (
        <Tooltip text="Activity" maxWidth={1300}>
          <NavItem
            href={`/activity`}
            icon={pathname === `/activity` ? <ActivityActive /> : <Activity />}
            text={t("navbar.activity.text")}
            aria-label={t("navbar.activity.label")}
            isActive={pathname === `/activity`}
          />
        </Tooltip>
      )}

      {session && (
        <Tooltip text="Messages" maxWidth={1300}>
          <NavItem
            href={`/messages`}
            icon={pathname === `/messages` ? <EnvelopeActive /> : <Envelope />}
            text={t("navbar.messages.text")}
            aria-label={t("navbar.messages.label")}
            isActive={pathname === `/messages`}
          />
        </Tooltip>
      )}

      {session && (
        <Tooltip text="Bookmarks" maxWidth={1300}>
          <NavItem
            href={`/bookmarks`}
            icon={pathname === `/bookmarks` ? <BookmarkActive /> : <Bookmark />}
            text={t("navbar.bookmarks.text")}
            aria-label={t("navbar.bookmarks.label")}
            isActive={pathname === `/bookmarks`}
          />
        </Tooltip>
      )}

      {session && (
        <Tooltip text="Profile" maxWidth={1300}>
          <NavItem
            href={`/@${user?.username}`}
            icon={path === `@${user?.username}` ? <UserActive /> : <User />}
            text={t("navbar.profile.text")}
            aria-label={t("navbar.profile.label")}
            isActive={path === `@${user?.username}`}
          />
        </Tooltip>
      )}

      <Tooltip text="Settings" maxWidth={1300}>
        <NavItem
          href={`/settings`}
          icon={pathname === `/settings` ? <GearActive /> : <Gear />}
          text="Settings"
          aria-label="Settings"
          isActive={pathname === `/settings`}
        />
      </Tooltip>
    </nav>
  );
};
