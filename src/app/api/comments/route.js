import { getAuthSessions } from "@/utils/auth";
import prisma from "@/utils/connect";

import { NextResponse } from "next/server";

//GET ALL COMMENTS
export const GET = async (req) => {
const {searchParams}=new URL(req.url)
console.log("COMMENTS",searchParams);
const postSlug=searchParams.get("postSlug")
console.log("PostSlug in comments",postSlug);

    try{
        const comments=await prisma.comment.findMany({
            where:{
                ...(postSlug && {postSlug})
            },
            include:{user:true},
        })
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
    }catch (err) {
    console.log(err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}; 
//Create a comment
export const POST = async (req) => {
  const session=await getAuthSessions() // verifying user
if(!session){
  return new NextResponse(
    JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
  );
}
      try{
        const body=await req.json()
          const comment=await prisma.comment.create({
            data:{...body,userEmail:session.user.email}
          })
      return new NextResponse(JSON.stringify(comment, { status: 200 }));
      }catch (err) {
      console.log(err.message);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  }; 