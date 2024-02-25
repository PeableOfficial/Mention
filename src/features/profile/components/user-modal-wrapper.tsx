/* eslint-disable jsx-a11y/mouse-events-have-key-events */
"use client";
import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import styles from "./styles/user-modal-wrapper.module.scss";
import { UserModal } from "./user-modal";

export const UserModalWrapper = ({
  children,
  userId,
  delay,
}: {
  children: React.ReactNode;
  userId: string;
  delay: number;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [timer, setTimer] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;

    if (isHovering && timer <= delay) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 500);
      }, 500);
    } else {
      if (timer >= 0)
        interval = setInterval(() => {
          setTimer((timer) => {
            if (timer <= 0) {
              clearInterval(interval);
            }
            return timer - 500;
          });
        }, 500);
    }

    return () => clearInterval(interval);
  }, [isHovering, timer, delay]);

  return (
    <div className={styles.container}>
      <div
        ref={ref}
        className={`${styles.childrenWrapper} ${
          isHovering ? styles.hovered : ""
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </div>

      <AnimatePresence>
        {isHovering && <UserModal ref={ref} userId={userId} />}
      </AnimatePresence>
    </div>
  );
};
