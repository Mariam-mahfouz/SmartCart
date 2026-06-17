import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-bold text-sky-400">
        Smart Cart
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800"}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800"}`
          }
        >
          <ShoppingCart size={18} />
          Orders
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800"}`
          }
        >
          <Package size={18} />
          Products
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800"}`
          }
        >
          <Users size={18} />
          Customers
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800"}`
          }
        >
          <BarChart2 size={18} />
          Analytics
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-gray-400 hover:bg-slate-800"}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 hover:text-red-400 hover:bg-slate-800 rounded-lg">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
