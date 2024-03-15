import { Metadata } from "next";
import { profileParamsProcess } from "@/features/profile/utils/profile-params-process";

import { ProfileHeader } from "@/features/header";
import {
  IUser,
  getUsernameToId,
  Profile,
  ProfileMedia,
  getUserMetadata,
} from "@/features/profile";

export async function generateMetadata({
  params,
}: {
  params: {
    user: string;
  };
}): Promise<Metadata> {
  const paramUsername = await profileParamsProcess({
    params: params.user,
    currentFolder: "media",
  });
  const userId = await getUsernameToId({ username: paramUsername });
  if (!userId) return { title: "User not found" };

  const user = await getUserMetadata({
    user_id: userId,
    type: "media",
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `Media Posts by ${user?.name?.split(" ")[0]} (@${user?.username})`,
    description: user?.description,
  };
}

const ProfileMediaPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const paramUsername = await profileParamsProcess({
    params: params.user,
    currentFolder: "media",
  });
  const userId = await getUsernameToId({ username: paramUsername });
  if (!userId) return null;

  const user = await getUserMetadata({
    user_id: userId,
    type: "media",
  });

  if (!user) return null;

  return (
    <div>
      <ProfileHeader
        userId={user?.id}
        stats={`${user?._count?.posts} ${
          user?._count?.posts === 1 ? "Photo & video" : "Photos & videos"
        }`}
      />
      <Profile initialUser={user as any} />
      <ProfileMedia user={user as unknown as IUser} />
    </div>
  );
};

export default ProfileMediaPage;
