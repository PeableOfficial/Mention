import { useOxySession } from "@oxyhq/services";
import { useRouter } from "next/navigation";

import { CommentIcon } from "@/assets/comment-icon";
import { PinIcon } from "@/assets/pin-icon";
import { TrashIcon } from "@/assets/trash-icon";
import { MenuItem } from "@/components/elements/menu";
import { useUser } from "@/features/profile";

import { EditIcon } from "../../assets/edit-icon";
import { EmbedIcon } from "../../assets/embed-icon";
import { usePinPost } from "../../hooks/use-pin-post";
import { IPost } from "../../types";

import styles from "./styles/post-options.module.scss";

export const PostOwnerMenu = ({
  post,
  setIsMenuOpen,
  setIsDeleteModalOpen,
}: {
  post: IPost;
  setIsMenuOpen: (value: boolean) => void;
  setIsDeleteModalOpen: (value: boolean) => void;
}) => {
  const { session } = useOxySession();
  const { data: user } = useUser({ id: session?.user?.id });
  const pinMutation = usePinPost();
  const router = useRouter();

  return (
    <>
      <MenuItem
        onClick={() => {
          setIsMenuOpen(false);
          setIsDeleteModalOpen(true);
        }}
      >
        <div className={styles.delete}>
          <TrashIcon /> Delete
        </div>
      </MenuItem>

      {post?.id === user?.pinned_post?.id ? (
        <MenuItem
          onClick={() => {
            pinMutation.mutate({
              postId: post.id,
              userId: session?.user?.id as string,
              action: "unpin",
            });
            setIsMenuOpen(false);
          }}
        >
          <PinIcon /> Unpin
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            pinMutation.mutate({
              postId: post.id,
              userId: session?.user?.id as string,
              action: "pin",
            });
            setIsMenuOpen(false);
          }}
        >
          <PinIcon /> Pin to your profile
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <CommentIcon /> Change who can reply
      </MenuItem>

      <MenuItem
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <EmbedIcon /> Embed Post
      </MenuItem>

      <MenuItem
        onClick={() => {
          setIsMenuOpen(false);
          router.push("/pro");
        }}
      >
        <EditIcon /> Edit with Pro
      </MenuItem>
    </>
  );
};
