import axios from "axios";

export const AddToBookmarks = async ({
  postId,
  userId,
}: {
  postId: string | undefined;
  userId: string | undefined;
}) => {
  try {
    const { data } = await axios.post(`/api/bookmarks`, {
      post_id: postId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    return error.message;
  }
};
