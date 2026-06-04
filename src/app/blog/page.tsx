import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHero from "@/components/BlogHero";
import BlogGrid from "@/components/BlogGrid";

export default function Blog() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#C8860A] selection:text-white">
      <Navbar />
      <BlogHero />
      <BlogGrid />
      <Footer />
    </main>
  );
}
