import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-bold italic text-white">
              DODGE<span className="text-primary">.FIT</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating your fitness journey with premium gear, community events, and cutting-edge technology.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-6 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3">
              {["Shop Gear", "Our Story", "Community", "App Features", "Blog"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-6 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              {["FAQ", "Shipping & Returns", "Size Guide", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-bold text-white mb-6 uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>dodgedotfit@gmail.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Fitness Blvd, Gym City, CA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dodge.Fit. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
