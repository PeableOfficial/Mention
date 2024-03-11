import { prisma } from "@/lib/prisma";

export const getUsernameToId = async ({ username }: { username: string }) => {
  username = username.replace("@", "");

  try {
    const userData = await prisma.user.findUnique({
      where: {
        screen_name: username,
      },
      select: {
        id: true,
      },
    });

    return userData?.id || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
