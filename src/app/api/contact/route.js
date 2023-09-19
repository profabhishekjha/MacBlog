import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { mailOptions, transporter } from "../../../mail"; // Import your email transporter

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const body = await req.json();
    await prisma.contactSubmission.create({
      data: { ...body },
    });

    transporter.sendMail({
      ...mailOptions,
      subject: "Someone Contacted from MacBlogs",
      text: `You have a new contact form submission from ${body.name} (${body.email}):\n\n${body.message}`,
    });

    return new NextResponse(JSON.stringify({ status: 200 }));
  } catch (err) {
    console.log(err.message);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
