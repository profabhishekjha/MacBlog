import crypto from "crypto";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { event, payload } = body;

    // Your Razorpay key secret
    const razorpayKeySecret = "oBtdfiQn3POvk0BtxYCUC6FY";

    // Verify the Razorpay signature
    const generatedsignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(payload.payment.entity.order_id + "|" + payload.payment.entity.id)
      .digest("hex");

    const isValid = razorpay.validateWebhookSignature(
      reqBody,
      signature,
      razorpayKeySecret
    );

    if (generatedsignature !== payload.razorpay_signature) {
      console.error("Invalid Razorpay signature");
      return new NextResponse("Invalid Razorpay signature", { status: 401 });
    }

    switch (event) {
      case "payment.authorized":
        break;
      case "payment.captured":
        const donationId = payload.payment.entity.notes.donationId;

        if (donationId) {
          await prisma.donation.update({
            where: { id: donationId },
            data: { status: "Success" },
          });
          console.log("Payment Captured:", donationId);
        } else {
          console.error(
            "Invalid or missing donationId from Razorpay webhook payload"
          );
          return new NextResponse("Invalid or missing donationId", {
            status: 400,
          });
        }
        break;
      default:
        // Handle other events if needed
        console.log("Unhandled Event:", event);
    }

    return new NextResponse("Webhook Received", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
