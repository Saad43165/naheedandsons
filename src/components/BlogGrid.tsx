"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/utils/storage";
import { BlogPost } from "@/data/blog";


export default function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const load = () => setPosts(getBlogPosts());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found. Add some in the Admin Panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-[#F5F5F5] rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <span className="absolute top-4 left-4 z-10 bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Text */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex gap-4 text-xs text-gray-500 font-semibold mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#2D2D2D] font-display mb-3 group-hover:text-[#C8860A] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#1B3A5C] font-bold text-sm group/link hover:text-[#C8860A] transition-colors mt-auto"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
