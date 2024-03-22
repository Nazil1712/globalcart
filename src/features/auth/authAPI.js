export function createUserAPI(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
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
    const email = loginInfo.email;
    const password = loginInfo.password;

    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    // console.log(data)

    if (data.length) {
      if (data[0].password === password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Wrong Credentials" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
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
