import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const post_id = searchParams.get("post_id");
  const type = searchParams.get("type");

  try {
    const authors = await prisma.user.findMany({
      where: {
        ...(type === "reposts" && {
          reposts: {
            some: {
              post_id: post_id as string,
            },
          },
        }),

        ...(type === "likes" && {
          likes: {
            some: {
              post_id: post_id as string,
            },
          },
        }),
      },
    });

    return Response.json(authors, {
      status: 200,
    });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      {
        status: 500,
      },
    );
  }
}
