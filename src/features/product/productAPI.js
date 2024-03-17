export function fetchAllProductsAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilterAPI(filter) {
  let queryString = "";

  // filter = {"category":["smartphone","laptops"]}
  for (let key in filter) {
    const categoryArray = filter[key];
    console.log(categoryArray)
    if(categoryArray.length) {
      const lastCategory = categoryArray[categoryArray.length - 1]
      queryString = `${key}=${lastCategory}`
    }
  }
  console.log(`http://localhost:8080/products?${queryString}`)
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?` + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductBySortAPI(filter) {
  let queryString = "";

  // sort = {_sort:"price",_order:"desc"}
  for (let key in filter) {
    queryString += `${key}=${filter[key]}`;
  }

  console.log(`http://localhost:8080/products?${queryString}`)

  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8080/products?` + queryString
    );
    const data = await response.json();
    console.log(data)
    resolve({ data });
  });

}
