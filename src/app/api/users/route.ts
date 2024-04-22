import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || undefined;
  const limit = searchParams.get("limit") || undefined;
  const idSchema = z.string().cuid().optional();

  const zod = idSchema.safeParse(id);

  if (!zod.success) {
    return NextResponse.json(zod.error, { status: 400 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id,
        },
      },

      orderBy: {
        created_at: "desc",
      },

      select: {
        id: true,
        profile_image_url: true,
        following: true,
        followers: true,
        color: true,
      },

      take: limit ? parseInt(limit) : undefined,
    });

    // Fetch additional data for each user
    const usersWithAdditionalData = await Promise.all(
      users.map(async (user) => {
        const response = await fetch(
          `http://localhost:3001/api/users/${user.id}`,
          {
            credentials: "include",
          },
        );
        const data = await response.text();
        const parsedData = JSON.parse(data) || {};
        const { id: fetchedId, name, username, email } = parsedData;

        // Merge the fetched data with the existing user data
        return { ...user, id: fetchedId, name, username, email };
      }),
    );

    return NextResponse.json(usersWithAdditionalData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
