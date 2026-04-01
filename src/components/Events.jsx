import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [displayLimit] = useState(6);

  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory, displayLimit]);

  const toggleDescription = (eventTitle) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [eventTitle]: !prev[eventTitle]
    }));
  };

  const events = [
    {
      title: "Winter Projects 2.0",
      description: "Winter Projects 2.0 gave students hands-on exposure to sustainability problem-solving in real organizational contexts. Structured around clear problem statements, participants applied practical frameworks across supply chains, ESG, climate analysis, and sustainable finance to produce outcome-driven deliverables.",
      image: "/~sustainabilitycell/images/Winter%20Projects%202025.jpg",
      date: "December 2025",
      location: "IIT Bombay",
      category: "competition",
      stats: {
        domains: "Supply chain, ESG, climate analysis, sustainable finance",
        approach: "Framework-led project execution",
        output: "Defined deliverables with real-world relevance"
      }
    },
    {
      title: "Freshers' Orientation 2025",
      description: "Sponsored by Roar for Good, the Sustainability Cell's Freshers' Orientation introduced first-year students to campus sustainability initiatives and participation opportunities. The session featured Green Cup launch moments, Green Score Calculator introduction, interactive quizzes, and engagement activities to encourage active contribution from day one.",
      image: "/~sustainabilitycell/images/Orientation%202025.png",
      date: "October 2025",
      location: "IIT Bombay",
      category: "orientation",
      stats: {
        sponsor: "Roar for Good",
        highlights: "Green Cup, Green Score Calculator, quizzes",
        goal: "Early student engagement in sustainability action"
      }
    },
    {
      title: "Green Cup Award Ceremony",
      description: "At the Green Cup award ceremony, updated scoring metrics were introduced to encourage stronger hostel-led sustainability initiatives through representation and on-ground action. The next Green Cup cycle was launched, and previous winners were recognized: Hostel 5 (winner), Hostel 13 (1st runner-up), and Hostel 17 (2nd runner-up).",
      image: "/~sustainabilitycell/images/Green%20Cup%20Award%20Ceremony.jpg",
      date: "October 2025",
      location: "IIT Bombay",
      category: "awareness",
      stats: {
        initiative: "Inter-hostel Green Cup flagship",
        update: "New scoring metrics for representation and initiatives",
        winners: "H5 winner, H13 runner-up, H17 second runner-up"
      }
    },
    {
      title: "Sustainium - Sustainability Product Case Competition",
      description: "Sustainium was organized with Elima as a flagship technical case competition focused on scalable e-waste recycling and polymer recovery solutions. Teams developed hardware-software integrated prototypes and proposed practical interventions for material circularity, applying engineering and systems thinking to real sustainability challenges.",
      image: "/~sustainabilitycell/images/Sustainium%202025.png",
      date: "October 2025",
      location: "IIT Bombay",
      category: "competition",
      stats: {
        collaboration: "In partnership with Elima",
        challenge: "E-waste recycling and polymer recovery",
        focus: "Scalable product-level sustainability solutions"
      }
    },
    {
      title: "Carbon Removal Workshop",
      description: "This workshop introduced students to nature-based and technology-driven carbon removal pathways, including forest and soil sequestration as well as direct air capture. In collaboration with REMOVE, a Europe-based climate accelerator, participants learned how early-stage ventures and research efforts create real-world climate impact.",
      image: "/~sustainabilitycell/images/Carbon%20Removal%20Workshop.png",
      date: "October 2025",
      location: "IIT Bombay",
      category: "workshop",
      stats: {
        methods: "Sequestration, direct air capture",
        collaboration: "REMOVE climate accelerator",
        outcome: "Startup and career insights in carbon removal"
      }
    },
    {
      title: "Careers in Sustainability Talk with Career Cell",
      description: "Organized jointly by the Sustainability Cell and Career Cell, this session explored purpose-driven careers in the green economy. Shubhankar Mihir Seth (IITB 2020, Sharad Maloo Memorial Gold Medalist) shared his journey from IIT Bombay to Stanford and his work at McKinsey, highlighting how technical and analytical skills can drive impact through ESG and climate-focused consulting.",
      image: "/~sustainabilitycell/images/Careers%20in%20Sustainability%20Session.png",
      date: "July 2025",
      location: "IIT Bombay",
      category: "talk",
      stats: {
        speaker: "Shubhankar Mihir Seth (IITB 2020)",
        focus: "ESG, climate consulting, career pathways",
        impact: "Bridged academic excellence with global sustainability impact"
      }
    },
    {
      title: "Learners' Space Course",
      description: "Under the Learners' Space 2025 (9th edition revamp), the Sustainability Cell collaborated with Career Cell, UGAC, and sustainability-focused student teams to run the Sustainability Summer School. The program covered sustainable technologies, policy, and economics through practical and interdisciplinary learning modules.",
      image: "/~sustainabilitycell/images/Learner%27s%20Space.png",
      date: "June 2025",
      location: "IIT Bombay",
      category: "workshop",
      stats: {
        collaboration: "Career Cell, UGAC, Team Shunya, Team Zero Waste",
        courses: "Technology, policy, and sustainability economics",
        format: "Interdisciplinary summer learning"
      }
    },
    {
      title: "Sustainium Case Competition",
      description: "A nationwide case competition organized in collaboration with Tarutium Global Consulting, focusing on innovative waste management solutions. Launched on 24th January via Unstop, it received 500+ registrations from across India. The event promoted practical problem-solving in sustainability, with winners receiving cash prizes and pre-placement interview (PPI) opportunities, bridging the gap between environmental challenges and industry engagement.",
  image: "/~sustainabilitycell/images/Sustainium.png",
      date: "January 2025",
      location: "Online",
      category: "competition",
      stats: {
        registrations: "500+",
        focus: "Innovative waste management solutions",
        rewards: "Cash prizes and PPI opportunities"
      }
    },
    {
      title: "Corporate-Oriented Projects",
      description: "Conducted two winter projects—'Think Like a CSO' and 'Think Like a Green Investor'—to promote corporate sustainability and green finance. With over 300 registrations from students nationwide, these initiatives offered experiential learning through real-world business scenarios. Participants tackled challenges aligned with corporate environmental responsibility, strengthening their analytical and sustainability-oriented decision-making skills in a corporate context.",
  image: "/~sustainabilitycell/images/Sustainability%20Projects.png",
      date: "December 2024",
      location: "Online",
      category: "competition",
      stats: {
        registrations: "300+",
        projects: "Think Like a CSO, Think Like a Green Investor",
        focus: "Corporate sustainability and green finance"
      }
    },
    {
      title: "Youth in Climate Action",
      description: "Hemavathi Shekhar emphasized the pivotal role of youth in influencing global climate policies through active participation in UN conferences. She shared her experiences to inspire students to engage in international summits.",
  image: "/~sustainabilitycell/images/Youth in climate action.png",
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
  image: "/~sustainabilitycell/images/Defence event.webp",
      date: "October 2024",
      location: "Lecture Hall Complex",
      category: "talk",
      stats: {
        companies: "Zomato, ITC, Amazon",
        focus: "Sustainability career opportunities"
      }
    },
    {
      title: "SustAInify",
      description: "SustAInify challenged participants to address real-world sustainability issues using machine learning. Held on 10th–11th February, the event offered ₹30,000 in cash prizes and saw enthusiastic participation from across India. The competition blended technology with environmental problem-solving, encouraging innovative, data-driven solutions to pressing climate and sustainability challenges.",
  image: "/~sustainabilitycell/images/Sustainify.png",
      date: "February 2024",
      location: "Online",
      category: "competition",
      stats: {
        prize: "₹30,000",
        focus: "Machine learning for sustainability",
        impact: "Data-driven climate solutions"
      }
    },
    {
      title: "Half Marathon in IITB",
      description: "At the IITB Half Marathon, #BreatheBetterMumbai took center stage, driving awareness on air pollution. Emphasizing sustainability, we partnered with a certified recycling organization for plastic bottle recycling.",
  image: "/~sustainabilitycell/images/halfmarathon.webp",
      date: "October 2023",
      location: "IIT Bombay Campus",
      category: "awareness",
      stats: {
        highlight: "Featured winning projects from Airathon Mumbai",
        impact: "Raised awareness about air pollution"
      }
    },
    {
      title: "ESG Workshop",
      description: "Conducted an enlightening workshop on 'People, Planet, and Profits' by Captain Tapas Majumdar, aimed at raising awareness about the emerging ESG (Environmental, Social, and Governance) corporate sector.",
  image: "/~sustainabilitycell/images/esgWorkshop.webp",
      date: "March 2023",
      location: "Lecture Hall Complex",
      category: "workshop",
      stats: {
        participants: "80+",
        focus: "Business, sustainability, and societal well-being"
      }
    },
    {
      title: "Sustainability Cell Orientation",
      description: "Conducted an event (clubbed with the Green Cup Launch) to introduce Sustainability Cell to the students of IIT Bombay. Emphasis was given to raising awareness about why such a club is imperative to the future of the institute.",
  image: "/~sustainabilitycell/images/greenCup.webp",
      date: "August 2023",
      location: "PC Saxena Auditorium",
      category: "orientation",
      stats: {
        activities: "Interactive games and events",
        rewards: "Low-maintenance succulent plants as prizes"
      }
    },
    {
      title: "Airathon Mumbai 2022",
      description: "Collaborating with the Institute Technical Council and sponsored by Fitizen India, we conducted a Pan India competition to enhance Mumbai's air quality. With two tracks—Technical and Campaign—participants showcased innovative strategies and awareness campaigns.",
  image: "/~sustainabilitycell/images/airathon.webp",
      date: "October 2022",
      location: "IIT Bombay Campus",
      category: "competition",
      stats: {
        prize: "₹60,000",
        submissions: "150+",
        achievement: "Asia's largest and world's second-largest air quality competition"
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

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, displayLimit);
  const hasMoreEvents = filteredEvents.length > displayLimit;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section id="events" className="py-20 bg-[linear-gradient(180deg,#f8f9fa_0%,#f4f7f5_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Our Events"
          description="Discover our impactful events that bring together students, professionals, and the community to drive sustainable change and innovation."
        />

        {/* Category Filter Section */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-[#d8e7da] text-sm text-[#2D6A4F] font-medium shadow-sm">
            Showing latest {showAll ? filteredEvents.length : Math.min(displayLimit, filteredEvents.length)} of {filteredEvents.length} events
          </div>
          <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-white/90 border border-[#e1ece3] shadow-sm">
            {categories.map(category => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#1B4332] text-white"
                    : "bg-white text-[#1B4332] hover:bg-[#9CCC5A] hover:text-white"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={`${selectedCategory}-${showAll}-${displayLimit}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedEvents.map((event, index) => (
              <motion.div
                key={event.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-white/60"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${
                      event.title === "Sustainium Case Competition" ? "object-center" :
                      event.title === "Corporate-Oriented Projects" ? "object-center" :
                      event.title === "SustAInify" ? "object-center" : "object-center"
                    }`}
                    style={{
                      objectPosition: event.title === "Sustainium Case Competition" ? "center 38%" :
                                     event.title === "Green Cup Award Ceremony" ? "center 50%" :
                                     event.title === "Freshers' Orientation 2025" ? "center 45%" :
                                     event.title === "Carbon Removal Workshop" ? "center 50%" :
                                     event.title === "Sustainium - Sustainability Product Case Competition" ? "center 42%" :
                                     event.title === "Careers in Sustainability Talk with Career Cell" ? "center 25%" :
                                     event.title === "Corporate-Oriented Projects" ? "center 5%" :
                                     event.title === "SustAInify" ? "center 25%" : "center 10%"
                    }}
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
                  <div className="mb-4">
                    <p className={`text-gray-600 ${!expandedDescriptions[event.title] ? 'line-clamp-3' : ''}`}>
                      {event.description}
                    </p>
                    {event.description.length > 150 && (
                      <button
                        onClick={() => toggleDescription(event.title)}
                        className="text-[#9CCC5A] hover:text-[#1B4332] font-medium text-sm mt-2 transition-colors duration-300 flex items-center"
                      >
                        {expandedDescriptions[event.title] ? (
                          <>
                            Read Less
                            <svg className="w-4 h-4 ml-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            Read More
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
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
        </motion.div>

        {hasMoreEvents && (
          <div className="mt-10 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full bg-[#1B4332] text-white font-semibold shadow-md hover:bg-[#2D6A4F] transition-colors flex items-center gap-2"
            >
              {showAll ? "Show Latest" : "See More"}
              <svg
                className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
} 