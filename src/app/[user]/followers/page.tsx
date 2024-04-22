import { Metadata } from "next";
import { profileParamsProcess } from "@/features/profile/utils/profile-params-process";

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
  const paramUsername = await profileParamsProcess({
    params: params.user,
    currentFolder: "followers",
  });
  const userId = await getUsernameToId({ username: paramUsername });

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
      <ProfileHeader userId={user?.id} stats={`@${user?.username}`} />
      <FollowsNavigation />
      <Followers id={user?.id as string} />
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
  const paramUsername = await profileParamsProcess({
    params: params.user,
    currentFolder: "followers",
  });
  const userId = await getUsernameToId({ username: paramUsername });

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
