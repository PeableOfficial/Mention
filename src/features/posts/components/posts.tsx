"use client";
import { useSession } from "next-auth/react";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";

import { Connect } from "@/features/connect";

import { usePosts } from "../hooks/use-posts";

import { InfinitePosts } from "./infinite-posts";

export const Posts = () => {
  const { data: session } = useSession();
  const {
    data: posts,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts({
    queryKey: ["default", session?.user?.id],
    type: "default",
    id: session?.user?.id,
  });

  if (!isLoading && !isError && !posts?.pages?.[0]?.posts?.length) {
    return <Connect />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <InfinitePosts
      posts={posts}
      isSuccess={isSuccess}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};
