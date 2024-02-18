import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useCreatePostModal } from "@/stores/use-create-post-modal";

import { postPost } from "../api/post-post";
import { IChosenImages } from "../types";

export const useCreatePost = ({
  setText,
  setChosenImages,
}: {
  setText: (text: string) => void;
  setChosenImages: (chosenImages: IChosenImages[]) => void;
}) => {
  const closeModal = useCreatePostModal((state) => state.closeModal);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      text,
      userId,
      files,
      in_reply_to_screen_name,
      in_reply_to_status_id,
      quoted_post_id,
    }: {
      text: string;
      userId: string;
      files: File[];
      in_reply_to_screen_name?: string | null;
      in_reply_to_status_id?: string | null;
      quoted_post_id?: string | null;
    }) => {
      return postPost({
        text,
        userId,
        files,
        in_reply_to_screen_name,
        in_reply_to_status_id,
        quoted_post_id,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["hashtags"] });
      toast(`Your post was sent`);
    },
    onError: (error) => {
      console.log("error", error);
      toast("Something went wrong");
    },
    onSettled: () => {
      closeModal();
      setText("");
      setChosenImages([]);
    },
  });
};
