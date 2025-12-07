import { ShieldCheck, Smartphone, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Smartphone,
    title: "Center Management",
    description: "Seamlessly manage your workouts and track progress with our integrated app ecosystem.",
  },
  {
    icon: ShieldCheck,
    title: "Unbeatable Quality",
    description: "Premium materials engineered for durability and maximum performance in any condition.",
  },
  {
    icon: TrendingUp,
    title: "Early Bird Discounts",
    description: "Join our community today and get exclusive access to new drops and special pricing.",
  },
];

export function ValueProps() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-zinc-900/50 border border-white/5 p-8 hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <feature.icon className="w-24 h-24 text-primary" />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-sm mb-6 group-hover:bg-primary transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
