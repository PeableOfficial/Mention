"use server";

import { prisma } from "@/lib/prisma";

import axios from "axios";

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
    const response = await axios.get(
      process.env.NEXT_PUBLIC_OXY_SERVICES_URL + `/api/users/${user_id}`,
    );
    const {
      id: fetchedId,
      name,
      username,
      email,
    } = response.data as UserResponse;
    const user = await prisma.profile.findUnique({
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
      id: fetchedId,
      name,
      username,
      email,
      ...user,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
