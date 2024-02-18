import { HamburgerButton } from "@/components/elements/hamburger-button";

import { HeaderHeading } from "./header-heading";
import { HeaderSettings } from "./header-settings";
import styles from "./styles/notifications-header.module.scss";

export const ProHeader = () => {
  return (
    <div className={styles.container}>
      <HamburgerButton />
      <HeaderHeading title="Mention Pro" />

      <div className={styles.options}>
        <HeaderSettings href={`/settings/notifications`} ariaLabel="Settings" />
      </div>
    </div>
  );
};
