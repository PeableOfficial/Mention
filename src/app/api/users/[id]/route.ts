import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  [key: string]: any; // for any other properties that might be present
}

export async function GET(
  request: Request,
  context: {
    params: {
      id: string;
    };
  },
) {
  const { id } = context.params;

  const idSchema = z.string().cuid();
  const zod = idSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OXY_SERVICES_URL}/api/users/${id}`,
    );
    const parsedData = await response.json();
    const { id: fetchedId, name, username, email, avatar } = parsedData as User;

    const user = await prisma.profile.findUnique({
      where: {
        id: id,
      },
      select: {
        profile_banner_url: true,
        color: true,
        created_at: true,
        description: true,
        location: true,
        url: true,
        verified: true,
        followers: true,
        following: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        id,
        name,
        username,
        email,
        avatar,
        ...user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { user_id, description, location, url, profile_banner_url } =
    (await request.json()) as {
      user_id: string;
      description: string;
      location: string;
      url: string;
      profile_banner_url: string;
    };

  const userSchema = z
    .object({
      user_id: z.string().cuid(),
      description: z.string().max(160),
      location: z.string().max(30),
      url: z.string(),
      profile_banner_url: z.string(),
    })
    .strict();

  const zod = userSchema.safeParse({
    user_id,
    description,
    location,
    url,
    profile_banner_url,
  });

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    const user = await prisma.profile.update({
      where: {
        id: user_id,
      },
      data: {
        description,
        location,
        url,
        profile_banner_url,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
