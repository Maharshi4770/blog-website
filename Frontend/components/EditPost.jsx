import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, content, author, _id: postid } = location.state || {};

  const [formData, setFormData] = useState({ title, content, author });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/post/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token
      },
      body: JSON.stringify({ ...formData, postid })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Updated successfully");
      navigate('/dashboard');
    } else {
      alert(data.msg || "Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Content"
          className="w-full mb-4 p-2 border border-gray-300 rounded h-40"
          required
        />
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Author"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
