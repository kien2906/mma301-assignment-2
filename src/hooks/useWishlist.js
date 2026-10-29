import { useState, useEffect } from "react";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy danh sách yêu thích
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWishlist();

      setWishlist(data);

      return true;
    } catch (error) {
      console.log("Fetch wishlist error:", error);
      setError("Failed to load wishlist");

      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Thêm hoặc xóa sản phẩm yêu thích
  const toggleWishlist = async (product) => {
    const exists = wishlist.some(
      (p) => p.id === product.id
    );

    try {
      setError(null);

      if (exists) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }

      return await fetchWishlist();
    } catch (error) {
      console.log("Wishlist error:", error);

      setError("Failed to update wishlist");

      return false;
    }
  };

  // Kiểm tra sản phẩm đã yêu thích chưa
  const isFavorite = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  return {
    wishlist,
    loading,
    error,
    toggleWishlist,
    isFavorite,
    fetchWishlist,
  };
};

export default useWishlist;