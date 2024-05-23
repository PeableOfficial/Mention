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
      process.env.NEXT_PUBLIC_PEABLE_SERVICES_URL + `/api/users/${id}`,
      {
        credentials: "include",
      },
    );
    const data = await response.text();

    const parsedData: User = JSON.parse(data) as User;
    const { id: fetchedId, name, username, email } = parsedData;
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
        ...user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const {
    user_id,
    username,
    name,
    description,
    location,
    url,
    profile_banner_url,
    profile_image_url,
  } = (await request.json()) as {
    user_id: string;
    username: string;
    name: string;
    description: string;
    location: string;
    url: string;
    profile_banner_url: string;
    profile_image_url: string;
  };

  const userSchema = z
    .object({
      user_id: z.string().cuid(),
      username: z.string().min(1).max(30),
      name: z.string().min(1).max(50),
      description: z.string().max(160),
      location: z.string().max(30),
      url: z.string(),
      profile_banner_url: z.string(),
      profile_image_url: z.string(),
    })
    .strict();

  const zod = userSchema.safeParse({
    user_id,
    username,
    name,
    description,
    location,
    url,
    profile_banner_url,
    profile_image_url,
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
