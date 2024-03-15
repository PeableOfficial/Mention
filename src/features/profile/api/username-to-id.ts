import { prisma } from "@/lib/prisma";

export const getUsernameToId = async ({ username }: { username: string }) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        username: username,
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
