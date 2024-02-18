"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

import { IPost } from "..";
import { getPosts } from "../api/get-posts";

interface IInfinitePosts {
  nextId: string;
  posts: IPost[];
}

export const usePosts = ({
  queryKey = ["posts"],
  type,
  id,
}: {
  queryKey?: string[];
  type?: string;
  id?: string;
}) => {
  return useInfiniteQuery<IInfinitePosts>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey,
    queryFn: ({ pageParam }) => {
      return getPosts({
        pageParam,
        limit: 20,
        type,
        id,
      });
    },
    initialPageParam: "",

    getNextPageParam: (lastPage) => {
      return lastPage?.nextId;
    },
    refetchOnWindowFocus: false,
  });
};
