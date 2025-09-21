"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";
import { fetchProductById } from "@/app/api/products"; // ✅ import API function

export default function ProductDetail({ params }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const { id } = params;
  const [product, setProduct] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(item);
    router.push("/Cart");
  };

  if (loading) {
    return <h1 className="text-center text-xl font-bold">Loading...</h1>;
  }

  if (err) {
    return (
      <h1 className="text-center text-xl font-bold text-red-500">
        Error: {err}
      </h1>
    );
  }

  if (!product) {
    return (
      <h1 className="text-center text-xl font-bold">
        No product found for id: {id}
      </h1>
    );
  }

  return (
    <div className="flex justify-center p-6">
      <div className="flex flex-col bg-white p-6 rounded-lg shadow max-w-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-60 object-contain rounded mb-4"
        />
        <p className="font-bold text-lg mb-2">{product.title}</p>
        <p className="text-sm text-gray-700 mb-2">{product.description}</p>
        <p className="font-bold text-lg mb-4">
          ${Number(product.price).toFixed(2)}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
