export function fetchUserOrdersAPI(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/order/?loggedInUser.id=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}
