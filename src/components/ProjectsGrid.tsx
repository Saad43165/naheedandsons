"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Search, SlidersHorizontal, X, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getProjects, Project } from "@/utils/storage";

const CATEGORIES = ["All", "Full Construction", "Interior Design", "Renovation"];

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = () => setProjects(getProjects());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategory !== "All" || searchQuery !== "";

  return (
    <section className="py-16 md:py-20 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Controls */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#1B3A5C] text-white shadow-md"
                      : "bg-[#F5F8FA] text-gray-600 hover:bg-gray-100 hover:text-[#1B3A5C]"
                  }`}
                >
                  {cat}
                  <span className={`ml-1.5 text-xs rounded-full px-1.5 py-0.5 ${selectedCategory === cat ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {cat === "All" ? projects.length : projects.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, location, type…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-200 bg-[#F5F8FA] rounded-lg py-2.5 pl-9 pr-9 text-sm text-gray-800 focus:outline-none focus:border-[#C8860A] focus:ring-1 focus:ring-[#C8860A]/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active filter pill */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500">Active filters:</span>
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 bg-[#1B3A5C]/10 text-[#1B3A5C] text-xs font-semibold px-3 py-1 rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-[#C8860A]/10 text-[#C8860A] text-xs font-semibold px-3 py-1 rounded-full">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-700 font-semibold underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-[#1B3A5C]">{filteredProjects.length}</span> of <span className="font-bold">{projects.length}</span> projects
          </p>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link href={`/projects/${project.id}`} className="block group h-full cursor-pointer">
                    <div className="bg-white border border-gray-100 group-hover:border-[#C8860A]/40 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-[0_0_35px_rgba(200,134,10,0.1)] transition-all duration-700 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[4/3] border-b border-gray-100/50">
                        <div className="absolute inset-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08] group-hover:brightness-[0.75] group-hover:saturate-150">
                          <Image 
                            src={project.image} 
                            alt={project.title} 
                            fill 
                            className="object-cover" 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0B1522_150%)] transition-opacity duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Category badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-[#C8860A] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">
                            {project.category}
                          </span>
                        </div>

                        {/* Video badge */}
                        {project.video && (
                          <div className="absolute top-4 left-[140px] z-10">
                            <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-semibold py-1.5 px-2.5 rounded-full shadow-md border border-white/10">
                              <Play className="w-2.5 h-2.5 text-[#C8860A] fill-[#C8860A]" />
                              Walkthrough
                            </span>
                          </div>
                        )}

                        {/* Status */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold py-1.5 px-3 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block shrink-0" />
                            {project.status}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[9px] font-semibold uppercase tracking-wider text-white/70 border border-white/25 py-0.5 px-2 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-[#1B3A5C] text-xl leading-tight mb-3 group-hover:text-[#C8860A] transition-colors duration-300">
                          {project.title}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-4">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#C8860A] shrink-0" />
                            {project.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C8860A] shrink-0" />
                            {project.year}
                          </span>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Area</span>
                            <p className="text-sm font-bold text-[#2D2D2D]">{project.area}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Duration</span>
                            <p className="text-sm font-bold text-[#2D2D2D]">{project.duration}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#1B3A5C]/5 group-hover:bg-[#C8860A] group-hover:text-white text-[#1B3A5C] flex items-center justify-center transition-all duration-300">
                            <span className="text-sm leading-none">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-[#1B3A5C] text-2xl mb-3">No projects found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
              <button
                onClick={clearFilters}
                className="bg-[#C8860A] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#a66d06] transition-colors"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
