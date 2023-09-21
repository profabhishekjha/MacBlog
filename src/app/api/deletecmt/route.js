import { getAuthSessions } from "@/utils/auth";
import prisma from "@/utils/connect";

import { NextResponse } from "next/server";

export const POST = async (req) => {
  const session = await getAuthSessions(); // verifying user
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
    );
  }

  try {
    const { commentId } = await req.json();

    // Check if the comment exists and if the user is authorized to delete it
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }, // Use the id field as the identifier
      select: { userEmail: true },
    });

    if (!comment) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found" }, { status: 404 })
      );
    }

    if (comment.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }, { status: 401 })
      );
    }

    // Perform the comment deletion
    await prisma.comment.delete({
      where: { id: commentId }, // Use the id field as the identifier
    });
    return new NextResponse(
      JSON.stringify(
        { message: "Comment deleted successfully" },
        { status: 200 }
      )
    );
  } catch (err) {
    console.error(err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
