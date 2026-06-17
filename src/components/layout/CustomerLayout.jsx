import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
