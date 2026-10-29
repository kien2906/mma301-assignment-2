const BASE_URL = "https://dummyjson.com/products";

export const getProducts = async (limit = 10, skip = 0) => {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
};
export const searchProducts = async (keyword) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  const data = await response.json();

  return data.products;
};
