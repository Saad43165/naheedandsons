"use client";

import { motion } from "framer-motion";
import { Calendar, User, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BlogPostContentProps {
  post: {
    title: string;
    category: string;
    date: string;
    author: string;
    image: string;
    content: string[];
  };
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-[#C8860A] hover:text-[#1B3A5C] mb-8 transition-colors">
          <ChevronLeft className="w-4.5 h-4.5 mr-1" />
          Back to Blog & News
        </Link>

        {/* Category */}
        <span className="bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full mb-6 inline-block">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B3A5C] mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex gap-6 text-sm text-gray-500 font-semibold mb-10 border-y border-gray-100 py-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#C8860A]" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#C8860A]" />
            By {post.author}
          </span>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md mb-12 border border-gray-100">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        </div>

        {/* Body Content */}
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
          {post.content.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

      </div>
    </article>
  );
}
