import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Redirect to signin if no token
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token, navigate]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      console.log('Token being sent:', token);
      try {
        const res = await fetch('http://localhost:3000/api/post/blogs', {
          headers: {
            'Authorization': `Bearer ${token && token.trim()}`
          }
        });
        const data = await res.json();
        if (res.status === 401 || res.status === 403) {
          // Token missing/invalid, redirect to signin
          localStorage.removeItem('token');
          navigate('/signin');
          return;
        }
        if (res.ok) {
          setPosts(data.blogs || []);
        } else {
          setError(data.msg || 'Failed to fetch posts');
        }
      } catch (err) {
        setError('Failed to fetch posts');
      }
      setLoading(false);
    };
    if (token) fetchPosts();
  }, [token, navigate]);

  // Add or update post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const url = editId
        ? 'http://localhost:3000/api/post/update'
        : 'http://localhost:3000/api/post/add';
      const method = editId ? 'PUT' : 'POST';
      const body = editId
        ? { ...form, postid: editId }
        : form;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.msg || (editId ? 'Post updated' : 'Post added'));
        setForm({ title: '', content: '', author: '' });
        setEditId(null);
        // Refresh posts
        const refreshed = await fetch('http://localhost:3000/api/post/blogs', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const refreshedData = await refreshed.json();
        setPosts(refreshedData.blogs || []);
      } else {
        setMessage(data.msg || 'Failed to submit post');
      }
    } catch (err) {
      setMessage('Failed to submit post');
    }
  };

  // Delete post
  const handleDelete = async (postid) => {
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/api/post/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postid })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.msg || 'Post deleted');
        setPosts(posts.filter((p) => p._id !== postid));
      } else {
        setMessage(data.msg || 'Failed to delete post');
      }
    } catch (err) {
      setMessage('Failed to delete post');
    }
  };

  // Edit post
  const handleEdit = (post) => {
    setForm({ title: post.title, content: post.content, author: post.author });
    setEditId(post._id);
  };

  // Search filter
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-2">Your Posts</h2>
      <p className="mb-4 text-gray-500">Search by title or author name</p>

      <input
        type="text"
        placeholder="🔍 Search posts by title or author..."
        className="w-full mb-6 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add/Edit Post Form */}
      <form className="mb-8 space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-3 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          className="w-full p-3 border rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          className="w-full p-3 border rounded"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <button className="w-full bg-gradient-to-r from-blue-700 to-teal-400 text-white p-3 rounded font-semibold">
          {editId ? 'Update Post' : 'Add Post'}
        </button>
        {editId && (
          <button
            type="button"
            className="w-full mt-2 bg-gray-300 text-gray-700 p-3 rounded font-semibold"
            onClick={() => {
              setEditId(null);
              setForm({ title: '', content: '', author: '' });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {message && (
        <div className="text-center text-sm text-blue-500 mb-4">{message}</div>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : filteredPosts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-3 text-sm">{post.content}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    � {post.author}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  className="flex items-center text-sm px-3 py-1.5 bg-teal-100 text-teal-700 rounded-md hover:bg-teal-200"
                  onClick={() => handleEdit(post)}
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button>
                <button
                  className="flex items-center text-sm px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(post._id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
