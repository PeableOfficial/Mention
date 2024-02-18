"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Connect } from "@/features/connect";
import { InfinitePosts, usePosts } from "@/features/posts";

import { PinnedPost } from "./pinned-post";
import styles from "./styles/profile-posts-and-replies.module.scss";

export const ProfilePostsAndReplies = ({ id }: { id: string }) => {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts({
    queryKey: ["posts", id, "replies"],
    type: "user_replies",
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
      <PinnedPost userId={id} />

      {/* {isSuccess && posts?.length === 0 && (
        <div className={styles.noPosts}>
          {posts[0]?.author?.id === session?.user?.id ? (
            <div>
              <h1>You haven&apos;t posted anything yet.</h1>
              <p>When you do, it&apos;ll show up here.</p>
            </div>
          ) : (
            <div>
              <h1>
                @{user?.screen_name} hasn&apos;t posted anything yet.
              </h1>
              <p>When they do, it&apos;ll show up here.</p>
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

      <Connect />
    </div>
  );
};
