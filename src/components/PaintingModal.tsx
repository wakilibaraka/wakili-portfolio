"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Mail, Phone, MapPin, Scale, Check, Copy } from "lucide-react";

interface PaintingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaintingModal({ isOpen, onClose }: PaintingModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
            className="relative w-full max-w-lg rounded-2xl p-1 bg-gradient-to-br from-shade-21 via-shade-22 to-accent-shadow shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Ornate Card */}
            <div className="relative bg-green-racing text-paper-cream rounded-[14px] p-6 md:p-8 border border-accent-brass/30 overflow-hidden">
              {/* Subtle Guilloché Background Texture */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(var(--color-accent-brass)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-accent-brass hover:bg-accent-brass/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Seal */}
              <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-accent-brass/20">
                <div className="w-12 h-12 rounded-full border-2 border-accent-brass bg-accent-brass/10 flex items-center justify-center text-accent-brass shadow-inner">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif tracking-wide text-accent-gold">
                    Emmanuel Baraka
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-accent-brass/80">
                    Advocate of the High Court • Legal Counsel
                  </p>
                </div>
              </div>

              {/* Contact Information Rows */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/25 border border-accent-brass/15">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent-brass" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-accent-brass/70">Email Inquiries</p>
                      <a href="mailto:wakilibara@gmail.com" className="text-sm font-medium hover:underline">
                        wakilibara@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("wakilibara@gmail.com", "email")}
                    className="p-2 text-xs rounded-lg hover:bg-accent-brass/15 text-accent-brass transition-colors"
                  >
                    {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct Line */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/25 border border-accent-brass/15">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent-brass" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-accent-brass/70">Chambers Direct Line</p>
                      <a href="tel:254797078998" className="text-sm font-medium hover:underline">
                        +254 797 078 998
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("+254797078998", "phone")}
                    className="p-2 text-xs rounded-lg hover:bg-accent-brass/15 text-accent-brass transition-colors"
                  >
                    {copiedField === "phone" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Office Chambers */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/25 border border-accent-brass/15">
                  <MapPin className="w-5 h-5 text-accent-brass shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-accent-brass/70">Chambers Location</p>
                    <p className="text-sm font-medium">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Motto Footer */}
              <div className="mt-6 pt-4 border-t border-accent-brass/15 text-center">
                <p className="font-serif italic text-xs text-accent-brass/80">
                  "Please, Understand Me!" • Discretion & Diligence
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
