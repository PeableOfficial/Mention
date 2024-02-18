import type { Post, Like, Media, Repost, Bookmark } from "@prisma/client";

import { IUser } from "@/features/profile";

export interface IFeed {
  id: number;
}

export interface IPost extends Post {
  author: IUser;
  likes: ILike[];
  media: IMedia[];
  reposts: IRepost[];
  quoted_post: IPost;
  quotes: IPost[];
  comments: IPost[];
  bookmarks: IBookmark[];
  pinned_by_users: IUser[];
  _count: {
    reposts: number;
    quotes: number;
    likes: number;
    bookmarks: number;
    comments: number;
  };
}

export interface ILike extends Like {
  user: IUser;
  post: IPost;
}

export interface IMedia extends Media {
  post: IPost;
}

export interface IRepost extends Repost {
  user: IUser;
}

export interface IBookmark extends Bookmark {
  user: IUser;
  post: IPost;
}

export interface IInfinitePosts {
  pages: { posts: IPost[]; nextId?: string | undefined }[];
  pageParams: any;
}
