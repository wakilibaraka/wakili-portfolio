"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);

  const splineEmbedUrl = "https://my.spline.design/roomgirlworkingcopy-ehRcwHJSFOS9Q25yqaiBjxc5/";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-br from-bg-start to-bg-end flex flex-col items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-14 h-14 border-4 border-accent border-t-transparent rounded-full mb-6"
            />
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Opening Office...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <iframe 
        src={splineEmbedUrl} 
        frameBorder="0" 
        width="100%" 
        height="100%"
        className="w-full h-full border-none pointer-events-auto"
        allow="fullscreen"
        title="Interactive 3D Office"
      />
      
      {/* Interaction Hint Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-20"
      >
        <div className="glass-panel px-5 py-2.5 flex items-center gap-2.5 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
          <p className="text-xs md:text-sm font-semibold text-text-main">
            Drag to rotate office • Tap books & items to explore
          </p>
        </div>
      </motion.div>
    </div>
  );
}
