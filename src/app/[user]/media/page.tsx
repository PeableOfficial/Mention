import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
import {
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
  const userId = await getUsernameToId({ username: params.user });
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
    title: `Media Posts by ${user?.name?.split(
      " ",
    )[0]} (@${user?.screen_name})`,
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
  const userId = await getUsernameToId({ username: params.user });

  const user = await getUserMetadata({
    user_id: userId,
    type: "media",
  });

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name}
          stats={`${user?._count?.posts} ${
            user?._count?.posts === 1 ? "Photo & video" : "Photos & videos"
          }`}
        />
      </Header>
      <Profile initialUser={user as any} />
      <ProfileMedia user={user} />
    </div>
  );
};

export default ProfileMediaPage;
