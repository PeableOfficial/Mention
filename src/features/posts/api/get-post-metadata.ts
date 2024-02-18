"use server";

import { prisma } from "@/lib/prisma";

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

        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profile_image_url: true,
            screen_name: true,
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

        bookmarks: {
          select: {
            id: true,
            user_id: true,
          },
        },

        _count: {
          select: {
            reposts: true,
            quotes: true,
            bookmarks: true,
            likes: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};
