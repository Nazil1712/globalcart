import { motion } from "framer-motion";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import { SparklesIcon, GlobeAltIcon, HeartIcon } from "@heroicons/react/24/outline";
import globalCartShop from "../images/global_cart_shop.png";

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
          <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-slate-900 mb-8 md:mb-16 premium-shadow mx-2 md:mx-0">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/30" />
            <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -mr-24 md:-mr-48 -mt-24 md:-mt-48 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-600/10 blur-[100px] rounded-full -ml-16 md:-ml-32 -mb-16 md:-mb-32" />

            <div className="relative px-4 py-10 md:px-8 md:py-20 lg:px-20 lg:py-24 text-center">
              <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] md:text-[10px] font-black text-indigo-400 tracking-widest uppercase mb-4 md:mb-8">
                Our Story
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-4 md:mb-8 tracking-tighter">
                We are redefining the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 block sm:inline">
                  E-Commerce
                </span>{" "}
                Experience.
              </h1>
              <p className="text-slate-400 text-sm md:text-lg lg:text-xl font-medium leading-relaxed mb-4 md:mb-10 max-w-2xl mx-auto">
                GlobalCart is a curated destination for premium lifestyle products. We believe in quality, style, and exceptional service.
              </p>
            </div>
          </div>

          {/* Main Story Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
            <div className="max-w-3xl space-y-4 md:space-y-6">
              <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1 text-[10px] md:text-xs rounded-full font-bold text-indigo-600 uppercase tracking-widest">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                To bring the world's finest products to your doorstep.
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Founded in 2026, GlobalCart started with a simple idea: to make premium, high-quality goods accessible to everyone who appreciates exceptional design and craftsmanship. We curate every item with strict quality standards, ensuring you receive only the absolute best.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12">
              <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white premium-shadow hover:scale-105 transition-transform duration-300">
                <h3 className="text-3xl md:text-4xl font-black text-indigo-600 mb-1">10K+</h3>
                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">Curated Products</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white premium-shadow hover:scale-105 transition-transform duration-300">
                <h3 className="text-3xl md:text-4xl font-black text-indigo-600 mb-1">50K+</h3>
                <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">Happy Customers</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white premium-shadow hover:scale-105 transition-transform duration-300">
                <h3 className="text-4xl font-black text-indigo-600 mb-1">100+</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Global Brands</p>
              </div>
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white premium-shadow hover:scale-105 transition-transform duration-300">
                <h3 className="text-4xl font-black text-indigo-600 mb-1">24/7</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Premium Support</p>
              </div>
            </div>
          </div>

          {/* Full Shop Image Showcase */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
            <div className="relative">
              {/* Neon Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 blur-3xl opacity-10 -z-10 rounded-[3rem]" />
              
              {/* Styled Image Frame */}
              <div className="relative p-3 bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] lg:rounded-[3rem] premium-shadow group">
                <div className="overflow-hidden rounded-[2rem] lg:rounded-[2.2rem] aspect-[16/10] md:aspect-[16/9] relative">
                  <img
                    src={globalCartShop}
                    alt="GlobalCart Flagship Store"
                    className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                  />
                  {/* Subtle glass overlay on hover - Desktop only */}
                  <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Glass Card Details - Desktop */}
                  <div className="hidden lg:flex absolute bottom-10 left-10 right-10 flex-row items-end justify-between gap-6 z-10">
                    <div className="space-y-2 text-left">
                      <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg shadow-indigo-600/30">
                        Our Flagship Boutique
                      </span>
                      <h3 className="text-3xl font-black text-white drop-shadow-sm">
                        Discover the Future of Shopping
                      </h3>
                      <p className="text-slate-200 text-sm max-w-xl font-medium drop-shadow-sm">
                        Experience our physical showroom where technology meets premium lifestyle. Explore verified collections in person.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3 rounded-2xl w-fit">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="text-left">
                        <p className="text-[10px] font-black text-white uppercase tracking-wider">Status</p>
                        <p className="text-xs font-bold text-slate-200">Open Daily: 9 AM - 9 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glass Card Details - Mobile/Tablet */}
                <div className="flex lg:hidden flex-col gap-4 mt-5 px-3 pb-2 text-center md:text-left md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 md:px-3.5 md:py-1.5 rounded-full">
                      Our Flagship Boutique
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900">
                      Discover the Future of Shopping
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm max-w-xl font-medium mx-auto md:mx-0">
                      Experience our physical showroom where technology meets premium lifestyle. Explore verified collections in person.
                    </p>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3 bg-slate-50 border border-slate-100 px-4 py-2.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl w-full md:w-fit mt-2 md:mt-0">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="text-left">
                      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</p>
                      <p className="text-[10px] md:text-xs font-bold text-slate-700">Open Daily: 9 AM - 9 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] py-16 px-6 md:py-24 md:px-8 lg:px-20 mb-16 md:mb-24 relative overflow-hidden mx-2 md:mx-0">
            <div className="absolute top-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -ml-16 md:-ml-32 -mt-16 md:-mt-32" />
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-10 md:mb-16">
                <span className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-widest mb-3 md:mb-4 block">
                  Core Values
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight">
                  What drives us forward.
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Value 1 */}
                <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <SparklesIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 md:mb-4">Uncompromised Quality</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    We never compromise on quality. Every product is thoroughly vetted to ensure it meets our high standards.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <GlobeAltIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 md:mb-4">Sustainability</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    We care about our planet. We partner with brands that prioritize eco-friendly practices and materials.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="glass-dark p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all group flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center text-pink-400 mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <HeartIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 md:mb-4">Customer First</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
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
