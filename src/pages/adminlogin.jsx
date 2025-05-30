import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5001/api/auth/admin/adminlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.status === 403) {
        toast.error('🚫 You are not an admin.');
        return;
      }

      const data = await res.json();

      if (res.ok) {
        toast.success('✅ Login successful! Redirecting…');
        localStorage.setItem('token', data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({ username: formData.username, role: 'admin' })
        );
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        toast.error(`❌ ${data.message || 'Login failed.'}`);
      }
    } catch (err) {
      toast.error('🚫 Server error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border rounded-lg text-black placeholder-black"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg text-black placeholder-black"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/register-tpo" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>

          <p className="text-center text-gray-600">
            Login as TPO?{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              TPO Login
            </Link>
          </p>
        </form>

        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default AdminLogin;
