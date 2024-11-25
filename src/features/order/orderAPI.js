export function createOrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrdersAPI(sort, pagination) {
  let queryString = "";


  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`/order?` + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, total_Orders: +totalOrders } });
  });
}


export function updateOrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/order/${order.id}`, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
