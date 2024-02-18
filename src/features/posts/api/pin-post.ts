import axios from "axios";

export const pinPost = async (
  postId: string | undefined,
  userId: string | undefined,
) => {
  try {
    const { data } = await axios.post("/api/posts/pin", {
      post_id: postId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
