"use server";

import { prisma } from "@/lib/prisma";

// Placeholder for your actual API call
async function getAuthorFromAPI(author_id: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_OXY_SERVICES_URL + `/api/users/${author_id}`,
  );
  const data = await response.json();
  return data;
}

export const getPostMetadata = async ({ post_id }: { post_id: string }) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },

      select: {
        id: true,
        text: true,
        author_id: true,
        created_at: true,

        media: true,

        quoted_post: {
          include: {
            author: true,
            media: true,
          },
        },

        reposts: {
          select: {
            user_id: true,
          },
        },

        likes: {
          select: {
            user_id: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const author = await getAuthorFromAPI(post.author_id);

    return {
      ...post,
      author,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
