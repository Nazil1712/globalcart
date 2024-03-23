export function addToCartAPI(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserIdAPI(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart?user=${userId}`);
    const data = await response.json();
    // console.log(data)
    resolve({ data });
  });
}

export function updateItemAPI(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${update.id}`, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemAPI(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: id } });
  });
}

export function resetCartAPI(userId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetchItemsByUserIdAPI(userId);
    const items = response.data;
    for (let item of items) await deleteItemAPI(item.id);
    resolve({ status: "success" });
  });
}
