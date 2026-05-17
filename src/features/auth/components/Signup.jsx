import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserAsync } from "../authSlice";
import globalcart from "../../../images/gc.png";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const signUpSuccess = useSelector((state) => state.auth.signUpSuccess);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>

      {/* {signUpSuccess && <Navigate to={"/login"} replace={true} />} */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Link to="/">
          <img
            className="mx-auto h-16 w-auto mb-8"
            src={globalcart}
            alt="GlobalCart"
          />
        </Link>
        <h2 className="text-center text-4xl font-black text-slate-900 tracking-tight">
          Join GlobalCart
        </h2>
        <p className="mt-2 text-center text-slate-500 font-medium">
          Create an account to start shopping premium products
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl py-10 px-8 premium-shadow rounded-[2.5rem] border border-white">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(async (data) => {
              const result = await dispatch(
                createUserAsync({
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                }),
              );

              if (result.meta.requestStatus === "fulfilled") {
                toast.success(
                  "Account created successfully! Please log in with your new credentials.",
                  {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  },
                );
                navigate("/login");
              }
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-700 ml-1 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                placeholder="name@company.com"
                className="block w-full rounded-2xl border-slate-200 bg-white/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
              />
              {errors.email && (
                <p className="mt-2 text-xs font-bold text-red-500 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-slate-700 ml-1 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message:
                        "Must be 8+ chars with uppercase, lowercase & number",
                    },
                  })}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className="block w-full rounded-2xl border-slate-200 bg-white/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
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
              <label
                htmlFor="confirm-password"
                className="block text-sm font-bold text-slate-700 ml-1 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match",
                  })}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className="block w-full rounded-2xl border-slate-200 bg-white/50 py-3.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs font-bold text-red-500 ml-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="flex w-full justify-center rounded-2xl bg-slate-900 px-4 py-4 text-sm font-bold leading-6 text-white shadow-xl hover:bg-indigo-600 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </motion.button>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
