import { useQuery } from "@tanstack/react-query";

import getPost from "../api/get-post";
import { IPost } from "../types";

export const usePost = ({
  id,
  initialData,
}: {
  id: string;
  initialData?: IPost;
}) => {
  return useQuery<IPost>({
    queryKey: ["posts", id],
    queryFn: async () => {
      return getPost(id);
    },
    refetchOnWindowFocus: false,
    initialData: initialData ?? undefined,
  });
};
