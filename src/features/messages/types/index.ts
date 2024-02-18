import { Message, Conversation } from "@prisma/client";

import { IMedia } from "@/features/posts";
import { IUser } from "@/features/profile";

export interface IMessage extends Message {
  media: IMedia[];
  sender: IUser;
  receiver: IUser;
  conversation: IConversation;
}

export interface IConversation extends Conversation {
  users: IUser[];
  messages: IMessage[];
}
