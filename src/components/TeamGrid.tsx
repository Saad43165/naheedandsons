"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { getTeamMembers, TeamMember } from "@/utils/storage";

export default function TeamGrid() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    const load = () => setTeam(getTeamMembers());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id || member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#F5F5F5] rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-xl transition-all"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${member.image}')` }}
                />
              </div>

              {/* Bio & Socials */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2D2D2D] font-display mb-1">{member.name}</h3>
                <p className="text-[#C8860A] text-xs font-bold uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>

                {(member.linkedin || member.email || member.phone) && (
                  <div className="flex gap-4 border-t border-gray-200 pt-4 items-center">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1B3A5C] transition-colors" aria-label="LinkedIn">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-[#1B3A5C] transition-colors" aria-label="Email">
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {member.phone && (
                      <a href={`tel:${member.phone.replace(/\D/g, "")}`} className="text-gray-400 hover:text-[#1B3A5C] transition-colors" aria-label="Phone">
                        <Phone className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
