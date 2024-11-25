export function createUserAPI(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUserAPI(loginInfo) {
  // console.log("Login Info",loginInfo)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if(response.ok) {
        const data = await response.json();
        // console.log("data from frontend AUTH",data)
        resolve({ data });
      }else{
        const error = await response.text();
        reject(error)
      }
    } catch (error) {
      // console.log("Error",error)
      reject({error: error});
    }
  });
}

export function checkAuthAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check",{
        method: "GET",
        credentials: 'include'
      });
      if(response.ok) {
        const data = await response.json();
        // console.log("data from frontend AUTH",data)
        resolve({ data });
      }else{
        const error = await response.text();
        reject(error)
      }
    } catch (error) {
      // console.log("Error",error)
      reject({error: error});
    }
  });
}


export function resetPasswordRequestAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request",{
        method: "GET",
        credentials: 'include'
      });
      if(response.ok) {
        const data = await response.json();
        // console.log("data from frontend AUTH",data)
        resolve({ data });
      }else{
        const error = await response.text();
        reject(error)
      }
    } catch (error) {
      // console.log("Error",error)
      reject({error: error});
    }
  });
}

export function signOutAPI() {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
