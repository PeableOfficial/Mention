import { Post } from "@/features/posts";

import { usePinnedPost } from "../hooks/use-pinned-post";

export const PinnedPost = ({ userId }: { userId: string | undefined }) => {
  const { data: pinnedPost } = usePinnedPost(userId);

  if (!pinnedPost) return null;

  return (
    <div
      style={{
        borderBottom: "1px solid var(--clr-border)",
      }}
    >
      <Post post={pinnedPost} pinned={true} />
    </div>
  );
};
