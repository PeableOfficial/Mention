import { Profile, Like } from "@prisma/client";

import { IPost } from "@/features/posts";
import { IBookmark } from "@/features/posts";

export interface IUser extends Profile {
  id: string;
  posts: IPost[];
  followers: Profile[];
  following: Profile[];
  likes: ILike[];
  bookmarks: IBookmark[];
  pinned_post: IPost;
  avatar: string | undefined;
  name: string;
  username: string;
  description: string | undefined;
  color: string | undefined;
  email: string | undefined;
  verified: boolean;
  _count?: {
    followers?: number;
    following?: number;
    posts?: number;
    likes?: number;
    media?: number;
    reposts?: number;
    replies?: number;
  };
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
