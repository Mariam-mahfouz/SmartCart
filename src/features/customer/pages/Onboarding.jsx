import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  // Animated dots state
  const [activeDot, setActiveDot] = useState(0);

  // Auto-change dots
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm min-h-[600px] bg-[#f7eaea] rounded-3xl shadow-xl flex flex-col items-center px-6 py-8 justify-between">

        {/* Logo */}
        <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center shadow-md mt-6">
          <img src="/logo.jpg" alt="cart" className="w-28" />
        </div>

        {/* Content */}
        <div className="text-center">
          <h1 className="mt-8 text-xl font-bold text-[#1f2fa0] animate-fadeInUp">
            Shopping Smart Cart
          </h1>

          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            <span className="font-semibold text-black">New to us!</span>
            <br />
            Sign up now and enjoy fast checkout and no waiting in line.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            localStorage.setItem("seenOnboarding", "true");
            navigate("/signup");
          }}
          className="
            mt-10 w-full
            bg-orange-500 hover:bg-orange-600
            text-white py-3 rounded-full text-lg
            transition-all duration-300
            shadow-md
            hover:shadow-[0_0_25px_rgba(249,115,22,0.7)]
            hover:scale-105
            active:scale-95
          "
        >
          Sign Up
        </button>

        {/* Animated Dots */}
        <div className="flex gap-2 mb-4">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeDot === dot
                  ? "w-6 bg-[#1f2fa0]"
                  : "w-2 bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Onboarding;