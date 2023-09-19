"use client";

import React, { useEffect, useState } from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("/api/featuredpost")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched data in the state
        setFeaturedData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>{`Hey, Mehak Raina here!`}</b>{" "}
        {`Explore my stories and creative ideas.`}
      </h1>
      {featuredData && (
        <div className={styles.post}>
          <div className={styles.imgContainer}>
            <a href={`/posts/${featuredData.slug}`}>
              <Image
                src={featuredData.img}
                alt=""
                fill
                className={styles.image}
              />
            </a>
          </div>
          <div className={styles.textContainer}>
            <a href={`/posts/${featuredData.slug}`}>
              <h1 className={styles.postTitle}>{featuredData.title}</h1>
            </a>
            <div
              className={styles.postDesc}
              dangerouslySetInnerHTML={{
                __html: featuredData?.desc.substring(0, 550),
              }}
            />

            <Link href={`/posts/${featuredData.slug}`}>
              <button className={styles.button}>Read More</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;
