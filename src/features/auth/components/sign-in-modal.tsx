"use client";
import { motion } from "framer-motion";

import { CloseIcon } from "@/assets/close-icon";
import { MentionLogo } from "@/assets/mention-logo";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";

import { SignInButton } from "@oxyhq/services";
import styles from "./styles/login-form.module.scss";

export const SignInModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      role="group"
      className={styles.container}
    >
      <div className={styles.header}>
        <Tooltip text="Close">
          <Button
            aria-label="Close"
            onClick={() => onClose()}
            className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          >
            <CloseIcon />
          </Button>
        </Tooltip>

        <div className={styles.logo}>
          <MentionLogo />
        </div>

        <div className={styles.placeholder} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>Sign in to Mention</h2>

          <div className={styles.authButtons}>
            <SignInButton />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
