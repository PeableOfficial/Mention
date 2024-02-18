"use client";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { InfinitePosts, usePosts } from "@/features/posts";
import { Trends } from "@/features/trends";

import styles from "./styles/explore.module.scss";

export const Explore = () => {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts({});

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.trends}>
        <Trends title={`Trends for you`} />
      </div>

      <div className={styles.scores}></div>

      <div className={styles.posts}>
        <InfinitePosts
          posts={posts}
          isSuccess={isSuccess}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};
