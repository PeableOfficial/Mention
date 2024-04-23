"use client";
import { AnimatePresence } from "framer-motion";
import { PEABLE_SERVICES_URL } from "@/config";
import { usePeableSession } from "@peable/services";
import { useState } from "react";
import { useLocale } from "@/app/LocaleContext";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { Modal } from "@/components/elements/modal";
import { TryAgain } from "@/components/elements/try-again";

import { useGetConversations } from "../hooks/use-get-conversations";
import { useNewMessageStore } from "../stores/use-new-message-store";

import { ConversationCard } from "./conversation-card";
import { NewMessageModal } from "./new-message/new-message-modal";
import { SearchConversationResults } from "./search-conversation-results";
import { SearchConversations } from "./search-conversations";
import { StartNewConversation } from "./start-new-conversation";
import styles from "./styles/conversations.module.scss";

export const Conversations = () => {
  const { session } = usePeableSession({
    SERVICES_URL: PEABLE_SERVICES_URL,
  });
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const isModalOpen = useNewMessageStore((state) => state.isModalOpen);
  const closeModal = useNewMessageStore((state) => state.closeModal);

  const {
    data: conversations,
    isLoading,
    isError,
    isSuccess,
  } = useGetConversations(session?.user?.id);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      {conversations && conversations?.length > 0 ? (
        <>
          <div>
            <SearchConversations
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
            />
          </div>
          {isSearching ? (
            <div className={styles.searchResults}>
              <SearchConversationResults searchTerm={searchTerm} />
            </div>
          ) : (
            <div className={styles.conversations}>
              {isSuccess &&
              Array.isArray(conversations) &&
              conversations.length > 0 ? (
                conversations.map((conversation) => (
                  <div className={styles.conversation} key={conversation.id}>
                    <ConversationCard conversation={conversation} />
                  </div>
                ))
              ) : (
                <LoadingSpinner />
              )}
            </div>
          )}
        </>
      ) : (
        <StartNewConversation
          title={t("pages.chat.startNewConversation.title")}
          subtitle={t("pages.chat.startNewConversation.description")}
          buttonText={t("pages.chat.startNewConversation.buttonText")}
        />
      )}

      <AnimatePresence>
        {isModalOpen && (
          <Modal onClose={() => closeModal()} disableScroll={true}>
            <NewMessageModal />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
