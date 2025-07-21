import { useEffect, useState } from "react";
import axios from "axios";


function PreviewPosts() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/preview")
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const filteredBlogs = blogs.filter(
    (post) =>
      (post.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (post.author || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Public Blog Posts</h1>
      <input
        type="text"
        placeholder="🔍 Search posts by title or author..."
        className="w-full mb-6 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredBlogs.map((post) => (
        <div key={post._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">
                {post.title || 'No Title'}{' '}
                <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                  post.status === 'published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {post.status || 'draft'}
                </span>
              </h3>
              <p className="text-gray-600 mt-1">{post.description || post.content || 'No description'}</p>
              <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-4">
                <span>👤 {post.author || 'Unknown'}</span>
                <span>📅 {post.date || 'No date'}</span>
                <span>👁️ {post.views || 0} views</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PreviewPosts;
