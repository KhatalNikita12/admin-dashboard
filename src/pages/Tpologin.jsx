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
      const res = await axios.post(
        "http://localhost:5001/api/auth/tpo/login",
        { collegeEmail, password }
      );
      const { token, message } = res.data;

      toast.success(message, {
        style: { background: "#28a745", color: "#fff" }
      });

      localStorage.setItem("jwt", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: collegeEmail, role: "tpo" })
      );

      setTimeout(() => navigate("/tpo-dashboard"), 1500);
    } catch (err) {
      const status = err.response?.status;
      const dataMsg = err.response?.data?.message || "Something went wrong";

      if (status === 403) {
        toast.warning(dataMsg, {
          style: { background: "#ffc107", color: "#000" }
        });
      } else if (status === 401) {
        toast.error("Invalid email or password", {
          style: { background: "#dc3545", color: "#fff" }
        });
      } else {
        toast.error(dataMsg, {
          style: { background: "#343a40", color: "#fff" }
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">
        TPO Login
      </h2>

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
            onClick={() => setShowPassword((v) => !v)}
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

      <ToastContainer
        position="top-center"
        autoClose={1500}
        theme="colored"
        toastStyle={{ fontWeight: "bold" }}
      />
    </div>
  );
};

export default TPOLogin;
