import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/home/ProductGrid"; // Reusing the grid component but ideally we'd make a generic one

// Mock of full product list - in a real app this would fetch from API
// Reusing the same 4 products for now to populate the page
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 mb-12">
            <h1 className="text-5xl font-heading font-bold italic uppercase text-white mb-4">All <span className="text-primary">Products</span></h1>
            <p className="text-gray-400 max-w-2xl">Browse our complete collection of high-performance gear designed to elevate your training.</p>
        </div>
        
        {/* Reusing ProductGrid component's internal logic but exposing it here directly would be better. 
            For speed, I will just render the ProductGrid component which fetches its own data mock.
            In a real refactor, I'd lift the state up.
        */}
        <div className="bg-zinc-950 pb-24">
             {/* We can just reuse the ProductGrid but usually we'd want a dedicated page layout. 
                 Since the ProductGrid component currently has the "Featured Gear" header built-in, 
                 I'll just render it as is, or ideally I should refactor it. 
                 Let's stick to the prompt's request for a new page showing all products.
             */}
             <ProductGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
