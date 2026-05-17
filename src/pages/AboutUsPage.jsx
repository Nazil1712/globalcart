import { motion } from "framer-motion";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import { SparklesIcon, GlobeAltIcon, HeartIcon } from "@heroicons/react/24/outline";

const AboutUsPage = () => {
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
                Our Story
              </span>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                We are redefining the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  E-Commerce
                </span>{" "}
                Experience.
              </h1>
              <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
                GlobalCart is a curated destination for premium lifestyle products. We believe in quality, style, and exceptional service.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 block">
                  Our Mission
                </span>
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                  To bring the world's finest products to your doorstep.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Founded in 2026, GlobalCart started with a simple idea: to make premium, high-quality goods accessible to everyone who appreciates exceptional design and craftsmanship.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We scour the globe to find brands and artisans that share our passion for quality and sustainability. Every item in our collection is handpicked and verified to meet our rigorous standards.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 blur-2xl opacity-10" />
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-3xl font-black text-indigo-600 mb-2">10K+</h3>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Curated Products</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-indigo-600 mb-2">50K+</h3>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Happy Customers</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-indigo-600 mb-2">100+</h3>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Global Brands</p>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-indigo-600 mb-2">24/7</h3>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-slate-900 rounded-[3.5rem] py-24 px-8 lg:px-20 mb-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -ml-32 -mt-32" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 block">
                  Core Values
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
                  What drives us forward.
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Value 1 */}
                <div className="glass-dark p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                    <SparklesIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Uncompromised Quality</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We never compromise on quality. Every product is thoroughly vetted to ensure it meets our high standards.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="glass-dark p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                    <GlobeAltIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Sustainability</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We care about our planet. We partner with brands that prioritize eco-friendly practices and materials.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="glass-dark p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                    <HeartIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Customer First</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Our customers are at the heart of everything we do. We strive to provide an exceptional experience from click to delivery.
                  </p>
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

export default AboutUsPage;
