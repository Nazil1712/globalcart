import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import globalcart from "../../images/gc.png";
import globalCartText from "../../images/gc_text.png";

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
        { name: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        // { name: "Careers", href: "/" },
        { name: "Sustainability", href: "/" },
        { name: "Terms of Service", href: "/" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.65 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.89h-2.33v6.99C18.35 21.12 22 16.99 22 12z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.341 3.608 1.316.975.975 1.254 2.242 1.316 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.341 2.633-1.316 3.608-.975.975-2.242 1.254-3.608 1.316-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.341-3.608-1.316-.975-.975-1.254-2.242-1.316-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.341-2.633 1.316-3.608.975-.975 2.242-1.254 3.608-1.316 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.668.014-4.947.072-1.325.06-2.557.346-3.486 1.275-.929.929-1.215 2.16-1.275 3.486-.058 1.279-.072 1.688-.072 4.947s.014 3.668.072 4.947c.06 1.325.346 2.557 1.275 3.486.929.929 2.16 1.215 3.486 1.275 1.279.058 1.688.072 4.947.072s3.668-.014 4.947-.072c1.325-.06 2.557-.346 3.486-1.275.929-.929 1.215-2.16 1.275-3.486.058-1.279.072-1.688.072-4.947s-.014-3.668-.072-4.947c-.06-1.325-.346-2.557-1.275-3.486-.929-.929-2.16-1.215-3.486-1.275-1.279-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c0 .796-.646 1.442-1.442 1.442-.796 0-1.442-.646-1.442-1.442 0-.796.646-1.442 1.442-1.442.796 0 1.442.646 1.442 1.442z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.026-3.058-1.864-3.058-1.865 0-2.151 1.458-2.151 2.961v5.701h-3v-11h2.88v1.503h.04c.401-.76 1.381-1.56 2.842-1.56 3.039 0 3.602 2.001 3.602 4.603v6.454z" />
        </svg>
      ),
      href: "#",
    },
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
              {/* <span className="text-2xl font-black text-white tracking-tighter">
                Global <span className="text-indigo-500">Cart</span>
              </span> */}
              <span className="text-2xl font-black text-white tracking-tighter">
                <img src={globalCartText} className="w-[270px]" />
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
                  {social.icon}
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
                      className="text-slate-400 hover:text-indigo-400 transition-colors font-medium relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
                    >
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
            © {currentYear} GlobalCart. Developed with ❤️ by{" "}
            <Link
              to={"https://www.linkedin.com/in/nazil-dhalwala-267586223/"}
              className="text-white font-bold relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
            >
              {" "}
              Nazil{" "}
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
              <span className="hover:text-white cursor-pointer transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">
                Privacy
              </span>
              <span className="hover:text-white cursor-pointer transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">
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
