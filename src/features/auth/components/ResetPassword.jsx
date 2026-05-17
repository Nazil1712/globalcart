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
import { motion } from "framer-motion";

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
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-30 animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-30" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sm:mx-auto sm:w-full sm:max-w-md"
          >
            <img
              className="mx-auto h-20 w-auto"
              src={globalcart}
              alt="Your Company"
            />
            <h2 className="mt-8 text-center text-3xl font-black text-white tracking-tight">
              Enter New Password
            </h2>
            <p className="mt-2 text-center text-slate-400 font-medium">
              Create a strong password for your account
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 sm:mx-auto sm:w-full sm:max-w-md"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl py-10 px-8 premium-shadow rounded-[2.5rem] border border-white/10">
              <form
                noValidate
                className="space-y-6"
                onSubmit={handleSubmit((data) => {
                  // console.log(data);
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
                  <div className="flex items-center justify-between ml-1 mb-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-slate-300"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
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
                      placeholder="••••••••"
                      className="block w-full rounded-2xl border-white/10 bg-slate-950/50 py-3.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm transition-all"
                    />

                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      {passwordVisible ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-xs font-bold text-red-500 ml-1 leading-relaxed">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between ml-1 mb-2">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-bold text-slate-300"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      {...register("confirmPassword", {
                        required: "confirmPassword is required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password not matching",
                      })}
                      type={passwordVisible ? "text" : "password"}
                      placeholder="••••••••"
                      className="block w-full rounded-2xl border-white/10 bg-slate-950/50 py-3.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm transition-all"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-xs font-bold text-red-500 ml-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {error && <p className="mt-2 text-xs font-bold text-red-500 ml-1">{error}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-2xl bg-indigo-600 px-4 py-4 text-sm font-bold leading-6 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      ) : (
        <p>Incorrect Link</p>
      )}
    </>
  );
};

export default ResetPassword;
