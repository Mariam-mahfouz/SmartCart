import React, { useState, useMemo } from "react";

// 👇 بيجيب كل الصور تلقائي من الفولدر
const images = import.meta.glob(
  "/src/assets/images/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

const imageList = Object.values(images);

const Recommendations = () => {
  const [search, setSearch] = useState("");

  // هنعتبر اسم الصورة هو اسم الملف نفسه
  const products = useMemo(() => {
    return imageList.map((imgPath) => {
      const fileName = imgPath.split("/").pop().split(".")[0]; // اسم الصورة بدون امتداد

      return {
        name: fileName,
        image: imgPath,
      };
    });
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Recommendations</h2>
        <p className="text-gray-500">Just for you</p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border rounded-xl px-3 py-2 mb-6 shadow-sm">
        <input
          className="w-full outline-none"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>🔍</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-3 text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover rounded-xl mb-2"
            />
            <p className="text-sm font-medium capitalize">
              {item.name.replace(/-/g, " ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;