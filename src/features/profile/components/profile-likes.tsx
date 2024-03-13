"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { InfinitePosts, usePosts } from "@/features/posts";

import styles from "./styles/profile-likes.module.scss";

export const ProfileLikes = ({ id }: { id: string }) => {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts({
    queryKey: ["posts", id, "likes"],
    type: "user_likes",
    id,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <TryAgain />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* {isSuccess && likes?.length === 0 && (
        <div className={styles.noLikes}>
          {session?.user?.id === id ? (
            <div>
              <h1>You don&apos;t have any likes yet</h1>
              <p>
                <span>Tap the heart on any post to show it some love.</span>{" "}
                <span>When you do, it&apos;ll show up here.</span>
              </p>
            </div>
          ) : (
            <div>
              <h1>
                @{user?.username} hasn&apos;t liked any posts
              </h1>
              <p>
                <span>When they do, those Posts will show up here.</span>
              </p>
            </div>
          )}
        </div>
      )} */}

      <InfinitePosts
        posts={posts}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isSuccess={isSuccess}
      />
    </div>
  );
};
