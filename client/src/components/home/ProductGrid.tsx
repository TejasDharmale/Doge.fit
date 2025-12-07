import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Transformer T-Shirt",
    price: 45.00,
    salePrice: 35.00,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800",
    isNew: true,
  },
  {
    id: 2,
    name: "Hydro Flask Pro",
    price: 25.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1602143407151-011141959301?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Knitted Golf Sweater",
    price: 89.00,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Performance Cap",
    price: 30.00,
    category: "Headwear",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800",
    isSale: true,
  },
];

export function ProductGrid() {
  return (
    <section id="shop" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-heading font-bold text-white uppercase italic mb-2">
              Featured <span className="text-primary">Gear</span>
            </h2>
            <p className="text-gray-400">High performance equipment for the modern athlete.</p>
          </div>
          <Button variant="link" className="text-primary hover:text-white hidden md:flex">
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-secondary text-black font-bold rounded-none uppercase text-xs">New Arrival</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-primary text-black font-bold rounded-none uppercase text-xs">Sale</Badge>
                  )}
                  {product.salePrice && (
                    <Badge className="bg-red-500 text-white font-bold rounded-none uppercase text-xs">Save 20%</Badge>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" className="bg-white text-black hover:bg-primary">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors cursor-pointer">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-primary font-mono font-bold">${product.salePrice.toFixed(2)}</span>
                      <span className="text-gray-600 font-mono line-through text-sm">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-white font-mono font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full border-zinc-800 text-white">View All Products</Button>
        </div>
      </div>
    </section>
  );
}
