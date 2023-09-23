"use client";
import React from "react";
import styles from "./login.module.css";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <Image
        className={styles.loading}
        alt=""
        src="https://i.gifer.com/ZKZg.gif"
        width={70}
        height={70}
      />
    );
  }
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} onClick={() => signIn("google")}>
          Sign in with Google
        </div>
        <div className={styles.socialButton} onClick={() => signIn("facebook")}>
          Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
