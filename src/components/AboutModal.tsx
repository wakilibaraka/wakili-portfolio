"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, Bookmark, BookOpen, Quote } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 30, rotateX: 15 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-2xl rounded-2xl p-1 bg-gradient-to-br from-[#f5d061] via-[#aa7c11] to-[#684903] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Ornate Card */}
            <div className="relative bg-[#163024] text-[#f7f5ee] rounded-[14px] p-6 md:p-10 border border-[#d4af37]/30 overflow-hidden">
              {/* Subtle Guilloché Background Texture */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row gap-8 relative z-0">
                {/* Left Side: Profile Image/Icon */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#d4af37] bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] shadow-inner mb-4">
                    <Scale className="w-10 h-10 md:w-14 md:h-14" />
                  </div>
                  <h3 className="text-lg font-serif font-bold tracking-wide text-[#f3cf65]">
                    BarakaLines
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#d4af37]/80 text-center">
                    Law Society of Kenya
                  </p>
                </div>

                {/* Right Side: Bio */}
                <div className="flex-1 space-y-4 text-[#e5e0d3]">
                  <div className="border-b border-[#d4af37]/20 pb-4">
                    <h2 className="text-2xl md:text-3xl font-serif text-[#f3cf65] mb-1">Emmanuel Baraka</h2>
                    <p className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-medium">Advocate & Policy Strategist</p>
                  </div>
                  
                  <div className="space-y-4 text-sm md:text-base leading-relaxed font-light">
                    <p>
                      Emmanuel Baraka is a dedicated advocate committed to justice, policy reform, and meticulous legal representation. BarakaLines serves as a premier legal chamber where complex challenges meet strategic, principled solutions.
                    </p>
                    <p>
                      With a profound understanding of the law and an unwavering commitment to our clients' causes, we navigate the intricacies of the legal system with discretion, diligence, and unparalleled expertise.
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-[#d4af37]/20">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[#d4af37]">
                      <Bookmark className="w-4 h-4" />
                      <span>Legal Counsel</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[#d4af37]">
                      <BookOpen className="w-4 h-4" />
                      <span>Policy Strategy</span>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="mt-4 p-4 bg-black/20 rounded-lg border border-[#d4af37]/10 flex gap-3">
                    <Quote className="w-6 h-6 text-[#d4af37]/50 shrink-0" />
                    <p className="font-serif italic text-xs md:text-sm text-[#f3cf65]/90">
                      "Injustice anywhere is a threat to justice everywhere. We are caught in an inescapable network of mutuality."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
