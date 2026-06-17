import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/customer/login");
  };

  // return (
  //   <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
  //     {/* Logo */}
  //     <h1
  //       className="text-xl font-bold text-orange-500 cursor-pointer"
  //       onClick={() => navigate("/customer/home")}
  //     >
  //       Smart Cart
  //     </h1>

  //     {/* Links */}
  //     <div className="flex items-center gap-6 text-sm">
  //       <NavLink
  //         to="/customer/home"
  //         className={({ isActive }) =>
  //           isActive ? "text-orange-500 font-semibold" : "text-gray-600"
  //         }
  //       >
  //         Home
  //       </NavLink>

  //       <NavLink
  //         to="/customer/offers"
  //         className={({ isActive }) =>
  //           isActive ? "text-orange-500 font-semibold" : "text-gray-600"
  //         }
  //       >
  //         Offers
  //       </NavLink>

  //       <NavLink
  //         to="/customer/cart"
  //         className={({ isActive }) =>
  //           isActive ? "text-orange-500 font-semibold" : "text-gray-600"
  //         }
  //       >
  //         Cart
  //       </NavLink>

  //       <button
  //         onClick={logout}
  //         className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
  //       >
  //         Logout
  //       </button>
  //     </div>
  //   </nav>
  // );
};

export default Navbar;
