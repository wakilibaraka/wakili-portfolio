"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, Scale, Check, Copy } from "lucide-react";

interface PaintingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaintingModal({ isOpen, onClose }: PaintingModalProps) {
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
            initial={{ scale: 0.8, y: 30, rotateX: 15 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-lg rounded-2xl p-1 bg-gradient-to-br from-[#f5d061] via-[#aa7c11] to-[#684903] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Ornate Card */}
            <div className="relative bg-[#163024] text-[#f7f5ee] rounded-[14px] p-6 md:p-8 border border-[#d4af37]/30 overflow-hidden">
              {/* Subtle Guilloché Background Texture */}
              <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Seal */}
              <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-[#d4af37]/20">
                <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] shadow-inner">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif tracking-wide text-[#f3cf65]">
                    Emmanuel Baraka
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#d4af37]/80">
                    Advocate of the High Court • Legal Counsel
                  </p>
                </div>
              </div>

              {/* Contact Information Rows */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/25 border border-[#d4af37]/15">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#d4af37]" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#d4af37]/70">Email Inquiries</p>
                      <a href="mailto:contact@barakalines.com" className="text-sm font-medium hover:underline">
                        contact@barakalines.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("contact@barakalines.com", "email")}
                    className="p-2 text-xs rounded-lg hover:bg-[#d4af37]/15 text-[#d4af37] transition-colors"
                  >
                    {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct Line */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/25 border border-[#d4af37]/15">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#d4af37]" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#d4af37]/70">Chambers Direct Line</p>
                      <a href="tel:+254700000000" className="text-sm font-medium hover:underline">
                        +254 (0) 700 000 000
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard("+254700000000", "phone")}
                    className="p-2 text-xs rounded-lg hover:bg-[#d4af37]/15 text-[#d4af37] transition-colors"
                  >
                    {copiedField === "phone" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Office Chambers */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/25 border border-[#d4af37]/15">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#d4af37]/70">Chambers Location</p>
                    <p className="text-sm font-medium">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Motto Footer */}
              <div className="mt-6 pt-4 border-t border-[#d4af37]/15 text-center">
                <p className="font-serif italic text-xs text-[#d4af37]/80">
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
