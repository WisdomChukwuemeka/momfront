import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-md border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="text-center md:text-left text-sm">
          &copy; {new Date().getFullYear()} AdminPortal. All rights reserved.
        </div>

        {/* Right side */}
        <div className="flex gap-6">
          <a href="/" className="hover:text-green-500 transition-colors text-sm">
            Privacy Policy
          </a>
          <a href="/" className="hover:text-green-500 transition-colors text-sm">
            Terms of Service
          </a>
          <a href="/" className="hover:text-green-500 transition-colors text-sm">
            About
          </a>
          <a href="/" className="hover:text-green-500 transition-colors text-sm">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
