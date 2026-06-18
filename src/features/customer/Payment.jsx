import { useEffect, useMemo, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { FaArrowLeft } from "react-icons/fa";
import { API_BASE_URL } from "../../config/api";

export default function PaymentScreen() {
  const [cart, setCart] = useState(null);
  const [activeTab, setActiveTab] = useState("card");
  const [loading, setLoading] = useState(false);

  // =========================
  // GET CART FROM FIREBASE
  // =========================
  useEffect(() => {
    const cartRef = ref(database, "cart");

    const unsubscribe = onValue(cartRef, (snapshot) => {
      setCart(snapshot.val() || null);
    });

    return () => unsubscribe();
  }, []);

  // =========================
  // TOTAL AMOUNT
  // =========================
  const amount = useMemo(() => {
    return cart?.total ?? 0;
  }, [cart]);

  // =========================
  // STRIPE CHECKOUT
  // =========================
  const handlePayment = async () => {
    if (!cart || !cart.items) {
      alert("Cart is empty!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const cleanItems = Object.values(cart.items || {}).map((item) => ({
        name: item.name,
        price: Number(item.price || 0) + Number(item.weightPrice || 0),
        quantity: Number(item.quantity || item.qty || 1),
      }));

      const res = await fetch(`${API_BASE_URL}/api/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cleanItems,
          total: cart.total,
        }),
      });

      const responseText = await res.text();

      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch {
        console.log("Response is not JSON");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Checkout failed");
      }

      const checkoutUrl = data?.checkoutUrl || data?.url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert("Checkout URL not returned");
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6 py-8">

      <div className="w-full max-w-[430px] bg-white rounded-[30px] p-6 shadow">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-7">
          <button className="w-11 h-11 border rounded-xl flex items-center justify-center">
            <FaArrowLeft />
          </button>

          <h1 className="text-[22px] font-bold">Payment</h1>

          <div className="w-11" />
        </div>

        {/* AMOUNT */}
        <div className="text-center mb-8">
          <h2 className="text-[20px] font-bold text-green-600">
            {amount.toLocaleString()} EGP
          </h2>
        </div>

        {/* TABS (optional UI only) */}
        <div className="bg-[#F4F6F9] p-1.5 rounded-2xl flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("card")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              activeTab === "card"
                ? "bg-[#FF8C00] text-white"
                : "text-gray-500"
            }`}
          >
            Credit Card
          </button>

          <button
            onClick={() => setActiveTab("money")}
            className={`flex-1 py-3 rounded-xl font-semibold ${
              activeTab === "money"
                ? "bg-[#FF8C00] text-white"
                : "text-gray-500"
            }`}
          >
            Mobile Money
          </button>
        </div>

        {/* INFO */}
        <p className="text-center text-gray-500 mb-6">
          You will be redirected to Stripe secure checkout
        </p>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={!cart || loading}
          className="w-full py-[18px] rounded-2xl bg-[#FF8C00] text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay with Stripe"}
        </button>
      </div>
    </div>
  );
}