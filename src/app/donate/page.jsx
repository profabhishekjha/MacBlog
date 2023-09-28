"use client";

import { useState } from "react";
import styles from "./donate.module.css";
import toast, { Toaster } from "react-hot-toast";

const Donate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [donate, setDonate] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to the server, including the user's email
      const response = await fetch(`/api/create-order`, {
        // Updated endpoint
        method: "POST",
        body: JSON.stringify({ name, email, donate }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order created:", data); // Log the order data
        handleRazorpayPayment(data.orderId);
      } else {
        console.error("Error creating order:", response.statusText);
        toast.error("Error creating order");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error submitting the form");
    }
  };

  const handleRazorpayPayment = (orderId) => {
    // Load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      // Create a new instance of Razorpay with the order ID
      const rzp = new window.Razorpay({
        key: "rzp_test_ki28mf8RJoXGw4", // Replace with your Razorpay API Key
        order_id: orderId, // Order ID obtained from the server
        handler: function (response) {
          console.log("Payment successful:", response);
          setPaymentStatus("Success");
          toast.success("Payment Successful");
        },
      });

      rzp.open();
    };

    // Append the script to the document
    document.body.appendChild(script);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter Your Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="donate" className={styles.label}>
          Donation Amount:
        </label>
        <input
          type="number"
          id="donate"
          className={styles.input}
          placeholder="Enter Donation Amount"
          value={donate}
          onChange={(e) => setDonate(e.target.value)}
          required
        />

        <button className={styles.button} type="submit">
          Donate via Razorpay
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Donate;
