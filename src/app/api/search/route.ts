import { NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") as string;

  const querySchema = z.string().min(1);
  const zod = querySchema.safeParse(query);

  if (!zod.success) {
    return NextResponse.json(zod.error.formErrors, { status: 400 });
  }

  try {
    const { data: people } = await axios.get(
      process.env.NEXT_PUBLIC_OXY_SERVICES_URL +
        `/api/search/people?query=${query}`,
    );

    const hashtags = await prisma.hashtag.findMany({
      where: {
        text: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({ hashtags, people }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
