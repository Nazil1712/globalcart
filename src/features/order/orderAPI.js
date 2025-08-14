const API_URL = process.env.REACT_APP_API_URL;


export function createOrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/order`, {
      method: "POST",
      credentials:"include",
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
    const response = await fetch(`${API_URL}/order?` + queryString,{
      method:"GET",
      credentials:"include"
    });
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, total_Orders: +totalOrders } });
  });
}


export function updateOrderAPI(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/order/${order.id}`, {
      method: "PATCH",
      credentials:"include",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
