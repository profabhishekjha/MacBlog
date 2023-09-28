import { getAuthSessions } from "@/utils/auth";
import prisma from "@/utils/connect";

import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 4;
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    // Execute the findMany query
    const posts = await prisma.post.findMany(query);

    // Reverse the array
    const reversedPosts = posts.reverse();
    // Count query remains the same
    const count = await prisma.post.count({ where: query.where });

    return new NextResponse(
      JSON.stringify({ posts: reversedPosts, count }, { status: 200 })
    );
  } catch (err) {
    console.error(err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

//CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSessions(); // verifying user
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
    );
  }
  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
