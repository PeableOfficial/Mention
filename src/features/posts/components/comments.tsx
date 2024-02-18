import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { usePosts } from "../hooks/use-posts";

import { InfinitePosts } from "./infinite-posts";
import styles from "./styles/comments.module.scss";

export const Comments = ({ postId }: { postId: string }) => {
  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  } = usePosts({
    queryKey: ["posts", postId, "comments"],
    type: "comments",
    id: postId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      <InfinitePosts
        posts={comments}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isSuccess={isSuccess}
      />
    </div>
  );
};
