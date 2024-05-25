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
    // Fetch additional data for each user
    const response = await fetch(
      process.env.NEXT_PUBLIC_OXY_SERVICES_URL +
        `/api/users${id ? `?id=${id}` : ""}${limit ? `&limit=${limit}` : ""}`,
    );
    const data = await response.text();
    const parsedData: User[] = JSON.parse(data) as User[];

    const usersWithAdditionalData = await prisma.profile.findMany({
      where: {
        id: {
          in: parsedData.map((user) => user.id),
        },
      },
      select: {
        id: true,
        following: true,
        followers: true,
        color: true,
      },
      take: limit ? parseInt(limit) : undefined,
    });

    const mergedData = parsedData.map((user) => {
      const additionalData = usersWithAdditionalData.find(
        (userData) => userData.id === user.id,
      );
      return {
        ...user,
        ...additionalData,
      };
    });

    return NextResponse.json(mergedData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
