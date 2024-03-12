"use client";
import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

import { HeartIcon, HeartIconActive } from "@/assets/heart-icon";
import { useJoinMention } from "@/features/auth";
import { NumberStats } from "../number-stats";

import { useLike } from "../../hooks/use-like";
import { IPost } from "../../types";

import styles from "./styles/actions.module.scss";

interface LikeButtonProps {
  post?: IPost;
  smallIcons?: boolean;
  showStats?: boolean;
}

export const LikeButton = ({
  post,
  smallIcons = true,
  showStats = false,
}: LikeButtonProps) => {
  const { data: session } = useSession();
  const hasLiked = post?.likes?.some(
    (like) => like.user_id === session?.user?.id,
  );

  const totalLikes = post?.likes?.length || 0;

  const [{ currentLikes }, setCurrentStats] = useState({
    currentLikes: totalLikes,
  });

  useEffect(() => {
    setCurrentStats({
      currentLikes: totalLikes,
    });
  }, [totalLikes]);

  const likeMove = useMemo(
    () => (totalLikes > currentLikes ? -25 : 25),
    [totalLikes],
  );

  const setJoinMentionData = useJoinMention((state) => state.setData);
  const mutation = useLike();

  const handleLikeClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (!session) {
      setJoinMentionData({
        isModalOpen: true,
        action: "like",
        user: post?.author?.name || "user",
      });
      return;
    }
    mutation.mutate({ postId: post?.id, userId: session?.user?.id });
  };

  return (
    <button
      aria-label={hasLiked ? "Unlike" : "Like"}
      data-title={hasLiked ? "Unlike" : "Like"}
      tabIndex={0}
      onKeyDown={(e) => e.stopPropagation()}
      onClick={handleLikeClick}
      className={`${styles.container} ${styles.like} ${hasLiked ? styles.liked : ""}`}
    >
      <span
        className={`${styles.icon} ${smallIcons ? styles.smallIcon : styles.bigIcon}`}
      >
        {hasLiked ? <HeartIconActive /> : <HeartIcon />}
      </span>
      {showStats && <NumberStats move={likeMove} stats={currentLikes} />}
    </button>
  );
};
