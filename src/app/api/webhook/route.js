import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = req.body;

    const { event, payload } = body;

    // Handle different Razorpay webhook events
    switch (event) {
      case "payment.authorized":
        // Payment is authorized, handle the event as needed
        console.log("Payment Authorized:", payload);
        break;
      case "payment.captured":
        // Payment is captured, update the payment status in the database
        const donationId = payload.order.entity.notes.donationId; // Assuming you have donationId stored in Razorpay order notes
        await prisma.donation.update({
          where: { id: donationId },
          data: { status: "Success" }, // Update status to "Paid"
        });
        console.log("Payment Captured:", payload);
        break;
      default:
        // Handle other events if needed
        console.log("Unhandled Event:", event);
    }

    return new NextResponse("Webhook Received", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
