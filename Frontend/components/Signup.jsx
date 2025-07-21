import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful! Redirecting...');
        setTimeout(() => navigate('/signin'), 1500);
      } else {
        setMessage(data.msg || 'Signup failed');
      }
    } catch (err) {
      setMessage('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-sky-50">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-gray-500 mt-2">Join our community of writers and readers</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            className="w-full p-3 border rounded"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            className="w-full p-3 border rounded"
            value={form.lastName}
            onChange={handleChange}
            required
          />
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
              placeholder="Create a password"
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
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-3 border rounded"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-3 right-3 cursor-pointer"
            >👁</span>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-700 to-teal-400 text-white p-3 rounded font-semibold">
            Create account
          </button>
        </form>
        {message && (
          <div className="text-center text-sm text-red-500 mt-2">{message}</div>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/signin" className="text-blue-600 font-medium">Sign in</Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/" className="text-gray-500 text-sm hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;