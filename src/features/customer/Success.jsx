import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const order = {
    transactionId: "TXN-847392",
    amount: 150.75,
    date: new Date().toLocaleDateString(),
  };

  const downloadInvoice = () => {
    const invoice = `
SMART CART INVOICE

Transaction ID: ${order.transactionId}
Amount Paid: $${order.amount}
Date: ${order.date}
Status: SUCCESS
`;

    const blob = new Blob([invoice], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-6">

      {/* Container */}
      <div className="
        w-full 
        max-w-sm 
        sm:max-w-md 
        md:max-w-lg 
        lg:max-w-xl
        bg-white 
        rounded-3xl 
        shadow-lg 
        sm:shadow-xl 
        md:shadow-2xl
        overflow-hidden
        flex 
        flex-col
      ">

        {/* Header */}
        <div className="flex items-center justify-start p-4 sm:p-5">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center px-6 sm:px-10 pb-10">

          {/* Image */}
          <div className="w-44 sm:w-56 md:w-64 lg:w-72 flex justify-center">
            <img
              src="/payment-success.png"
              alt="success"
              className="w-full object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-6">
            Payment result!
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-6 mt-3 max-w-md">
            We will send your order details to your email address after successful payment.
          </p>

          {/* Details button */}
          <button
            onClick={() => navigate("/order-details")}
            className="mt-6 text-green-500 font-medium flex items-center gap-2 hover:gap-3 transition"
          >
            See details <span>→</span>
          </button>

          {/* Primary button */}
          <button
            onClick={downloadInvoice}
            className="
              mt-8 
              w-full 
              sm:w-[90%] 
              md:w-[80%]
              bg-orange-500 
              hover:bg-orange-600 
              text-white 
              py-3 sm:py-4 
              rounded-2xl 
              font-semibold 
              shadow-md 
              transition
              text-sm sm:text-base
            "
          >
            Download the invoice
          </button>

        </div>
      </div>
    </div>
  );
}