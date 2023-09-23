"use client";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import "react-quill/dist/quill.bubble.css";
import { app } from "@/utils/firbase";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Write = () => {
  const { data: session } = useSession(); // Use "data" instead of "status" to access user data
  const [isFeatured, setIsFeatured] = useState(false); // State to handle the "isFeatured" checkbox
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (progress === 100) {
            [setOpen(false)];
          }
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [file]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
        isFeatured:
          isFeatured && session?.user?.email === "jhaabhishek9200@gmail.com",
      }),
    });

    if (res.status === 200) {
      setLoading(false);
      const data = await res.json();
      toast.success("Posted Successfully");
      router.push(`/posts/${data.slug}`);
    }
  };

  // Check if the user's email matches the allowed email
  const isAllowedUser = session?.user?.email === "jhaabhishek910@gmail.com";

  // Handler for the "isFeatured" checkbox
  const handleIsFeaturedChange = (event) => {
    setIsFeatured(event.target.checked);
  };

  return (
    <div className={styles.container}>
      {/* Render the "isFeatured" checkbox for the allowed user */}

      <input
        type="text"
        placeholder="Title..."
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="experience">Experience</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      {isAllowedUser && (
        <label className={styles.featureLabel}>
          <input
            className={styles.featured}
            type="checkbox"
            checked={isFeatured}
            onChange={handleIsFeaturedChange}
          ></input>
          <p className={styles.featureText}>
            Make this Post Featured on Editor's Choice
          </p>
        </label>
      )}
      {loading && (
        <div className={styles.loadingImage}>
          <Image
            className={styles.loading}
            alt=""
            src="https://i.gifer.com/ZKZg.gif"
            width={100}
            height={100}
          />
        </div>
      )}

      {media && (
        <div className={styles.imageContainer}>
          <Image
            src={media}
            className={styles.image}
            width={300}
            height={300}
            alt=""
          />
        </div>
      )}

      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image
            src="/plus.svg"
            alt=""
            className={styles.plus}
            width={16}
            height={16}
          />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />

            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image
                  style={{ cursor: "pointer", width: "100%", height: "100%" }}
                  src="/camera.svg"
                  alt=""
                  width={40}
                  height={40}
                />
              </label>
            </button>
          </div>
        )}

        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell Your Story..."
        />
      </div>

      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default Write;
