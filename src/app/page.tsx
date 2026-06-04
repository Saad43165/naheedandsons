import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedProjects from "@/components/FeaturedProjects";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#C8860A] selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedProjects />
      <BeforeAfterSlider />
      <ProcessSection />
      <Testimonials />
      <CtaSection />
      <Footer />
    </main>
  );
}
