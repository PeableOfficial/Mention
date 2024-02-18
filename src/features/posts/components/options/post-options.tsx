"use client";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

import { DotIcon } from "@/assets/dot-icon";
import { Menu } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";
import { IPost } from "@/features/posts";

import { DeletePostModal } from "../delete-post-modal";

import { PostOwnerMenu } from "./post-owner-menu";
import { PostVisitorMenu } from "./post-visitor-menu";
import styles from "./styles/post-options.module.scss";

export const PostOptions = ({ post }: { post: IPost }) => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label="More"
        data-title="More"
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(true);
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        className={styles.optionsButton}
      >
        <DotIcon />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <Modal
            background="none"
            onClose={() => {
              setIsMenuOpen(false);
            }}
          >
            <Menu
              ref={buttonRef}
              onClose={() => setIsMenuOpen(false)}
              trackScroll={true}
            >
              {post?.author?.id === session?.user?.id ? (
                <PostOwnerMenu
                  post={post}
                  setIsMenuOpen={setIsMenuOpen}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
              ) : (
                <PostVisitorMenu setIsMenuOpen={setIsMenuOpen} post={post} />
              )}
            </Menu>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <Modal
            background="var(--clr-modal-background)"
            onClose={() => {
              setIsDeleteModalOpen(false);
              setIsMenuOpen(true);
            }}
          >
            <DeletePostModal
              post={post}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
