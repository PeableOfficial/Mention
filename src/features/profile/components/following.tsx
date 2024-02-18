"use client";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { PersonDetails } from "@/features/connect";

import { useGetFollows } from "../hooks/use-get-follows";
import { useUser } from "../hooks/use-user";

import { NoFollowers } from "./no-followers";

export const Following = ({ id }: { id: string }) => {
  const {
    data: follows,
    isLoading,
    isError,
  } = useGetFollows({
    id,
    type: "following",
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
      {follows?.length === 0 ? (
        <NoFollowers
          title={`@${user?.screen_name} isn’t following anyone`}
          subtitle="Once they follow accounts, they’ll show up here."
        />
      ) : (
        <div>
          {follows?.map((user) => {
            return <PersonDetails key={user?.id} author={user} />;
          })}
        </div>
      )}
    </div>
  );
};
