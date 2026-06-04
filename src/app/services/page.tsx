import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/ServicesHero";
import ServicesList from "@/components/ServicesList";
import ServicesCtaBanner from "@/components/ServicesCtaBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Naheed & Sons",
  description:
    "Explore Naheed & Sons' full range of services — interior design, exterior finishing, full construction, renovation, project management, and consultation.",
};

export default function Services() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <ServicesHero />
      <ServicesList />
      <ServicesCtaBanner />
      <Footer />
    </main>
  );
}
