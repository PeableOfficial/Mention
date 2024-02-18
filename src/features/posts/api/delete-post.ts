import axios from "axios";

export const deletePost = async (postId: string) => {
  try {
    const { data } = await axios.delete(`/api/posts?id=${postId}`);

    return data;
  } catch (error: any) {
    console.log(error);
  }
};
