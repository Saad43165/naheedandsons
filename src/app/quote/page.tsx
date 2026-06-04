import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteHero from "@/components/QuoteHero";
import QuoteForm from "@/components/QuoteForm";
import BudgetCalculator from "@/components/BudgetCalculator";

export default function Quote() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] selection:bg-[#C8860A] selection:text-white">
      <Navbar />
      <QuoteHero />
      <BudgetCalculator />
      <QuoteForm />
      <Footer />
    </main>
  );
}
