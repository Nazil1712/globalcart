export function fetchOrderByUserAPI(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/order/users/own`);
    const data = await response.json();
    // console.warn("Response from backend",data)
    resolve({ data });
  });
}


export function fetchloggedInUserAPI() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/users/own`) 
    const data = await response.json()
    // console.log("UserInfo",data)
    resolve({data})
  }
  );
}

export function updateUserAPI(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${update.id}`, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
