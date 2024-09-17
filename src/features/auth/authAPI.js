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

export function checkUserAPI(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log("data from frontend AUTH",data)
      resolve({ data });
    } catch (error) {
      console.log(error)
      reject(error);
    }
    // console.log(data)

    // if (data.length) {
    //     resolve({ data: data[0] });
    //   } else {
    //     reject({ message: "Wrong Credentials" });
    //   }
    // } else {
    //   reject({ message: "User not found" });
    // }
  });
}

export function signOutAPI(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
