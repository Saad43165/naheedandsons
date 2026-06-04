import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsHero from "@/components/ProjectsHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Portfolio | Naheed & Sons",
  description:
    "Browse Naheed & Sons' portfolio of completed construction, interior design, and renovation projects across residential, commercial, and industrial sectors.",
};

export default function Projects() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <ProjectsHero />
      <ProjectsGrid />
      <Footer />
    </main>
  );
}
