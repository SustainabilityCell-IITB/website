import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      title: "Airathon Mumbai 2022",
      description: "Collaborating with the Institute Technical Council and sponsored by Fitizen India, we conducted a Pan India competition to enhance Mumbai's air quality. With two tracks—Technical and Campaign—participants showcased innovative strategies and awareness campaigns.",
      image: "/images/airathon.webp",
      date: "October 2022",
      location: "IIT Bombay Campus",
      category: "competition",
      stats: {
        prize: "₹60,000",
        submissions: "150+",
        achievement: "Asia's largest and world's second-largest air quality competition"
      }
    },
    {
      title: "ESG Workshop",
      description: "Conducted an enlightening workshop on 'People, Planet, and Profits' by Captain Tapas Majumdar, aimed at raising awareness about the emerging ESG (Environmental, Social, and Governance) corporate sector.",
      image: "/images/esgWorkshop.webp",
      date: "March 2023",
      location: "Lecture Hall Complex",
      category: "workshop",
      stats: {
        participants: "80+",
        focus: "Business, sustainability, and societal well-being"
      }
    },
    {
      title: "Half Marathon in IITB",
      description: "At the IITB Half Marathon, #BreatheBetterMumbai took center stage, driving awareness on air pollution. Emphasizing sustainability, we partnered with a certified recycling organization for plastic bottle recycling.",
      image: "/images/halfmarathon.webp",
      date: "October 2023",
      location: "IIT Bombay Campus",
      category: "awareness",
      stats: {
        highlight: "Featured winning projects from Airathon Mumbai",
        impact: "Raised awareness about air pollution"
      }
    },
    {
      title: "Sustainability Cell Orientation",
      description: "Conducted an event (clubbed with the Green Cup Launch) to introduce Sustainability Cell to the students of IIT Bombay. Emphasis was given to raising awareness about why such a club is imperative to the future of the institute.",
      image: "/images/greenCup.webp",
      date: "August 2023",
      location: "PC Saxena Auditorium",
      category: "orientation",
      stats: {
        activities: "Interactive games and events",
        rewards: "Low-maintenance succulent plants as prizes"
      }
    },
    {
      title: "Youth in Climate Action",
      description: "Hemavathi Shekhar emphasized the pivotal role of youth in influencing global climate policies through active participation in UN conferences. She shared her experiences to inspire students to engage in international summits.",
      image: "/images/Youth in climate action.png",
      date: "October 2024",
      location: "Online",
      category: "talk",
      stats: {
        focus: "Global climate policies",
        impact: "Youth engagement in international summits"
      }
    },
    {
      title: "Environmental Defence Fund",
      description: "Paridhi Mishra highlighted exclusive sustainability opportunities available with leading companies such as Zomato, ITC, and Amazon. She shared insights into how these organizations are integrating climate-focused initiatives.",
      image: "/images/Defence event.webp",
      date: "October 2024",
      location: "Lecture Hall Complex",
      category: "talk",
      stats: {
        companies: "Zomato, ITC, Amazon",
        focus: "Sustainability career opportunities"
      }
    }
  ];

  const categories = [
    { id: "all", label: "All Events" },
    { id: "competition", label: "Competitions" },
    { id: "workshop", label: "Workshops" },
    { id: "awareness", label: "Awareness" },
    { id: "orientation", label: "Orientation" },
    { id: "talk", label: "Talks" }
  ];

  const filteredEvents = events.filter(event => 
    selectedCategory === "all" || event.category === selectedCategory
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="events" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Our Events"
          description="Discover our impactful events that bring together students, professionals, and the community to drive sustainable change and innovation."
        />

        {/* Category Filter Section */}
        <div className="mb-8 flex justify-center">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#1B4332] text-white"
                    : "bg-white text-[#1B4332] hover:bg-[#9CCC5A] hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#9CCC5A] text-[#1B4332] text-sm font-medium rounded-full">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                    <svg className="w-4 h-4 ml-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1B4332] mb-3 group-hover:text-[#9CCC5A] transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  
                  <div className="space-y-2">
                    {Object.entries(event.stats).map(([key, value]) => (
                      <div key={key} className="flex items-start">
                        <span className="text-[#9CCC5A] mr-2">•</span>
                        <span className="text-gray-600">
                          <span className="font-medium">{key}: </span>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 