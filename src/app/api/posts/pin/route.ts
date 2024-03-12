import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id") || undefined;

  const userSchema = z.string().nonempty();
  const zod = userSchema.safeParse(user_id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error }, { status: 400 });
  }

  try {
    const user = await prisma.user
      .findUnique({
        where: {
          id: user_id,
        },
      })
      .pinned_post({
        include: {
          author: true,
          media: true,
          likes: true,
          reposts: true,
          comments: true,
          quoted_post: {
            include: {
              author: true,
              media: true,
            },
          },
        },
      });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { post_id, user_id } = (await request.json()) as {
    post_id: string;
    user_id: string;
  };

  const userSchema = z
    .object({
      post_id: z.string(),
      user_id: z.string(),
    })
    .strict();

  const zod = userSchema.safeParse({ post_id, user_id });

  if (!zod.success) {
    return NextResponse.json({ error: zod.error }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        id: user_id,
      },

      data: {
        pinned_post_id: post_id,
      },
    });

    return NextResponse.json({ message: "Post pinned" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id } = (await request.json()) as { id: string };

  const userSchema = z.string();

  const zod = userSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json({ error: zod.error }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },

      data: {
        pinned_post_id: null,
      },
    });

    return NextResponse.json(
      { message: "Post unpinned", user },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
