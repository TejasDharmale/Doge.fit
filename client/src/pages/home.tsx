import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Services } from "@/components/home/Services";
import { LeadForm } from "@/components/home/LeadForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <ProductGrid />
        <Services />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
