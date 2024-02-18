import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
import {
  getUsernameToId,
  Profile,
  ProfilePosts,
  getUserMetadata,
} from "@/features/profile";

import NotFound from "../not-found";

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
    type: "posts",
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `${user?.name?.split(" ")[0]} (@${user?.screen_name})`,
    description: user?.description,
  };
}

const ProfilePostsPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const userId = await getUsernameToId({ username: params.user });
  if (!userId) return <NotFound />;

  const user = await getUserMetadata({
    user_id: userId,
    type: "posts",
  });

  if (!user) return <NotFound />;

  return (
    <div>
      <Header>
        <ProfileHeader
          heading={user?.name}
          stats={`${user?._count?.posts} ${
            user?._count?.posts === 1 ? "post" : "posts"
          }`}
        />
      </Header>
      <Profile initialUser={user as any} />
      <ProfilePosts id={userId} />
    </div>
  );
};

export default ProfilePostsPage;
