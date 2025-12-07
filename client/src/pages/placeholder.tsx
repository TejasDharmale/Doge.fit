import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24">
        <h1 className="text-5xl font-heading font-bold italic uppercase text-primary mb-6">{title}</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          This page is currently under construction. We are working hard to bring you the best experience possible.
          Check back soon for updates on our {title.toLowerCase()}.
        </p>
      </main>
      <Footer />
    </div>
  );
}
