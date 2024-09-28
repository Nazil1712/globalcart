export function createUserAPI(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUserAPI(loginInfo) {
  console.log("Login Info",loginInfo)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if(response.ok) {
        const data = await response.json();
        console.log("data from frontend AUTH",data)
        resolve({ data });
      }else{
        const error = await response.text();
        reject(error)
      }
    } catch (error) {
      console.log("Error",error)
      reject({error: error});
    }
  });
}

export function signOutAPI() {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
