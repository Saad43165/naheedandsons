import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import StorySection from "@/components/StorySection";
import MissionVision from "@/components/MissionVision";
import CoreValues from "@/components/CoreValues";

export default function About() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] selection:bg-[#C8860A] selection:text-white">
      <Navbar />
      <AboutHero />
      <StorySection />
      <MissionVision />
      <CoreValues />
      <Footer />
    </main>
  );
}
