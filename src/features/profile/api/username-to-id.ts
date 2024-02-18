"use server";

import { prisma } from "@/lib/prisma";

export const getUsernameToId = async ({ username }: { username: string }) => {
  //remove @ from username string
  username = username.replace("@", "");

  try {
    const user = await prisma.user.findUnique({
      where: {
        screen_name: username,
      },
    });

    return user?.id || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
