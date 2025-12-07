import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useState } from "react";
import { Product3DViewer } from "@/components/ui/3d-viewer";
import transformerImg from "@assets/image_1765122862294.png";
import gearTshirtImg from "@assets/image_1765122866730.png";
import tshirtImg from "@assets/image_1765122870187.png";
import bottleImg from "@assets/image_1765122910978.png";

const products = [
  {
    id: 1,
    name: "DodgeFit Transformer Tshirt",
    price: 1299.00,
    category: "Apparel",
    image: transformerImg,
    isNew: true,
  },
  {
    id: 2,
    name: "DodgeFit Gear Tshirt",
    price: 999.00,
    category: "Apparel",
    image: gearTshirtImg,
    isNew: true,
  },
  {
    id: 3,
    name: "DodgeFit Tshirt",
    price: 699.00,
    category: "Apparel",
    image: tshirtImg,
  },
  {
    id: 4,
    name: "DodgeFit Shaker Bottle",
    price: 600.00,
    category: "Accessories",
    image: bottleImg,
  },
];

export function ProductGrid() {
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
    });
  };

  const handleOpen3D = (product: any) => {
    setSelectedProduct(product);
    setViewerOpen(true);
  };

  return (
    <section id="shop" className="py-24 bg-zinc-950">
      <Product3DViewer 
        isOpen={viewerOpen} 
        onClose={() => setViewerOpen(false)} 
        product={selectedProduct} 
      />

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-heading font-bold text-white uppercase italic mb-2">
              Featured <span className="text-primary">Gear</span>
            </h2>
            <p className="text-gray-400">High performance equipment for the modern athlete.</p>
          </div>
          <Link href="/products">
            <Button variant="link" className="text-primary hover:text-white hidden md:flex cursor-pointer">
                View All Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-4 rounded-sm border border-white/5 transition-colors group-hover:border-primary/50">
                <div className="absolute inset-0 p-4 flex items-center justify-center">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
                  {product.isNew && (
                    <Badge className="bg-secondary text-black font-bold rounded-none uppercase text-xs">New</Badge>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Button 
                        size="icon" 
                        onClick={() => handleAddToCart(product)} 
                        className="bg-white text-black hover:bg-primary transition-colors shadow-lg"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Button 
                        size="icon" 
                        variant="outline" 
                        onClick={() => handleOpen3D(product)}
                        className="border-white text-white hover:bg-white hover:text-black transition-colors shadow-lg relative overflow-hidden"
                    >
                        <Eye className="w-4 h-4 relative z-10" />
                        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors cursor-pointer">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-primary font-mono font-bold">₹{product.price.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link href="/products">
                <Button variant="outline" className="w-full border-zinc-800 text-white cursor-pointer">View All Products</Button>
            </Link>
        </div>
      </div>
    </section>
  );
}
