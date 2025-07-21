import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        if (data.firstName) {
          localStorage.setItem('firstName', data.firstName);
        }
        setMessage('Signin successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(data.msg || 'Signin failed');
      }
    } catch (err) {
      setMessage('Signin failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-sky-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account to continue writing</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 cursor-pointer"
            >👁</span>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-700 to-teal-400 text-white p-3 rounded font-semibold">
            Sign in
          </button>
        </form>
        {message && (
          <div className="text-center text-sm text-red-500 mt-2">{message}</div>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account? <Link to="/signup" className="text-blue-600 font-medium">Sign up</Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/" className="text-gray-500 text-sm hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;