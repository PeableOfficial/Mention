import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { post_id, user_id } = (await request.json()) as {
    post_id: string;
    user_id: string;
  };

  const repostSchema = z
    .object({
      post_id: z.string().cuid(),
      user_id: z.string().cuid(),
    })
    .strict();

  const zod = repostSchema.safeParse({ post_id, user_id });

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
    const repost = await prisma.repost.findFirst({
      where: {
        post_id,
        user_id,
      },
    });

    if (repost) {
      await prisma.repost.delete({
        where: {
          id: repost.id,
        },
      });
      return NextResponse.json({ message: "Post un reposted" });
    } else {
      await prisma.repost.create({
        data: {
          post_id,
          user_id,
        },
      });
      return NextResponse.json({ message: "Post reposted" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
