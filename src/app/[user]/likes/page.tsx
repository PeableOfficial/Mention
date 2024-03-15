import { Metadata } from "next";
import { profileParamsProcess } from "@/features/profile/utils/profile-params-process";

import { ProfileHeader } from "@/features/header";
import {
  getUsernameToId,
  Profile,
  ProfileLikes,
  getUserMetadata,
} from "@/features/profile";

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const userId = await getUsernameToId({
    username: params.user,
  });
  if (!userId)
    return {
      title: "User not found",
    };

  const user = await getUserMetadata({
    user_id: userId,
    type: "likes",
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `Posts liked by ${user?.name?.split(" ")[0]} (@${user?.username})`,
    description: user?.description,
  };
}

const ProfileLikesPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const paramUsername = await profileParamsProcess({
    params: params.user,
    currentFolder: "likes",
  });
  const userId = await getUsernameToId({ username: paramUsername });
  if (!userId)
    return (
      <>
        <ProfileHeader heading="Profile" stats="" />
      </>
    );
  const user = await getUserMetadata({
    user_id: userId,
    type: "likes",
  });

  return (
    <div>
      <ProfileHeader
        userId={user?.id}
        stats={`${user?._count?.likes} ${
          user?._count?.likes === 1 ? "like" : "likes"
        }`}
      />
      <Profile initialUser={user as any} />
      {user?.id && <ProfileLikes id={user.id} />}
    </div>
  );
};

export default ProfileLikesPage;
