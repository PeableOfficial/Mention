"use client";
import { AnimatePresence } from "framer-motion";
import { PEABLE_SERVICES_URL } from "@/config";
import { usePeableSession } from "@peable/services";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { MessageIcon } from "@/assets/message-icon";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { BASE_URL } from "@/config";
import { useJoinMention } from "@/features/auth";
import { useToggleBookmark } from "@/features/bookmarks";

import {
  AddToBookmarksIcon,
  RemoveFromBookmarksIcon,
} from "../../assets/bookmark-icon";
import { CopyLinkIcon } from "../../assets/copy-link-icon";
import { ShareIcon } from "../../assets/share-icon";
import { IPost } from "../../types";

import styles from "./styles/actions.module.scss";

export const ShareButton = ({ post }: { post: IPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { session } = usePeableSession({
    SERVICES_URL: PEABLE_SERVICES_URL,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const url = `${BASE_URL}/status/${post?.id}`;
  const notify = () => toast("Copied to clipboard");
  const addedToBookmarks = () => toast("Post added to your Bookmarks");
  const removedFromBookmarks = () => toast("Post removed from your bookmarks");

  const isBookmarked = post?.bookmarks?.some(
    (bookmark) => bookmark?.user_id === session?.user?.id,
  );

  const setJoinMentionData = useJoinMention((state) => state.setData);

  const mutation = useToggleBookmark();

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label="Share Post"
        data-title="Share"
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.share}
      >
        <span className={styles.icon}>
          <ShareIcon />
        </span>
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            background="none"
            onClose={() => {
              setIsModalOpen(false);
            }}
          >
            <Menu
              onClose={() => setIsModalOpen(false)}
              ref={buttonRef}
              trackScroll={true}
            >
              <MenuItem
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setIsModalOpen(false);
                  notify();
                }}
              >
                <CopyLinkIcon /> Copy link to Post
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                <ShareIcon /> Share Post via ...
              </MenuItem>

              <MenuItem
                onClick={() => {
                  if (!session) {
                    setJoinMentionData({
                      isModalOpen: true,
                      action: "message",
                      user: post?.author?.name,
                    });
                    setIsModalOpen(false);
                  } else {
                    console.log("DM");
                  }
                }}
              >
                <MessageIcon /> Send via Direct Message
              </MenuItem>

              {isBookmarked ? (
                <MenuItem
                  onClick={() => {
                    mutation.mutate({
                      postId: post?.id,
                      userId: session?.user?.id,
                      action: "remove",
                      bookmarkId: post?.bookmarks?.find(
                        (bookmark) => bookmark?.user_id === session?.user?.id,
                      )?.id,
                    });
                    setIsModalOpen(false);
                    removedFromBookmarks();
                  }}
                >
                  <RemoveFromBookmarksIcon /> Remove Post from Bookmarks
                </MenuItem>
              ) : session ? (
                <MenuItem
                  onClick={() => {
                    mutation.mutate({
                      postId: post?.id,
                      userId: session?.user?.id,
                      action: "add",
                    });
                    setIsModalOpen(false);
                    addedToBookmarks();
                  }}
                >
                  <AddToBookmarksIcon /> Add Post to Bookmarks
                </MenuItem>
              ) : null}
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
