"use server";

import { prisma } from "@/lib/prisma";

interface UserResponse {
  id: string;
  name: string;
  username: string;
  email: string;
}

export const getUserMetadata = async ({
  user_id,
  type,
}: {
  user_id: string;
  type?: string;
}) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_PEABLE_SERVICES_URL + `/api/users/${user_id}`,
      {
        credentials: "include",
      },
    );
    const data = await response.text();
    const parsedData = JSON.parse(data) as UserResponse;
    const { id: fetchedId, name, username, email } = parsedData;
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },

      include: {
        ...(type === "posts" && {
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true,
            },
          },
        }),

        ...(type === "likes" && {
          _count: {
            select: {
              likes: true,
              followers: true,
              following: true,
            },
          },
        }),

        ...(type === "media" && {
          _count: {
            select: {
              posts: {
                where: {
                  media: {
                    some: {},
                  },
                },
              },
            },
          },
        }),
      },
    });

    return {
      ...user,
      fetchedId,
      name,
      username,
      email,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
