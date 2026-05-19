import { motion } from "framer-motion";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const ContactUsPage = () => {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      <Navbar>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 mb-16 premium-shadow">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/30" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-32 -mb-32" />

            <div className="relative px-8 py-20 lg:px-20 lg:py-24 text-center">
              <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-[10px] font-black text-indigo-400 tracking-widest uppercase mb-8">
                Contact Us
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                Let's start a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Conversation
                </span>
                .
              </h1>
              <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
                Have a question, feedback, or just want to say hello? We'd love
                to hear from you.
              </p>
            </div>
          </div>

          {/* Contact Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form (Takes 2 cols) */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-gray-100/50">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Send us a message
                </h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-2 block w-full rounded-2xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-12"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-2 block w-full rounded-2xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-12"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium leading-6 text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="mt-2 block w-full rounded-2xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-12"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium leading-6 text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="mt-2 block w-full rounded-2xl border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Your message here..."
                      defaultValue={""}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300 uppercase tracking-wider"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

              {/* Contact Info (Takes 1 col) */}
              <div className="space-y-8">
                {/* Info Card */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-100/50">
                  <h2 className="text-xl font-black text-slate-900 mb-6 tracking-tight">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <EnvelopeIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Email
                        </p>
                        <p className="text-sm text-slate-500">
                          support@globalcart.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <PhoneIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Phone
                        </p>
                        <p className="text-sm text-slate-500">+91 8469026605</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <MapPinIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Address
                        </p>
                        <p className="text-sm text-slate-500">
                          203 Anam Heights
                          <br />
                          India, Gujarat, Vadodara - 390017
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-600/10 blur-[50px] rounded-full -mr-20 -mt-20" />
                  <h2 className="text-xl font-black mb-4 relative z-10">
                    Opening Hours
                  </h2>
                  <div className="space-y-2 text-sm text-slate-400 relative z-10">
                    <div className="flex justify-between">
                      <span>Daily (Mon - Sun)</span>
                      <span className="text-white font-bold">9:00 AM - 9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Navbar>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
