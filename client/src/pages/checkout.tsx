import { useState } from "react";
import { useLocation } from "wouter";
import { useAuthStore, useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Trash2, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCartStore();
  const { toast } = useToast();
  
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Protected Route Logic
  if (!isAuthenticated) {
    setLocation("/auth");
    return null;
  }

  const subtotal = getCartTotal();
  const total = subtotal * (1 - discount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SUMMER25") {
      setDiscount(0.25);
      toast({ title: "Coupon Applied!", description: "25% discount applied successfully." });
    } else {
      toast({ variant: "destructive", title: "Invalid Coupon", description: "This code is invalid or expired." });
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    toast({ title: "Order Placed!", description: "Thank you for your purchase." });
    clearCart();
    setLocation("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl font-heading font-bold italic mb-4">Your Cart is Empty</h2>
            <Button onClick={() => setLocation("/")} className="bg-primary text-black hover:bg-white">
                Start Shopping
            </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white pl-0" onClick={() => setLocation("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Button>
        
        <h1 className="text-4xl font-heading font-bold italic uppercase mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-zinc-900/50 p-4 border border-white/5 items-center">
                <div className="h-24 w-24 bg-white/5 p-2 rounded-sm shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-primary font-mono">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-white/20 rounded-md">
                    <button 
                        className="px-3 py-1 hover:bg-white/10"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <span className="px-2 font-mono">{item.quantity}</span>
                    <button 
                        className="px-3 py-1 hover:bg-white/10"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/10 p-6 sticky top-24">
              <h3 className="text-xl font-heading font-bold uppercase mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Discount (25%)</span>
                    <span>-₹{(subtotal * discount).toFixed(2)}</span>
                  </div>
                )}
                <Separator className="bg-white/10" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <label className="text-sm uppercase font-bold text-gray-500">Have a discount code?</label>
                <div className="flex gap-2">
                    <Input 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Try SUMMER25" 
                        className="bg-black border-white/10 text-white" 
                    />
                    <Button onClick={applyCoupon} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                        Apply
                    </Button>
                </div>
              </div>

              <Button onClick={handleCheckout} className="w-full bg-primary text-black hover:bg-white font-bold uppercase py-6 text-lg">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
