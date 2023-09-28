import React, { useState } from "react";
import Razorpay from "razorpay";
import { toast } from "react-hot-toast";

const RazorpayButton = ({ amount }) => {
  const [paymentId, setPaymentId] = useState(null);

  const options = {
    key: process.env.RAZORPAY_KEY_ID, // Replace with your actual Razorpay Key ID
    amount: amount * 100, // Amount in paise (multiply by 100)
    currency: "INR", // Change to your preferred currency
    name: "Your Donation Name",
    description: "Donation for a cause",
    image: "/path-to-your-logo.png", // Replace with your logo URL
    handler: (response) => {
      // Handle successful payment here
      console.log(response);
      toast.success("Payment successful!");
    },
    prefill: {
      name: "John Doe", // Replace with the donor's name
      email: "john.doe@example.com", // Replace with the donor's email
    },
  };

  const openRazorpayModal = async () => {
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({ amount }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.orderId) {
        options.order_id = data.orderId;

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
      } else {
        toast.error("Error creating the order");
      }
    } catch (error) {
      console.error("Error creating the order:", error);
    }
  };

  return <button onClick={openRazorpayModal}>Donate {amount} INR</button>;
};

export default RazorpayButton;
