"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "@/app/LocaleContext";

import { Gear } from "@/assets/gear-icon";
import { NewMessageIcon } from "@/assets/new-message-icon";
import { Button } from "@/components/elements/button";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Tooltip } from "@/components/elements/tooltip";
import { Header } from "@/features/header";
import { Conversations, useNewMessageStore } from "@/features/messages";

import styles from "./styles/messages.module.scss";

export const MessagesClientPage = () => {
  const router = useRouter();
  const { t } = useLocale();
  const openModal = useNewMessageStore((state) => state.openModal);
  const isModalOpen = useNewMessageStore((state) => state.isModalOpen);

  return (
    <div className={styles.container}>
      <Header>
        <HamburgerButton />
        <h2>{t("pages.chat.title")}</h2>

        <div className="ml-auto flex">
          <Tooltip text={t("common.settings")}>
            <Button
              role="link"
              onClick={() => {
                router.push(`/settings/messages`);
              }}
              aria-label={t("common.settings")}
              className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100  active:bg-neutral-600"
            >
              <Gear />
            </Button>
          </Tooltip>

          <Tooltip text={t("pages.chat.newChat")}>
            <Button
              aria-expanded={isModalOpen}
              aria-haspopup="menu"
              role="link"
              onClick={() => {
                openModal();
              }}
              aria-label={t("pages.chat.newChat")}
              className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100  active:bg-neutral-600"
            >
              <NewMessageIcon />
            </Button>
          </Tooltip>
        </div>
      </Header>
      <Conversations />
    </div>
  );
};
