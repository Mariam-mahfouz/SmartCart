import React from "react";

const Users = () => {
  const users = [
    {
      name: "Ahmed Mohamed",
      email: "ahmed@gmail.com",
    },
    {
      name: "Mariam Ahmed",
      email: "mariam@gmail.com",
    },
    {
      name: "Omar Ali",
      email: "omar@gmail.com",
    },
    {
      name: "Fatma Hassan",
      email: "fatma@gmail.com",
    },
    {
      name: "Youssef Khaled",
      email: "youssef@gmail.com",
    },
    {
      name: "Nour Ibrahim",
      email: "nour@gmail.com",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">
        Users Management (Demo Data)
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
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Users;