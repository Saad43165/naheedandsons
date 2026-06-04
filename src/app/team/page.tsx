import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamHero from "@/components/TeamHero";
import TeamGrid from "@/components/TeamGrid";

export default function Team() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#C8860A] selection:text-white">
      <Navbar />
      <TeamHero />
      <TeamGrid />
      <Footer />
    </main>
  );
}
