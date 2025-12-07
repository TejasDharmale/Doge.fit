import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Services } from "@/components/home/Services";
import { LeadForm } from "@/components/home/LeadForm";
import { Reviews } from "@/components/home/Reviews";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <ProductGrid />
        <Services />
        <Reviews />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
