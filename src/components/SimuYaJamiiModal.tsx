"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarClock, PhoneCall, Check, MessageSquare } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SimuYaJamiiModal({ isOpen, onClose }: BookingModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleBookWhatsapp = () => {
    window.open("https://wa.me/254700000000?text=Hello,%20I%20would%20like%20to%20book%20a%20legal%20consultation", "_blank");
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
            initial={{ scale: 0.8, y: 50, rotateX: 20 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="relative w-full max-w-sm rounded-3xl p-1.5 bg-gradient-to-b from-[#00A859] via-[#008f4c] to-[#005e32] shadow-[0_30px_60px_-10px_rgba(0,168,89,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Simu ya Jamii Casing */}
            <div className="relative bg-[#0a1a11] text-[#f7f5ee] rounded-[20px] p-6 border-4 border-[#00A859]/50 overflow-hidden shadow-inner">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-[#00A859] hover:bg-[#00A859]/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top Branding (Yellow/Green Nostalgia) */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#00A859] border-4 border-[#F3CF65] flex items-center justify-center shadow-[0_0_20px_rgba(243,207,101,0.3)] mb-3">
                   <PhoneCall className="w-7 h-7 text-[#F3CF65]" />
                </div>
                <h3 className="text-xl font-bold tracking-widest text-[#F3CF65] uppercase">
                  Simu ya Jamii
                </h3>
                <p className="text-[9px] uppercase tracking-widest text-[#00A859] font-bold mt-1">
                  Chambers Booking Terminal
                </p>
              </div>

              {/* Digital LCD Screen */}
              <div className="w-full bg-[#8b9977] rounded-lg border-[3px] border-[#333] p-4 mb-6 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none" />
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] text-[#2c3321] font-bold tracking-widest uppercase mb-1">Status</p>
                     <p className="text-lg text-[#1a1f13] font-mono font-bold">{activeStep === 0 ? "READY" : "CONNECTING..."}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] text-[#2c3321] font-bold tracking-widest uppercase mb-1">Credit</p>
                     <p className="text-xl text-[#1a1f13] font-mono font-bold">KSH 00</p>
                   </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 relative z-10">
                {activeStep === 0 ? (
                  <>
                    <button 
                      onClick={handleBookWhatsapp}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1da851] text-white font-bold tracking-wide uppercase text-sm shadow-[0_5px_15px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <MessageSquare className="w-5 h-5" />
                      WhatsApp Booking
                    </button>
                    <button 
                      onClick={() => { window.location.href = "mailto:appointments@barakalines.com"; }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F3CF65] to-[#d4af37] text-[#38260b] font-bold tracking-wide uppercase text-sm shadow-[0_5px_15px_rgba(243,207,101,0.3)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <CalendarClock className="w-5 h-5" />
                      Email Request
                    </button>
                  </>
                ) : (
                  <div className="w-full py-6 rounded-xl bg-black/40 border border-[#00A859]/30 flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-[#25D366]" />
                    </div>
                    <p className="text-[#F3CF65] font-bold uppercase tracking-wider text-sm">Request Sent</p>
                    <p className="text-[10px] text-[#00A859] uppercase tracking-widest">Redirecting...</p>
                  </div>
                )}
              </div>

              {/* Bottom Coin Slot detail */}
              <div className="flex justify-center mt-6">
                 <div className="w-12 h-1 bg-[#333] rounded-full shadow-[0_1px_1px_rgba(255,255,255,0.2)]" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
