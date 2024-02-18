import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
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
  const userId = await getUsernameToId({ username: params.user });
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
    title: `Posts liked by ${user?.name?.split(
      " ",
    )[0]} (@${user?.screen_name})`,
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
  const userId = await getUsernameToId({ username: params.user });
  if (!userId)
    return (
      <>
        <Header>
          <ProfileHeader heading="Profile" stats="" />
        </Header>
      </>
    );
  const user = await getUserMetadata({
    user_id: userId,
    type: "likes",
  });

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name}
          stats={`${user?._count?.likes} ${
            user?._count?.likes === 1 ? "like" : "likes"
          }`}
        />
      </Header>
      <Profile initialUser={user as any} />
      {user?.id && <ProfileLikes id={user.id} />}
    </div>
  );
};

export default ProfileLikesPage;
