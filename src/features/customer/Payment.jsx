import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaQuestionCircle,
  FaCamera,
} from "react-icons/fa";

export default function PaymentScreen() {
  const [activeTab, setActiveTab] =
    useState("card");

  const [formData, setFormData] =
    useState({
      cardNumber: "",
      holderName: "",
      expiry: "",
      cvv: "",
      amount: 12154,
    });

  const [showCVV, setShowCVV] =
    useState(false);

  // =========================
  // Format Card Number
  // =========================
  const formattedCardNumber = useMemo(() => {
    return (
      formData.cardNumber
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || ""
    );
  }, [formData.cardNumber]);

  // =========================
  // Handle Card Number
  // =========================
  const handleCardNumber = (value) => {
    const cleaned = value
      .replace(/\D/g, "")
      .slice(0, 16);

    setFormData({
      ...formData,
      cardNumber: cleaned,
    });
  };

  // =========================
  // Expiry Format
  // =========================
  const handleExpiry = (value) => {
    let numbers = value.replace(/\D/g, "");

    if (numbers.length >= 3) {
      numbers =
        numbers.slice(0, 2) +
        "/" +
        numbers.slice(2, 4);
    }

    setFormData({
      ...formData,
      expiry: numbers.slice(0, 5),
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6 py-8">
      
      {/* MAIN CARD */}
      <div
        className="
        w-full
        max-w-[430px]
        bg-white
        rounded-[30px]
        p-6
        shadow-[0px_10px_40px_rgba(0,0,0,0.03)]
      "
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-7">
          
          {/* BACK BUTTON */}
          <button
            className="
            w-11
            h-11
            rounded-xl
            border
            border-gray-200
            flex
            items-center
            justify-center
            text-gray-700
          "
          >
            <FaArrowLeft />
          </button>

          {/* TITLE */}
          <h1
            className="
            text-[22px]
            font-bold
            text-[#1A1A1A]
          "
          >
            Payment
          </h1>

          <div className="w-11" />
        </div>

        {/* AMOUNT */}
        <div className="text-center mb-8">
          <h2
            className="
            text-[20px]
            font-bold
            text-[#00CC83]
          "
          >
            {formData.amount.toLocaleString()} CFA
          </h2>
        </div>

        {/* TABS */}
        <div
          className="
          bg-[#F4F6F9]
          p-1.5
          rounded-2xl
          flex
          gap-2
          mb-8
        "
        >
          {/* CREDIT CARD */}
          <button
            onClick={() =>
              setActiveTab("card")
            }
            className={`
              flex-1
              py-[14px]
              rounded-xl
              text-sm
              font-semibold
              transition-all
              duration-200
              
              ${
                activeTab === "card"
                  ? `
                  bg-[#FF8C00]
                  text-white
                  shadow-[0px_8px_20px_rgba(255,140,0,0.25)]
                `
                  : `
                  text-gray-500
                `
              }
            `}
          >
            Credit Card
          </button>

          {/* MOBILE MONEY */}
          <button
            onClick={() =>
              setActiveTab("money")
            }
            className={`
              flex-1
              py-[14px]
              rounded-xl
              text-sm
              font-semibold
              transition-all
              
              ${
                activeTab === "money"
                  ? `
                  bg-[#FF8C00]
                  text-white
                  shadow-[0px_8px_20px_rgba(255,140,0,0.25)]
                `
                  : `
                  bg-[#F4F6F9]
                  text-gray-500
                `
              }
            `}
          >
            Mobile Money
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-6">
          
          {/* CARD NUMBER */}
          <div>
            <label
              className="
              text-[14px]
              font-semibold
              text-[#1A1A1A]
              mb-2
              block
            "
            >
              Card Number
            </label>

            <div className="relative">
              
              <input
                type="text"
                value={formattedCardNumber}
                onChange={(e) =>
                  handleCardNumber(
                    e.target.value
                  )
                }
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="
                w-full
                bg-[#F4F6F9]
                border
                border-transparent
                rounded-[14px]
                px-4
                py-4
                text-[15px]
                font-medium
                outline-none
                transition-all
                focus:border-[#FF8C00]
                focus:ring-4
                focus:ring-orange-100
                placeholder:text-[#A0AEC0]
              "
              />

              {/* SCAN ICON */}
              <button
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-[#A0AEC0]
              "
              >
                <FaCamera />
              </button>

              {/* MASTERCARD */}
              <div
                className="
                absolute
                right-12
                top-1/2
                -translate-y-1/2
                flex
              "
              >
                <div
                  className="
                  w-4
                  h-4
                  rounded-full
                  bg-[#FF5F00]
                  opacity-90
                "
                />

                <div
                  className="
                  w-4
                  h-4
                  rounded-full
                  bg-[#F79E1B]
                  -ml-2
                  opacity-90
                "
                />
              </div>
            </div>
          </div>

          {/* HOLDER */}
          <div>
            <label
              className="
              text-[14px]
              font-semibold
              text-[#1A1A1A]
              mb-2
              block
            "
            >
              Card Holder
            </label>

            <input
              type="text"
              placeholder="Ahmed Mustafa"
              value={formData.holderName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  holderName:
                    e.target.value,
                })
              }
              className="
              w-full
              bg-[#F4F6F9]
              rounded-[14px]
              px-4
              py-4
              text-[15px]
              font-medium
              outline-none
              border
              border-transparent
              focus:border-[#FF8C00]
              focus:ring-4
              focus:ring-orange-100
              placeholder:text-[#A0AEC0]
            "
            />
          </div>

          {/* EXPIRY + CVV */}
          <div className="flex gap-[15px]">
            
            {/* EXPIRY */}
            <div className="flex-1">
              <label
                className="
                text-[14px]
                font-semibold
                text-[#1A1A1A]
                mb-2
                block
              "
              >
                Exp Date
              </label>

              <input
                type="text"
                value={formData.expiry}
                onChange={(e) =>
                  handleExpiry(
                    e.target.value
                  )
                }
                placeholder="MM/YY"
                maxLength={5}
                className="
                w-full
                bg-[#F4F6F9]
                rounded-[14px]
                px-4
                py-4
                text-[15px]
                font-medium
                outline-none
                border
                border-transparent
                focus:border-[#FF8C00]
                focus:ring-4
                focus:ring-orange-100
                placeholder:text-[#A0AEC0]
              "
              />
            </div>

            {/* CVV */}
            <div className="flex-1">
              
              <label
                className="
                text-[14px]
                font-semibold
                text-[#1A1A1A]
                mb-2
                flex
                items-center
                gap-[5px]
              "
              >
                CVV / CVC

                <button
                  type="button"
                  onMouseEnter={() =>
                    setShowCVV(true)
                  }
                  onMouseLeave={() =>
                    setShowCVV(false)
                  }
                  className="
                  text-[#FF8C00]
                  text-xs
                "
                >
                  <FaQuestionCircle />
                </button>
              </label>

              <div className="relative">
                
                <input
                  type="password"
                  placeholder="***"
                  maxLength={4}
                  value={formData.cvv}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cvv: e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4),
                    })
                  }
                  className="
                  w-full
                  bg-[#F4F6F9]
                  rounded-[14px]
                  px-4
                  py-4
                  text-[15px]
                  font-medium
                  outline-none
                  border
                  border-transparent
                  focus:border-[#FF8C00]
                  focus:ring-4
                  focus:ring-orange-100
                  placeholder:text-[#A0AEC0]
                "
                />

                {/* TOOLTIP */}
                {showCVV && (
                  <div
                    className="
                    absolute
                    -top-12
                    left-1/2
                    -translate-x-1/2
                    bg-[#1A1A1A]
                    text-white
                    text-[11px]
                    px-3
                    py-2
                    rounded-lg
                    whitespace-nowrap
                    z-10
                  "
                  >
                    Last 3 digits
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* NOTICE */}
          <p
            className="
            text-[12px]
            text-[#A0AEC0]
            leading-relaxed
          "
          >
            You will receive an email
            confirmation after successful
            payment.
          </p>

          {/* PAY BUTTON */}
          <button
            className="
            w-full
            py-[18px]
            rounded-2xl
            bg-[#FF8C00]
            text-white
            font-semibold
            text-[15px]
            transition-all
            duration-200
            hover:-translate-y-1
            hover:shadow-[0px_10px_25px_rgba(255,140,0,0.3)]
            active:translate-y-0
          "
          >
            Pay for the order
          </button>
        </div>
      </div>
    </div>
  );
}