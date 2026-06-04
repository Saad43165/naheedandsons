"use client";

import React, { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostContent from "@/components/BlogPostContent";
import { getBlogPosts } from "@/utils/storage";
import { BlogPost } from "@/data/blog";


import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      const posts = getBlogPosts();
      const found = posts.find((p) => p.slug === slug);
      setPost(found || null);
      setLoading(false);
    };
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, [slug]);

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

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white selection:bg-[#C8860A] selection:text-white">
      {post && (
        <>
          <title>{`${post.title} | Naheed & Sons Journal`}</title>
          <meta name="description" content={post.excerpt} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:image" content={post.image} />
          <meta property="og:type" content="article" />
        </>
      )}
      <Navbar />
      <BlogPostContent post={post} />
      <Footer />
    </main>
  );
}
