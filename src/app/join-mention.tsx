"use client";
import { AnimatePresence } from "framer-motion";

import { Modal } from "@/components/elements/modal";
import { JoinMentionModal, useJoinMention } from "@/features/auth";

export const JoinMention = () => {
  const isJoinMentionModalOpen = useJoinMention(
    (state) => state.data.isModalOpen,
  );
  const setJoinMentionData = useJoinMention((state) => state.setData);

  return (
    <div>
      <AnimatePresence>
        {isJoinMentionModalOpen && (
          <Modal
            onClose={() => {
              setJoinMentionData({
                isModalOpen: false,
                action: "",
                user: "",
              });
            }}
            disableScroll={true}
          >
            <JoinMentionModal />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
