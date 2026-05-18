const API_URL = import.meta.env.VITE_API_URL;


// Add Product To Wishlist
export function addToWishlistAPI(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      });

      const data = await response.json();

      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}



// Fetch Logged In User Wishlist
export function fetchWishlistByUserAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}



// Remove Product From Wishlist
export function deleteFromWishlistAPI(productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${API_URL}/wishlist/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "content-type": "application/json" },
        }
      );

      const data = await response.json();

      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}