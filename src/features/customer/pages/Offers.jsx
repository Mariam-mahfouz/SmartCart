import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, ShoppingCart } from "lucide-react";
import { getOffers } from "../../../services/product.service";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getOffers();
        setOffers(data);
      } catch (err) {
        setError("Failed to load offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl px-4 py-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2 rounded-lg bg-gray-100">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">Offers</h1>
          <Calendar size={18} className="ml-1" />
        </div>

        {/* Limited Offers */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-6">
          <p className="text-sm text-orange-500 font-medium">
            Limited Offers
          </p>
        </div>

        {/* States */}
        {loading && (
          <p className="text-center text-gray-400">Loading offers...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && offers.length === 0 && (
          <p className="text-center text-gray-400">
            No offers available right now
          </p>
        )}

        {/* Offers List */}
        <div className="space-y-4">
          {offers.map((item) => {
            const finalPrice =
              item.price -
              (item.price * item.discountPercentage) / 100;

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 shadow-sm"
              >
                {/* Image */}
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-white flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-medium">
                    {item.brand}
                  </p>
                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>

                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-orange-500">
                      {finalPrice.toFixed(2)} CFA
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      {item.price} CFA
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-400">
                    {item.discountPercentage}% offer
                  </span>
                  <button className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
