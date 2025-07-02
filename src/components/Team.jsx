import React, { useState } from "react";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

const teamMembers = {
  "Overall Co-ordinators": [
    {
      name: "Shreyas Kulkarni",
      role: "Overall Coordinator",
      phone: "7385713978",
      email: "22b1510@iitb.ac.in",
      linkedin: "https://www.linkedin.com/in/shreyas-kulkarni-iitb",
      whatsapp: "",
      image: "/images/Shreyas.jpg"
    },
    {
      name: "P N Pranav Yadav",
      role: "Overall Coordinator",
      phone: "9686366569",
      email: "",
      linkedin: "",
      whatsapp: "",
      image: "/images/Pranav.jpeg"
    }
  ],
  "Projects and Policies": [
    {
      name: "Arth Trivedy",
      role: "Manager",
      phone: "8368009080",
      email: "trivedyarth@gmail.com",
      linkedin: "www.linkedin.com/in/arth-trivedy-79875a224",
      whatsapp: "",
      image: "/images/Arth.jpeg"
    },
    {
      name: "Siddhant Gupta",
      role: "Manager",
      phone: "9167095841",
      email: "siddhant2804@gmail.com",
      linkedin: "https://www.linkedin.com/in/siddhantgupta-iit/",
      whatsapp: "",
      image: "/images/Siddhant.jpg"
    },
    {
      name: "Vinayak Jalan",
      role: "Manager",
      phone: "7043772478",
      email: "vinayakjalan010@gmail.com",
      linkedin: "https://www.linkedin.com/in/vinayak-jalan-6218ba230/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      whatsapp: "",
      image: "/images/Vinayak.jpeg"
    }
  ],
  "Events and Operations": [
    {
      name: "Ojas Goel",
      role: "Manager",
      phone: "8369487362",
      email: "ojas.suscell@gmail.com",
      linkedin: "https://www.linkedin.com/in/ojas-goel-069a85178/",
      whatsapp: "",
      image: "/images/Ojas.png"
    },
    {
      name: "Vedant Ramesh Zanwar",
      role: "Manager",
      phone: "8087012399",
      email: "vedantz.scell.iitb@gmail.com",
      linkedin: "https://www.linkedin.com/in/vedant-zanwar-1137ba27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      whatsapp: "",
      image: "/images/Vedant.jpg"
    },
    {
      name: "Aditya Agarwal",
      role: "Manager",
      phone: "9065130206",
      email: "adityaagarwal0808@gmail.com",
      linkedin: "www.linkedin.com/in/aditya-agarwal-a01500297",
      whatsapp: "",
      image: "/images/Aditya.jpg"
    }
  ],
  "Web and Design": [
    {
      name: "Yashashree",
      role: "Manager",
      phone: "8866255358",
      email: "yashashree.sustanabilitycell@gmail.com",
      linkedin: "www.linkedin.com/in/yashashree-charki-73908126b",
      whatsapp: "",
      image: "/images/Yashashree.jpg"
    },
    {
      name: "Krishna Gahlod",
      role: "Manager",
      phone: "9171241889",
      email: "krishnagahlod@gmail.com",
      linkedin: "https://www.linkedin.com/in/krishna-gahlod-65143927b/",
      whatsapp: "",
      image: "/images/Krishna.png"
    },
    {
      name: "Mohita",
      role: "Manager",
      phone: "",
      email: "",
      linkedin: "https://www.linkedin.com/in/mohita-shanmugam?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      whatsapp: "",
      image: "/images/Mohita.jpg"
    }
  ]
};

const SocialIcon = ({ onClick, href, children, label }) => (
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-[#9CCC5A] transition-colors duration-200"
      title={label}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      {children}
    </a>
  ) : (
    <button
      onClick={onClick}
      className="text-gray-600 hover:text-[#9CCC5A] transition-colors duration-200"
      title={label}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
    >
      {children}
    </button>
  )
);

export default function Team() {
  const [copiedEmail, setCopiedEmail] = useState("");
  const [copiedPhone, setCopiedPhone] = useState("");

  const handleCopyEmail = (email) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(""), 1500);
  };

  const handleCopyPhone = (phone) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(""), 1500);
  };

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
                  <div className="relative flex flex-col items-center bg-white pt-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 object-cover rounded-full mx-auto mt-6 mb-4 border-4 border-[#F8F9FA] shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-[#1B4332] mb-2 group-hover:text-[#9CCC5A] transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="text-gray-600 mb-4">{member.role}</p>
                    <div className="flex justify-center space-x-4">
                      <SocialIcon
                        onClick={member.email ? () => handleCopyEmail(member.email) : undefined}
                        label={member.email ? "Copy Email" : "No Email"}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </SocialIcon>
                      {member.email && copiedEmail === member.email && (
                        <span className="ml-2 text-green-600 text-xs font-semibold">Email copied!</span>
                      )}
                      <SocialIcon href={member.linkedin} label="LinkedIn">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </SocialIcon>
                      <SocialIcon
                        onClick={member.phone ? () => handleCopyPhone(member.phone) : undefined}
                        label={member.phone ? "Copy Phone Number" : "No Phone Number"}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      </SocialIcon>
                      {member.phone && copiedPhone === member.phone && (
                        <span className="ml-2 text-green-600 text-xs font-semibold">Phone number copied!</span>
                      )}
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