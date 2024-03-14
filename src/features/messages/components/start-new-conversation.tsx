import { useNewMessageStore } from "../stores/use-new-message-store";
import Image from "next/image";

import styles from "./styles/start-new-conversation.module.scss";

export const StartNewConversation = ({
  title = `Select a message`,
  subtitle = `Choose from your existing conversations, start a new one, or just keep swimming`,
  buttonText = `New Message`,
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}) => {
  const openModal = useNewMessageStore((state) => state.openModal);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={`/empty_invited_members.svg`}
          alt={`No conversations`}
          width={1000}
          height={1000}
        />
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <button onClick={openModal}>{buttonText}</button>
      </div>
    </div>
  );
};
