import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqHero from "@/components/FaqHero";
import FaqAccordion from "@/components/FaqAccordion";

export default function Faq() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#C8860A] selection:text-white">
      <Navbar />
      <FaqHero />
      <FaqAccordion />
      <Footer />
    </main>
  );
}
