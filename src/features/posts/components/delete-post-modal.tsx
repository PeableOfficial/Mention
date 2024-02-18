import { ConfirmationModal } from "@/components/elements/modal";

import { deleteMedia } from "../api/delete-media";
import { useDeletePost } from "../hooks/use-delete-post";
import { IPost } from "../types";

export const DeletePostModal = ({
  post,
  setIsDeleteModalOpen,
  setIsMenuOpen,
}: {
  post: IPost;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsMenuOpen: (value: boolean) => void;
}) => {
  const mutation = useDeletePost();

  return (
    <ConfirmationModal
      heading="Delete Post?"
      paragraph="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Mention search results."
      confirmButtonText="Delete"
      confirmButtonClick={() => {
        mutation.mutate({
          postId: post?.id,
        });
        setIsDeleteModalOpen(false);
        if (post?.media?.length)
          deleteMedia(post?.media?.map((m) => m.media_path));
      }}
      confirmButtonStyle="delete"
      cancelButtonText="Cancel"
      cancelButtonClick={() => {
        setIsDeleteModalOpen(false);
        setIsMenuOpen(true);
      }}
    />
  );
};
