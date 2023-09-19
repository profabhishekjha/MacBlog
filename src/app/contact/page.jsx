"use client";

import { useState } from "react";
import styles from "./contact.module.css";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send form data to the server, including the user's email
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
      });

      // Redirect to a thank-you page or display a success message
      toast.success("Form Submitted Successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
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

        <label htmlFor="message" className={styles.label}>
          Message:
        </label>
        <textarea
          id="message"
          className={styles.message}
          placeholder="write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          required
        ></textarea>
        <button onClick={handleSubmit} className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
