import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./munuposts.module.css";
const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/popularcategory`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};
const MenuPosts = async () => {
  const countViews = await getData();
  return (
    <div className={styles.items}>
      {countViews?.map((item) => (
        <Link
          href={`/posts/${item.slug}`}
          className={styles.item}
          key={item._id}
        >
          <div className={styles.imageContainer}>
            {item?.img && (
              <Image src={item?.img} alt="" fill className={styles.image} />
            )}
          </div>
          <div className={styles.textContainer}>
            <div className={styles.topContainer}>
              <span className={`${styles.category} ${styles.travel}`}>
                {item.catSlug}
              </span>
              <span style={{ fontSize: "10px" }}>Views : {item?.views}</span>
            </div>

            <Link href={`/posts/${item.slug}`}>
              <h3 className={styles.postTitle}>{item.title}</h3>
            </Link>
            <div className={styles.detail}>
              <span className={styles.username}>{item?.user.name}</span>
              <span className={styles.date}>
                {" "}
                -{item.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
