import axios from "axios";

export default async function getPost(id: string | undefined) {
  try {
    const { data } = await axios.get(`/api/posts/${id}`);
    return data;
  } catch (error: any) {
    console.error(error);
  }
}
