import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://cartshop1-production.up.railway.app/api/orders"
      );

      const orders = res.data || [];

      const uniqueUsers = [];

      orders.forEach((order) => {
        const email =
          order.email || order.customerEmail || order.userEmail;
        const name =
          order.customerName || order.fullName || order.name;

        if (!email) return;

        const exists = uniqueUsers.find((u) => u.email === email);

        if (!exists) {
          uniqueUsers.push({
            name: name || "Unknown",
            email: email,
          });
        }
      });

      setUsers(uniqueUsers);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Users Management
      </h1>

      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-orange-100">
            <tr>
              <th className="text-left p-4">#</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-gray-600">{index + 1}</td>
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Users;