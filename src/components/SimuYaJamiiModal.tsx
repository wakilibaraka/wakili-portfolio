"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, CalendarClock, PhoneCall, Check, MessageSquare } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimuYaJamiiModal({ isOpen, onClose }: BookingModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const handleBookWhatsapp = () => {
    window.open("https://wa.me/254797078998?text=Hello%20Emmanuel%2C%20I%27d%20like%20to%20book%20a%20consultation.", "_blank");
    setActiveStep(1);
    setTimeout(() => { setActiveStep(0); onClose(); }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.8, y: 50, rotateX: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, y: 0, rotateX: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.85, y: 30, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { type: "spring", damping: 24, stiffness: 260 }}
            className="relative w-full max-w-sm rounded-3xl p-1.5 bg-gradient-to-b from-whatsapp-base via-shade-88 to-shade-89 shadow-[0_30px_60px_-10px_rgba(0,168,89,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Simu ya Jamii Casing */}
            <div className="relative bg-shade-90 text-paper-cream rounded-[20px] p-6 border-4 border-whatsapp-base/50 overflow-hidden shadow-inner">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-whatsapp-base hover:bg-whatsapp-base/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top Branding (Yellow/Green Nostalgia) */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-whatsapp-base border-4 border-accent-gold flex items-center justify-center shadow-[0_0_20px_rgba(243,207,101,0.3)] mb-3">
                   <PhoneCall className="w-7 h-7 text-accent-gold" />
                </div>
                <h3 className="text-xl font-bold tracking-widest text-accent-gold uppercase">
                  Simu ya Jamii
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-whatsapp-base font-bold mt-1">
                  Chambers Booking Terminal
                </p>
              </div>

              {/* Digital LCD Screen */}
              <div className="w-full bg-shade-91 rounded-lg border-[3px] border-mono-800 p-4 mb-6 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-black)_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none" />
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] text-shade-23 font-bold tracking-widest uppercase mb-1">Status</p>
                     <p className="text-lg text-shade-24 font-mono font-bold">{activeStep === 0 ? "READY" : "CONNECTING..."}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] text-shade-23 font-bold tracking-widest uppercase mb-1">Credit</p>
                     <p className="text-xl text-shade-24 font-mono font-bold">KSH 00</p>
                   </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 relative z-10">
                {activeStep === 0 ? (
                  <>
                    <button 
                      onClick={handleBookWhatsapp}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-whatsapp-bright to-shade-92 text-white font-bold tracking-wide uppercase text-sm shadow-[0_5px_15px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <MessageSquare className="w-5 h-5" />
                      WhatsApp Booking
                    </button>
                    <button 
                      onClick={() => { window.location.href = "mailto:wakilibara@gmail.com"; }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-gold to-accent-brass text-shade-3 font-bold tracking-wide uppercase text-sm shadow-[0_5px_15px_rgba(243,207,101,0.3)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <CalendarClock className="w-5 h-5" />
                      Email Request
                    </button>
                  </>
                ) : (
                  <div className="w-full py-6 rounded-xl bg-black/40 border border-whatsapp-base/30 flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-whatsapp-bright/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-whatsapp-bright" />
                    </div>
                    <p className="text-accent-gold font-bold uppercase tracking-wider text-sm">Request Sent</p>
                    <p className="text-[10px] text-whatsapp-base uppercase tracking-widest">Redirecting...</p>
                  </div>
                )}
              </div>

              {/* Bottom Coin Slot detail */}
              <div className="flex justify-center mt-6">
                 <div className="w-12 h-1 bg-mono-800 rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
