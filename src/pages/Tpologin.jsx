import React, { useState } from 'react';

const TPOLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const tpos = JSON.parse(localStorage.getItem('tpos')) || [];
    const matchedTPO = tpos.find(
      (tpo) => tpo.email === email && tpo.password === password
    );

    if (!matchedTPO) {
      setMessage('Invalid credentials.');
    } else if (matchedTPO.status !== 'approved') {
      setMessage(`Access Denied. Status: ${matchedTPO.status}`);
    } else {
      setMessage('Login successful!');
      // You can redirect or store logged-in status here
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">TPO Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 border rounded-lg text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default TPOLogin;
