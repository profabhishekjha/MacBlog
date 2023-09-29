import crypto from "crypto";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json(); // Await the JSON parsing

    // Verify Razorpay webhook signature
    const isValidSignature = verifyWebhookSignature(
      JSON.stringify(body),
      req.headers["x-razorpay-signature"],
      "oBtdfiQn3POvk0BtxYCUC6FY"
    );

    if (!isValidSignature) {
      console.error("Invalid Razorpay webhook signature");
      return new NextResponse("Invalid Signature", { status: 401 });
    }

    const { event, payload } = body;

    // Handle different Razorpay webhook events
    switch (event) {
      case "payment.authorized":
        // Payment is authorized, handle the event as needed
        console.log("Payment Authorized:", payload);
        break;
      case "payment.captured":
        // Payment is captured, update the payment status in the database
        const donationId = payload.order.entity.notes?.donationId;

        if (donationId) {
          // Proceed with the database update
          await prisma.donation.update({
            where: { id: donationId },
            data: { status: "Success" }, // Update status to "Paid"
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

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return expectedSignature === signature;
}
