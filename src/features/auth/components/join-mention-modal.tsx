"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { CommentIconFill } from "@/assets/comment-icon";
import { FollowIcon } from "@/assets/follow-icon";
import { HeartIconActive } from "@/assets/heart-icon";
import { MessageIcon } from "@/assets/message-icon";
import { RepostIcon } from "@/assets/repost-icon";
import { CloseButton } from "@/components/elements/close-button";

import { useJoinMention } from "../stores/useJoinMention";

import styles from "./styles/join-mention-modal.module.scss";

export const JoinMentionModal = () => {
  const router = useRouter();
  const data = useJoinMention((state) => state.data);
  const setJoinMentionData = useJoinMention((state) => state.setData);

  const innerWidth = window.innerWidth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.2,
      }}
      className={styles.container}
    >
      <div className={styles.close}>
        <CloseButton
          onClick={() => {
            setJoinMentionData({
              isModalOpen: false,
              action: "",
              user: "",
            });
          }}
          ariaLabel={innerWidth < 700 ? "Back" : "Close"}
          title={innerWidth < 700 ? "Back" : "Close"}
        >
          {innerWidth < 700 ? <BackArrowIcon /> : <CloseIcon />}
        </CloseButton>
      </div>

      <div className={styles.icon}>
        {data.action === `comment` ? (
          <span className={styles.comment}>
            <CommentIconFill />
          </span>
        ) : data.action === `repost` ? (
          <span className={styles.repost}>
            <RepostIcon />
          </span>
        ) : data.action === `like` ? (
          <span className={styles.like}>
            <HeartIconActive />
          </span>
        ) : data.action === `follow` ? (
          <span className={styles.follow}>
            <FollowIcon />
          </span>
        ) : data.action === `message` ? (
          <span className={styles.comment}>
            <MessageIcon />
          </span>
        ) : null}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          {data.action === `comment`
            ? `Reply to join the conversation.`
            : data.action === `repost`
              ? `Repost to spread the word.`
              : data.action === `like`
                ? `Like a Post to share the love.`
                : data.action === `follow`
                  ? `Follow ${data.user} to see what they share on Mention.`
                  : data.action === `message`
                    ? `Join Mention now so you can share The New European - Think Without Borders’s Post privately.`
                    : `Don’t miss what’s happening`}
        </h1>
        <p className={styles.subtitle}>
          {data.action === `comment`
            ? `Once you join Mention, you can respond to ${data.user}’s Post.`
            : data.action === `repost`
              ? `When you join Mention, you can share ${data.user}’s Post with your followers.`
              : data.action === `like`
                ? `Join Mention now to let ${data.user} know you like their Post.`
                : data.action === `follow`
                  ? `Sign up so you never miss their Posts.`
                  : `People on Mention are the first to know.`}
        </p>

        <div className={styles.buttons}>
          <button
            role="link"
            onClick={() => {
              setJoinMentionData({
                isModalOpen: false,
                action: "",
                user: "",
              });
              router.push(`/auth/signin`);
            }}
            className={styles.signin}
          >
            Log in
          </button>
          <button
            role="link"
            onClick={() => {
              setJoinMentionData({
                isModalOpen: false,
                action: "",
                user: "",
              });
              router.push(`/auth/signin`);
            }}
            className={styles.signup}
          >
            Sign up
          </button>
        </div>
      </div>
    </motion.div>
  );
};
