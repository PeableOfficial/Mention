import { User, Like } from "@prisma/client";

import { IPost } from "@/features/posts";
import { IBookmark } from "@/features/posts";

export interface IUser extends User {
  posts: IPost[];
  followers: User[];
  following: User[];
  likes: ILike[];
  bookmarks: IBookmark[];
  pinned_post: IPost;
  _count?: {
    followers?: number;
    following?: number;
    posts?: number;
    likes?: number;
    media?: number;
    reposts?: number;
    replies?: number;
  };
  color?: string;
}

export interface IProfile {
  name: string;
  username: string;
  bio: string | undefined;
  location: string | undefined;
  website: string | undefined;
  color: string | undefined;
  banner: {
    url: string | undefined;
    file: File | undefined;
  };
  avatar: {
    url: string | undefined;
    file: File | undefined;
  };
}

export interface ILike extends Like {
  user: IUser;
  post: IPost;
}
