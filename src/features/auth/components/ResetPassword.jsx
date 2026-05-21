import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  loginUserAsync,
  resetPasswordAsync,
  resetPasswordRequestAsync,
} from "../authSlice";
import globalcart from "../../../images/gc.png";
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
  // console.log("TOken", token);
  // console.log("Email", email);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {passwordReset && (
        <Navigate to={"/reset-password-success"} replace={true} />
      )}
      {token && email ? (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50/50">
          <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-10 rounded-[2rem] md:rounded-3xl shadow-2xl border border-gray-100/50">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-12 md:h-16 w-auto"
                  src={globalcart}
                  alt="GlobalCart"
                />
                <h2 className="mt-4 md:mt-6 text-center text-2xl md:text-3xl font-black leading-9 tracking-tight text-gray-900">
                  Enter New Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Please enter your new password below.
                </p>
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  noValidate
                  className="space-y-6"
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      resetPasswordAsync({
                        email,
                        token,
                        password: data.password,
                      }),
                    );
                  })}
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: `- at least 8 characters\n
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                        - Can contain special characters`,
                          },
                        })}
                        type={passwordVisible ? "text" : "password"}
                        className="block w-full rounded-xl md:rounded-2xl border-0 py-2.5 md:py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6 pr-12"
                      />

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {passwordVisible ? (
                          <EyeSlashIcon
                            className="text-gray-400 w-6 h-6 cursor-pointer hover:text-gray-600"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <EyeIcon
                            className="text-gray-400 w-6 h-6 cursor-pointer hover:text-gray-600"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1 whitespace-pre-line">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium leading-6 text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2 relative">
                      <input
                        id="confirm-password"
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value, formValues) =>
                            value === formValues.password ||
                            "Password not matching",
                        })}
                        type={passwordVisible ? "text" : "password"}
                        className="block w-full rounded-xl md:rounded-2xl border-0 py-2.5 md:py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6 pr-12"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {passwordVisible ? (
                          <EyeSlashIcon
                            className="text-gray-400 w-6 h-6 cursor-pointer hover:text-gray-600"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <EyeIcon
                            className="text-gray-400 w-6 h-6 cursor-pointer hover:text-gray-600"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-xl md:rounded-2xl bg-indigo-600 px-4 py-2.5 md:py-3 text-sm md:text-base font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 uppercase tracking-wider"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50/50 px-4 sm:px-0">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-3xl shadow-xl text-center mx-4 sm:mx-0 w-full sm:max-w-md">
            <p className="text-red-500 font-bold text-base md:text-lg">Incorrect or Expired Link</p>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Please request a new password reset link.</p>
            <Link to="/forgot-password" class="mt-4 md:mt-6 inline-block text-indigo-600 hover:text-indigo-500 font-semibold text-sm md:text-base">
              Go to Forgot Password
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
