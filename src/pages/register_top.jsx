import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TPORegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    designation: '',
    campus: '',
    phone: '',
    collegeEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const API = 'http://localhost:5001';

  // 1) fetch flags from backend
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/settings`);
        if (!res.ok) throw new Error('Failed to load settings');
        const { allowRegistrations } = await res.json();
        setRegistrationOpen(allowRegistrations);
      } catch (err) {
        console.error(err);
        // default to closed if we can't load settings
        setRegistrationOpen(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registrationOpen) {
      toast.error('🚫 Registration is currently closed.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('❌ Passwords do not match.');
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/tpo/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          idNumber: formData.idNumber,
          designation: formData.designation,
          campus: formData.campus,
          phone: formData.phone,
          collegeEmail: formData.collegeEmail,
          password: formData.password,
        }),
      });

      if (res.status === 403) {
        const text = await res.text();
        throw new Error(text || 'Registrations closed');
      }
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || 'Registration failed');
      }

      toast.success('✅ Registration successful. Awaiting approval.');
      setFormData({
        name: '',
        idNumber: '',
        designation: '',
        campus: '',
        phone: '',
        collegeEmail: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      { !registrationOpen && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 font-semibold rounded">
          🚫 Registration is currently closed by admin
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        TPO Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'name', placeholder: 'Full Name' },
          { name: 'idNumber', placeholder: 'ID Number' },
          { name: 'designation', placeholder: 'Designation' },
          { name: 'phone', placeholder: 'Phone Number' },
          { name: 'collegeEmail', placeholder: 'College Email', type: 'email' },
        ].map(({ name, placeholder, type = 'text' }) => (
          <input
            key={name}
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full p-3 border rounded-lg text-black placeholder-black"
            value={formData[name]}
            onChange={handleChange}
            required
            disabled={!registrationOpen}
          />
        ))}

        <select
          name="campus"
          className="w-full p-3 border rounded-lg text-black"
          value={formData.campus}
          onChange={handleChange}
          required
          disabled={!registrationOpen}
        >
          <option value="" disabled>Select Campus</option>
          <option value="ICCS Universe">ICCS Universe</option>
          <option value="ICCS Unity">ICCS Unity</option>
          <option value="ICEM">ICEM</option>
          <option value="Indira MBA">Indira MBA</option>
        </select>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg text-black placeholder-black"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={!registrationOpen}
          />
          <span
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg text-black placeholder-black"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={!registrationOpen}
          />
          <span
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button
          type="submit"
          disabled={!registrationOpen}
          className={`w-full text-white py-3 rounded-lg ${
            registrationOpen
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TPORegistration;
