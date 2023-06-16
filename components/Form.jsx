import Link from "next/link";
import { useState } from "react";

import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@app/firebase";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const handleImageUpload = async (file) => {
    try {
      const storageRef = ref(storage, "Blogs/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setOpen(true);
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log("Error uploading file:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Download URL:", downloadURL);
          setPost((prevPost) => ({ ...prevPost, image: downloadURL }));
          setOpen(false);
          //console.log(post);
          setOpen(false);
        }
      );
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  };
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} Unveil extraordinary in the minuscule. Capture magic in fleeting
        encounters, whispers of delicate moments, enchantment in tiny corners.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Blog
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Blog Image
          </span>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          {open && (
            <div>
              <p>Uploading...</p>
              <progress value={progress} max="100" />
            </div>
          )}
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Blog{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
