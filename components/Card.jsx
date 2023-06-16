"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Card = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [creator, setCreator] = useState();

  //console.log(post);
  const handleProfileClick = () => {
    if (creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${creator._id}?name=${creator.username}`);
  };

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/posts/user/${id.toString()}`);
      const data = await response.json();
      //console.log(data);
      setCreator({
        id: data._id,
        username: data.username,
        image: data.image,
        email: data.email,
      });
    };
    getPostDetails();
  }, [id]);
  if (!creator) return <div>Loading...</div>;

  const handleTagClick = () => {
    router.push("/");
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${id.toString()}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log(error);
      }
    }
    router.push("/profile");
  };
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post.id}`);
  };
  //console.log(creator);

  return (
    <div className="card">
      <div className="flex flex-col">
        <div className="flex justify-start items-start gap-5">
          <div
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {creator.email}
              </p>
            </div>
          </div>
        </div>
        {post.create === creator.id && (
          <div className="flex justify-end items-center ">
            <span className="m-2" onClick={handleDelete}>
              <Image
                src={
                  "https://res.cloudinary.com/dmgwdcvwd/image/upload/v1686906422/delete_idcn8s.png"
                }
                alt="user_image"
                width={25}
                height={25}
                className="object-contain cursor-pointer"
              />
            </span>
            <span className="m-2" onClick={() => handleEdit(post)}>
              <Image
                src={
                  "https://res.cloudinary.com/dmgwdcvwd/image/upload/v1686906499/edit_aaa3ru.png"
                }
                alt="edit"
                width={25}
                height={25}
                className=" object-contain cursor-pointer"
              />
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 padding-[20px]">
          <div style={{ position: "relative", paddingTop: "100%" }}>
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                padding: "10px",
              }}
            >
              <Image
                src={post.image}
                alt="name"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <p className="my-4 font-satoshi text-md text-gray-700">
            {post.prompt}
          </p>
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
          >
            #{post.tag}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
