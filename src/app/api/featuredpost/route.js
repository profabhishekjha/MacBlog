import prisma from "@/utils/connect";

import { NextResponse } from "next/server";

//GET ALL COMMENTS
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const popular = searchParams.get("popular");

  try {
    const menuposts = await prisma.post.findMany();
    const featured = menuposts[menuposts.length - 1];
    return new NextResponse(JSON.stringify(featured, { status: 200 }));
  } catch (err) {
    console.log(err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
//Create a comment
