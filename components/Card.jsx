import React from "react";

const Card = ({ post }) => {
  const { tag } = post;

  return <div>{tag}</div>;
};

export default Card;
