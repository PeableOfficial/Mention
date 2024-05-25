"use client";
import { motion } from "framer-motion";
import { useState } from "react";

import { CloseIcon } from "@/assets/close-icon";
import { MentionLogo } from "@/assets/mention-logo";
import { Button } from "@/components/elements/button";
import { TextInput } from "@/components/elements/text-input";
import { Tooltip } from "@/components/elements/tooltip";

import { SignInButton } from "@oxyhq/services";
import styles from "./styles/login-form.module.scss";

export const SignInModal = ({ onClose }: { onClose: () => void }) => {
  const [text, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

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

          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.text}>or</span>
            <span className={styles.line}></span>
          </div>

          <form>
            <div className={styles.inputContainer}>
              <TextInput
                onChange={onChange}
                value={text}
                placeholder="Phone, email, or username"
                id="text"
                name="Name"
              />
            </div>

            <button className={styles.submit}>Next</button>
          </form>

          <button className={styles.forgotPassword}>Forgot password?</button>
        </div>
      </div>
    </motion.div>
  );
};
