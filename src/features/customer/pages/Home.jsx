import React, { useEffect, useState } from "react";
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
    count: "3 products",
    icon: <FaShoppingCart className="text-purple-500 text-2xl" />,
    route: "/scan",
  },
  {
    title: "Recently Removed",
    count: "0 deleted",
    icon: <FaClock className="text-orange-400 text-2xl" />,
    route: "/cart",
  },
  {
    title: "Total Summary",
    count: "164 achats",
    icon: <FaHome className="text-green-400 text-2xl" />,
    route: "/checkout",
  },
  {
    title: "Offers",
    count: "25 available",
    icon: <FaBell className="text-blue-400 text-2xl" />,
    route: "/offers",
  },
];

// temporary recommendations
const recommendations = [
  { id: 1, name: "Milk", image: "/assets/images/milk.png" },
  { id: 2, name: "Bottle", image: "/assets/images/bottle.png" },
  { id: 3, name: "Juice", image: "/assets/images/juice.png" },
];

const Home = () => {
  const navigate = useNavigate();

  // ===== USER STATE =====
  const [user, setUser] = useState(null);

  // ===== FETCH USER DATA =====
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5280/api/Auth/profile",
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
        <div>
          <h2 className="text-lg font-semibold">Welcome 👋</h2>

          <p className="text-gray-600">
            {user?.name || "Loading..."}
          </p>
        </div>

        <img
          src={
            user?.profileImage ||
            "/assets/images/profile.jpg"
          }
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Stats Cards */}
      <h3 className="font-semibold text-md mb-2">
        Main Shopping Screen
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(item.route)}
          >
            <div className="mb-2">{item.icon}</div>

            <h4 className="font-semibold text-gray-700">
              {item.title}
            </h4>

            <p className="text-sm text-gray-400">
              {item.count}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-md">
          Recommendations
        </h3>

        <button className="text-blue-500 font-semibold">
          See All →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {recommendations.map((item) => (
          <ProductCard
            key={item.id}
            name={item.name}
            image={item.image}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white py-3 flex justify-around border-t">
        <FaHome className="text-blue-500 text-xl" />
        <FaBell className="text-gray-400 text-xl" />
        <FaShoppingCart className="text-gray-400 text-xl" />
        <FaClock className="text-gray-400 text-xl" />
      </div>
    </div>
  );
};

export default Home;