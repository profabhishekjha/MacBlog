import React from "react";
import Link from "next/link";
import styles from "./menucategories.module.css";

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuCategories = async () => {
  const data = await getData();
  const page = 1;

  return (
    <div className={styles.categoryList}>
      {data?.map((item) => (
        <Link
          className={`${styles.categoryItem} ${styles[item.slug]}`}
          key={item._id}
          href={`/blog?cat=${item.slug}&page=${page}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
