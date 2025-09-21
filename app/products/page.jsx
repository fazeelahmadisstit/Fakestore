"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MenuBar from "../components/menubar";
import { fetchProducts } from "../api/products"; // ✅ use helper

export default function Products() {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <h1 className="p-6 text-xl font-bold">Loading...</h1>;
  if (err) return <h1 className="p-6 text-xl font-bold text-red-500">Error: {err}</h1>;

  return (
    <>
      <MenuBar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">🛍️ Product List</h1>
          <Link
            href="/Cart"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="border rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-40 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-center line-clamp-1">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
              <p className="mt-2 font-bold">Price: ${item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
