import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Cult Fitness Member",
    location: "Mumbai, Maharashtra",
    content: "As a Cult Fitness member for 2 years, I was skeptical about switching. But Dodge.Fit's gear quality is outstanding! The Transformer Tshirt handles intense HIIT sessions better than anything I've tried. Best purchase!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=rajesh",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Gold's Gym Member",
    location: "Delhi, NCR",
    content: "I've been training at Gold's Gym for 3 years. Dodge.Fit's app integration and premium gear quality impressed me. The community features are great, and shipping was super fast even to Delhi! Highly recommended.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Fitness Enthusiast",
    location: "Bangalore, Karnataka",
    content: "The quality of Dodge.Fit products is unmatched. The shaker bottle doesn't leak even during intense workouts, and the T-shirts are perfect for Indian weather. Great value for money!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=amit",
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Yoga Instructor",
    location: "Pune, Maharashtra",
    content: "As a yoga instructor, I need comfortable and breathable gear. Dodge.Fit's products exceed expectations. The app features help me track my students' progress easily. Love the Indian pricing!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=neha",
  },
  {
    id: 5,
    name: "Vikram Reddy",
    role: "Marathon Runner",
    location: "Hyderabad, Telangana",
    content: "Fast shipping, excellent customer service, and premium quality products. The gear helped me train better for my marathon. The app's analytics are fantastic for tracking performance!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=vikram",
  },
  {
    id: 6,
    name: "Anjali Mehta",
    role: "CrossFit Athlete",
    location: "Gurgaon, Haryana",
    content: "Coming from a competitive CrossFit background, I'm very picky about gear. Dodge.Fit delivers professional-grade quality. The Transformer Tshirt is my go-to for every workout session!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=anjali",
  },
];

export function Reviews() {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll animation from left to right
  useEffect(() => {
    if (!api || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        // Reset to start if at the end (for infinite loop effect)
        api.scrollTo(0);
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [api, isPaused]);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Purple Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[hsl(270,100%,60%)] opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[hsl(270,100%,70%)] font-mono text-sm uppercase tracking-widest mb-2 block">
            What Our Indian Members Say
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase italic">
            Athlete <span className="text-[hsl(270,100%,60%)]">Reviews</span>
          </h2>
          <p className="text-gray-400 mt-4">Real reviews from Cult Fitness, Gold's Gym, and fitness enthusiasts across India</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
                duration: 35, // Smooth transition duration (milliseconds)
                dragFree: true,
              }}
              className="w-full"
            >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    className="bg-zinc-900/50 border border-white/5 p-8 rounded-lg relative group hover:border-[hsl(270,100%,60%)]/50 transition-all duration-300 h-full hover:scale-[1.02]"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-[hsl(270,100%,60%)] fill-[hsl(270,100%,60%)]" : "text-zinc-700"}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 mb-6 italic leading-relaxed">"{review.content}"</p>

                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback className="bg-[hsl(270,100%,60%)]/20 text-white">
                          {review.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-white font-bold text-sm">{review.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{review.role}</p>
                        <p className="text-xs text-gray-600 mt-1">{review.location}</p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-zinc-900 border-white/10 text-white hover:bg-[hsl(270,100%,60%)] hover:border-[hsl(270,100%,60%)] transition-all duration-300" />
            <CarouselNext className="hidden md:flex -right-12 bg-zinc-900 border-white/10 text-white hover:bg-[hsl(270,100%,60%)] hover:border-[hsl(270,100%,60%)] transition-all duration-300" />
          </Carousel>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {reviews.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-white/20 hover:bg-[hsl(270,100%,60%)] transition-colors"
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}