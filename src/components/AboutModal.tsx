"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Scale, Bookmark, BookOpen, Quote } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const prefersReducedMotion = useReducedMotion();
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
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.8, y: 30, rotateX: 15 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, y: 0, rotateX: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.85, y: 20, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-2xl rounded-2xl p-1 bg-gradient-to-br from-shade-21 via-shade-22 to-accent-shadow shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Ornate Card */}
            <div className="relative bg-green-racing text-paper-cream rounded-[14px] p-6 md:p-10 border border-accent-brass/30 overflow-hidden">
              {/* Subtle Guilloché Background Texture */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(var(--color-accent-brass)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-accent-brass hover:bg-accent-brass/10 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row gap-8 relative z-0">
                {/* Left Side: Profile Image/Icon */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-accent-brass bg-accent-brass/10 flex items-center justify-center text-accent-brass shadow-inner mb-4">
                    <Scale className="w-10 h-10 md:w-14 md:h-14" />
                  </div>
                  <h3 className="text-lg font-serif font-bold tracking-wide text-accent-gold">
                    BarakaLines
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-accent-brass/80 text-center">
                    Legal Research
                  </p>
                </div>

                {/* Right Side: Bio */}
                <div className="flex-1 space-y-4 text-paper-dim">
                  <div className="border-b border-accent-brass/20 pb-4">
                    <h2 className="text-2xl md:text-3xl font-serif text-accent-gold mb-1">Emmanuel Baraka</h2>
                    <p className="text-xs uppercase tracking-widest text-accent-brass/80 font-medium">Lawyer & Policy Strategist</p>
                  </div>
                  
                  <div className="space-y-3 text-sm md:text-[15px] leading-relaxed font-light">
                    <p>
                      Emmanuel Baraka is a law graduate and human-rights practitioner completing his admission as an Advocate of the High Court of Kenya. He holds an LL.B (Upper Second) from Kisii University, completed the Advocates Training Program at the Kenya School of Law, and is pursuing an MSc in Security and Human Rights.
                    </p>
                    <div className="pt-2">
                      <h4 className="text-accent-gold font-serif font-bold text-sm tracking-wide mb-2 uppercase">Experience</h4>
                      <ul className="space-y-3 text-sm opacity-90">
                        <li className="flex gap-2">
                          <span className="text-accent-brass mt-1">•</span>
                          <span><strong>Paralegal, KEJUDE (Kenyans for Justice and Development Trust)</strong> — supported strategic constitutional litigation challenging unconstitutional laws under Sen. Okiya Omtatah; contributed to habeas corpus applications for youth unlawfully detained during the 2024 Gen Z protests; campaigned against femicide and police brutality.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-accent-brass mt-1">•</span>
                          <span><strong>Junior Paralegal, Mokaya J.M. Law Advocates</strong> — civil and criminal legal research, drafting, and litigation support.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-accent-brass/20">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-accent-brass">
                      <Bookmark className="w-4 h-4" />
                      <span>Human Rights</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-accent-brass">
                      <BookOpen className="w-4 h-4" />
                      <span>Policy Strategy</span>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="mt-4 p-4 bg-black/20 rounded-lg border border-accent-brass/10 flex gap-3">
                    <Quote className="w-6 h-6 text-accent-brass/50 shrink-0" />
                    <p className="font-serif italic text-xs md:text-sm text-accent-gold/90">
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
