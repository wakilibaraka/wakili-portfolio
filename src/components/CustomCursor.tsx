import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Pointer } from "lucide-react";

export default function CustomCursor({ isNightMode }: { isNightMode: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[class*="cursor-pointer"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const primaryColor = isNightMode ? "text-emerald-400" : "text-[#d4af37]";
  const secondaryColor = isNightMode ? "text-emerald-200" : "text-[#f3cf65]";
  const fillColor = isNightMode ? "fill-emerald-950" : "fill-[#382015]";

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - (isHovering ? 12 : 6),
          y: mousePosition.y - (isHovering ? 4 : 4),
          scale: isClicking ? 0.85 : 1,
          rotate: isHovering ? -15 : 0
        }}
        transition={{ 
          x: { type: "tween", duration: 0 },
          y: { type: "tween", duration: 0 },
          scale: { type: "spring", stiffness: 800, damping: 35 },
          rotate: { type: "spring", stiffness: 800, damping: 35 }
        }}
      >
        <AnimatePresence mode="wait">
          {!isHovering ? (
            <motion.div
              key="default-cursor"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <MousePointer2 
                className={`w-7 h-7 ${primaryColor} ${fillColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`} 
                strokeWidth={2}
              />
            </motion.div>
          ) : (
            <motion.div
              key="hand-cursor"
              initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -30 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              {/* Dynamic Animated Burst Lines for Hover */}
              <motion.div 
                className="absolute -top-3 -left-2 w-full h-full"
                animate={{ rotate: isClicking ? 45 : 0, scale: isClicking ? 1.2 : 1 }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: [0, 1, 0], y: [5, -5, -10] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className={`absolute top-0 left-3 w-1 h-2 rounded-full ${secondaryColor} bg-current`} 
                />
                <motion.div 
                  initial={{ opacity: 0, x: 5, y: 5 }} 
                  animate={{ opacity: [0, 1, 0], x: [5, 10, 15], y: [5, 0, -5] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
                  className={`absolute top-2 left-6 w-1 h-2 rounded-full ${secondaryColor} bg-current rotate-45`} 
                />
                <motion.div 
                  initial={{ opacity: 0, x: -5, y: 5 }} 
                  animate={{ opacity: [0, 1, 0], x: [-5, -10, -15], y: [5, 0, -5] }} 
                  transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
                  className={`absolute top-2 left-0 w-1 h-2 rounded-full ${secondaryColor} bg-current -rotate-45`} 
                />
              </motion.div>
              
              <Pointer 
                className={`w-8 h-8 ${primaryColor} ${fillColor} drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]`} 
                strokeWidth={1.5}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
