import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaBell,
  FaHome,
  FaClock,
} from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const stats = [
  {
    title: "Scanned products",
    icon: <FaShoppingCart className="text-purple-500 text-2xl" />,
    route: "/scan",
  },
  {
    title: "Recently Removed",
    icon: <FaClock className="text-orange-400 text-2xl" />,
    route: "/cart",
  },
  {
    title: "Total Summary",
    icon: <FaHome className="text-green-400 text-2xl" />,
    route: "/checkout",
  },
  {
    title: "Offers",
    icon: <FaBell className="text-blue-400 text-2xl" />,
    route: "/offers",
  },
];

const recommendations = [
  { id: 1, name: "Milk", image: "/images/milk.png" },
  { id: 2, name: "maxtella", image: "/images/maxtella.png" },
  { id: 3, name: "Juice", image: "/images/oreo.png" },
  { id: 4, name: "Milk", image: "/images/hohos.png" },
  { id: 5, name: "cadbury", image: "/images/cadbury.png" },
  { id: 6, name: "Juice", image: "/images/suntop.png" },
];

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  // ===== AUTO SMOOTH LOOP =====
  useEffect(() => {
    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (!scrollRef.current) return;

        const el = scrollRef.current;

        el.scrollBy({
          left: 1, // slow smooth movement
          behavior: "smooth",
        });

        // reset invisible loop (smooth)
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, 20); // speed control (smaller = smoother)
    };

    startAutoScroll();

    return () => clearInterval(intervalRef.current);
  }, []);

  // pause on hover
  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const el = scrollRef.current;

      el.scrollBy({
        left: 1,
        behavior: "smooth",
      });

      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 20);
  };

  // ===== USER FETCH =====
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://cartshop1-production.up.railway.app/api/Auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Welcome 👋</h2>

        <img
          src={user?.profileImage || "/assets/images/profile.jpg"}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Stats */}
      <h3 className="font-semibold text-md mb-2">
        Main Shopping Screen
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 flex flex-col items-center shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => navigate(item.route)}
          >
            <div className="mb-2">{item.icon}</div>
            <h4 className="font-semibold text-gray-700">
              {item.title}
            </h4>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-md">
          Recommendations
        </h3>

        <button
          className="text-blue-500 font-semibold hover:underline"
          onClick={() => navigate("/recommendations")}
        >
          See All →
        </button>
      </div>

      {/* PREMIUM CAROUSEL */}
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2"
      >
        {recommendations.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate("/recommendations")}
            className="flex-shrink-0 transform hover:scale-105 transition-all duration-300"
          >
            <ProductCard
              name={item.name}
              image={item.image}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;