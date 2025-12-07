import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CrossFit Athlete",
    content: "The quality of the Transformer Tshirt is unmatched. It handles sweat perfectly and fits like a glove.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Yoga Instructor",
    content: "I love the community vibe of Dodge.Fit. The app makes tracking my clients' progress so much easier.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Marathon Runner",
    content: "Fast shipping and great customer service. The shaker bottle is durable and doesn't leak!",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
  },
];

export function Reviews() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
        {/* Purple Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[hsl(270,100%,60%)] opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[hsl(270,100%,70%)] font-mono text-sm uppercase tracking-widest mb-2 block">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase italic">
            Athlete <span className="text-[hsl(270,100%,60%)]">Reviews</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-zinc-900/50 border border-white/5 p-8 rounded-lg relative group hover:border-[hsl(270,100%,60%)]/50 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? "text-[hsl(270,100%,60%)] fill-[hsl(270,100%,60%)]" : "text-zinc-700"}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic">"{review.content}"</p>
              
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
