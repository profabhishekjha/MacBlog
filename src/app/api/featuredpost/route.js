import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET LAST FEATURED POST
export const GET = async (req) => {
  try {
    // Fetch all posts
    const menuposts = await prisma.post.findMany();

    // Find the last post where isFeatured is true
    const featured = menuposts
      .reverse()
      .find((post) => post.isFeatured === true);

    if (featured) {
      return new NextResponse(JSON.stringify(featured, { status: 200 }));
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No featured post found!" }, { status: 404 })
      );
    }
  } catch (err) {
    console.error(err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
