import { useState, useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const navigate = useNavigate()
  // Boolean login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_superuser");
    setIsLoggedIn(false);

    // ✅ Broadcast logout to other components
    window.dispatchEvent(new Event("authChange"));

    setIsOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const checkUser = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };

    checkUser();

    // ✅ Listen for login/logout changes
    window.addEventListener("authChange", checkUser);
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("authChange", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <nav
          className="
        bg-blue-900 text-white p-8 flex items-center justify-between shadow-md
      "
        >
          <div className="text-sm md:text-xl lg:text-3xl font-semibold">
            Mom Admin Dashboard
          </div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block text-sm md:text-xl 
              lg:text-3xl px-3 py-2 mt-2 bg-red-600
               hover:bg-green-700 rounded-lg text-center 
               transition-colors duration-200"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-sm md:text-xl 
              lg:text-3xl px-3 py-2 mt-2 bg-green-600
               hover:bg-green-700 rounded-lg text-center 
               transition-colors duration-200"
            >
              Sign in
            </Link>
          )}
        </nav>

        <div className="absolute">
          {/* Floating toggle button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            initial={{ x: 0 }}
            animate={{ x: isOpen ? 240 : 0 }}
            exit={{ y: -800, opacity: 0 }} // exit animation
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute  z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          >
            <motion.i
              className="bi bi-list text-2xl"
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Sidebar */}
          <motion.aside
            initial={{ y: -800 }}
            animate={{ y: isOpen ? 0 : -800 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              opacity: 0,
            }}
            className="bg-gray-900 text-white max-h-screen p-3 absolute top-0 shadow-lg z-40"
            style={{ width: 240 }}
          >
            <nav className="mt-15 flex flex-col gap-1">
              {/* Individual divs for each menu item */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                exit={{ y: -800, opacity: 0 }} // exit animation
                transition={{ delay: 0.05 }}
              >
                <Link
                  to="/dashboard"
                  className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <i className="bi-house text-xl mr-3"></i>
                  {isOpen && <span>Dashboard</span>}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/events"
                  className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <i className="bi-image text-xl mr-3"></i>
                  {isOpen && <span>Events</span>}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  to="/videos"
                  className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <i className="bi-camera-video text-xl mr-3"></i>
                  {isOpen && <span>Videos</span>}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/book"
                  className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <i className="bi-book text-xl mr-3"></i>
                  {isOpen && <span>Books</span>}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/contact"
                  className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <i className="bi-envelope text-xl mr-3"></i>
                  {isOpen && <span>Contacts</span>}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  to="/testimonyform"
                  className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <i className="bi-people text-xl mr-3"></i>
                  {isOpen && <span>Testimonials</span>}
                </Link>
              </motion.div>
            </nav>
          </motion.aside>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
};
