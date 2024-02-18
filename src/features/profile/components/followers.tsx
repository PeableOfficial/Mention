"use client";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";

import { useGetFollows } from "../hooks/use-get-follows";
import { useUser } from "../hooks/use-user";

import { NoFollowers } from "./no-followers";

export const Followers = ({ id }: { id: string }) => {
  const {
    data: followers,
    isLoading,
    isError,
  } = useGetFollows({
    id,
    type: "followers",
  });
  const { data: user } = useUser({ id });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <div>
      {followers?.length === 0 ? (
        <NoFollowers
          title={`@${user?.screen_name} still doesn’t have any followers`}
          subtitle="When someone follows this account, they'll show up here. Posting
            and interacting with others helps boost followers."
        />
      ) : (
        <div>
          {followers?.map((user) => {
            return <PersonDetails key={user?.id} author={user} />;
          })}
        </div>
      )}
    </div>
  );
};
