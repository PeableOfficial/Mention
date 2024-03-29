import { Metadata } from "next";
import { profileParamsProcess } from "@/features/profile/utils/profile-params-process";

import { ProfileHeader } from "@/features/header";
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
  const paramUsername = await profileParamsProcess({
    params: params.user,
    currentFolder: "with-replies",
  });
  const userId = await getUsernameToId({ username: paramUsername });
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
    title: `Posts with replies by ${
      user?.name?.split(" ")[0]
    } (@${user?.username})`,
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
  const paramUsername = await profileParamsProcess({
    params: params.user,
    currentFolder: "with-replies",
  });
  const userId = await getUsernameToId({ username: paramUsername });
  if (!userId) {
    return null; // Add this line to handle null userId
  }
  const user = await getUserMetadata({
    user_id: userId,
    type: "posts",
  });

  return (
    <div>
      <ProfileHeader
        userId={user?.id}
        stats={`${user?._count?.posts} ${
          user?._count?.posts === 1 ? "post" : "posts"
        }`}
      />
      <Profile initialUser={user as any} />
      {user?.id && <ProfilePostsAndReplies id={user.id} />}
    </div>
  );
};

export default ProfilePostsWithRepliesPage;
