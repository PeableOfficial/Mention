import axios from "axios";

import { postHashtags, retrieveHashtagsFromPost } from "@/features/explore";

import { postMedia } from "./post-media";

export const postPost = async ({
  text,
  files,
  userId,
  in_reply_to_username,
  in_reply_to_status_id,
  quoted_post_id,
}: {
  text: string;
  files: File[];
  userId: string;
  in_reply_to_username?: string | null;
  in_reply_to_status_id?: string | null;
  quoted_post_id?: string | null;
}) => {
  const post = {
    text,
    author_id: userId,
    // if no in_reply_to_username, don't send it
    ...(in_reply_to_username && { in_reply_to_username }),
    // if no in_reply_to_status_id, don't send it
    ...(in_reply_to_status_id && { in_reply_to_status_id }),
    // if no quoted_post_id, don't send it
    ...(quoted_post_id && { quoted_post_id }),
  };

  try {
    const { data } = await axios.post(`/api/posts`, {
      post,
    });

    if (files.length > 0) {
      await postMedia({ files, post_id: data.id });
    }

    const hashtags = retrieveHashtagsFromPost(text);
    if (hashtags) await postHashtags(hashtags);

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
