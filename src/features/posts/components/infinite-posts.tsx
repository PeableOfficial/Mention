"use client";
import { useInView } from "react-intersection-observer";

import { LoadingSpinner } from "@/components/elements/loading-spinner";

import { IInfinitePosts } from "../types";

import { Post } from "./post";
import styles from "./styles/infinite-posts.module.scss";

export const InfinitePosts = ({
  posts,
  isSuccess,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: {
  posts: IInfinitePosts | undefined;
  isSuccess: boolean | undefined;
  isFetchingNextPage: boolean | undefined;
  fetchNextPage: () => Promise<any> | void;
  hasNextPage: boolean | undefined;
}) => {
  const { ref } = useInView({
    onChange: (inView) => {
      inView && hasNextPage && fetchNextPage();
    },
  });

  return (
    <div className={styles.container}>
      {isSuccess &&
        posts?.pages?.map((page) => {
          return page?.posts?.map((post, index) =>
            index === page.posts.length - 1 ? (
              <div ref={ref} className={styles.postContainer} key={post.id}>
                <Post post={post} />
              </div>
            ) : (
              <div className={styles.postContainer} key={post.id}>
                <Post post={post} />
              </div>
            ),
          );
        })}

      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};
