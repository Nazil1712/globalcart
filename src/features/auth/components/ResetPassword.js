import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  loginUserAsync,
  resetPasswordAsync,
  resetPasswordRequestAsync,
} from "../authslice";
import globalcart from "../../../images/logo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const passwordReset = useSelector((state) => state.auth.passwordReset);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const error = useSelector((state) => state.auth.error);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  console.log("TOken", token);
  console.log("Email", email);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {passwordReset && <Navigate to={"/reset-password-success"} replace={true} />}
      {token && email ? (
        <div>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-20 w-auto"
                src={globalcart}
                alt="Your Company"
              />
              {/* <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              /> */}
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Enter New Password
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                noValidate
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(
                    resetPasswordAsync({
                      email,
                      token,
                      password: data.password,
                    })
                  );
                })}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      {...register("password", {
                        required: "password is required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                        },
                      })}
                      type={passwordVisible ? "text" : "password"}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    {passwordVisible ? (
                      <EyeSlashIcon
                        className="text-gray-600 w-6 h-6 relative bottom-8 left-[350px] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeIcon
                        className="text-gray-600 w-6 h-6 relative bottom-8 left-[350px] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      {...register("confirmPassword", {
                        required: "confirmPassword is required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password not matching",
                      })}
                      type={passwordVisible ? "text" : "password"}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {passwordVisible ? (
                      <EyeSlashIcon
                        className="text-gray-600 w-6 h-6 relative bottom-8 left-[350px] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeIcon
                        className="text-gray-600 w-6 h-6 relative bottom-8 left-[350px] cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    {/* {passwordReset === true && (
                      <p className="text-green-500">
                        Password reset Succcessfully
                      </p>
                    )} */}
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Incorrect Link</p>
      )}
    </>
  );
};

export default ResetPassword;
