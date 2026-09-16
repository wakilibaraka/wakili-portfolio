"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import RoomTwo from "./RoomTwo";
import { Scale, BookOpen, Mail, Phone, Compass, Sparkles, Power } from "lucide-react";
import TeaSteam from "./TeaSteam";
import CustomCursor from "./CustomCursor";
import PaintingModal from "./PaintingModal";
import BookshelfModal from "./BookshelfModal";

export default function OfficeRoom() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  const [isPaintingOpen, setIsPaintingOpen] = useState(false);
  const [isBookshelfOpen, setIsBookshelfOpen] = useState(false);
  const [hasGyroscope, setHasGyroscope] = useState(false);
  const [interactionMode, setInteractionMode] = useState<"mouse" | "gyro" | "touch">("mouse");
  const [isNightMode, setIsNightMode] = useState(false);

  // Multi-Room Scroll Logic (Revolving Door on Y Axis)
  const { scrollYProgress } = useScroll();
  
  // Room 1 (Reception): Rotates to the right (-90deg on Y axis)
  const scrollRoom1RotateY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scrollRoom1Z = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scrollRoom1Opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  
  // Room 2 (Office): Rotates in from the left (90deg to 0 on Y axis)
  const scrollRoom2RotateY = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scrollRoom2Z = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
  
  // Door Opening Animation
  const doorLeftRotateY = useTransform(scrollYProgress, [0, 0.4], [0, -110]);
  const doorRightRotateY = useTransform(scrollYProgress, [0, 0.4], [0, 110]);


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
  const springConfig = { damping: 25, stiffness: 140 };
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
    if (interactionMode === "gyro") return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = (e.clientY / innerHeight) * 2 - 1;
    rawX.set(x);
    rawY.set(y);
  };

  // Handle Mobile Gyroscope / DeviceOrientation
  useEffect(() => {
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
  }, [rawX, rawY]);

  // Fallback touch drag on mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (interactionMode === "gyro") return;
    const touch = e.touches[0];
    const { innerWidth, innerHeight } = window;
    const x = (touch.clientX / innerWidth) * 2 - 1;
    const y = (touch.clientY / innerHeight) * 2 - 1;
    rawX.set(x * 1.2);
    rawY.set(y * 1.2);
  };

  return (
    <div className={`relative w-full h-[250vh] transition-colors duration-1000 ${isNightMode ? "bg-[#030604]" : "bg-[#09150f]"}`}>
      <div
        className={`fixed inset-0 w-full h-screen overflow-hidden perspective-stage flex items-center justify-center cursor-none transition-colors duration-1000 ${
          isNightMode 
            ? "bg-gradient-to-b from-[#050a07] via-[#08120e] to-[#030604]" 
            : "bg-gradient-to-b from-[#0e2018] via-[#163024] to-[#09150f]"
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
          className="absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-120px)]"
        >
          {/* Main Wall Surface */}
          <div className={`relative w-[92%] h-[88%] rounded-3xl border-4 border-[#382015] shadow-2xl overflow-hidden transition-colors duration-1000 ${isNightMode ? "bg-[#0d1c15]" : "bg-[#163024]"}`}>
            {/* Victorian Wainscoting Molding Lines */}
            <div className={`absolute bottom-0 left-0 right-0 h-40 border-t-4 border-[#d4af37]/40 flex gap-4 px-6 pt-3 transition-colors duration-1000 ${isNightMode ? "bg-[#211611]" : "bg-[#24140d]"}`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`flex-1 h-28 border-2 border-[#382015] rounded-lg shadow-inner transition-colors duration-1000 ${isNightMode ? "bg-[#1a110c]/80" : "bg-[#1e1009]/60"}`} />
              ))}
            </div>

            
            {/* The Contact Plaque (Above Door) */}
            <div className="absolute bottom-[240px] md:bottom-[380px] right-4 md:right-24 w-32 md:w-56 flex justify-center z-20 pointer-events-auto">
               <motion.button 
                 onClick={() => setIsPaintingOpen(true)}
                 whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.6)" }}
                 whileTap={{ scale: 0.95 }}
                 className="w-24 md:w-40 h-10 md:h-12 bg-gradient-to-b from-[#e6c86a] via-[#c69a30] to-[#b38520] border-2 border-[#f3cf65]/50 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
               >
                 <div className="absolute inset-1 border border-[#6b4c10]/40 rounded-sm pointer-events-none" />
                 <p className="text-[#38260b] font-serif font-bold text-[7px] md:text-[8px] tracking-[0.1em] md:tracking-[0.15em] text-center uppercase leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
                   EMMANUEL BARAKA<br/>
                   <span className="text-[#1a110c] text-[6px] md:text-[7px]">CONTACT ME</span>
                 </p>
                 {/* Click indicator dot */}
                 <div className="absolute right-1 top-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-80 animate-ping" />
               </motion.button>
            </div>
            
            {/* The Grand Office Door (Right side, leading to Chamber) */}
            <div className="absolute bottom-0 right-4 md:right-24 w-32 md:w-56 h-56 md:h-88 border-4 border-[#24140d] bg-black/80 flex perspective-stage z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
                {/* Left Door Panel */}
                <motion.div 
                  style={{ rotateY: doorLeftRotateY }} 
                  className="w-1/2 h-full bg-gradient-to-br from-[#4f2e1e] to-[#24140d] border-r border-black/40 origin-left shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center py-6 md:py-8 gap-4"
                >
                   <div className="w-2/3 h-1/4 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   <div className="w-2/3 h-1/2 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   {/* Handle */}
                   <div className="absolute right-1 md:right-2 top-1/2 w-1 md:w-1.5 h-8 md:h-10 bg-gradient-to-b from-[#f3cf65] to-[#8c7324] rounded-full shadow-md" />
                </motion.div>
                {/* Right Door Panel */}
                <motion.div 
                  style={{ rotateY: doorRightRotateY }} 
                  className="w-1/2 h-full bg-gradient-to-bl from-[#4f2e1e] to-[#24140d] border-l border-black/40 origin-right shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center py-6 md:py-8 gap-4"
                >
                   <div className="w-2/3 h-1/4 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   <div className="w-2/3 h-1/2 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   {/* Handle */}
                   <div className="absolute left-1 md:left-2 top-1/2 w-1 md:w-1.5 h-8 md:h-10 bg-gradient-to-b from-[#f3cf65] to-[#8c7324] rounded-full shadow-md" />
                </motion.div>
            </div>

            {/* Interactive Light Switch (Wall Mounted - moved to left wall) */}
            <div className="absolute top-36 md:top-48 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNightMode}
                className={`w-8 h-12 rounded border-2 shadow-[2px_4px_12px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center relative cursor-pointer transition-colors duration-1000 ${
                  isNightMode ? "bg-[#c2b9a7] border-[#8a8071]" : "bg-[#e8e2d5] border-[#b5a995]"
                }`}
              >
                {/* Switch Plate Screws */}
                <div className="w-1 h-1 rounded-full bg-[#6b6255] absolute top-1.5" />
                <div className="w-1 h-1 rounded-full bg-[#6b6255] absolute bottom-1.5" />
                
                {/* The Toggle */}
                <div className={`w-3 h-5 rounded-sm bg-gradient-to-b shadow-md transition-all duration-150 ${
                  isNightMode 
                    ? "from-[#ffffff] to-[#d6cbbb] translate-y-1.5 shadow-[0_-2px_4px_rgba(0,0,0,0.3)]" 
                    : "from-[#d6cbbb] to-[#ffffff] -translate-y-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                }`} />
              </motion.div>
            </div>

            {/* Arched Window (Moved to Left side) */}
            <div className={`absolute top-10 md:top-10 left-4 md:left-56 w-24 md:w-44 h-40 md:h-64 rounded-t-full border-4 border-[#382015] shadow-inner overflow-hidden flex flex-col justify-end transition-colors duration-1000 ${
              isNightMode 
                ? "bg-gradient-to-b from-[#0d1424] via-[#1a2838] to-[#121c26]" 
                : "bg-gradient-to-b from-[#a3c9e2] via-[#e2ebf3] to-[#f9eed9]"
            }`}>
              {/* Window Panes Grid */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-1 p-2 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border border-[#382015]/40 rounded-sm" />
                ))}
              </div>
              {/* Soft Sunlight/Moonlight Beam across the floor */}
              <div className={`w-full h-full pointer-events-none transition-opacity duration-1000 ${
                isNightMode
                  ? "bg-gradient-to-tr from-[#88a5d6]/10 via-transparent to-transparent"
                  : "bg-gradient-to-tr from-[#ffe8b3]/25 via-transparent to-transparent"
              }`} />
            </div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* LAYER 2: Midground Wall Decor & Hotspots (z: -40px)      */}
        {/* ========================================================= */}
        <div className="absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-40px)] pointer-events-none">
          {/* HOTSPOT 1: The Framed Wall Painting (Contact Card) - Moved above door! */}
          <div className="absolute top-6 md:top-12 right-6 md:right-40 pointer-events-auto scale-75 md:scale-100 origin-right">
            <motion.div
              whileHover={{ scale: 1.06, rotateZ: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsPaintingOpen(true)}
              className="group relative cursor-pointer p-2 rounded-xl bg-gradient-to-br from-[#f5d061] via-[#aa7c11] to-[#684903] shadow-[0_12px_28px_rgba(0,0,0,0.6)] border border-[#ffeaa7]"
            >
              {/* Painting Canvas */}
              <div className="w-24 md:w-32 h-16 md:h-20 rounded-lg bg-gradient-to-b from-[#1b2b22] to-[#0c1812] border border-[#d4af37]/40 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
                <p className="font-serif text-[9px] md:text-[11px] font-bold tracking-wider text-[#f3cf65]">
                  EMMANUEL BARAKA
                </p>
                <p className="text-[7px] md:text-[8px] uppercase tracking-widest text-[#d4af37]/80 mt-1">
                  Chambers Seal
                </p>
              </div>
              {/* Pulsing Attention Ring */}
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg animate-pulse">
                <Mail className="w-2.5 h-2.5 text-black" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 2.5: The Floor & Rug (z: 0px)                       */}
        {/* ========================================================= */}
        <div className="absolute inset-x-0 bottom-[-40px] h-64 preserve-3d flex justify-center [transform:translateZ(10px)] pointer-events-none">
          {/* Parquet Floor Surface */}
          <div className={`absolute bottom-0 w-[140%] h-full border-t-4 shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden transition-colors duration-1000 ${
            isNightMode ? "bg-[#1f130d] border-[#24140d]" : "bg-[#2b1810] border-[#382015]"
          }`}>
            {/* Herringbone pattern approximation */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 32px)' }} />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000 0, #000 2px, transparent 2px, transparent 32px)' }} />
            
            {/* Center Persian Rug */}
            <div className="absolute bottom-16 w-[80%] max-w-3xl h-36 rounded-md bg-[#4a1c18] border-2 border-[#732a22] shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-center opacity-95">
               <div className="w-[96%] h-[84%] border-2 border-[#94392e] rounded-sm flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border border-[#94392e]/60 rounded-full flex items-center justify-center">
                     <div className="w-4 h-4 bg-[#94392e]/40 rotate-45" />
                  </div>
               </div>
            </div>

            {/* Inlaid Brass Footer Plaque */}
            <div className="absolute bottom-6 right-[15%] md:right-[25%] w-48 h-8 rounded bg-gradient-to-r from-[#99791e] via-[#d4af37] to-[#99791e] border-t border-[#f3cf65] border-b border-[#684903] shadow-[0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center px-3 z-10 pointer-events-auto">
              <span className="text-[7px] font-serif uppercase tracking-widest text-[#24140d] font-bold shadow-sm">
                BarakaLines • Law Society of Kenya
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 3: Receptionist Desk (z: +80px)                     */}
        {/* ========================================================= */}
        <motion.div
          style={{ x: fgShiftX, y: fgShiftY }}
          className="absolute bottom-4 md:bottom-8 left-2 md:left-24 preserve-3d pointer-events-auto"
        >
          {/* Wooden Reception Desk */}
          <div className="w-52 md:w-80 h-24 md:h-40 bg-gradient-to-b from-[#4f2e1e] to-[#24140d] rounded-t-lg border-t-4 border-[#683f2a] shadow-2xl p-2 md:p-4 flex flex-col justify-between relative [transform:translateZ(80px)]">
             {/* Guestbook (Prop) */}
             <div 
               className="absolute top-2 md:top-4 right-4 md:right-8 w-12 md:w-16 h-8 md:h-10 bg-[#f7f5ee] rounded shadow-md border-b-2 border-[#c25e3e] flex items-center justify-center"
             >
                <div className="w-3/4 h-3/4 border border-[#e5e0d3] flex flex-col items-center justify-center">
                   <div className="text-[4px] uppercase font-serif text-[#c25e3e] font-bold opacity-60">Guestbook</div>
                   <div className="w-8 h-0.5 bg-[#e5e0d3] mt-1 opacity-50" />
                </div>
             </div>
             
             {/* Small potted plant */}
             <div className="absolute bottom-4 left-6">
                <div className="w-10 h-10 bg-[#1b5e39] rounded-t-[20px] rounded-bl-[20px] -rotate-12 shadow-sm" />
                <div className="w-12 h-12 bg-[#2ec274] rounded-t-[24px] rounded-br-[24px] rotate-12 opacity-80 -mt-6 ml-2" />
                <div className="w-8 h-8 bg-gradient-to-b from-[#8c7324] to-[#4f2e1e] rounded-b-lg ml-3 mt-1" />
             </div>
             
             {/* Front panel detail */}
             <div className="absolute bottom-4 right-8 w-40 h-16 border-2 border-[#683f2a]/30 rounded-sm flex items-center justify-center">
               <div className="w-3/4 h-1/2 border border-[#683f2a]/20 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#683f2a]/40" />
               </div>
             </div>
          </div>
        </motion.div>

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
        
        {/* Top-Right Hanging Bulb Indicator */}
        <div className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-none origin-top hover:rotate-6 transition-transform duration-700 ease-in-out">
          {/* The Cord */}
          <div className="w-[2px] h-16 md:h-24 bg-[#111] shadow-[1px_0_0_rgba(255,255,255,0.1)]" />
          {/* The Bulb Base */}
          <div className="w-4 h-5 bg-gradient-to-b from-[#222] to-[#444] rounded-t-sm border border-[#111]" />
          {/* The Bulb Glass */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center -mt-1 transition-all duration-1000 ${
            isNightMode 
              ? "bg-[#ffaa00] shadow-[0_0_50px_rgba(255,170,0,0.8),inset_0_0_10px_rgba(255,255,255,0.8)]"
              : "bg-white/10 shadow-[inset_0_0_5px_rgba(255,255,255,0.2)] border border-white/20 backdrop-blur-sm"
          }`}>
            {/* Inner filament */}
            <div className={`w-3 h-3 border border-x-transparent border-t-transparent rounded-b-full transition-colors duration-1000 ${
              isNightMode ? "border-b-[#fff] shadow-[0_0_5px_white]" : "border-b-white/40"
            }`} />
          </div>
        </div>

        {/* Header HUD */}
        <header className="flex justify-between items-start pointer-events-none relative z-40">
          
          {/* Top-Left Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#99791e] p-[1px] shadow-lg">
              <div className="w-full h-full bg-[#163024] rounded-[10px] flex items-center justify-center text-[#f3cf65]">
                <Scale className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold tracking-wide text-[#f3cf65] drop-shadow-md">
                Emmanuel Baraka
              </h1>
              <p className="text-[9px] md:text-xs uppercase tracking-widest text-[#d4af37]/80 font-medium">
                Advocate & Policy Strategist
              </p>
            </div>
          </div>

        </header>

        {/* Footer Ambient Cue */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#d4af37]/75">
          <div className="flex items-center gap-2 bg-[#0e2018]/80 backdrop-blur px-4 py-2 rounded-full border border-[#d4af37]/20">
            <Compass className="w-4 h-4 text-[#f3cf65] animate-spin [animation-duration:12s]" />
            <span>
              {hasGyroscope ? "Tilt phone to shift perspective" : "Move mouse to explore the chamber"}
            </span>
          </div>

          <p className="text-[11px] font-serif italic text-white/60">
            © {new Date().getFullYear()} Emmanuel Baraka • wakili.barakalines.com
          </p>
        </footer>
      </div>

      {/* Modals */}
      <PaintingModal isOpen={isPaintingOpen} onClose={() => setIsPaintingOpen(false)} />
      <BookshelfModal isOpen={isBookshelfOpen} onClose={() => setIsBookshelfOpen(false)} />
      
      {/* Custom Cursor (Rendered last to stay on top of everything) */}
      <CustomCursor isNightMode={isNightMode} />
    </div>

      </div>
  );
}
