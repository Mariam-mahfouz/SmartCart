import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

export default function Login() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        fullName,
        password,
      });

      setMessage(res.data.message || "Login successful");

      // Save token if exists
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // =========================
      // SIMPLE ROLE LOGIC (SAFE)
      // =========================

      let role = res.data.role;

      if (!role) {
        role = fullName === "admin1" ? "Admin" : "Customer";
      }

      localStorage.setItem("role", role);

      // =========================
      // NAVIGATION
      // =========================

      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed, check credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF6EF] px-4">
      <div className="w-full max-w-md bg-[#FFF6EF] rounded-3xl shadow-xl p-6 sm:p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg ring-4 ring-orange-200"
          />
        </div>

        {/* Title */}
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          Login
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Welcome back! Please login to your account
        </p>

        {/* Form */}
        <form className="space-y-4 text-left" onSubmit={handleLogin}>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 text-sm" />

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-11 py-3 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 text-sm" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-11 py-3 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-full bg-orange-400 text-white font-semibold shadow-md hover:bg-orange-500 transition"
          >
            Login
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-center text-red-500">
            {message}
          </p>
        )}

        {/* Signup */}
        <p className="text-xs text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-medium">
            Sign up
          </Link>
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-5 text-orange-500 text-sm">
          <FaFacebookF className="cursor-pointer hover:text-orange-600" />
          <FaTwitter className="cursor-pointer hover:text-orange-600" />
          <FaGoogle className="cursor-pointer hover:text-orange-600" />
        </div>

      </div>
    </div>
  );
}