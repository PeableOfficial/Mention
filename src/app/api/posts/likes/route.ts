import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;

  const userIdSchema = z.string().cuid();
  const zod = userIdSchema.safeParse(user_id);

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
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            user_id,
          },
        },
      },

      include: {
        author: true,
        media: true,
        likes: true,
        reposts: true,
        comments: true,
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: error.errorCode || 500 },
    );
  }
}

export async function POST(request: Request) {
  const { post_id, user_id } = (await request.json()) as {
    post_id: string;
    user_id: string;
  };

  const likeSchema = z
    .object({
      post_id: z.string().cuid(),
      user_id: z.string().cuid(),
    })
    .strict();

  const zod = likeSchema.safeParse({ post_id, user_id });

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
        id: post_id,
      },
    });

    const like = await prisma.like.findFirst({
      where: {
        post_id,
        user_id,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });

      if (post && post.favorite_count > 0)
        await prisma.post.update({
          where: {
            id: post_id,
          },

          data: {
            favorite_count: {
              decrement: 1,
            },
          },
        });

      return NextResponse.json({ message: "Post unliked" });
    } else {
      await prisma.like.create({
        data: {
          post_id,
          user_id,
        },
      });

      if (post) {
        await prisma.post.update({
          where: {
            id: post_id,
          },

          data: {
            favorite_count: {
              increment: 1,
            },
          },
        });
      }

      return NextResponse.json({ message: "Post liked" });
    }
  } catch (error: any) {
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
