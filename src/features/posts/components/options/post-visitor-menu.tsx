import { useOxySession } from "@oxyhq/services";

import { ReportIcon } from "@/assets/report-icon";
import { SadFaceIcon } from "@/assets/sad-face-icon";
import { MenuItem } from "@/components/elements/menu";

import { BlockIcon } from "../../assets/block-icon";
import { EmbedIcon } from "../../assets/embed-icon";
import { UnfollowIcon } from "../../assets/follow-icon";
import { MuteIcon } from "../../assets/mute-icon";
import { IPost } from "../../types";

export const PostVisitorMenu = ({
  post,
  setIsMenuOpen,
}: {
  post: IPost;
  setIsMenuOpen: (value: boolean) => void;
}) => {
  const { session } = useOxySession();

  return (
    <>
      <MenuItem
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <SadFaceIcon /> Not interested in this Post
      </MenuItem>

      {session && (
        <MenuItem
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <UnfollowIcon /> Unfollow @{post?.author?.username}
        </MenuItem>
      )}

      {session && (
        <MenuItem
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <MuteIcon /> Mute @{post?.author?.username}
        </MenuItem>
      )}

      {session && (
        <MenuItem
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <BlockIcon /> Block @{post?.author?.username}
        </MenuItem>
      )}

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
        }}
      >
        <ReportIcon /> Report Post
      </MenuItem>
    </>
  );
};
