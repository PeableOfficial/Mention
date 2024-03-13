import { Metadata } from "next";

import { UserNotFound } from "@/components/elements/user-not-found";
import { Header, ProfileHeader } from "@/features/header";
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
        <Header>
          <ProfileHeader heading="Profile" stats="" />
        </Header>
        <UserNotFound />
      </>
    );

  const user = await getUserMetadata({
    user_id: userId,
  });

  if (!user)
    return (
      <>
        <Header>
          <ProfileHeader heading="Profile" stats="" />
        </Header>
        <UserNotFound />
      </>
    );

  return (
    <div>
      <Header>
        <ProfileHeader heading={user?.name} stats={`@${user?.username}`} />
      </Header>
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
    title: `People following ${user?.name?.split(
      " ",
    )[0]} (@${user?.username})`,
    description: user?.description,
  };
}
