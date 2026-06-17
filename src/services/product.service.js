import api from "./api";

/**
 * Get all products that are on offer
 */
export const getOffers = async () => {
  const response = await api.get("/products/offers");
  return response.data;
};
export const getProductByBarcode = async (barcode) => {
  const response = await api.get(`/products/barcode/${barcode}`);
  return response.data;
};