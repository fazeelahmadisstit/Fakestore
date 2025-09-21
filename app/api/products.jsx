const apiUrl = "https://fakestoreapi.com/products";

async function fetchData(endpoint = "") {
  const res = await fetch(`${apiUrl}${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

// ✅ Fetch all products
export const fetchProducts = () => fetchData();

// ✅ Fetch single product by id
export const fetchProductById = (id) => fetchData(`/${id}`);
