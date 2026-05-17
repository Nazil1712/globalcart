import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUserAsync } from "../authSlice";
import globalcart from "../../../images/gc.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserToken = useSelector(
    (state) => state.auth.loggedInUserToken,
  );
  const error = useSelector((state) => state.auth.error);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // console.log("On login page");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-30" />
      </div>

      {loggedInUserToken && <Navigate to={"/"} replace={true} />}

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
        <h2 className="text-center text-4xl font-black text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-slate-400 font-medium">
          Enter your details to access your account
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
              dispatch(
                loginUserAsync({ email: data.email, password: data.password }),
              );
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-300 ml-1 mb-2"
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
                className="block w-full rounded-2xl border-white/10 bg-slate-950/50 py-3.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm transition-all"
              />
              {errors.email && (
                <p className="mt-2 text-xs font-bold text-red-500 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between ml-1 mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-300"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
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
                <p className="mt-2 text-xs font-bold text-red-500 ml-1">
                  {errors.password.message}
                </p>
              )}
              {error && (
                <p className="mt-2 text-xs font-bold text-red-500 ml-1">
                  {error.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="flex w-full justify-center rounded-2xl bg-indigo-600 px-4 py-4 text-sm font-bold leading-6 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
                <span className="bg-slate-900 px-4 text-slate-500">
                  New here?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="flex w-full justify-center rounded-2xl bg-white/5 px-4 py-4 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-white/10 hover:bg-white/10 transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
