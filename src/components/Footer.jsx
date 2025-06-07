import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1B4332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sustainability Cell</h3>
            <p className="text-white/80">
              Empowering sustainable practices and environmental consciousness through 
              innovation, education, and action at IIT Bombay. Join us in creating a 
              greener, more sustainable future.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/80 hover:text-[#9CCC5A] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="text-white/80 hover:text-[#9CCC5A] transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/80 hover:text-[#9CCC5A] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#team" className="text-white/80 hover:text-[#9CCC5A] transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-[#9CCC5A] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                sustainability@iitb.ac.in
              </li>
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                IIT Bombay, Powai, Mumbai
              </li>
              <li className="flex items-center text-white/80">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 22 2572 2545
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Sustainability Cell, IIT Bombay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
