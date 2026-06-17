import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import CustomerLayout from "../components/layout/CustomerLayout";
import AdminLayout from "../components/layout/AdminLayout";

// Customer Pages
import Onboarding from "../features/customer/pages/Onboarding";
import Login from "../features/customer/pages/login";
import Signup from "../features/customer/pages/Signup";
import Home from "../features/customer/pages/Home";
import Offers from "../features/customer/pages/Offers";
import Recommendations from "../features/customer/pages/Recommendations";
import ScanProduct from "../features/customer/pages/ScanProduct";
import Cart from "../features/customer/pages/Cart";
import Checkout from "../features/customer/pages/Checkout";
import Payment from "../features/customer/Payment";
import Success from "../features/customer/Success";

// Admin Pages
import AdminLogin from "../features/admin/pages/login";
import AdminDashboard from "../features/admin/pages/Dashboard";
import Orders from "../features/admin/pages/Orders";
import Products from "../features/admin/pages/Products";
import Users from "../features/admin/pages/Users";
import Analytics from "../features/admin/pages/Analytics";

const AppRouter = () => {

  // ✅ Check admin role
  const isAdmin = localStorage.getItem("role") === "Admin";

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= CUSTOMER ROUTES ================= */}
        <Route element={<CustomerLayout />}>

          <Route path="/" element={<Onboarding />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/scan" element={<ScanProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminLayout />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;