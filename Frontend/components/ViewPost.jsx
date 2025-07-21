import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewPost = () => {
  const { state: post } = useLocation();

  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-2">Author: {post.author}</p>
      <p className="text-gray-500 text-sm mb-4">ID: {post._id}</p>
      <p className="text-base">{post.content}</p>
    </div>
  );
};

export default ViewPost;