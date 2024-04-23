"use client";
import { AnimatePresence } from "framer-motion";
import { PEABLE_SERVICES_URL } from "@/config";
import { usePeableSession } from "@peable/services";
import { useState } from "react";
import { useLocale } from "@/app/LocaleContext";

import { Modal } from "@/components/elements/modal";
import { useJoinMention } from "@/features/auth";
import { useFollow } from "@/features/profile";

import styles from "./styles/follow-button.module.scss";
import { UnfollowModal } from "./unfollow-modal";

export const FollowButton = ({
  user_id,
  username,
  session_owner_id,
  isFollowing = false,
}: {
  username: string | undefined;
  user_id: string;
  session_owner_id: string;
  isFollowing?: boolean;
}) => {
  const { t } = useLocale();

  const { session } = usePeableSession({
    SERVICES_URL: PEABLE_SERVICES_URL,
  });
  const setJoinMentionData = useJoinMention((state) => state.setData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useFollow("follow");

  const buttonText = isFollowing ? "Following" : "Follow";

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!session) {
      setJoinMentionData({
        isModalOpen: true,
        action: "follow",
        user: username,
      });
    } else {
      if (isFollowing) {
        setIsModalOpen(true);
      } else {
        mutation.mutate({
          user_id,
          session_owner_id,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <button
        aria-label={`${buttonText} @${username}`}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          handleFollow(e);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.textContent = isFollowing
            ? t("common.buttons.unfollow")
            : t("common.buttons.follow");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.textContent = isFollowing
            ? t("common.buttons.unfollow")
            : t("common.buttons.follow");
        }}
        className={isFollowing ? styles.following : styles.follow}
      >
        {isFollowing
          ? t("common.buttons.unfollow")
          : t("common.buttons.follow")}
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            disableScroll={true}
            background="var(--clr-modal-background)"
            closeOnBackdropClick={true}
          >
            <UnfollowModal
              username={username}
              user_id={user_id}
              session_owner_id={session_owner_id}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
