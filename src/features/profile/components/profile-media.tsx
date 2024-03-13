"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { InfinitePosts, usePosts } from "@/features/posts";
import { IUser } from "@/features/profile";

import styles from "./styles/profile-media.module.scss";

export const ProfileMedia = ({ user }: { user: IUser }) => {
  const id = user.id;

  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts({
    queryKey: ["posts", id, "media"],
    type: "user_media",
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
        <div className={styles.noMedia}>
          {session?.user?.id === id ? (
            <div>
              <Image
                src="/media-placeholder.png"
                alt=""
                height={500}
                width={500}
              />
              <h1>Lights, camera ... attachments!</h1>
              <p>
                When you send posts with photos or videos in them, they will
                show up here.
              </p>
            </div>
          ) : (
            <div>
              <Image
                src="/media-placeholder.png"
                alt=""
                width={500}
                height={500}
              />
              <h1>@{user?.username} hasn&apos;t posted media</h1>
              <p>Once they do, those Posts will show up here.</p>
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
