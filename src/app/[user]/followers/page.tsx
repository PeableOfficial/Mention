import { Metadata } from "next";

import { UserNotFound } from "@/components/elements/user-not-found";
import { ProfileHeader } from "@/features/header";
import {
  getUsernameToId,
  Followers,
  FollowsNavigation,
  getUserMetadata,
} from "@/features/profile";

const FollowersPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const userId = await getUsernameToId({ username: params.user });

  if (!userId)
    return (
      <>
        <ProfileHeader heading="Profile" stats="" />
        <UserNotFound />
      </>
    );

  const user = await getUserMetadata({
    user_id: userId,
  });

  if (!user)
    return (
      <>
        <ProfileHeader heading="Profile" stats="" />
        <UserNotFound />
      </>
    );

  return (
    <div>
      <ProfileHeader heading={user?.name} stats={`@${user?.username}`} />
      <FollowsNavigation />
      <Followers id={user?.id} />
    </div>
  );
};

export default FollowersPage;

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const userId = await getUsernameToId({ username: params.user });

  if (!userId)
    return {
      title: "User not found",
    };

  const user = await getUserMetadata({
    user_id: userId,
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `People following ${user?.name?.split(" ")[0]} (@${user?.username})`,
    description: user?.description,
  };
}
