import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    ShoppingCart,
    ScanLine,
    CreditCard,
  } from "lucide-react";

export default function SmartCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();

    // تحديث تلقائي كل ثانيتين
    const interval = setInterval(() => {
      fetchCart();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // GET CART ITEMS
  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5280/api/cart/items"
      );

      setCartItems(response.data);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  // TOTAL PRICE
  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.baseUnitPrice || 0) +
      (item.weightPrice || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f5f0] p-6 flex justify-center items-center">
      <div className="bg-white rounded-[30px] shadow-2xl w-full max-w-7xl p-8">

        {/* Steps */}
        <div className="bg-[#f9e7d1] rounded-2xl p-5 flex items-center justify-center gap-10 mb-8">
          <Step icon={<ShoppingCart size={18} />} title="Cart" active />

          <div className="w-20 border-t border-dashed border-gray-400"></div>

          <Step icon={<ScanLine size={18} />} title="AI Detection" />

          <div className="w-20 border-t border-dashed border-gray-400"></div>

          <Step icon={<CreditCard size={18} />} title="Payment" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Products */}
          <div className="lg:col-span-2">

            <div className="flex justify-between border-b pb-4 mb-6 font-medium text-gray-600">
              <span>Product</span>
              <span>Total</span>
            </div>

            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-6"
                >
                  {/* Left */}
                  <div className="flex items-center gap-5">

                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-28 h-28 object-cover rounded-xl border"
                    />

                    <div>
                      <h2 className="text-lg font-medium max-w-md">
                        {item.productName}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        Weight: {item.weightInGrams} g
                      </p>

                      <p className="text-gray-500">
                        Unit Price: ${item.baseUnitPrice}
                      </p>

                      <p className="text-gray-500">
                        Weight Price: ${item.weightPrice}
                      </p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-xl font-semibold">
                    $
                    {(
                      (item.baseUnitPrice || 0) +
                      (item.weightPrice || 0)
                    ).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-b from-[#f6c07c] to-[#f4b25f] rounded-3xl p-8 h-fit shadow-lg">

            <h2 className="text-2xl font-semibold mb-8">
              Smart Cart Summary
            </h2>

            <div className="space-y-5 border-b pb-6">

              <Row
                title="Detected Products"
                value={cartItems.length}
              />

              <Row
                title="Total Weight"
                value={
                  cartItems.reduce(
                    (sum, item) =>
                      sum + item.weightInGrams,
                    0
                  ) + " g"
                }
              />
            </div>

            {/* TOTAL */}
            <div className="flex justify-between py-8 text-2xl font-bold">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>
            <button
  onClick={() => navigate("/payment")}
  className="w-full bg-[#f39a2b] hover:bg-[#e48b1e] text-white py-4 rounded-2xl font-semibold text-lg"
>
  Confirm and Pay
</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ icon, title, active }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          active
            ? "bg-[#f39a2b] text-white"
            : "bg-[#f7d5a7] text-[#a56b28]"
        }`}
      >
        {icon}
      </div>

      <span className="font-medium">{title}</span>
    </div>
  );
}

function Row({ title, value }) {
  return (
    <div className="flex justify-between text-lg">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
}