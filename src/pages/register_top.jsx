import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TPORegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    campus: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match.");
      return;
    }

    const existingTPOs = JSON.parse(localStorage.getItem('tpos')) || [];

    // Check for existing email
    const alreadyRegistered = existingTPOs.some(tpo => tpo.email === formData.email);
    if (alreadyRegistered) {
      toast.warning("⚠️ Email already registered.");
      return;
    }

    const newTPO = {
      ...formData,
      status: 'pending',
    };

    localStorage.setItem('tpos', JSON.stringify([...existingTPOs, newTPO]));
    toast.success(" TPO registered successfully and awaiting admin approval.");

    setFormData({
      name: '',
      email: '',
      campus: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">TPO Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg text-black placeholder-black"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg text-black placeholder-black"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <select
          name="campus"
          className="w-full p-3 border rounded-lg text-black"
          value={formData.campus}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Campus</option>
          <option value="ICCS Universe">ICCS Universe</option>
          <option value="ICCS Unity">ICCS Unity</option>
          <option value="ICEM">ICEM</option>
          <option value="Indira MBA">Indira MBA</option>
        </select>

        {/* Password Field */}
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg text-black placeholder-black"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TPORegistration;
