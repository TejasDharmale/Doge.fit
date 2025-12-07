import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingBag, 
  Users, 
  Smartphone, 
  FileText, 
  HelpCircle, 
  Truck, 
  Ruler, 
  Mail, 
  Shield,
  Heart,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";

const pageContent: Record<string, any> = {
  "Shop Gear": {
    icon: ShoppingBag,
    description: "Discover our premium collection of fitness gear and apparel",
    sections: [
      {
        title: "Featured Categories",
        items: [
          { name: "Performance Jerseys", count: "24 items", desc: "High-performance athletic wear" },
          { name: "Training Gear", count: "18 items", desc: "Essential equipment for every workout" },
          { name: "Accessories", count: "32 items", desc: "Complete your fitness setup" },
          { name: "Footwear", count: "15 items", desc: "Optimize your performance" },
        ]
      },
      {
        title: "New Arrivals",
        items: [
          { name: "Pro Training Kit", price: "₹7,499", desc: "Complete training solution" },
          { name: "Elite Compression Gear", price: "₹4,999", desc: "Enhanced performance" },
          { name: "Premium Water Bottle", price: "₹2,099", desc: "Stay hydrated in style" },
        ]
      },
      {
        title: "Best Sellers",
        items: [
          { name: "Transformer T-Shirt", price: "₹2,499", desc: "Top-rated choice" },
          { name: "Training Shorts", price: "₹3,399", desc: "Customer favorite" },
          { name: "Gym Bag", price: "₹4,199", desc: "Perfect companion" },
        ]
      }
    ]
  },
  "Our Story": {
    icon: Heart,
    description: "Built by fitness enthusiasts, for fitness enthusiasts",
    sections: [
      {
        title: "Our Mission",
        content: "At Dodge.Fit, we believe that everyone deserves access to premium fitness gear that enhances their training experience. Founded in 2020, we started as a small community of fitness enthusiasts who were frustrated with the lack of quality, affordable gear.",
        items: []
      },
      {
        title: "What We Stand For",
        content: "We're committed to providing high-quality products that don't break the bank. Our gear is designed by athletes, tested by athletes, and trusted by thousands of fitness enthusiasts worldwide.",
        items: [
          { name: "Quality First", desc: "We never compromise on quality" },
          { name: "Community Driven", desc: "Built for and by the fitness community" },
          { name: "Affordable Excellence", desc: "Premium gear at accessible prices" },
          { name: "Innovation", desc: "Always pushing boundaries" },
        ]
      },
      {
        title: "Our Journey",
        content: "From a garage startup to serving thousands of customers worldwide, our journey has been incredible. We've grown, but our core values remain the same: quality, community, and commitment to your fitness goals.",
        items: []
      }
    ]
  },
  "Community": {
    icon: Users,
    description: "Join thousands of fitness enthusiasts in our growing community",
    sections: [
      {
        title: "Weekly Workouts",
        items: [
          { name: "Saturday Morning Runs", time: "Every Saturday 7:00 AM", desc: "Join us for community runs" },
          { name: "Sunday Hikes", time: "Every Sunday 9:00 AM", desc: "Explore nature together" },
          { name: "Wednesday Strength Training", time: "Every Wednesday 6:00 PM", desc: "Build strength with friends" },
        ]
      },
      {
        title: "Community Events",
        items: [
          { name: "Monthly Challenges", desc: "Compete and win prizes" },
          { name: "Fitness Workshops", desc: "Learn from experts" },
          { name: "Social Gatherings", desc: "Connect with like-minded people" },
        ]
      },
      {
        title: "Join Us",
        content: "Be part of a community that supports your fitness journey. Share your progress, get motivated, and achieve your goals together.",
        items: []
      }
    ]
  },
  "App Features": {
    icon: Smartphone,
    description: "Powerful features to help you achieve your fitness goals",
    sections: [
      {
        title: "Core Features",
        items: [
          { name: "Workout Tracking", icon: Target, desc: "Track your workouts and progress" },
          { name: "Goal Setting", icon: TrendingUp, desc: "Set and achieve your fitness goals" },
          { name: "Progress Analytics", icon: Zap, desc: "Visualize your improvement over time" },
          { name: "Community Challenges", icon: Users, desc: "Compete with friends and community" },
        ]
      },
      {
        title: "For Coaches & Trainers",
        items: [
          { name: "Client Management", desc: "Manage multiple clients efficiently" },
          { name: "Custom Programs", desc: "Create personalized workout plans" },
          { name: "Progress Reports", desc: "Generate detailed progress reports" },
          { name: "Communication Tools", desc: "Stay connected with your clients" },
        ]
      },
      {
        title: "Coming Soon",
        items: [
          { name: "Nutrition Tracking", desc: "Monitor your diet and macros" },
          { name: "Wearable Integration", desc: "Sync with your fitness devices" },
          { name: "AI Workout Plans", desc: "Personalized plans powered by AI" },
        ]
      }
    ]
  },
  "Blog": {
    icon: FileText,
    description: "Latest fitness tips, news, and insights from our team",
    sections: [
      {
        title: "Latest Articles",
        items: [
          { 
            name: "10 Essential Workouts for Beginners", 
            date: "Dec 5, 2024",
            desc: "Start your fitness journey with these foundational exercises",
            author: "Sarah Johnson"
          },
          { 
            name: "Nutrition Tips for Peak Performance", 
            date: "Dec 2, 2024",
            desc: "Fuel your body for optimal results",
            author: "Mike Chen"
          },
          { 
            name: "Building a Home Gym on a Budget", 
            date: "Nov 28, 2024",
            desc: "Create an effective workout space without breaking the bank",
            author: "Emma Davis"
          },
          { 
            name: "The Science of Recovery", 
            date: "Nov 25, 2024",
            desc: "Why rest days are crucial for progress",
            author: "Dr. James Wilson"
          },
        ]
      },
      {
        title: "Popular Topics",
        items: [
          { name: "Strength Training", desc: "Build muscle and power" },
          { name: "Cardio Workouts", desc: "Improve your endurance" },
          { name: "Nutrition", desc: "Fuel your fitness" },
          { name: "Recovery", desc: "Rest and rejuvenate" },
        ]
      }
    ]
  },
  "FAQ": {
    icon: HelpCircle,
    description: "Find answers to commonly asked questions",
    sections: [
      {
        title: "General Questions",
        items: [
          { 
            name: "What is Dodge.Fit?", 
            desc: "Dodge.Fit is a comprehensive fitness platform offering premium gear, workout tracking, and a supportive community for fitness enthusiasts." 
          },
          { 
            name: "Do you ship internationally?", 
            desc: "Yes, we ship to most countries worldwide. Shipping times and costs vary by location." 
          },
          { 
            name: "How do I track my order?", 
            desc: "Once your order ships, you'll receive a tracking number via email. You can use this to track your package." 
          },
        ]
      },
      {
        title: "Products & Orders",
        items: [
          { 
            name: "What is your return policy?", 
            desc: "We offer a 30-day return policy on unused items in original packaging. See our Shipping & Returns page for details." 
          },
          { 
            name: "Do you offer discounts?", 
            desc: "Yes! Sign up for our newsletter to receive exclusive discounts and early access to sales." 
          },
          { 
            name: "Can I cancel my order?", 
            desc: "Orders can be cancelled within 24 hours of placement. Contact us immediately if you need to cancel." 
          },
        ]
      },
      {
        title: "Account & App",
        items: [
          { 
            name: "How do I create an account?", 
            desc: "Click on 'Login/Register' in the navigation, then select 'Register' to create a new account." 
          },
          { 
            name: "Is the app free?", 
            desc: "We offer a free tier with basic features. Premium features are available with a subscription." 
          },
          { 
            name: "How do I reset my password?", 
            desc: "Use the 'Forgot Password' link on the login page to reset your password." 
          },
        ]
      }
    ]
  },
  "Shipping & Returns": {
    icon: Truck,
    description: "Everything you need to know about shipping and returns",
    sections: [
      {
        title: "Shipping Information",
        items: [
          { 
            name: "Standard Shipping", 
            desc: "5-7 business days - $5.99" 
          },
          { 
            name: "Express Shipping", 
            desc: "2-3 business days - $12.99" 
          },
          { 
            name: "Overnight Shipping", 
            desc: "Next business day - $24.99" 
          },
        ]
      },
      {
        title: "Returns Policy",
        content: "We want you to love your purchase. If you're not completely satisfied, you can return unused items in original packaging within 30 days of delivery.",
        items: [
          { name: "30-Day Return Window", desc: "Return items within 30 days" },
          { name: "Original Packaging Required", desc: "Items must be in original condition" },
          { name: "Free Returns", desc: "We cover return shipping costs" },
          { name: "Refund Processing", desc: "Refunds processed within 5-7 business days" },
        ]
      },
      {
        title: "International Shipping",
        content: "We ship to over 50 countries worldwide. International orders may be subject to customs fees and duties, which are the responsibility of the customer.",
        items: []
      }
    ]
  },
  "Size Guide": {
    icon: Ruler,
    description: "Find the perfect fit for your gear",
    sections: [
      {
        title: "Apparel Sizing",
        items: [
          { name: "Small (S)", desc: "Chest: 36-38\", Waist: 30-32\"" },
          { name: "Medium (M)", desc: "Chest: 38-40\", Waist: 32-34\"" },
          { name: "Large (L)", desc: "Chest: 40-42\", Waist: 34-36\"" },
          { name: "X-Large (XL)", desc: "Chest: 42-44\", Waist: 36-38\"" },
          { name: "2X-Large (2XL)", desc: "Chest: 44-46\", Waist: 38-40\"" },
        ]
      },
      {
        title: "How to Measure",
        content: "For the best fit, measure yourself wearing minimal clothing. Use a flexible measuring tape and measure at the widest points.",
        items: [
          { name: "Chest", desc: "Measure around the fullest part of your chest" },
          { name: "Waist", desc: "Measure around your natural waistline" },
          { name: "Hips", desc: "Measure around the fullest part of your hips" },
          { name: "Inseam", desc: "Measure from crotch to ankle" },
        ]
      },
      {
        title: "Fit Guide",
        items: [
          { name: "Regular Fit", desc: "Comfortable, relaxed fit for everyday wear" },
          { name: "Slim Fit", desc: "Closer to the body, modern styling" },
          { name: "Athletic Fit", desc: "Designed for movement and performance" },
        ]
      }
    ]
  },
  "Contact Us": {
    icon: Mail,
    description: "We're here to help! Get in touch with our team",
    sections: [
      {
        title: "Get in Touch",
        items: [
          { name: "Email", desc: "dodgedotfit@gmail.com" },
          { name: "Phone", desc: "+1 (555) 123-4567" },
          { name: "Business Hours", desc: "Monday - Friday: 9:00 AM - 6:00 PM EST" },
        ]
      },
      {
        title: "Customer Support",
        items: [
          { name: "General Inquiries", desc: "For questions about products, orders, or general information" },
          { name: "Technical Support", desc: "Need help with the app or website? We're here to help." },
          { name: "Bulk Orders", desc: "Interested in bulk pricing? Contact us for custom quotes." },
        ]
      },
      {
        title: "Visit Us",
        items: [
          { name: "Main Office", desc: "123 Fitness Street, Health City, HC 12345" },
          { name: "Store Hours", desc: "Monday - Saturday: 10:00 AM - 8:00 PM" },
        ]
      }
    ]
  },
  "Privacy Policy": {
    icon: Shield,
    description: "How we protect and use your personal information",
    sections: [
      {
        title: "Information We Collect",
        items: [
          { name: "Personal Information", desc: "Name, email, shipping address, payment information" },
          { name: "Usage Data", desc: "How you interact with our website and app" },
          { name: "Device Information", desc: "IP address, browser type, device identifiers" },
        ]
      },
      {
        title: "How We Use Your Information",
        items: [
          { name: "Order Processing", desc: "To process and fulfill your orders" },
          { name: "Communication", desc: "To send order updates and respond to inquiries" },
          { name: "Improvement", desc: "To improve our products and services" },
          { name: "Marketing", desc: "With your consent, to send promotional materials" },
        ]
      },
      {
        title: "Data Security",
        content: "We implement industry-standard security measures to protect your personal information. We use encryption, secure servers, and regular security audits to keep your data safe.",
        items: []
      },
      {
        title: "Your Rights",
        items: [
          { name: "Access", desc: "Request access to your personal data" },
          { name: "Correction", desc: "Request correction of inaccurate data" },
          { name: "Deletion", desc: "Request deletion of your personal data" },
          { name: "Opt-Out", desc: "Unsubscribe from marketing communications" },
        ]
      },
      {
        title: "Cookies",
        content: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.",
        items: []
      },
      {
        title: "Updates",
        content: "We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page.",
        items: []
      }
    ]
  }
};

export default function PlaceholderPage({ title }: { title: string }) {
  const content = pageContent[title] || {
    icon: FileText,
    description: `Learn more about ${title.toLowerCase()}`,
    sections: []
  };
  const Icon = content.icon || FileText;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Icon className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-heading font-bold italic uppercase text-primary">{title}</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">{content.description}</p>
        </div>

        <div className="space-y-12">
          {content.sections.map((section: any, idx: number) => (
            <Card key={idx} className="bg-zinc-900 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-heading font-bold text-white">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.content && (
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                )}
                
                {section.items && section.items.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {section.items.map((item: any, itemIdx: number) => {
                      const ItemIcon = item.icon;
                      return (
                        <div 
                          key={itemIdx} 
                          className="p-4 bg-black/50 border border-white/5 rounded-lg hover:border-primary/50 transition-colors"
                        >
                          {ItemIcon && <ItemIcon className="h-6 w-6 text-primary mb-2" />}
                          <h3 className="font-bold text-white mb-1">{item.name}</h3>
                          {item.price && (
                            <p className="text-primary font-mono mb-2">{item.price}</p>
                          )}
                          {item.time && (
                            <p className="text-gray-400 text-sm mb-2">{item.time}</p>
                          )}
                          {item.date && (
                            <p className="text-gray-400 text-sm mb-2">{item.date}</p>
                          )}
                          {item.count && (
                            <p className="text-primary text-sm mb-2">{item.count}</p>
                          )}
                          {item.author && (
                            <p className="text-gray-500 text-sm mb-2">By {item.author}</p>
                          )}
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}