"use client";
import { useCart } from "@/app/Context/CartContext"; // ✅ correct path
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const handleCheckout = () => {
    router.push("/checkout");
  };
  const { cart, updateQty, removeFromCart, total } = useCart();

  // Fallback total calculation if context didn't provide it
  const cartTotal =
    typeof total === "number"
      ? total
      : cart.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">
          Cart is empty.{" "}
          <Link href="/" className="text-blue-600 font-medium">
            Go shopping
          </Link>
        </p>
      ) : (
        <div className="flex flex-col bg-white p-4 rounded-lg shadow">
          <ul>
            {cart.map((item) => (
              <li
                key={item.id || item._id}
                className="flex justify-between items-center border-b py-3"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQty(item.id || item._id, Math.max(1, (item.quantity || 1) - 1))
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="min-w-[24px] text-center">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() =>
                      updateQty(item.id || item._id, (item.quantity || 1) + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id || item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="mt-4 text-lg font-bold">
            Total: ${cartTotal.toFixed(2)}
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <Link
              href="/"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Continue Shopping
            </Link>
            <button onClick={handleCheckout} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
