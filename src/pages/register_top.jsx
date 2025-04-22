import React, { useState } from 'react';

const TPORegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    campus: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const existingTPOs = JSON.parse(localStorage.getItem('tpos')) || [];
    const newTPO = {
      ...formData,
      status: 'pending',
    };

    localStorage.setItem('tpos', JSON.stringify([...existingTPOs, newTPO]));
    setMessage("TPO registered successfully and awaiting admin approval.");

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
      <h2 className="text-2xl font-bold mb-6 text-center">TPO Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="campus"
          placeholder="Campus"
          className="w-full p-3 border rounded-lg"
          value={formData.campus}
          onChange={handleChange}
          required
        />

        {/* Password Field with Show/Hide */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg text-gray-700"
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

        {/* Confirm Password Field with Show/Hide */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg text-gray-700"
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

        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default TPORegistration;
