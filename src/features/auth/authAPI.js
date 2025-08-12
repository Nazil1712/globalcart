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

export function checkAuthAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
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
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
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
      const response = await fetch("/auth/reset-password", {
        method: "POST",
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
      const response = await fetch("/auth/logout");
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
