import axios from "axios";

export const getPinnedPost = async (id: string | undefined) => {
  try {
    const response = await axios.get(`/api/posts/pin?user_id=${id}`);
    const pinnedPost = response.data;
    return pinnedPost;
  } catch (error: any) {
    return error.message;
  }
};
