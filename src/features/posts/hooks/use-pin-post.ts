import { useMutation, useQueryClient } from "@tanstack/react-query";

import { pinPost } from "../api/pin-post";
import { unpinPost } from "../api/unpin-post";

export const usePinPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      userId,
      action,
    }: {
      postId: string | undefined;
      userId: string;
      action: string;
    }) => {
      return action === "pin" ? pinPost(postId, userId) : unpinPost(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      console.log("error");
    },
  });
};
