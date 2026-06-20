import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = state || {
    transactionId: "TXN-847392",
    amount: 150.75,
    date: new Date().toLocaleDateString(),
  };

  const downloadInvoice = () => {
    const invoice = `
SMART CART INVOICE
=========================

Transaction ID : ${order.transactionId}
Amount Paid    : $${order.amount}
Date           : ${order.date}
Status         : SUCCESS

Thank you for shopping with Smart Cart!
`;

    const blob = new Blob([invoice], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${order.transactionId}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-6">

      <div
        className="
          w-full
          max-w-sm
          sm:max-w-md
          md:max-w-lg
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* Header */}
        <div className="p-4">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 flex flex-col items-center text-center">

          {/* Success Icon */}
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-5xl text-green-500">✓</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Payment Successful
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-6 mt-3 max-w-md">
            Your payment has been completed successfully.
            We will send your order details to your email address shortly.
          </p>

          {/* Order Details */}
          <div className="mt-6 w-full bg-gray-50 rounded-2xl p-5">

            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Transaction ID
              </span>

              <span className="font-semibold text-gray-800">
                {order.transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500">
                Amount
              </span>

              <span className="font-semibold text-gray-800">
                ${order.amount}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500">
                Date
              </span>

              <span className="font-semibold text-gray-800">
                {order.date}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-500">
                Status
              </span>

              <span className="font-semibold text-green-500">
                SUCCESS
              </span>
            </div>

          </div>

          {/* Download Invoice */}
          <button
            onClick={downloadInvoice}
            className="
              mt-8
              w-full
              bg-orange-500
              hover:bg-orange-600
              text-white
              py-3
              rounded-2xl
              font-semibold
              shadow-md
              transition
            "
          >
            Download Invoice
          </button>

          {/* View Details */}
          <button
            onClick={() => navigate("/order-details")}
            className="
              mt-4
              w-full
              border
              border-orange-500
              text-orange-500
              hover:bg-orange-50
              py-3
              rounded-2xl
              font-semibold
              transition
            "
          >
            View Order Details
          </button>

          {/* Back Home */}
          <button
            onClick={() => navigate("/")}
            className="
              mt-5
              text-sm
              text-gray-500
              hover:text-black
              transition
            "
          >
            Back to Home
          </button>

        </div>
      </div>
    </div>
  );
}