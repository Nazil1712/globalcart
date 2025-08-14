const API_URL = process.env.REACT_APP_API_URL;


export function addToCartAPI(item) {
  // console.log("Item from ADD to cart",item)
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",
      credentials:"include",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartByUserAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/cart/own`,{
      method:"GET",
      credentials:"include"
    });
    const data = await response.json();
    // console.log("Cart Data from frontend",data)
    resolve({ data });
  });
}

export function updateCartAPI(update) {
  return new Promise(async (resolve,reject) => {
    try{

      const response = await fetch(`${API_URL}/cart/${update.id}`, {
        method: "PATCH",
        credentials:"include",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    }catch (error) {
      reject(error);  
    }
  });
}

export function deleteFromCartAPI(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/cart/${id}`, {
      method: "DELETE",
      credentials:"include",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: id } });
  });
}

export function resetCartAPI() {
  return new Promise(async (resolve, reject) => {
    const response = await fetchCartByUserAPI();
    const items = response.data;
    for (let item of items) await deleteFromCartAPI(item.id);
    resolve({ status: "success" });
  });
}
