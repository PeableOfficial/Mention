"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { Connect } from "@/features/connect";
import { InfinitePosts, usePosts } from "@/features/posts";

import { PinnedPost } from "./pinned-post";
import styles from "./styles/profile-posts.module.scss";

export const ProfilePosts = ({ id }: { id: string }) => {
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts({
    queryKey: ["posts", id],
    type: "user_posts",
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
      {/* {isSuccess && posts?.length === 0 && (
        <div className={styles.noPosts}>
          {user?.id === session?.user?.id ? (
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

      <PinnedPost userId={id} />

      {/* {isSuccess && posts?.length > 0 && (
        <div className={styles.posts}>
          {posts?.map((post: IPost) => {
            return (
              <div className={styles.postContainer} key={post?.id}>
                <Post post={post} />
              </div>
            );
          })}
        </div>
      )} */}

      <InfinitePosts
        posts={posts}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isSuccess={isSuccess}
      />
      <Connect />
    </div>
  );
};
