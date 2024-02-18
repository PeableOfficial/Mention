import axios from "axios";

export const handleRepost = async (postId: string, userId: string) => {
  try {
    const { data } = await axios.post(`/api/posts/reposts`, {
      post_id: postId,
      user_id: userId,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
