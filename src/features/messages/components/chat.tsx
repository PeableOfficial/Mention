import { useSession } from "next-auth/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/elements/button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { ArrowDownIcon } from "../assets/arrow-down-icon";
import { useChat } from "../hooks/use-get-chat";
import { useSocketEvents } from "../hooks/use-socket-events";
import { scrollIntoView } from "../utils/scroll-into-view";

import { Message } from "./message";

export type status = "sending" | "sent" | "seen" | "failed";

export const Chat = ({
  conversation_id,
}: {
  conversation_id: string | undefined;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [displayNewMessageToast, setDisplayNewMessageToast] = useState(false);

  const { data: session } = useSession();
  const { data: chat, isLoading, isError } = useChat(conversation_id);

  useSocketEvents(conversation_id);

  useEffect(() => {
    if (inView) {
      setScrolledToBottom(true);
      setDisplayNewMessageToast(false);
    } else {
      setScrolledToBottom(false);
    }
  }, [inView]);

  const handleScroll = () => {
    const element = anchorRef.current;
    if (element) {
      const isScrolledToBottom =
        element.scrollHeight - element.scrollTop === element.clientHeight;
      setScrolledToBottom(isScrolledToBottom);
    }
  };

  useLayoutEffect(() => {
    if (scrolledToBottom) {
      scrollIntoView({
        element: anchorRef.current,
        behavior: "instant",
      });
    } else {
      if (
        chat &&
        chat?.length > 0 &&
        chat[chat.length - 1]?.sender_id !== session?.user?.id
      )
        setDisplayNewMessageToast(true);
    }
  }, [chat, scrolledToBottom, session?.user?.id]);

  useEffect(() => {
    const element = anchorRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isError) {
      scrollIntoView({
        element: anchorRef.current,
        behavior: "smooth",
      });
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (
      chat &&
      chat.length > 0 &&
      chat[chat.length - 1]?.sender_id === session?.user?.id
    ) {
      setScrolledToBottom(true);
    }
  }, [chat, session]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <TryAgain />;

  return (
    <div className="p-[1em_1em_0]">
      {chat?.map((message, index) => {
        return (
          <div key={message?.id} ref={index === chat.length - 1 ? ref : null}>
            <Message
              message={message}
              show_status={
                index === chat.length - 1 &&
                message.sender_id === session?.user?.id
              }
            />
          </div>
        );
      })}
      <div id="anchor" ref={anchorRef} />
      {!scrolledToBottom && !displayNewMessageToast && (
        <Button
          onClick={() => {
            scrollIntoView({
              element: anchorRef.current,
              behavior: "smooth",
            });
          }}
          className="absolute bottom-[5rem] right-[1.6rem] inline-flex items-center bg-background fill-primary-100 px-3 py-2 text-sm shadow-lg hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100/50 active:bg-neutral-600"
        >
          <ArrowDownIcon />
        </Button>
      )}

      {displayNewMessageToast && (
        <Button
          className="absolute bottom-[5rem] left-[50%] inline-flex translate-x-[-50%] items-center bg-background px-3 py-2 font-bold text-[var(--fs-milli)] text-primary-100 shadow-lg hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100/50 active:bg-neutral-600"
          onClick={() => {
            scrollIntoView({
              element: anchorRef.current,
            });
            setDisplayNewMessageToast(false);
          }}
        >
          ↓ New messages
        </Button>
      )}
    </div>
  );
};
