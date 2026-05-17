import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import globalcart from "../../images/gc.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/" },
        { name: "New Arrivals", href: "/" },
        { name: "Featured", href: "/" },
        { name: "Offers", href: "/" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Order Status", href: "/orders" },
        { name: "Shipping & Delivery", href: "/" },
        { name: "Returns", href: "/" },
        { name: "Contact Us", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/" },
        { name: "Careers", href: "/" },
        { name: "Sustainability", href: "/" },
        { name: "Terms of Service", href: "/" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "F", href: "#" },
    { name: "Twitter", icon: "T", href: "#" },
    { name: "Instagram", icon: "I", href: "#" },
    { name: "LinkedIn", icon: "L", href: "#" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
                Join our newsletter
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Get the latest updates on new products and exclusive offers
                delivered to your inbox.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <form className="sm:flex max-w-md">
                <input
                  type="email"
                  required
                  className="w-full bg-slate-800 border-transparent rounded-2xl px-5 py-4 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-slate-700 transition-all"
                  placeholder="Enter your email"
                />
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-indigo-600 border border-transparent rounded-2xl py-4 px-8 flex items-center justify-center text-base font-black text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all uppercase tracking-widest"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div>
                <img
                  src={globalcart}
                  className="h-10 w-auto"
                  alt="GlobalCart Logo"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">
                Global <span className="text-indigo-500">Cart</span>
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-sm">
              Your ultimate destination for premium lifestyle products. Quality,
              style, and exceptional service in every box.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -5, color: "#6366f1" }}
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-all"
                >
                  <span className="font-bold">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-indigo-400 transition-colors font-medium flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} GlobalCart. Developer with ❤️ by{" "}
            <Link
              to={"https://www.linkedin.com/in/nazil-dhalwala-267586223/"}
              className="text-white font-bold"
            >
              {" "}
              Nazil 1712{" "}
            </Link>
            .
          </p>
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                alt="Play Store"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                alt="App Store"
                className="h-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </div>
            <div className="h-4 w-px bg-slate-800 hidden md:block" />
            <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span className="hover:text-white cursor-pointer transition-colors">
                Privacy
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Terms
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
