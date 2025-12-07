import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Services() {
  const sections = [
    {
      title: "Gear",
      subtitle: "Built for Performance",
      description: "Our accessories are designed to withstand the toughest workouts. From lifting straps to water bottles, we've got you covered.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1600",
      cta: "Shop Accessories",
      align: "left",
    },
    {
      title: "The App",
      subtitle: "Smart Management",
      description: "For coaches and gym owners. Manage schedules, track client progress, and handle payments all in one seamless dashboard.",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1600",
      cta: "Try Features",
      align: "right",
    },
    {
      title: "Community",
      subtitle: "Join the Movement",
      description: "Weekend runs, mountain treks, and outdoor HIIT sessions. We believe fitness is better together.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1600",
      cta: "View Events",
      align: "left",
    },
  ];

  return (
    <section className="py-0 bg-black">
      {sections.map((section, index) => (
        <div key={index} className="relative min-h-[60vh] flex items-center overflow-hidden group">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
             <img 
               src={section.image} 
               alt={section.title} 
               className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700 grayscale group-hover:grayscale-0"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
             {/* Dynamic side gradient based on alignment */}
             <div className={`absolute inset-0 bg-gradient-to-r ${section.align === 'left' ? 'from-black via-black/70 to-transparent' : 'from-transparent via-black/70 to-black'}`} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className={`flex ${section.align === 'right' ? 'justify-end' : 'justify-start'}`}>
              <motion.div 
                initial={{ opacity: 0, x: section.align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">
                  {section.subtitle}
                </span>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white uppercase italic mb-6 leading-none">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {section.description}
                </p>
                <Button className="bg-white text-black hover:bg-primary hover:text-black rounded-none px-8 py-6 text-lg font-bold uppercase tracking-wide transition-all">
                  {section.cta}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
