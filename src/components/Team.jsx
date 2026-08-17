import React, { useState } from "react";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

// Overall Coordinators photos
import ojasPhoto from "../../images/OCs/Ojas.jpeg";
import vedantPhoto from "../../images/OCs/vedant.jpeg";

// Manager photos
import vennaPhoto from "../../images/Mgrs/venna.jpeg";
import uditPhoto from "../../images/Mgrs/Udit.jpg";
import arthPhoto from "../../images/Mgrs/Arth.png";
import anoushkaPhoto from "../../images/Mgrs/Anoushka.jpeg";
import kaushikPhoto from "../../images/Mgrs/Kaushik.jpg";
import hardikPhoto from "../../images/Mgrs/Hardik.jpg";
import aanshiPhoto from "../../images/Mgrs/Aanshi.png";

// Convener photos
import divyaPhoto from "../../images/Cons/Divya.jpeg";
import navjotPhoto from "../../images/Cons/Navjot.jpg";
import yuvrajPhoto from "../../images/Cons/Yuvraj.jpeg";
import adityaThoriPhoto from "../../images/Cons/AdityaThori.jpeg";
import adityaAhirePhoto from "../../images/Cons/Aditya.JPG";
import pratikPhoto from "../../images/Cons/Pratik.jpeg";
import nyasaPhoto from "../../images/Cons/Nyasa.jpeg";
import veerPhoto from "../../images/Cons/Veer.jpeg";
import spandanPhoto from "../../images/Cons/Spandan.jpg";
import yashviPhoto from "../../images/Cons/yashvi.jpeg";
import aviralPhoto from "../../images/Cons/Aviral.jpeg";
import manasPhoto from "../../images/Cons/Manas.jpeg";
import lakshyaPhoto from "../../images/Cons/Lakshya.jpeg";
import tanviPhoto from "../../images/Cons/Tanvi.jpeg";

const teamSections = [
  {
    department: "Overall Co-ordinators",
    managers: [
      {
        name: "Ojas Goel",
        role: "Overall Coordinator",
        phone: "8369487362",
        email: "23b0348@iitb.ac.in",
        linkedin: "https://www.linkedin.com/in/goelojas/",
        whatsapp: "",
        image: ojasPhoto
      },
      {
        name: "Vedant Zanwar ",
        role: "Overall Coordinator",
        phone: "8087012399",
        email: "",
        linkedin: "https://www.linkedin.com/in/vedant-zanwar-1137ba27b/",
        whatsapp: "8087012399",
        image: vedantPhoto
      }
    ],
    conveners: []
  },
  {
    department: "Projects and Policies",
    managers: [
      {
        name: "Venna Karthik Reddy",
        role: "Manager",
        phone: "8977243111",
        email: "",
        linkedin: "https://www.linkedin.com/in/vennakarthik/",
        whatsapp: "8977243111",
        image: vennaPhoto
      },
      {
        name: "Udit Mittal",
        role: "Manager",
        phone: "9660807580",
        email: "udit.sustainabilitycell.iitb@gmail.com",
        linkedin: "",
        whatsapp: "9660807580",
        image: uditPhoto
      },
      {
        name: "Tirth Tanna",
        role: "Manager",
        phone: "7572994432",
        email: "",
        linkedin: "",
        whatsapp: "7572994432",
        image: ""
      }
    ],
    conveners: [
      {
        name: "Aviral Agarwal",
        role: "Convener",
        image: aviralPhoto
      },
      {
        name: "Manas Karia",
        role: "Convener",
        image: manasPhoto
      },
      {
        name: "Lakshya Pradhan",
        role: "Convener",
        image: lakshyaPhoto
      },
      {
        name: "Tanvi Jain",
        role: "Convener",
        image: tanviPhoto
      }
    ]
  },
  {
    department: "Events and Operations",
    managers: [
      {
        name: "Arth Agrawal",
        role: "Manager",
        phone: "8827530300",
        email: "arth.sustainabilitycell.iitb@gmail.com",
        linkedin: "https://www.linkedin.com/in/arth-agrawal-902774331/",
        whatsapp: "8827530300",
        image: arthPhoto
      },
      {
        name: "Dilip Karwasra",
        role: "Manager",
        phone: "7740975355",
        email: "dilip.suscell.iitb@gmail.com",
        linkedin: "https://www.linkedin.com/in/dilip-karwasra-5a3b87337/",
        whatsapp: "7740975355",
        image: ""
      },
      {
        name: "Anoushka Manchala ",
        role: "Manager",
        phone: "9867114325",
        email: "anoushka.suscell@gmail.com",
        linkedin: "https://www.linkedin.com/in/anoushka-manchala-1633a9257/",
        whatsapp: "9867114325",
        image: anoushkaPhoto
      }
    ],
    conveners: [
      {
        name: "Divya Daga",
        role: "Convener",
        image: divyaPhoto
      },
      {
        name: "Navjot Singh",
        role: "Convener",
        image: navjotPhoto
      },
      {
        name: "Yuvraj Narayankar",
        role: "Convener",
        image: yuvrajPhoto
      },
      {
        name: "Aditya Thori",
        role: "Convener",
        image: adityaThoriPhoto
      }
    ]
  },
  {
    department: "Web",
    managers: [
      {
        name: "Kaushik Ravuthu",
        role: "Manager",
        phone: "8668339066",
        email: "kaushik.sustainabilitycell@gmail.com",
        linkedin: "https://www.linkedin.com/in/kaushik-ravuthu/",
        whatsapp: "8668339066",
        image: kaushikPhoto
      }
    ],
    conveners: [
      {
        name: "Aditya Ahire",
        role: "Convener",
        image: adityaAhirePhoto
      },
      {
        name: "Pratik Kine",
        role: "Convener",
        image: pratikPhoto
      }
    ]
  },
  {
    department: "Media",
    managers: [
      {
        name: "Hardik Garg",
        role: "Manager",
        phone: "9680403262",
        email: "hardik.sustainabilitycell.iitb@gmail.com",
        linkedin: "https://www.linkedin.com/in/hardik-garg-372222317/",
        whatsapp: "9680403262",
        image: hardikPhoto
      }
    ],
    conveners: [
      {
        name: "Nyasa Nayak",
        role: "Convener",
        image: nyasaPhoto
      },
      {
        name: "Veer Vijay Poonia",
        role: "Convener",
        image: veerPhoto
      }
    ]
  },
  {
    department: "Design",
    managers: [
      {
        name: "Aanshi Loladia",
        role: "Manager",
        phone: "7020632458",
        email: "",
        linkedin: "https://www.linkedin.com/in/aanshiloladia/",
        whatsapp: "7020632458",
        image: aanshiPhoto
      }
    ],
    conveners: [
      {
        name: "Spandan",
        role: "Convener",
        image: spandanPhoto
      },
      {
        name: "Yashvi Shah",
        role: "Convener",
        image: yashviPhoto
      }
    ]
  }
];

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

const MemberCard = ({ member, copiedEmail, copiedPhone, handleCopyEmail, handleCopyPhone }) => (
  <div
    className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[350px]"
  >
    <div className="relative flex flex-col items-center bg-white pt-4">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#F8F9FA] shadow-lg object-cover mt-6"
          style={member.name === 'Arth Agrawal' ? { objectPosition: 'center 15%' } : {}}
        />
      ) : (
        <div className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#F8F9FA] shadow-lg mt-6 bg-gray-200 flex items-center justify-center">
          <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6 pt-2 text-center pb-8 flex flex-col justify-between flex-grow">
      <div>
        <h4 className="text-xl font-bold text-[#1B4332] mb-2 group-hover:text-[#9CCC5A] transition-colors duration-300">
          {member.name}
        </h4>
        <p className="text-gray-600 mb-4">{member.role}</p>
      </div>
      <div className="flex justify-center space-x-4 pt-2">
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
);

const ConvenerCard = ({ member }) => (
  <div
    className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[350px]"
  >
    <div className="relative flex flex-col items-center bg-white pt-4">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#F8F9FA] shadow-lg object-cover mt-6"
        />
      ) : (
        <div className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#F8F9FA] shadow-lg mt-6 bg-gray-200 flex items-center justify-center">
          <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6 pt-2 text-center pb-8 flex flex-col justify-center flex-grow">
      <h4 className="text-xl font-bold text-[#1B4332] mb-2 group-hover:text-[#9CCC5A] transition-colors duration-300">
        {member.name}
      </h4>
      <p className="text-gray-600">{member.role}</p>
    </div>
  </div>
);

const pyramidDepartments = ["Web", "Media", "Design"];

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

        {teamSections.map((section) => {
          const isPyramid = pyramidDepartments.includes(section.department);
          const isOC = section.department === "Overall Co-ordinators";

          if (isPyramid) {
            // Web, Media, Design: Manager centered on top, 2 conveners below
            return (
              <div key={section.department} className="mb-16">
                <h3 className="text-2xl font-bold text-[#1B4332] mb-8 text-center">
                  {section.department}
                </h3>
                {/* Manager centered on top */}
                <div className="flex justify-center mb-8">
                  <div className="w-full max-w-sm">
                    {section.managers.map((member, index) => (
                      <MemberCard
                        key={index}
                        member={member}
                        copiedEmail={copiedEmail}
                        copiedPhone={copiedPhone}
                        handleCopyEmail={handleCopyEmail}
                        handleCopyPhone={handleCopyPhone}
                      />
                    ))}
                  </div>
                </div>
                {/* Conveners centered below */}
                {section.conveners.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {section.conveners.map((member, index) => (
                      <ConvenerCard key={index} member={member} />
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // OC and Projects/Events sections
          return (
            <div key={section.department} className="mb-16">
              <h3 className="text-2xl font-bold text-[#1B4332] mb-8 text-center">
                {section.department}
              </h3>
              {/* Managers grid */}
              <div
                className={`grid gap-8 ${
                  isOC
                    ? "md:grid-cols-2 max-w-4xl mx-auto"
                    : "md:grid-cols-3"
                }`}
              >
                {section.managers.map((member, index) => (
                  <MemberCard
                    key={index}
                    member={member}
                    copiedEmail={copiedEmail}
                    copiedPhone={copiedPhone}
                    handleCopyEmail={handleCopyEmail}
                    handleCopyPhone={handleCopyPhone}
                  />
                ))}
              </div>
              {/* Conveners in a 4-column row */}
              {section.conveners.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                  {section.conveners.map((member, index) => (
                    <ConvenerCard key={index} member={member} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}