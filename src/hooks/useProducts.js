import { useEffect, useState, useRef } from "react";
import { getProducts } from "../services/productService.js";

const LIMIT = 10;

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);
  const skipRef = useRef(0);
  const hasMoreRef = useRef(true);

  const fetchProducts = async (reset = false) => {
    if (loadingRef.current) return;
    if (!reset && !hasMoreRef.current) return;

    loadingRef.current = true;

    if (reset) {
      skipRef.current = 0;
      hasMoreRef.current = true;
      setHasMore(true);
      setRefreshing(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const data = await getProducts(LIMIT, skipRef.current);

      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }

      skipRef.current += data.products.length;

      const more = skipRef.current < data.total;

      hasMoreRef.current = more;
      setHasMore(more);
    } catch (err) {
      setError(err.message);
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  return {
    products,
    loading,
    loadingMore,
    refreshing,
    error,
    hasMore,
    loadMore: () => fetchProducts(false),
    refresh: () => fetchProducts(true),
  };
}
