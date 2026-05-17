import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUserAsync, resetPasswordRequestAsync } from "../authSlice";
import globalcart from "../../../images/gc.png";
import { motion } from "framer-motion";

const Forgotpassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const mailSent = useSelector((state) => state.auth.mailSent);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-30" />
      </div>

      {mailSent && <Navigate to={"/email-sent"} replace={true} />}
      
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
          {/* <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              /> */}
          <h2 className="mt-8 text-center text-3xl font-black text-white tracking-tight">
          Reset Password
          </h2>
          <p className="mt-2 text-center text-slate-400 font-medium">
            Enter your email to receive a reset link
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
              dispatch(resetPasswordRequestAsync(data.email));
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-slate-300 ml-1 mb-2"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  type="email"
                  placeholder="name@company.com"
                  className="block w-full rounded-2xl border-white/10 bg-slate-950/50 py-3.5 px-4 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm transition-all"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                {/* {mailSent === true && (
                  <p className="text-green-500">Mail Sent</p>
                )} */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-2xl bg-indigo-600 px-4 py-4 text-sm font-bold leading-6 text-white shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Send Email
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-bold text-slate-400">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Forgotpassword;
