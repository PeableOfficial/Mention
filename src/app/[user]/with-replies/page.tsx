import { Metadata } from "next";

import { Header, ProfileHeader } from "@/features/header";
import {
  getUsernameToId,
  Profile,
  ProfilePostsAndReplies,
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
    type: "posts",
  });

  if (!user)
    return {
      title: "User not found",
    };

  return {
    title: `Posts with replies by ${user?.name?.split(
      " ",
    )[0]} (@${user?.username})`,
    description: user?.description,
  };
}

const ProfilePostsWithRepliesPage = async ({
  params,
}: {
  params: {
    user: string;
  };
}) => {
  const userId = await getUsernameToId({ username: params.user });
  if (!userId) {
    return null; // Add this line to handle null userId
  }
  const user = await getUserMetadata({
    user_id: userId,
    type: "posts",
  });

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
      {user?.id && <ProfilePostsAndReplies id={user.id} />}
    </div>
  );
};

export default ProfilePostsWithRepliesPage;
