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
    <Link href={`/projects/${project.id}`} className="block group h-full cursor-pointer">
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-black/10 group-hover:border-[#C8860A]/40 shadow-xl group-hover:shadow-[0_0_40px_rgba(200,134,10,0.15)] transition-all duration-700 ${
          large ? "h-[480px] md:h-[520px]" : "h-[230px]"
        }`}
      >
        {/* Base Image with Slow Cinematic Zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08] group-hover:brightness-[0.6] group-hover:saturate-150"
          style={{ backgroundImage: `url('${project.image}')` }}
        />
        
        {/* Luxury Vignette Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B1522_140%)] transition-opacity duration-700" />
        
        {/* Bottom Black Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-6 left-6 z-10 flex gap-2">
          <span className="bg-[#C8860A] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3.5 rounded-full shadow-lg">
            {project.category}
          </span>
          {project.video && (
            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold py-1.5 px-3 rounded-full shadow-lg border border-white/10 group-hover:border-[#C8860A]/50 transition-colors">
              <Play className="w-2.5 h-2.5 text-[#C8860A] fill-[#C8860A]" />
              Walkthrough
            </span>
          )}
        </div>

        {/* Floating Explore Button */}
        <div className="absolute top-6 right-6 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <div className="w-10 h-10 rounded-full bg-[#1B3A5C]/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:border-[#C8860A] group-hover:bg-[#1B3A5C]">
            <ExternalLink className="w-4 h-4 text-[#C8860A]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {large && project.tags && (
            <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-white/70 border border-white/10 bg-white/5 backdrop-blur-sm py-1 px-3 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h3 className={`font-display font-bold text-white leading-tight mb-3 transition-colors duration-500 ${large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {project.title}
          </h3>
          
          {large && (
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              {project.description}
            </p>
          )}
          
          <div className="flex items-center gap-5 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              <MapPin className="w-4 h-4 text-[#C8860A]" />
              {project.location}
            </span>
            <span className="flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              <Calendar className="w-4 h-4 text-[#C8860A]" />
              {project.year}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
