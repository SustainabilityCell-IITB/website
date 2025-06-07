import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#events", label: "Events" },
    { href: "#implementations", label: "Implementations" },
    { href: "#team", label: "Contact" }
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img
                src="/images/Scell-Logo.svg"
                alt="Sustainability Cell Logo"
                className={`h-16 w-auto transition-all duration-300 ${
                  isScrolled ? "opacity-100" : "opacity-90"
                }`}
              />
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium transition-all duration-200 ${
                    isScrolled
                      ? "text-[#1B4332] hover:text-[#9CCC5A]"
                      : "text-white hover:text-[#9CCC5A]"
                  } relative group`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9CCC5A] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#9CCC5A] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-white hover:text-[#9CCC5A]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
