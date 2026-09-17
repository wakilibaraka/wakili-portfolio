import React, { useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Phone, Mail, MessageCircle } from "lucide-react";
import { useModalAccessibility } from "../hooks/useModalAccessibility";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.9, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.95, y: 10, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-sm bg-paper-cream text-ink-deep p-6 rounded-2xl shadow-2xl relative border-4 border-wood-mahogany"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass"
              aria-label="Close contact modal"
            >
              <X size={20} />
            </button>

            <h2 id="contact-modal-title" className="font-display font-bold text-2xl mb-6 flex items-center gap-3">
              <Phone className="text-accent-brass" size={24} />
              Contact The Office
            </h2>

            <div className="space-y-4">
              <a href="tel:+254700000000" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-black/10 hover:border-accent-brass hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass">
                <div className="w-10 h-10 rounded-full bg-mono-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="font-bold text-lg">+254 700 000 000</div>
                  <div className="text-sm text-ink-muted">Direct Line</div>
                </div>
              </a>
              
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-black/10 hover:border-whatsapp-base hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp-base">
                <div className="w-10 h-10 rounded-full bg-whatsapp-base text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="font-bold text-lg">WhatsApp</div>
                  <div className="text-sm text-ink-muted">Quick Messaging</div>
                </div>
              </a>

              <a href="mailto:info@barakalines.com" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-black/10 hover:border-accent-terracotta hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-terracotta">
                <div className="w-10 h-10 rounded-full bg-accent-terracotta text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-bold text-lg">info@barakalines.com</div>
                  <div className="text-sm text-ink-muted">Email Inquiries</div>
                </div>
              </a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
