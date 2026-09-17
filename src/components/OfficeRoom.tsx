"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence, useReducedMotion } from "framer-motion";
import RoomTwo from "./RoomTwo";
import { Scale, BookOpen, Mail, Phone, Compass, Sparkles, Power } from "lucide-react";
import TeaSteam from "./TeaSteam";
import CustomCursor from "./CustomCursor";
import PaintingModal from "./PaintingModal";
import BookshelfModal from "./BookshelfModal";
import AboutModal from "./AboutModal";
import { useTelephoneRing } from "../hooks/useTelephoneRing";
import SimuYaJamiiModal from "./SimuYaJamiiModal";

export default function OfficeRoom() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  const [isPaintingOpen, setIsPaintingOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPhonePickedUp, setIsPhonePickedUp] = useState(false);
  const { playPickUpClack } = useTelephoneRing();
  const [isBookshelfOpen, setIsBookshelfOpen] = useState(false);
  const [hasGyroscope, setHasGyroscope] = useState(false);
  const [interactionMode, setInteractionMode] = useState<"mouse" | "gyro" | "touch">("mouse");
  const [isNightMode, setIsNightMode] = useState(false);

  // Multi-Room Scroll Logic (Revolving Door on Y Axis)
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  // Room 1 (Reception): Rotates to the right (-90deg on Y axis)
  const scrollRoom1RotateY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -90]);
  const scrollRoom1Z = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -200]);
  const scrollRoom1Opacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], prefersReducedMotion ? [1, 1, 0, 0] : [1, 0.25, 0.08, 0]);
  
  // Room 2 (Office): Rotates in from the left (90deg to 0 on Y axis)
  const scrollRoom2RotateY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [90, 0]);
  const scrollRoom2Z = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-200, 0]);
  const scrollRoom2Opacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], prefersReducedMotion ? [0, 0, 1, 1] : [0, 0.08, 0.25, 1]);
  
  // Hanging Bulb Scroll Animation
  const bulbScrollY = useTransform(scrollYProgress, [0.1, 0.3], prefersReducedMotion ? [0, 0] : [0, -200]);
  const bulbOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);
  
  // Door Opening Animation
  const doorLeftRotateY = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? [-15, -15] : [0, -110]);
  const doorRightRotateY = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? [15, 15] : [0, 110]);


  // Play mechanical click using Web Audio API (zero external assets needed)
  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Audio not supported");
    }
  };

  const toggleNightMode = () => {
    playClickSound();
    setIsNightMode(prev => !prev);
  };

  // Chron-Logic: Time and Day Check
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();
    const day = date.getDay();
    // Default to night mode during weekends (0=Sun, 6=Sat) or nighttime (before 7am, after 6pm)
    if (day === 0 || day === 6 || hour < 7 || hour >= 18) {
      setIsNightMode(true);
    }
  }, []);

  // Motion Values for tilt coordinates (-1 to 1)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { damping: 35, stiffness: 120 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // 3D Rotations & Translations
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const panX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const panY = useTransform(smoothY, [-1, 1], [-14, 14]);

  // Deep Background shift
  const bgShiftX = useTransform(smoothX, [-1, 1], [10, -10]);
  const bgShiftY = useTransform(smoothY, [-1, 1], [8, -8]);

  // Foreground extra pop shift
  const fgShiftX = useTransform(smoothX, [-1, 1], [-26, 26]);
  const fgShiftY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // Handle Desktop Mouse Move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    if (interactionMode === "gyro") return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    rawX.set(x);
    rawY.set(y);
  };

  // Handle Mobile Gyroscope / DeviceOrientation
  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      setHasGyroscope(true);
      setInteractionMode("gyro");
      // Clamp gamma (-30 to 30) and beta (15 to 75)
      const clampedGamma = Math.max(-35, Math.min(35, e.gamma));
      const clampedBeta = Math.max(20, Math.min(70, e.beta));
      
      const normX = clampedGamma / 35;
      const normY = (clampedBeta - 45) / 25;

      rawX.set(normX);
      rawY.set(normY);
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [rawX, rawY, prefersReducedMotion]);

  // Fallback touch drag on mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (prefersReducedMotion) return;
    if (interactionMode === "gyro") return;
    const touch = e.touches[0];
    const { innerWidth, innerHeight } = window;
    const x = (touch.clientX / innerWidth) * 2 - 1;
    const y = (touch.clientY / innerHeight) * 2 - 1;
    rawX.set(x * 1.2);
    rawY.set(y * 1.2);
  };

  return (
    <div className={`relative w-full h-[250vh] transition-colors duration-1000 ${isNightMode ? "bg-shade-1" : "bg-shade-2"}`}>
      <div
        className={`fixed inset-0 w-full h-screen overflow-hidden perspective-stage flex items-center justify-center cursor-none transition-colors duration-1000 ${
          isNightMode 
            ? "bg-gradient-to-b from-shade-25 via-shade-26 to-shade-1" 
            : "bg-gradient-to-b from-green-racing-deep via-green-racing to-shade-2"
        }`}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* ROOM 1: Landing Viewport (Reception) */}
        <motion.div
          style={{ rotateY: scrollRoom1RotateY, z: scrollRoom1Z, opacity: scrollRoom1Opacity }}
          className="absolute inset-0 preserve-3d flex items-center justify-center"
        >
          {/* 2.5D Room Isometric Rig */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: panX,
              y: panY,
            }}
            className="relative w-full max-w-4xl h-[620px] md:h-[680px] preserve-3d flex items-center justify-center select-none scale-[0.8] md:scale-100 will-change-transform"
          >
        {/* ========================================================= */}
        {/* LAYER 1: Deep Background (z: -120px)                     */}
        {/* ========================================================= */}
        <motion.div
          style={{ x: bgShiftX, y: bgShiftY }}
          className={`absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-120px)] after:absolute after:inset-0 after:pointer-events-none transition-colors duration-1000 ${isNightMode ? "after:bg-[linear-gradient(to_bottom,var(--color-night-sky-deep),transparent)] after:opacity-70" : "after:bg-[linear-gradient(to_bottom,var(--color-paper-dim),transparent)] after:opacity-40"}`}
        >
          {/* Main Wall Surface */}
          <div className={`relative w-[92%] h-[88%] rounded-3xl border-4 border-wood-mahogany shadow-2xl overflow-hidden transition-colors duration-1000 ${isNightMode ? "bg-shade-27" : "bg-green-racing"}`}>
            {/* Victorian Wainscoting Molding Lines */}
            <div className={`absolute bottom-0 left-0 right-0 h-40 border-t-4 border-accent-brass/40 flex gap-4 px-6 pt-3 transition-colors duration-1000 ${isNightMode ? "bg-wood-night" : "bg-wood-dark"}`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`flex-1 h-28 border-2 border-wood-mahogany rounded-lg shadow-inner transition-colors duration-1000 ${isNightMode ? "bg-wood-ink/80" : "bg-shade-28/60"}`} />
              ))}
            </div>

            
            {/* The Contact Plaque (Above Door) */}
            <div className="absolute bottom-[240px] md:bottom-[380px] right-4 md:right-24 w-32 md:w-56 flex justify-center z-20 pointer-events-auto">
               <motion.button 
                 onClick={() => setIsBookingOpen(true)}
                 whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.6)" }}
                 whileTap={{ scale: 0.95 }}
                 className="w-24 md:w-40 h-10 md:h-12 bg-gradient-to-b from-shade-29 via-shade-30 to-shade-31 border-2 border-accent-gold/50 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
               >
                 <div className="absolute inset-1 border border-shade-32/40 rounded-sm pointer-events-none" />
                 <p className="text-shade-3 font-serif font-bold text-[7px] md:text-[8px] tracking-[0.1em] md:tracking-[0.15em] text-center uppercase leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
                   BOOK<br/>
                   <span className="text-wood-ink text-[8px] md:text-[10px] leading-tight">APPOINTMENT</span>
                 </p>
                 {/* Click indicator dot */}
                 <div className="absolute right-1 top-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-80 animate-ping" />
               </motion.button>
            </div>
            
            {/* The Grand Office Door (Right side, leading to Chamber) */}
            <div className="absolute bottom-0 right-4 md:right-24 w-32 md:w-56 h-56 md:h-88 border-4 border-wood-dark bg-black/80 flex perspective-stage z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
                {/* Left Door Panel */}
                <motion.div 
                  style={{ rotateY: doorLeftRotateY }} 
                  className="w-1/2 h-full bg-gradient-to-br from-wood-walnut to-wood-dark border-r border-black/40 origin-left shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center py-6 md:py-8 gap-4"
                >
                   <div className="w-2/3 h-1/4 border-2 border-wood-warm/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   <div className="w-2/3 h-1/2 border-2 border-wood-warm/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   {/* Handle */}
                   <div className="absolute right-1 md:right-2 top-1/2 w-1 md:w-1.5 h-8 md:h-10 bg-gradient-to-b from-accent-gold to-accent-brass-dim rounded-full shadow-md" />
                </motion.div>
                {/* Right Door Panel */}
                <motion.div 
                  style={{ rotateY: doorRightRotateY }} 
                  className="w-1/2 h-full bg-gradient-to-bl from-wood-walnut to-wood-dark border-l border-black/40 origin-right shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center py-6 md:py-8 gap-4"
                >
                   <div className="w-2/3 h-1/4 border-2 border-wood-warm/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   <div className="w-2/3 h-1/2 border-2 border-wood-warm/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   {/* Handle */}
                   <div className="absolute left-1 md:left-2 top-1/2 w-1 md:w-1.5 h-8 md:h-10 bg-gradient-to-b from-accent-gold to-accent-brass-dim rounded-full shadow-md" />
                </motion.div>
            </div>

            {/* The Wall Payphone (Contact Us) */}
            <div className="absolute top-48 md:top-56 left-4 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left z-20 touch-manipulation">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playPickUpClack();
                  setIsPhonePickedUp(true);
                  setTimeout(() => setIsPaintingOpen(true), 300);
                }}
                className={`group cursor-pointer relative ${(!isPhonePickedUp && !prefersReducedMotion) ? "animate-telephone-ring" : ""}`}
              >
                 {/* Payphone Backboard */}
                 <div className="w-12 h-20 bg-shade-33 rounded-sm border-2 border-wood-ink shadow-[10px_10px_20px_rgba(0,0,0,0.8)] flex flex-col items-center pt-1" />
                 {/* Payphone Red Body */}
                 <div className="absolute top-1 left-1 w-10 h-[72px] bg-gradient-to-br from-shade-34 to-shade-35 rounded-sm shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] flex flex-col items-center z-10">
                    {/* Coin Slot */}
                    <div className="w-8 h-4 mt-1 bg-mono-900 rounded-sm border border-mono-800 flex justify-center pt-0.5 shadow-inner">
                       <div className="w-1 h-2 bg-accent-brass shadow-[inset_0_0_2px_black]" />
                    </div>
                    {/* Keypad */}
                    <div className="w-6 h-6 mt-2 grid grid-cols-3 gap-0.5">
                       {[...Array(9)].map((_, i) => <div key={i} className="bg-mono-300 rounded-sm shadow-sm" />)}
                    </div>
                    {/* Coin Return */}
                    <div className="w-4 h-3 mt-2 bg-mono-900 rounded-sm border border-mono-800" />
                 </div>
                 {/* The Handset */}
                 <div className={`absolute top-2 -left-3 w-4 h-12 flex flex-col justify-between items-center transition-all duration-300 z-20 pointer-events-none ${
                   isPhonePickedUp ? "-translate-x-6 -translate-y-4 rotate-[-60deg]" : "rotate-[-10deg] group-hover:rotate-[-20deg]"
                 }`}>
                    {/* Earpiece */}
                    <div className="w-4 h-4 bg-mono-900 rounded-full border border-mono-850" />
                    {/* Handle */}
                    <div className="w-2 h-6 bg-mono-850" />
                    {/* Mouthpiece */}
                    <div className="w-4 h-4 bg-mono-900 rounded-full border border-mono-850" />
                    {/* Cord connecting handset to body */}
                    <svg className="absolute -bottom-4 left-2 w-6 h-6 overflow-visible" fill="transparent" stroke="var(--color-mono-900)" strokeWidth="1.5">
                       <path d="M 0 0 C -10 10, 10 10, 5 0" strokeDasharray="2 1" />
                    </svg>
                 </div>
                 {/* Indicator Dot */}
                 <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent-gold rounded-full shadow-[0_0_5px_var(--color-accent-gold)] animate-pulse z-20" />
              </motion.div>
            </div>

            {/* Interactive Light Switch (Moved next to double doors) */}
            <div className="absolute top-48 md:top-64 right-40 md:right-[350px] pointer-events-auto scale-75 md:scale-100 origin-right touch-manipulation z-30 flex flex-col items-center">
              
              {/* LED Indicator Dot */}
              <div className={`mb-1.5 w-1.5 h-1.5 rounded-full ${!isNightMode ? 'bg-shade-36 shadow-[0_0_6px_1px_var(--color-shade-36)]' : 'bg-shade-37 shadow-[0_0_6px_1px_var(--color-shade-37)]'} transition-colors duration-300`} />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNightMode}
                className={`w-8 h-12 rounded border-2 shadow-[2px_4px_12px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center relative cursor-pointer transition-colors duration-1000 ${
                  isNightMode ? "bg-switch-night-bg border-switch-night-border" : "bg-switch-day-bg border-switch-day-border"
                }`}
              >
                {/* Switch Plate Screws */}
                <div className="w-1 h-1 rounded-full bg-shade-4 absolute top-1.5 shadow-inner" />
                <div className="w-1 h-1 rounded-full bg-shade-4 absolute bottom-1.5 shadow-inner" />
                
                {/* The Toggle */}
                <div className={`w-3 h-5 rounded-sm bg-gradient-to-b shadow-md transition-all duration-150 ${
                  isNightMode 
                    ? "from-white to-shade-5 translate-y-1.5 shadow-[0_-2px_4px_rgba(0,0,0,0.3)]" 
                    : "from-shade-5 to-white -translate-y-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                }`} />
              </motion.div>
            </div>

            {/* Arched Window (Moved to Left side) */}
            <div className={`absolute top-10 md:top-10 left-4 md:left-56 w-24 md:w-44 h-40 md:h-64 rounded-t-full border-4 border-wood-mahogany shadow-inner overflow-hidden flex flex-col justify-end transition-colors duration-1000 ${
              isNightMode 
                ? "bg-gradient-to-b from-shade-38 via-shade-39 to-shade-40" 
                : "bg-gradient-to-b from-shade-6 via-shade-41 to-shade-42"
            }`}>
              {/* Window Panes Grid */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-1 p-2 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border border-wood-mahogany/40 rounded-sm" />
                ))}
              </div>
              {/* Soft Sunlight/Moonlight Beam across the floor */}
              <div className={`w-full h-full pointer-events-none transition-opacity duration-1000 ${
                isNightMode
                  ? "bg-gradient-to-tr from-shade-7/10 via-transparent to-transparent"
                  : "bg-gradient-to-tr from-shade-8/25 via-transparent to-transparent"
              }`} />
            </div>
          </div>
        </motion.div>

        

        {/* ========================================================= */}
        {/* LAYER 2.5: The Floor & Rug (z: 0px)                       */}
        {/* ========================================================= */}
        <div className="absolute inset-x-0 bottom-[-40px] h-64 preserve-3d flex justify-center [transform:translateZ(10px)] pointer-events-none">
          {/* Parquet Floor Surface */}
          <div className={`absolute bottom-0 w-[140%] h-full border-t-4 shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden transition-colors duration-1000 ${
            isNightMode ? "bg-shade-43 border-wood-dark" : "bg-shade-44 border-wood-mahogany"
          }`}>
            {/* Herringbone pattern approximation */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-black) 0, var(--color-black) 2px, transparent 2px, transparent 32px)' }} />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-black) 0, var(--color-black) 2px, transparent 2px, transparent 32px)' }} />
            
            {/* The Main Long Desk (3D Extruded) */}
            <div className="absolute bottom-12 md:bottom-16 w-[85%] max-w-4xl h-32 md:h-40 rounded-t-sm bg-gradient-to-b from-shade-45 to-shade-46 shadow-[0_40px_80px_-10px_var(--color-black),0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center opacity-100 z-10 [transform-style:preserve-3d]">
               
               {/* 3D Front Edge / Bevel */}
               <div className="absolute bottom-0 w-full h-4 bg-gradient-to-r from-shade-9 via-shade-10 to-shade-9 border-t border-shade-47 rounded-b-sm flex items-center justify-center shadow-md [transform:translateZ(10px)]">
                  {/* MLK Quote Engraving */}
                  <p className="font-serif text-[4px] md:text-[6px] tracking-[0.2em] md:tracking-[0.3em] text-accent-brass/80 uppercase shadow-inner">
                    "Injustice anywhere is a threat to justice everywhere." - MLK Jr.
                  </p>
               </div>
               
               {/* Surface Detail (Leather Insert) */}
               <div className="w-[96%] h-[80%] mt-2 border border-terracotta-dark/40 rounded-sm flex items-center justify-center bg-shade-10/30 relative">
                  <div className="w-2/3 h-2/3 border border-terracotta-dark/20 rounded-full flex items-center justify-center">
                     <div className="w-4 h-4 bg-terracotta-dark/20 rotate-45" />
                  </div>
                  
                  {/* Classic Office Phone */}
                  <div className="absolute bottom-4 right-8 md:right-16 w-12 md:w-16 h-8 md:h-10 bg-mono-900 rounded shadow-lg border-t-2 border-mono-800 flex flex-col items-center justify-center rotate-[15deg] pointer-events-auto cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all">
                     <div className="w-10 md:w-14 h-3 bg-mono-850 rounded-full border border-black -translate-y-2 flex justify-between px-1 shadow-inner">
                        <div className="w-3 h-full bg-mono-900 rounded-full" />
                        <div className="w-3 h-full bg-mono-900 rounded-full" />
                     </div>
                     <div className="w-6 h-4 bg-mono-800 grid grid-cols-3 gap-0.5 p-0.5 rounded-sm">
                        <div className="bg-mono-600 rounded-sm" /><div className="bg-mono-600 rounded-sm" /><div className="bg-mono-600 rounded-sm" />
                        <div className="bg-mono-600 rounded-sm" /><div className="bg-mono-600 rounded-sm" /><div className="bg-mono-600 rounded-sm" />
                        <div className="bg-mono-600 rounded-sm" /><div className="bg-mono-600 rounded-sm" /><div className="bg-mono-600 rounded-sm" />
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Scattered Papers on the Floor */}
            <div className="absolute bottom-2 md:bottom-6 left-12 md:left-32 w-10 md:w-12 h-14 md:h-16 bg-paper-cream border border-paper-dim shadow-md rotate-[12deg] [transform:translateZ(2px)]">
               <div className="w-full h-1 bg-accent-brass/20 mt-2" />
            </div>
            <div className="absolute bottom-4 md:bottom-8 left-16 md:left-40 w-10 md:w-12 h-14 md:h-16 bg-paper-cream border border-paper-dim shadow-md -rotate-[22deg] [transform:translateZ(1px)]">
               <div className="w-full h-1 bg-accent-brass/20 mt-1" />
               <div className="w-1/2 h-0.5 bg-mono-300 mt-2 ml-1" />
               <div className="w-3/4 h-0.5 bg-mono-300 mt-1 ml-1" />
            </div>

            {/* Inlaid Brass Footer Plaque */}
            <div className="absolute bottom-6 right-[15%] md:right-[25%] w-48 h-8 rounded bg-gradient-to-r from-accent-dim via-accent-brass to-accent-dim border-t border-accent-gold border-b border-accent-shadow shadow-[0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center px-3 z-10 pointer-events-auto">
              <span className="text-[7px] font-serif uppercase tracking-widest text-wood-dark font-bold shadow-sm">
                BarakaLines • Law Society of Kenya
              </span>
            </div>
          </div>
        </div>

        
        </motion.div>
        </motion.div>

        
        {/* ROOM 2: Scroll Target */}
        <motion.div
          style={{ rotateY: scrollRoom2RotateY, z: scrollRoom2Z, opacity: scrollRoom2Opacity }}
          className="absolute inset-0 preserve-3d flex items-center justify-center pointer-events-none"
        >
          <RoomTwo isNightMode={isNightMode} rotateX={rotateX} rotateY={rotateY} panX={panX} panY={panY} onOpenWritings={() => setIsBookshelfOpen(true)} />
        </motion.div>

      {/* ========================================================= */}
      {/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-8 z-30">
        
        
      {/* VIGNETTE & RADIAL BULB GLOW */}
      <div className={`absolute inset-0 pointer-events-none z-40 transition-opacity duration-1000 ${isNightMode ? 'bg-[radial-gradient(circle_at_80%_10%,transparent_10%,var(--color-black)_140%)] opacity-80' : 'bg-[radial-gradient(circle_at_80%_10%,transparent_20%,var(--color-wood-mahogany)_180%)] opacity-30'}`} />

        {/* Top-Right Hanging Bulb Indicator */}
        <motion.div style={{ y: bulbScrollY, opacity: bulbOpacity }} onClick={() => setIsAboutOpen(true)} className={`absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 ${prefersReducedMotion ? "" : "animate-swing"} touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-full before:absolute before:-inset-6 before:content-[\'\']`}>
          {/* The Cord */}
          <div className="w-[2px] h-16 md:h-24 bg-mono-900 shadow-[1px_0_0_rgba(255,255,255,0.1)]" />
          {/* The Bulb Base */}
          <div className="w-4 h-5 bg-gradient-to-b from-mono-850 to-mono-600 rounded-t-sm border border-mono-900" />
          {/* The Bulb Glass */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center -mt-1 transition-all duration-1000 ${
            isNightMode 
              ? "bg-shade-48 shadow-[0_0_50px_rgba(255,170,0,0.8),inset_0_0_10px_rgba(255,255,255,0.8)]"
              : "bg-white/10 shadow-[inset_0_0_5px_rgba(255,255,255,0.2)] border border-white/20 backdrop-blur-sm"
          }`}>
            {/* Inner filament */}
            <div className={`w-3 h-3 border border-x-transparent border-t-transparent rounded-b-full transition-colors duration-1000 ${
              isNightMode ? "border-b-white shadow-[0_0_5px_white]" : "border-b-white/40"
            }`} />
          </div>
        </motion.div>

        {/* Header HUD */}
        <header className="flex justify-between items-start pointer-events-none relative z-40">
          
          {/* Top-Left Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-brass to-accent-dim p-[1px] shadow-lg">
              <div className="w-full h-full bg-green-racing rounded-[10px] flex items-center justify-center text-accent-gold">
                <Scale className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold tracking-wide text-accent-gold drop-shadow-md">
                Emmanuel Baraka
              </h1>
              <p className="text-[9px] md:text-xs uppercase tracking-widest text-accent-brass/80 font-medium">
                Advocate & Policy Strategist
              </p>
            </div>
          </div>

        </header>

        {/* Footer Ambient Cue */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-accent-brass/75">


          <p className="text-[11px] font-serif italic text-white/60">
            © {new Date().getFullYear()} Emmanuel Baraka • wakili.barakalines.com
          </p>
        </footer>
      </div>

      {/* Modals */}
      <PaintingModal isOpen={isPaintingOpen} onClose={() => { setIsPaintingOpen(false); setIsPhonePickedUp(false); }} />
      <BookshelfModal isOpen={isBookshelfOpen} onClose={() => setIsBookshelfOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <SimuYaJamiiModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      
      {/* Custom Cursor (Rendered last to stay on top of everything) */}
      <CustomCursor isNightMode={isNightMode} />
    </div>

      </div>
  );
}
