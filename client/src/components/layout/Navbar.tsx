import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import logoImg from "@assets/image_1765123510416.png";
import { useCartStore, useAuthStore } from "@/lib/store";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { items } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop-gear", label: "Shop" },
    { href: "/app-features", label: "App" },
    { href: "/community", label: "Community" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity pr-1">
            <img src={logoImg} alt="DODGE.FIT" className="h-10 w-auto" />
            <span className="text-2xl font-heading font-bold italic tracking-tight text-white">
              DODGE<span className="text-primary">.FIT</span>
            </span>
          </a>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <a className="text-sm font-medium text-gray-300 hover:text-primary transition-colors uppercase tracking-wider">
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
             <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">Hi, {user?.name}</span>
                <Button variant="ghost" size="icon" onClick={() => logout()} className="text-white hover:text-red-500 hover:bg-white/5">
                  <LogOut className="w-5 h-5" />
                </Button>
             </div>
          ) : (
            <Link href="/auth">
                <Button variant="ghost" size="icon" className="text-white hover:text-primary hover:bg-white/5">
                <User className="w-5 h-5" />
                </Button>
            </Link>
          )}

          <Link href="/checkout">
            <Button variant="ghost" size="icon" className="text-white hover:text-primary hover:bg-white/5 relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-primary text-black font-bold rounded-full">
                    {cartCount}
                </span>
                )}
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {links.map((link) => (
                <Link key={link.label} href={link.href}>
                  <a
                    className="text-lg font-heading font-medium text-white hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 flex space-x-4">
                 {!isAuthenticated ? (
                    <Link href="/auth">
                        <Button className="w-full border-white/20 text-white hover:bg-primary hover:text-black hover:border-primary" variant="outline" onClick={() => setIsOpen(false)}>
                            Login
                        </Button>
                    </Link>
                 ) : (
                    <Button onClick={() => { logout(); setIsOpen(false); }} variant="outline" className="w-full border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white">
                        Logout
                    </Button>
                 )}
                 <Link href="/checkout">
                    <Button className="w-full bg-primary text-black hover:bg-primary/90" onClick={() => setIsOpen(false)}>
                        Cart ({cartCount})
                    </Button>
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
