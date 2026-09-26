import { useState } from "react";

const NavBar = ({ logo, links = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      {/* everything else goes here */}
      {/* The logos and desktop links */}
      <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shrink-0 font-bold text-1 text-gray-800">{logo}</div>
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* hamburger button */}

        <button
          className="md:hidden text-gray-600 text-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "x" : "☰"}
        </button>

        {/* menu dropdown*/}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-grey-600 hover:text-blue-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
