"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, ExternalLink, Play } from "lucide-react";
import { getProjects, Project } from "@/utils/storage";

export default function FeaturedProjects() {
  const [featured, setFeatured] = useState<Project[]>([]);

  useEffect(() => {
    const load = () => {
      const list = getProjects();
      setFeatured(list.slice(0, 3));
    };
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  if (featured.length === 0) {
    return null; // hide or show blank loading during hydrate
  }

  return (
    <section className="relative py-28 md:py-32 bg-[#F5F8FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-7 h-[2px] bg-[#C8860A] shrink-0" />
              <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">Our Portfolio</span>
            </div>
            <h2
              className="font-display font-bold text-[#1B3A5C] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Featured <span className="text-[#C8860A]">Projects</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#1B3A5C] hover:bg-[#11263d] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Mosaic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Large Card */}
          {featured[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <ProjectCard project={featured[0]} large />
            </motion.div>
          )}

          {/* Two Stacked */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-5">
            {featured.slice(1).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * (idx + 1) }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link href={`/projects/${project.id}`} className="block group h-full">
      <div
        className={`relative w-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 ${
          large ? "h-[480px] md:h-[520px]" : "h-[230px]"
        }`}
      >
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

        {/* Category Tag */}
        <div className="absolute top-5 left-5 z-10 flex gap-2">
          <span className="bg-[#C8860A] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">
            {project.category}
          </span>
          {project.video && (
            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-semibold py-1.5 px-2.5 rounded-full shadow-md border border-white/10">
              <Play className="w-2.5 h-2.5 text-[#C8860A] fill-[#C8860A]" />
              Walkthrough
            </span>
          )}
        </div>

        {/* Hover icon */}
        <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
          {large && project.tags && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-semibold uppercase tracking-wider text-white/60 border border-white/20 py-0.5 px-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className={`font-display font-bold text-white leading-tight mb-2.5 group-hover:text-[#C8860A] transition-colors duration-300 ${large ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {project.title}
          </h3>
          {large && (
            <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-sm line-clamp-2">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C8860A] shrink-0" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C8860A] shrink-0" />
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
