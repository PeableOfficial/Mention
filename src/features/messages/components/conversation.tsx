"use client";
import { usePathname } from "next/navigation";
import { useOxySession } from "@oxyhq/services";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { socket } from "@/lib/socket-io";

import { useGetConversation } from "../hooks/use-get-conversation";

import { Chat } from "./chat";
import { ConversationHeader } from "./conversation-header";
import { ConversationMemberDetails } from "./conversation-member-details";
import { MessageInput } from "./message-input";

import styles from "./styles/conversation.module.scss";

import { useUser } from "@/features/profile";

export const Conversation = () => {
  const { session } = useOxySession();
  const { ref, inView } = useInView();

  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  const { data: conversation, isLoading, isError } = useGetConversation(id);
  const conversationMemberID = conversation?.users.filter(
    (user) => user?.id !== session?.user?.id,
  )[0].id;

  const { data: conversationMember } = useUser({
    id: conversationMemberID as string,
  });

  useEffect(() => {
    socket.auth = { conversation_id: id };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [id]);

  if (isLoading)
    return (
      <>
        <ConversationHeader />
        <LoadingSpinner />
      </>
    );

  if (isError)
    return (
      <>
        <ConversationHeader />
        <TryAgain />
      </>
    );

  return (
    <div className={styles.container}>
      <ConversationHeader
        user_id={conversationMember?.id}
        user_name={conversationMember?.name}
        user_username={conversationMember?.username}
        user_image={conversationMember?.avatar}
        isVerified={conversationMember?.verified}
        inView={inView}
      />
      <div className="overflow-y-auto">
        <div ref={ref}>
          <ConversationMemberDetails user={conversationMember} />
        </div>
        <Chat conversation_id={conversation?.id} />
      </div>

      <MessageInput
        conversation_id={conversation?.id}
        sender_id={session?.user?.id as string}
        receiver_id={conversationMember?.id}
      />
    </div>
  );
};
