import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleLike } from "../api/toggle-like";

export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      userId,
    }: {
      postId: string | undefined;
      userId: string;
    }) => {
      return toggleLike({ postId, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      console.log("error");
    },
  });
};
