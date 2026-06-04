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

                {(member.email || member.phone) && (
                  <div className="flex gap-4 border-t border-gray-200 pt-4 items-center">
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
