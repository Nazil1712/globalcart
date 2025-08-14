const API_URL = process.env.REACT_APP_API_URL;


export function fetchOrderByUserAPI(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/order/users/own`,{
      method:"GET",
      credentials:"include"
    });
    const data = await response.json();
    // console.warn("Response from backend",data)
    resolve({ data });
  });
}


export function fetchloggedInUserAPI() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${API_URL}/users/own`,{
      method:"GET",
      credentials:"include"
    }) 
    const data = await response.json()
    // console.log("UserInfo",data)
    resolve({data})
  }
  );
}

export function updateUserAPI(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/users/${update.id}`, {
      method: "PUT",
      credentials:"include",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
