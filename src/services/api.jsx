export const BASE_URL = "https://cartshop1-production.up.railway.app";

export function getAuthHeader() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
