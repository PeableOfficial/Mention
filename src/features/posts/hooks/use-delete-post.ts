import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { deletePost } from "../api/delete-post";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      if (pathname === `/status/${postId}`) {
        router.back();
      }
      return deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast("Your post was deleted");
    },
    onError: (error) => {
      console.log(error);
      toast("Something went wrong");
    },
  });
};
