import React from "react";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

export default function Projects() {
  const projects = [
    {
      title: "Green Cup Initiative",
      description: "A comprehensive competition among hostels to promote sustainable practices and reduce environmental impact.",
      image: "/website/images/greenCup.webp",
      impact: "Reduced waste by 30% across hostels"
    },
    {
      title: "Air Quality Monitoring",
      description: "Implementation of air quality monitoring systems across campus to track and improve air quality.",
      image: "/website/images/airathon.webp",
      impact: "Real-time air quality data available"
    },
    {
      title: "Waste Management",
      description: "Development of an efficient waste segregation and management system for the entire campus.",
      image: "/website/images/foodw.webp",
      impact: "Increased recycling rate by 40%"
    },
    {
      title: "Energy Conservation",
      description: "Implementation of smart energy management systems to optimize power consumption.",
      image: "/website/images/LHC door.webp",
      impact: "Reduced energy consumption by 25%"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Our Projects"
          description="Explore our innovative projects that are making a real impact on campus sustainability and environmental conservation."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1B4332] mb-3 group-hover:text-[#9CCC5A] transition-colors duration-300">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center text-[#9CCC5A]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="font-medium">{project.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
