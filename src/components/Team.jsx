import React from "react";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

const teamMembers = {
  "Overall Co-ordinators": [
    {
      name: "Himank Gupta",
      role: "Overall Coordinator",
      phone: "+91 9886771001",
      email: "himank.gupta@iitb.ac.in",
      linkedin: "https://linkedin.com/in/himank-gupta",
      whatsapp: "https://wa.me/919886771001",
      image: "/images/team/himank.webp"
    },
    {
      name: "Jakher",
      role: "Overall Coordinator",
      phone: "+91 9929203844",
      email: "jakherh.iitb@gmail.com",
      linkedin: "https://linkedin.com/in/jakher",
      whatsapp: "https://wa.me/919929203844",
      image: "/images/team/jakher.webp"
    }
  ],
  "Events and Operations": [
    {
      name: "Vaibhav Uttam",
      role: "Manager",
      phone: "+91 7248972748",
      email: "vaibhav.uttam@iitb.ac.in",
      linkedin: "https://linkedin.com/in/vaibhav-uttam",
      whatsapp: "https://wa.me/917248972748",
      image: "/images/team/vaibhav.webp"
    },
    {
      name: "Rohan Dubey",
      role: "Manager",
      phone: "+91 9302020069",
      email: "rohan.dubey@iitb.ac.in",
      linkedin: "https://linkedin.com/in/rohan-dubey",
      whatsapp: "https://wa.me/919302020069",
      image: "/images/team/rohan.webp"
    },
    {
      name: "P N Pranav Yadav",
      role: "Manager",
      phone: "+91 9686366569",
      email: "pranav.yadav@iitb.ac.in",
      linkedin: "https://linkedin.com/in/pranav-yadav",
      whatsapp: "https://wa.me/919686366569",
      image: "/images/team/pranav.webp"
    }
  ],
  "Projects and Policies": [
    {
      name: "Swayamj Joshi",
      role: "Manager",
      phone: "+91 8355902016",
      email: "swayamj.joshi@iitb.ac.in",
      linkedin: "https://linkedin.com/in/swayamj-joshi",
      whatsapp: "https://wa.me/918355902016",
      image: "/images/team/swayamj.webp"
    },
    {
      name: "Ayadi Mishra",
      role: "Manager",
      phone: "+91 9179763078",
      email: "ayadi.mishra@iitb.ac.in",
      linkedin: "https://linkedin.com/in/ayadi-mishra",
      whatsapp: "https://wa.me/919179763078",
      image: "/images/team/ayadi.webp"
    },
    {
      name: "Shreyas Kulkarni",
      role: "Manager",
      phone: "+91 7385713978",
      email: "shreyas.kulkarni@iitb.ac.in",
      linkedin: "https://linkedin.com/in/shreyas-kulkarni",
      whatsapp: "https://wa.me/917385713978",
      image: "/images/team/shreyas.webp"
    }
  ],
  "Web and Design": [
    {
      name: "Anushka Kumari",
      role: "Manager",
      phone: "+91 7020064556",
      email: "anushka.kumari@iitb.ac.in",
      linkedin: "https://linkedin.com/in/anushka-kumari",
      whatsapp: "https://wa.me/917020064556",
      image: "/images/team/anushka.webp"
    },
    {
      name: "Chirag Sharma",
      role: "Manager",
      phone: "+91 7869324038",
      email: "chirag.sharma@iitb.ac.in",
      linkedin: "https://linkedin.com/in/chirag-sharma",
      whatsapp: "https://wa.me/917869324038",
      image: "/images/team/chirag.webp"
    },
    {
      name: "Prashabdhi",
      role: "Manager",
      phone: "+91 8329948014",
      email: "prashabdhi@iitb.ac.in",
      linkedin: "https://linkedin.com/in/prashabdhi",
      whatsapp: "https://wa.me/918329948014",
      image: "/images/team/prashabdhi.webp"
    }
  ]
};

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-[#9CCC5A] transition-colors duration-200"
    title={label}
  >
    {children}
  </a>
);

export default function Team() {
  return (
    <section id="team" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeader
          title="Our Team"
          description="Meet the dedicated individuals driving sustainability initiatives at IIT Bombay. 
            Our team combines expertise, passion, and innovation to create lasting impact."
        />

        {Object.entries(teamMembers).map(([department, members]) => (
          <div key={department} className="mb-16">
            <h3 className="text-2xl font-bold text-[#1B4332] mb-8 text-center">
              {department}
            </h3>
            <div
              className={`grid gap-8 ${
                department === "Overall Co-ordinators"
                  ? "md:grid-cols-2 max-w-4xl mx-auto"
                  : "md:grid-cols-3"
              }`}
            >
              {members.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-[#1B4332] mb-2 group-hover:text-[#9CCC5A] transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="text-gray-600 mb-4">{member.role}</p>
                    <div className="flex justify-center space-x-4">
                      <SocialIcon href={`mailto:${member.email}`} label="Email">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </SocialIcon>
                      <SocialIcon href={member.linkedin} label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </SocialIcon>
                      <SocialIcon href={member.whatsapp} label="WhatsApp">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      </SocialIcon>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}