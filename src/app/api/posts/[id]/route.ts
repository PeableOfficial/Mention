import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const { id } = params;

  const postIdSchema = z.string().cuid();

  const zod = postIdSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        error: zod.error.formErrors,
      },
      { status: 400 },
    );
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
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
            username: true,
          },
        },

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

    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error,
      },
      { status: 500 },
    );
  }
}
