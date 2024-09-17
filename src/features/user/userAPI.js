export function fetchUserordersAPI(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/order/?user=${userId}`);
    const data = await response.json();
    console.warn("Response from backend",data)
    resolve({ data });
  });
}


export function fetchLoggedInUserAPI(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8080/users/${userId}`) 
    const data = await response.json()
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
