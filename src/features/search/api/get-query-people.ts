import axios from "axios";

export const getQueryPeople = async (query: string | undefined) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_PEABLE_SERVICES_URL +
        `/api/search/people?query=${query}`,
    );
    return data;
  } catch (error: any) {
    return error.Message;
  }
};
