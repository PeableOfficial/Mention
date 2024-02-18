import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleRepost } from "../api/handle-repost";

export const useRepost = (setIsModalOpen: (isModalOpen: boolean) => void) => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => {
      return handleRepost(postId, userId);
    },

    onMutate: () => {
      setIsModalOpen(false);
    },

    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (error: any) => {
      console.log(error);
    },

    onSettled: () => {},
  });
};
