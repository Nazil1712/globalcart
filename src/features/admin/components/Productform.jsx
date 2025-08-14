import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  updateProductAsync,
} from "../../product/productSlice";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Flip, toast } from "react-toastify";

export default function Productform() {
  const categories = useSelector((state) => state.product.categories);
  const brands = useSelector((state) => state.product.brands);
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const [submitted, setSubmitted] = useState(false);
  // console.log(selectedProduct)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    } else {
      // dispatch(clearSelectedProduct());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct && id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("rating", selectedProduct.rating);
    }
  }, [selectedProduct, setValue, id]);

  const handleDelete = () => {
    const product = { ...selectedProduct, deleted: true };
    // console.log(product)
    // console.log("I am called")
    dispatch(updateProductAsync(product));
  };

  if (submitted) {
    return <Navigate to={"/admin"} replace={true}></Navigate>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            const product = { ...data };
            if(product.image1!=="" && product.image2!=="" && product.image3!==""){
              product.images = [
                product.image1,
                product.image2,
                product.image3,
                product.thumbnail,
              ];
            }
            else if(product.image1!=="" && product.image2!=="" ){
              product.images = [
                product.image1,
                product.image2,
                product.thumbnail,
              ];
            }
            else if(product.image1!==""){
              product.images = [
                product.image1,
                product.thumbnail,
              ];
            }else{
              product.images = [
                product.thumbnail,
              ];
            }
            product.rating = Number(data.rating);
            delete product["image1"];
            delete product["image2"];
            delete product["image3"];
            product.stock = +product.stock;
            product.price = +product.price;
            product.discountPercentage = +product.discountPercentage;
            product.id = id;

            if (id) {
              dispatch(updateProductAsync(product));
              toast.success("Product Updated Successfully", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
                transition: Flip,
              });
            } else {
              dispatch(createProductAsync(product));
              toast.success("Product Created", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Flip,
              });
            }

            setSubmitted(true);
          })}
        >
          
          <div className="space-y-12">
            {selectedProduct && selectedProduct.deleted ? <h2 className="font-semibold text-red-600">
              ! This Product is deleted
            </h2>:null}
            
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("title", {
                          required: "Title is Required",
                          message: "Title is Required",
                        })}
                        id="title"
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      {errors.title && (
                        <p className="text-red-500 relative top-9 right-[18rem]">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is Required",
                        message: "Description is Required",
                      })}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                    {errors.description && (
                      <p className="text-red-500 relative top-9 right-[18rem]">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about product.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price ( in $ Dollars )
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is Required",
                          max: 10000000,
                          min: 0.1,
                          pattern: {
                            message: "Please provide Price in range",
                          },
                        })}
                        id="price"
                        autoComplete="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      {errors.price && (
                        <p className="text-red-500 relative top-9 right-[18rem]">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="discountPercentage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount %
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        {...register("discountPercentage", {
                          required: "Discount % is Required",
                          message: "Discount % is Required",
                        })}
                        id="discountPercentage"
                        autoComplete="discountPercentage"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      {errors.discountPercentage && (
                        <p className="text-red-500 relative top-9 right-[18rem]">
                          {errors.discountPercentage.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Available Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        {...register("stock", {
                          required: "Available stock is Required",
                          message: "Available stock is Required",
                        })}
                        id="stock"
                        autoComplete="stock"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                      {errors.stock && (
                        <p className="text-red-500 relative top-9 right-[18rem]">
                          {errors.stock.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    {...register("brand", {
                      required: "Brand is Required",
                      message: "Brand is Required",
                    })}
                  >
                    <option value="">-- Choose Brand --</option>
                    {brands.map((v, i) => (
                      <option value={v.value} key={i}>
                        {v.value}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="text-red-500 relative top-9 right-[18rem]">
                      {errors.brand.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    {...register("category", {
                      required: "Category is Required",
                      message: "Category is Required",
                    })}
                  >
                    <option value="">-- Choose Category --</option>
                    {categories.map((v, i) => (
                      <option value={v.value} key={i}>
                        {v.value}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 relative top-9 right-[18rem]">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Rating
                  </label>
                  {/* <div className="mt-2"> */}
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("rating", {
                        required: "rating is Required",
                        message : "rating is Required",
                      })}
                      id="rating"
                      autoComplete="rating"
                      className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                      placeholder="Rating of Product"
                    />
                    {errors.rating && (
                      <p className="text-red-500 relative top-9 right-[18rem]">
                        {errors.rating.message}
                      </p>
                    )}
                  </div>
                  {/* </div> */}
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("thumbnail", {
                          required: "Thumbnail is Required",
                          message: "Thumbnail is Required",
                        })}
                        id="thumbnail"
                        autoComplete="thumbnail"
                        className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                        placeholder="Link of Thumbnail"
                      />
                      {errors.thumbnail && (
                        <p className="text-red-500 relative top-9 right-[18rem]">
                          {errors.thumbnail.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("image1", {})}
                        id="image1"
                        autoComplete="image1"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Link of Image1"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("image2", {})}
                        id="image2"
                        autoComplete="image2"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Link of Image2"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("image3", {})}
                        id="image3"
                        autoComplete="image3"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Link of Image3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to={"/admin"}>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900 bg-gray-300 px-2 py-1 rounded-md mb-5"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mb-5"
            >
              Save
            </button>
            {selectedProduct && (
              <button
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mb-5"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
