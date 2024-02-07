import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="lama blog" width={50} height={50} />
          <h1 className={styles.logoText}>Mac Blogs</h1>
        </div>
        <p className={styles.desc}>
          {`Mehak Raina, a true person of positivity, always reflects a
          warm and welcoming aura. With her presence, support and infectious
          laughter, Mehak Cutie proves time and again that she's not just a
          friend but a cherished treasure in our lives. When it comes to
          kindness, compassion, and unwavering loyalty, Mehak Raina sets the
          gold standard, making her the best person, now get lost darlings❤.`}
        </p>
        <div className={styles.icons}>
          <Link
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100009059660188"
          >
            <Image src="/facebook.png" alt="facebook" width={24} height={24} />
          </Link>
          <Link href="https://www.instagram.com/mehak5961/">
            <Image
              src="/instagram.png"
              alt="instagram"
              width={24}
              height={24}
            />
          </Link>
          <Link target="_blank" href="https://www.youtube.com/@3peaksjournals">
            <Image src="/youtube.png" alt="youtube" width={24} height={24} />
          </Link>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact US</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href={`${process.env.NEXTAUTH_URL}/blog?cat=style&page=1`}>
            Style
          </Link>
          <Link href={`${process.env.NEXTAUTH_URL}/blog?cat=experience&page=1`}>
            Experience
          </Link>
          <Link href={`${process.env.NEXTAUTH_URL}/blog?cat=coding&page=1`}>
            Coding
          </Link>
          <Link href={`${process.env.NEXTAUTH_URL}/blog?cat=travel&page=1`}>
            Travel
          </Link>
        </div>
        <img src="https://hitwebcounter.com/counter/counter.php?page=11224377&style=0030&nbdigits=5&type=page&initCount=0" title="Counter Widget" Alt="Visit counter For Websites"   border="0" />
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100009059660188"
          >
            Facebook
          </Link>
          <Link target="_blank" href="https://www.instagram.com/mehak5961/">
            Instagram
          </Link>
          <Link target="_blank" href="https://www.youtube.com/@3peaksjournals">
            Youtube
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
