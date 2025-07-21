import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 p-6">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
            BlogHub
          </h1>
          <p className="text-gray-500 text-lg mt-4">
            Share your thoughts, connect with readers, and build your audience with <br />
            our beautiful blogging platform
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-teal-400 text-white font-semibold rounded-xl shadow hover:opacity-90 transition"
              onClick={() => navigate('/dashboard')}
            >
              Start Writing Today <ArrowRight className="h-5 w-5" />
            </button>
            <button
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 font-semibold shadow hover:bg-gray-100 transition"
              onClick={() => navigate('/preview')}
            >
              Explore Posts
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto text-center mt-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Choose BlogHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-md p-2">
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Writing</h3>
            <p className="text-gray-600">Beautiful, distraction-free writing experience with Markdown support and live preview</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-md p-2">
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Community</h3>
            <p className="text-gray-600">Connect with readers and other writers. Build your audience and engage with your community</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-md p-2">
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Modern, responsive design that loads instantly and works perfectly on all devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;