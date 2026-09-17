"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Scale, Target, Shield, Heart } from "lucide-react";
import { useModalAccessibility } from "../hooks/useModalAccessibility";

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MissionModal({ isOpen, onClose }: MissionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalAccessibility(isOpen, onClose, modalRef);
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
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-modal-title"
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.95, y: 10, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-wood-blackest border-4 border-accent-brass p-6 md:p-8 rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] relative text-paper-cream overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-accent-brass hover:bg-accent-brass/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <Scale className="w-12 h-12 text-accent-brass mb-4 opacity-90" />
              <h2 id="mission-modal-title" className="font-serif font-bold text-2xl md:text-3xl tracking-widest text-accent-gold text-center">
                JUSTICE, EQUITY & TRUTH
              </h2>
              <div className="w-24 h-1 bg-accent-brass/40 mt-4 rounded-full" />
            </div>

            <div className="space-y-8 font-light text-sm md:text-base leading-relaxed text-shade-3">
              <section>
                <h3 className="flex items-center gap-2 font-serif text-lg text-accent-gold mb-2 font-bold tracking-wider">
                  <Target className="w-5 h-5 text-accent-brass" /> OUR MISSION
                </h3>
                <p>
                  To champion justice, equity, and truth through strategic litigation, meticulous legal research, and transformative policy advocacy. We strive to provide principled solutions to complex challenges.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 font-serif text-lg text-accent-gold mb-2 font-bold tracking-wider">
                  <Heart className="w-5 h-5 text-accent-brass" /> OUR VISION
                </h3>
                <p>
                  A society where constitutional rights are uncompromisingly upheld, human rights are vigorously protected, and justice remains accessible to all, irrespective of their standing.
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-2 font-serif text-lg text-accent-gold mb-2 font-bold tracking-wider">
                  <Shield className="w-5 h-5 text-accent-brass" /> OUR VALUES
                </h3>
                <ul className="space-y-3 mt-2 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-brass mt-1">✦</span>
                    <span><strong>Integrity:</strong> Unwavering commitment to truth, transparency, and ethical practice.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-brass mt-1">✦</span>
                    <span><strong>Equity:</strong> Ensuring fairness and leveling the scales for marginalized voices.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-brass mt-1">✦</span>
                    <span><strong>Excellence:</strong> Rigorous research and strategic foresight in every endeavor.</span>
                  </li>
                </ul>
              </section>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
