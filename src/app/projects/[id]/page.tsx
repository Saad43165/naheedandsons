"use client";

import React, { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getProjects, Project } from "@/utils/storage";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Clock, Ruler, CircleDollarSign,
  CheckCircle2, ChevronLeft, Users, ArrowRight, Film
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetail({ params }: PageProps) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      const list = getProjects();
      const found = list.find((p) => p.id === id);
      if (found) {
        setProject(found);
        const matches = list.filter((p) => p.category === found.category && p.id !== found.id).slice(0, 3);
        setRelated(matches);
      }
      setLoading(false);
    };
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="w-8 h-8 border-4 border-[#C8860A] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!project) {
    notFound();
  }

  const specs = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Calendar, label: "Year Completed", value: project.year },
    { icon: Clock, label: "Duration", value: project.duration },
    { icon: Ruler, label: "Total Area", value: project.area },
    { icon: CircleDollarSign, label: "Budget Range", value: project.budget },
    { icon: CheckCircle2, label: "Status", value: project.status },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {project && (
        <>
          <title>{`${project.title} | Naheed & Sons Projects`}</title>
          <meta name="description" content={project.description.slice(0, 160)} />
          <meta property="og:title" content={project.title} />
          <meta property="og:description" content={project.description.slice(0, 160)} />
          <meta property="og:image" content={project.image} />
          <meta property="og:type" content="website" />
        </>
      )}
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081828]/95 via-[#1B3A5C]/60 to-[#0d1f35]/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-12 pb-12 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[#C8860A] hover:text-white font-semibold text-sm mb-5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#C8860A] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">
                {project.category}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/60 border border-white/20 py-1.5 px-3 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                {project.status}
              </span>
              {project.tags && project.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold text-white/50 border border-white/15 py-1 px-2.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-16">

            {/* Left: Description + Gallery */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="block w-6 h-[2px] bg-[#C8860A]" />
                  <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">Project Overview</span>
                </div>
                <h2 className="font-display font-bold text-[#1B3A5C] text-2xl md:text-3xl mb-5">
                  About This Project
                </h2>
                <p className="text-gray-600 leading-relaxed text-base mb-10">
                  {project.description}
                </p>

                {/* Video Showcase */}
                {project.video && (
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="block w-6 h-[2px] bg-[#C8860A]" />
                      <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">Cinematic Walkthrough</span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-black aspect-video group">
                      <video
                        src={project.video}
                        controls
                        playsInline
                        className="w-full h-full object-cover rounded-2xl"
                        poster={project.image}
                      />
                      <div className="absolute top-4 left-4 bg-[#C8860A] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full flex items-center gap-1.5 shadow-md">
                        <Film className="w-3.5 h-3.5" /> Video Presentation
                      </div>
                    </div>
                  </div>
                )}

                {/* Gallery Grid */}
                {project.gallery && project.gallery.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="block w-6 h-[2px] bg-[#C8860A]" />
                      <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">Project Gallery</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {project.gallery.map((img, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.96 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className={`relative overflow-hidden rounded-xl shadow-md ${
                            idx === 0 ? "col-span-2 aspect-video" : "aspect-[4/3]"
                          } group`}
                        >
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04] will-change-transform"
                            style={{ backgroundImage: `url('${img}')` }}
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Right: Specs Panel (sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Specs Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#F5F8FA] border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <div className="bg-[#1B3A5C] px-6 py-4">
                    <h3 className="font-display font-bold text-white text-lg">Project Specifications</h3>
                  </div>
                  <div className="p-6 divide-y divide-gray-100">
                    {specs.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                        <div className="w-9 h-9 rounded-lg bg-[#C8860A]/10 text-[#C8860A] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
                          <p className="text-sm font-bold text-[#2D2D2D] mt-0.5">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Team Card */}
                {project.team && project.team.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-[#F5F8FA] border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C8860A]" />
                      <h3 className="font-bold text-[#1B3A5C] text-sm uppercase tracking-wider">Project Team</h3>
                    </div>
                    <div className="p-6 divide-y divide-gray-100">
                      {project.team.map((member) => (
                        <div key={member.name} className="py-3 first:pt-0 last:pb-0">
                          <p className="font-bold text-[#2D2D2D] text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-[#1B3A5C] rounded-2xl p-6 text-center"
                >
                  <h3 className="font-display font-bold text-white text-lg mb-2">Interested in a similar project?</h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                    Let's discuss your vision and bring it to life.
                  </p>
                  <Link
                    href="/quote"
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#C8860A] hover:bg-[#a66d06] text-white font-bold py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 text-sm shadow-lg"
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F5F8FA] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="block w-6 h-[2px] bg-[#C8860A]" />
                  <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">More Projects</span>
                </div>
                <h2 className="font-display font-bold text-[#1B3A5C] text-2xl md:text-3xl">Related Work</h2>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1B3A5C] hover:text-[#C8860A] transition-colors"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/projects/${p.id}`} className="block group">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md mb-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.05] will-change-transform"
                        style={{ backgroundImage: `url('${p.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#C8860A] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-full">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-[#1B3A5C] text-lg group-hover:text-[#C8860A] transition-colors">{p.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{p.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{p.year}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
