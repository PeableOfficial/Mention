import { Metadata } from "next";

import { PostHeader } from "@/features/header";
import { PostDetails, getPostMetadata } from "@/features/posts";

export async function generateMetadata({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const post = await getPostMetadata({
    post_id: params.id,
  });

  if (!post)
    return {
      title: "Post",
    };

  return {
    title: `${post?.author?.name} on Mention: "${decodeURIComponent(
      post?.text as string,
    )}"`,
    description: decodeURIComponent(post?.text as string),
  };
}

const PostPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const initialPost = await getPostMetadata({
    post_id: params.id,
  });

  return (
    <div>
      <PostHeader />
      <PostDetails initialPost={initialPost as any} />
    </div>
  );
};

export default PostPage;
