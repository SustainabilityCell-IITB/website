import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

export default function Implementations() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const implementations = [
    {
      title: "EV Buggy Stops",
      shortDescription: "Strategic implementation of EV buggy stops at high-traffic areas for optimized usage and enhanced efficiency.",
      fullDescription: "EV buggy stops were strategically implemented at high-traffic areas, including the Lecture Hall Complex and student residential zones. This initiative aimed to optimize their usage by ensuring convenient access while enhancing battery efficiency and reducing idle time.",
      image: "images/EV stop.webp"
    },
    {
      title: "AC Optimization in LHC",
      shortDescription: "New doors installed in Lecture Hall Complex to enhance insulation and reduce energy consumption.",
      fullDescription: "To reduce energy consumption, new doors were installed in the Lecture Hall Complex, enhancing insulation and minimizing energy loss. The installation has been completed, with additional improvements planned to further optimize efficiency.",
      image: "images/LHC door.webp"
    },
    {
      title: "Waste Data Display Boards in Mess",
      shortDescription: "Waste display boards integrated in hostels to track and reduce food wastage.",
      fullDescription: "Waste Display boards have been successfully integrated into every hostel, providing a transparent view of daily food wastage. By regularly calibrating and showcasing these figures, residents are actively engaged in understanding and reducing their environmental footprint.",
      image: "images/foodw.webp"
    },
    {
      title: "Tree Plantation",
      shortDescription: "Collaborative tree-plantation initiative with Team Shunya on Independence Day 2022.",
      fullDescription: "Teamed up with Team Shunya for a collaborative tree-plantation initiative, uniting sustainability-focused groups from institutes across India. Our joint effort, held on Independence Day 2022, aimed at fostering environmental consciousness and contributing to a greener future.",
      image: "images/treePlantation.webp"
    },
    {
      title: "Swacchta Pakhwada 2023",
      shortDescription: "Supported Government's Swachhta Pakhwada initiative with hostel cleanliness documentation.",
      fullDescription: "Assisted in the execution of the Swachhta Pakhwada observed by the Government of India from September 16 to September 30, mobilizing citizens to maintain high standards of cleanliness. The Sustainability Cell documented and reported hostel efforts both qualitatively and quantitatively.",
      image: "images/swachchtaPakhwada.webp"
    },
    {
      title: "Bin Segregation Project",
      shortDescription: "Waste bin segregation initiative launched with Hostel Affairs Council for efficient waste disposal.",
      fullDescription: "The Sustainability Cell, in association with the Hostel Affairs Council, launched a waste bin segregation initiative at IIT Bombay, promoting sustainability through efficient waste disposal and recycling. This reduces the campus's carbon footprint while enhancing resource conservation.",
      image: "images/binSegregation.webp"
    },
    {
      title: "Carbon Footprinting",
      shortDescription: "Collaborating with professors to assess IIT Bombay's carbon footprint across different scopes.",
      fullDescription: "We are working with Professors Vikram Vishal (Earth Science) and Arnab Dutta (Chemistry) to perform a carbon footprint assessment of IIT Bombay. The emission breakdown: 95% from Scope 2, 4.4% from Scope 1, and 0.6% from Scope 3.",
      image: "images/carbonFootprint.webp"
    },
    {
      title: "IITB Half Marathon",
      shortDescription: "Raised air pollution awareness at IITB Half Marathon with recycling initiatives.",
      fullDescription: "At the IITB Half Marathon on October 30th, #BreatheBetterMumbai raised awareness about air pollution. We partnered with a recycling organization for plastic bottle recycling and used waste cycle cardboard boxes to convey powerful pollution messages.",
      image: "images/hm.webp"
    },
    {
      title: "Green Cup Launch",
      shortDescription: "Launched Green Cup initiative with HA Council, engaging 100+ students.",
      fullDescription: "Collaborated with the HA Council to announce the official launch of the Green Cup. Students from all hostels attended, learning about its need, benefits, and scoring system. The event had 100+ attendees, formally kicking off the initiative in November.",
      image: "images/greenCup.webp"
    }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="implementations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Our Implementations"
          description="Explore our innovative implementations that are making a real impact on campus sustainability and environmental conservation."
        />

        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#1B4332] hover:bg-[#2D6A4F] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {implementations.map((implementation, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex-none w-[380px] snap-center"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group h-[400px]">
                  <div className="relative h-[400px] transition-all duration-500">
                    {/* Initial State */}
                    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                      <div className="h-52">
                        <img
                          src={implementation.image}
                          alt={implementation.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#1B4332] mb-3">
                          {implementation.title}
                        </h3>
                        <p className="text-gray-600">
                          {implementation.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Hover State */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white p-6">
                      <h3 className="text-xl font-bold text-[#1B4332] mb-4">
                        {implementation.title}
                      </h3>
                      <p className="text-gray-600">
                        {implementation.fullDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#1B4332] hover:bg-[#2D6A4F] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
} 