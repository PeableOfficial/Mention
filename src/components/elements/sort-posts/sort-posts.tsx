"use client";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { StarIcon } from "@/assets/star-icon";
import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";

import styles from "./styles/sort-posts.module.scss";

export const SortPosts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label="Sort Posts"
        data-title="Sort Posts"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        className={styles.sortButton}
      >
        <StarIcon />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} background="none">
            <Menu onClose={() => setIsModalOpen(false)} ref={buttonRef}>
              <MenuItem onClick={() => setIsModalOpen(false)}>For you</MenuItem>
              <MenuItem onClick={() => setIsModalOpen(false)}>
                Following
              </MenuItem>
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
