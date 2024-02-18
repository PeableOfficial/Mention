import axios from "axios";

export const unpinPost = async (id: string | undefined) => {
  try {
    const { data } = await axios.put("/api/posts/pin", {
      id,
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    }
  }
};
