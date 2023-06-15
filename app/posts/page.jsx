"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@components/Card";

const SingleBlogPost = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ id: "", prompt: "", tag: "", image: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/posts/${promptId.toString()}`);
      const data = await response.json();
      //console.log(data);

      setPost({
        prompt: data.prompt,
        tag: data.tag,
        image: data.image,
        id: data._id,
      });
    };

    getPromptDetails();
  }, [promptId]);

  return <Card key={post._id} post={post} />;
};

export default SingleBlogPost;
