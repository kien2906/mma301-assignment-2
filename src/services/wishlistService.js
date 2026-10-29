import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../config/firebaseConfig";

// Collection wishlist trên Firebase
const wishlistRef = collection(db, "wishlist");

// Lấy danh sách yêu thích
export const getWishlist = async () => {
  const snapshot = await getDocs(wishlistRef);

  return snapshot.docs.map((item) => item.data());
};

// Thêm sản phẩm yêu thích
export const addToWishlist = async (product) => {
  try {
    console.log("Product nhận được:", product);

    const productRef = doc(db, "wishlist", String(product.id));

    await setDoc(productRef, {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      description: product.description ?? "",
      category: product.category ?? "",
      stock: product.stock ?? 0,
    });

    console.log("Thêm Wishlist thành công!");
  } catch (error) {
    console.log("Lỗi Firebase:", error.code);
    console.log("Chi tiết lỗi:", error.message);

    throw error;
  }
};
// Xóa sản phẩm yêu thích
export const removeFromWishlist = async (productId) => {
  const productRef = doc(db, "wishlist", String(productId));

  await deleteDoc(productRef);
};
