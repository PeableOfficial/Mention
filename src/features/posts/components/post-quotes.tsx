"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { IPost } from "..";

import { Post } from "./post";
import styles from "./styles/post-quotes.module.scss";

export const PostQuotes = () => {
  const pathname = usePathname();
  const postId = pathname?.split(`/`)[2] || ``;

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<IPost[]>({
    queryKey: ["posts", postId, "quotes"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/posts/quotes?post_id=${postId}`);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div className={styles.container}>
      {posts?.map((quote) => {
        return (
          <div key={quote?.id} className={styles.quote}>
            <Post post={quote} />
          </div>
        );
      })}
    </div>
  );
};
