import { BASE_URL } from "../services/api";

/**
 * Get all products that are on offer
 */
export const getOffers = async () => {
  const response = await fetch(`${BASE_URL}/api/products/offers`);
  return await response.json();
};

export const getProductByBarcode = async (barcode) => {
  const response = await fetch(`${BASE_URL}/api/products/barcode/${barcode}`);
  return await response.json();
};