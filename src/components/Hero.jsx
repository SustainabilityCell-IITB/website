import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="/~sustainabilitycell/images/main-background.webp"
          alt="Sustainability Cell Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Sustainability Cell
              <span className="block text-[#9CCC5A]">IIT Bombay</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Empowering sustainable practices and environmental consciousness through 
              innovation, education, and action.
            </p>
            <a
              href="#about"
              className="inline-block bg-[#9CCC5A] text-[#1B4332] font-semibold px-8 py-3 rounded-lg hover:bg-white transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
