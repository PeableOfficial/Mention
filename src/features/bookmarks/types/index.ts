import { IPost } from "@/features/posts";
import { IUser } from "@/features/profile";

export interface IBookmark {
  id: string;
  post: IPost;
  post_id: string;
  user: IUser;
  user_id: string;
  created_at: string;
}
