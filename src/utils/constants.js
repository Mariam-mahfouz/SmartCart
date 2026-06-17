// src/utils/constants.js
import { FaShoppingCart, FaClock, FaHome, FaBell } from "react-icons/fa";

export const customerStats = [
  {
    title: "Scanned products",
    count: "3 products",
    icon: <FaShoppingCart className="text-purple-500 text-2xl" />,
    route: "/scan", // links to ScanProduct.jsx
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
