import axios from "axios";
export const toggleLike = async ({
  postId,
  userId,
}: {
  postId: string | undefined;
  userId: string | undefined;
}) => {
  try {
    const response = await axios.post("/api/posts/likes", {
      post_id: postId,
      user_id: userId,
    });
    const data = response.data;
    return data;
  } catch (error: any) {
    return error.message;
  }
};
