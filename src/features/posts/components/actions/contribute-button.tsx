"use client";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Menu, MenuItem } from "@/components/elements/menu";
import { Modal } from "@/components/elements/modal";

import { ContributeIcon } from "../../assets/contribute-icon";

import styles from "./styles/actions.module.scss";

export const ContributeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const FairWalletToast = () =>
    toast("FairWallet, feature still under development");
  const PeablePayToast = () =>
    toast("Peable Pay, feature still under development");

  return (
    <div className={styles.container}>
      <button
        ref={buttonRef}
        aria-expanded={isModalOpen}
        aria-haspopup="menu"
        aria-label="Contribute to Post"
        data-title="Contribute"
        tabIndex={0}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        className={styles.contribute}
      >
        <span className={styles.icon}>
          <ContributeIcon />
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
                  setIsModalOpen(false);
                  FairWalletToast();
                }}
              >
                <ContributeIcon /> Use FairWallet
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsModalOpen(false);
                  PeablePayToast();
                }}
              >
                <ContributeIcon /> Use Peable Pay
              </MenuItem>
            </Menu>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
