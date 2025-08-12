export function fetchAllProductsAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilterAPI(filter,sort,pagination,admin) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : on server we will support multi values in filter
  // console.log("Filter =>",filter)
  // console.log("Sort =>",sort)
  // console.log("Pagination =>",pagination)

  
  let queryString = "";

  for (let key in filter) {
    const categoryArray = filter[key];
    if (categoryArray.length) {
      // const lastCategoryValue = categoryArray[categoryArray.length - 1];
      // queryString += `${key}=${lastCategoryValue}&`;
      queryString += `${key}=`;
      for(let i=0; i<categoryArray.length; i++) {
        if(i===categoryArray.length-1){
          queryString += `${categoryArray[i]}&`
        }
        else{
          queryString += `${categoryArray[i]}_`
        }
      }
    }
  }


  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  
  if(admin) {
    queryString += `admin=true&`
  }

  console.log("Query String",queryString)


  // console.log(`/products?${queryString}`)
  return new Promise(async (resolve) => {
    const response = await fetch(
      `/products?` + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    // console.log(data)
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}


export function fetchAllCategoriesAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrandsAPI() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductByIdAPI(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProductAPI(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/",{
      method: 'POST',
      body: JSON.stringify(product),
      headers: {'content-type':'application/json'}
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProductAPI(update) {
  return new Promise(async (resolve) => {
    // console.log(`Update is ${update}`)
    const response = await fetch(`/products/${update.id}`,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type':'application/json'}
    });
    const data = await response.json();
    resolve({ data });
  });
}