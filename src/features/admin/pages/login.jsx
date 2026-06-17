import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 hidden admin entry (5 clicks)
  const [clicks, setClicks] = useState(0);

  const handleLogoClick = () => {
    setClicks((prev) => prev + 1);

    setTimeout(() => setClicks(0), 1500);

    if (clicks + 1 === 5) {
      const passkey = prompt("Enter admin passkey:");

      if (passkey === "admin123") {
        localStorage.setItem("role", "Admin");
        navigate("/admin/dashboard");
      } else {
        alert("Wrong passkey");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5280/api/auth/login",
        {
          fullName,
          password,
        }
      );

      if (res.data.success) {
        // =========================
        // SIMPLE FRONTEND ADMIN CHECK
        // =========================

        let role = res.data.role;

        // fallback (because backend may not send role)
        if (!role) {
          role = fullName === "admin1" ? "Admin" : "User";
        }

        if (role !== "Admin") {
          setError("You are not authorized as admin");
          setLoading(false);
          return;
        }

        // save auth data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "Admin");

        navigate("/admin/dashboard");
      } else {
        setError(res.data.message || "Invalid admin credentials");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid admin credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF6EF] px-4">
      <div className="w-full max-w-md bg-[#FFF6EF] rounded-3xl shadow-xl p-6 sm:p-8 text-center">

        {/* LOGO (hidden admin trigger) */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.jpg"
            alt="CartShop"
            onClick={handleLogoClick}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg ring-4 ring-orange-200 cursor-pointer"
          />
        </div>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          Admin Login
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Authorized access only
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-600">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="admin1"
              className="w-full px-4 py-3 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 text-gray-600">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-full bg-orange-400 text-white font-semibold shadow-md hover:bg-orange-500 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Admin access only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;