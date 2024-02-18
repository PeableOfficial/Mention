"use client";
import { useSearchParams } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";
import { InfinitePosts, usePosts } from "@/features/posts";

import { useSearchPeople } from "../hooks/use-search-people";

import { NoResults } from "./no-results";
import styles from "./styles/search-results.module.scss";

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams?.get("query") || "");

  const posts = usePosts({
    queryKey: ["posts", "query: ", query],
    type: "search",
    id: query,
  });

  const people = useSearchPeople(query);

  if (posts.isPending || posts.isFetching) return <LoadingSpinner />;

  if (posts.isError) return <TryAgain />;

  return (
    <div className={styles.container}>
      {posts?.data?.pages &&
      posts?.data?.pages[0]?.posts?.length === 0 &&
      people?.data?.length === 0 ? (
        <NoResults query={query} />
      ) : (
        <div className={styles.results}>
          {people?.isSuccess && people?.data?.length > 0 && (
            <div className={styles.people}>
              <h1>People</h1>
              {people?.data?.map((person) => {
                return <PersonDetails key={person?.id} author={person} />;
              })}
              <button className={styles.viewAll}>View All</button>
            </div>
          )}

          <div className={styles.posts}>
            <InfinitePosts
              posts={posts?.data}
              hasNextPage={posts?.hasNextPage}
              fetchNextPage={posts?.fetchNextPage}
              isSuccess={posts?.isSuccess}
              isFetchingNextPage={posts?.isFetchingNextPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
