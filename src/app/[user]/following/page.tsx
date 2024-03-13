import { Metadata } from "next";

import { UserNotFound } from "@/components/elements/user-not-found";
import { ProfileHeader } from "@/features/header";
import {
  getUsernameToId,
  Following,
  FollowsNavigation,
  getUserMetadata,
} from "@/features/profile";

const FollowingPage = async ({
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
      <Following id={user?.id} />
    </div>
  );
};

export default FollowingPage;

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const user = await getUserMetadata({
    user_id: params.user,
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `People followed by ${
      user?.name?.split(" ")[0]
    } (@${user?.username})`,
    description: user?.description,
  };
}
