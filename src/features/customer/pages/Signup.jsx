import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import API from "../../../services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/api/auth/register", {
        fullName: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

console.log("STATUS:", res.status);
console.log("DATA:", res.data);

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF6EF] px-4">
      <div className="w-full max-w-md bg-[#FFF6EF] rounded-3xl shadow-xl p-6 sm:p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="Cart Icon"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg ring-4 ring-orange-200"
          />
        </div>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          Create Account
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Join us and start shopping smarter
        </p>

        {/* Form */}
        <form className="space-y-4 text-left" onSubmit={handleSignup}>
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 text-sm" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-11 py-3 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 text-sm" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-11 py-3 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              required
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 text-sm" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-11 py-3 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 py-3 rounded-full bg-orange-400 text-white font-semibold shadow-md hover:bg-orange-500 transition"
          >
            Sign up
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-red-500 mt-2 text-sm">{message}</p>
        )}

        {/* Login link */}
        <p className="text-xs text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium">
            Login
          </Link>
        </p>

        {/* Social icons */}
        <div className="flex justify-center gap-6 mt-5 text-orange-500 text-sm">
          <FaFacebookF />
          <FaTwitter />
          <FaGoogle />
        </div>
      </div>
    </div>
  );
}