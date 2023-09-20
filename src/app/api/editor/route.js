import prisma from "@/utils/connect";

import { NextResponse } from "next/server";

//GET ALL COMMENTS
export const GET = async () => {
  const POST_SHOWN = 5;
  const query = {
    take: POST_SHOWN,
    orderBy: {
      views: "desc",
    },
    where: {
      isFeatured: true,
    },
    include: { user: true },
  };
  try {
    const menuposts = await prisma.post.findMany(query);
    return new NextResponse(JSON.stringify(menuposts, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
