import { useQuery } from "@tanstack/react-query";

import { IPost } from "@/features/posts";

import { getPinnedPost } from "../api/get-pinned-post";

export const usePinnedPost = (id: string | undefined) => {
  return useQuery<IPost>({
    queryKey: ["posts", { userId: id }, `pinned`],
    queryFn: async () => {
      return getPinnedPost(id);
    },
    refetchOnWindowFocus: false,
  });
};
