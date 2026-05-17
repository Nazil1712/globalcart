export const ITEMS_PER_PAGE = 10


export const discountedPrice = (price, discountPercentage) =>{
    return Math.round((price * (1-discountPercentage /100 )),2)
}

export const formatPrice = (amount) => {
  return amount.toLocaleString("en-IN");
};