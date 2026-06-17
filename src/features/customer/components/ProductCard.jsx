// src/apps/customer/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ name, image }) => {
  return (
    <div className="min-w-[120px] bg-white rounded-2xl p-3 flex flex-col items-center shadow-md">
      <img src={image} alt={name} className="w-20 h-20 object-contain mb-2" />
      <p className="text-sm font-medium text-gray-700">{name}</p>
    </div>
  );
};

export default ProductCard;
