import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage, useTexture, Html } from "@react-three/drei";
import { TextureLoader } from "three";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, X, RotateCcw } from "lucide-react";
import * as THREE from "three";

function ProductMesh({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, imageUrl);
  
  // Auto-rotate
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Simple box geometry for t-shirts/boxes, or cylinder for bottles? 
          For a generic viewer, a rounded box or a plane with thickness looks best 
          if we don't know the shape. Let's use a Box. */}
      <boxGeometry args={[3, 3, 0.2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-primary">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-sm font-mono uppercase">Loading 3D View...</span>
      </div>
    </Html>
  );
}

interface Product3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    image: string;
    price: number;
  } | null;
}

export function Product3DViewer({ isOpen, onClose, product }: Product3DViewerProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-zinc-950 border-white/10 p-0 overflow-hidden flex flex-col">
        <div className="absolute top-4 right-4 z-50">
             <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-full">
                <X className="w-6 h-6" />
             </Button>
        </div>

        <DialogHeader className="p-6 bg-black/50 backdrop-blur-sm absolute top-0 left-0 w-full z-40 pointer-events-none">
            <DialogTitle className="text-2xl font-heading font-bold text-white uppercase italic">
                {product.name}
            </DialogTitle>
            <DialogDescription className="text-primary font-mono font-bold text-lg">
                3D Inspection Mode
            </DialogDescription>
        </DialogHeader>

        <div className="flex-1 w-full h-full relative bg-gradient-to-b from-zinc-900 to-black">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
                <React.Suspense fallback={<LoadingSpinner />}>
                    <Stage environment="city" intensity={0.6}>
                        <ProductMesh imageUrl={product.image} />
                    </Stage>
                    <OrbitControls autoRotate={false} makeDefault />
                </React.Suspense>
            </Canvas>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest pointer-events-none">
                Drag to Rotate • Scroll to Zoom
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Need this to handle the context where useLoader is called
import React from 'react';
