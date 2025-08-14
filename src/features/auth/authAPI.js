const API_URL = process.env.REACT_APP_API_URL;


export function createUserAPI(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      credentials:"include",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUserAPI(loginInfo) {
  // console.log("Login Info",loginInfo)
  console.log("Calling : ", `${API_URL}/auth/login`)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      // console.log("Login Response : ",response)
      if (response.ok) {
        const data = await response.json();
        // console.log("data from frontend AUTH",data)
        const {token, user} = data;
        localStorage.setItem("token",token)
        console.log("Data (from API)==>",data)
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      // console.log("Error",error)
      reject({ error: error });
    }
  });
}

const token = localStorage.getItem("token")

export function checkAuthAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/check`,{
        method: "GET",
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("data from frontend AUTH",data)
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      // console.log("Error",error)
      reject({ error: error });
    }
  });
}

export function resetPasswordRequestAPI(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password-request`, {
        method: "POST",
        credentials:"include",
        body: JSON.stringify({email}),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("data from frontend AUTH",data)
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      // console.log("Error",error)
      reject({ error: error });
    }
  });
}


export function resetPasswordAPI(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("data from frontend AUTH",data)
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      // console.log("Error",error)
      reject({ error: error });
    }
  });
}

export function signOutAPI() {
  // console.log("SignOut API called")
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`,{
        method:"GET",
        credentials:"include"
      });
      // console.log("SignOut Response",response)
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      // console.log("Error",error)
      reject({ error: error });
    }
  });
}
