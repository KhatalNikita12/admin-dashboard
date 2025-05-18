// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TPOLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
// const handleLogin = (e) => {
//   e.preventDefault();

//   // Admin login
//   if (email === 'admin@gmail.com' && password === 'admin123') {
//     toast.success('Admin login successful! Redirecting...');
//     localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));

//     setTimeout(() => {
//       navigate('/dashboard');
//     }, 2000);
//     return;
//   }

//   // TPO login
//   const tpos = JSON.parse(localStorage.getItem('tpos')) || [];
//   const matchedTPO = tpos.find(
//     (tpo) => tpo.email === email && tpo.password === password
//   );

//   if (!matchedTPO) {
//     toast.error('Invalid credentials. Please try again.');
//   } else if (matchedTPO.status !== 'approved') {
//     toast.warning(`Access Denied. Your account status is: ${matchedTPO.status}`);
//   } else {
//     toast.success('Login successful! Redirecting...');
//     localStorage.setItem('user', JSON.stringify({ email, role: 'tpo' }));

//     setTimeout(() => {
//       navigate('/tpo-dashboard');
//     }, 2000);
//   }
// };


//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//    <h2 className="text-2xl font-bold mb-6 text-center text-black">TPO Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 border rounded-lg text-gray-700"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <div className="relative">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Password"
//             className="w-full p-3 border rounded-lg text-gray-700"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
//           >
//             {showPassword ? '🙈' : '👁️'}
//           </span>
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
//           Login
//         </button>
//         <p className="text-center text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/register-tpo" className="text-blue-600 hover:underline">
//             Register here
//           </Link>
//         </p>

//       </form>

//       {/* Toast container */}
//       <ToastContainer position="top-center" autoClose={2000} />
//     </div>
//   );
// };

// export default TPOLogin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TPOLogin = () => {
  const [collegeEmail, setCollegeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/auth/tpo/login", {
        collegeEmail,
        password,
      });

      const { token, message } = res.data;

      toast.success("Login successful! Redirecting...");
      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify({ email: collegeEmail, role: "tpo" }));

      setTimeout(() => navigate("/tpo-dashboard"), 1500);
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid credentials, please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">TPO Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="College Email"
          className="w-full p-3 border rounded-lg text-gray-700"
          value={collegeEmail}
          onChange={(e) => setCollegeEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
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
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register-tpo" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>

        <p className="text-center text-gray-600">
          Login as Admin?{" "}
          <Link to="/login-admin" className="text-blue-600 hover:underline">
            Admin Login
          </Link>
        </p>
      </form>

      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};

export default TPOLogin;
