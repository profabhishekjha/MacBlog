import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import AuthLinks from "../authLinks/AuthLinks";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.socials}>
        <Link
          target="_blank"
          href="https://www.facebook.com/profile.php?id=100009059660188"
        >
          <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        </Link>
        <Link href="https://www.instagram.com/mehak5961/">
          <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        </Link>
        <Link target="_blank" href="https://www.youtube.com/@3peaksjournals">
          <Image src="/youtube.png" alt="youtube" width={24} height={24} />
        </Link>
      </div>
      <div className={styles.logo}>
        <Link href="/">MacBlogs</Link>
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          Homepage
        </Link>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
        <Link href="/donate" className={styles.link}>
          Donate
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
