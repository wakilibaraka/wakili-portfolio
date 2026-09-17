import React, { useState, useEffect } from "react";
import { motion, MotionValue, useReducedMotion } from "framer-motion";
import { Scale, BookOpen } from "lucide-react";
import TeaSteam from "./TeaSteam";

interface RoomTwoProps {
  isNightMode: boolean;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  panX: MotionValue<number>;
  panY: MotionValue<number>;
  onOpenWritings: () => void;
}

export default function RoomTwo({ isNightMode, rotateX, rotateY, panX, panY, onOpenWritings }: RoomTwoProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      style={{ rotateX, rotateY, x: panX, y: panY }}
      className="absolute inset-0 w-full max-w-6xl h-[620px] md:h-[720px] m-auto preserve-3d flex items-center justify-center select-none"
    >
      {/* ========================================================= */}
      {/* LAYER 1: Deep Background Nairobi Skyline (z: -300px)      */}
      {/* ========================================================= */}
      <div className="absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-300px)] pointer-events-none">
        {/* Sunset / Night Sky */}
        <div className={`absolute inset-[-50%] transition-colors duration-1000 ${
          isNightMode 
            ? "bg-gradient-to-t from-shade-49 via-shade-50 to-shade-51" 
            : "bg-gradient-to-t from-shade-52 via-shade-53 to-shade-54"
        }`} />
        
        {/* Glowing Sun / Moon */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[50px] transition-all duration-1000 ${
          isNightMode ? "bg-shade-6/30" : "bg-shade-55/60"
        }`} />
        
        {/* Silhouette Cityscape (Centered behind window) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-3 md:gap-5 opacity-100 scale-[1.4] origin-bottom">
          <div className={`w-16 h-40 rounded-t-sm transition-colors duration-1000 ${isNightMode ? "bg-night-sky-deep" : "bg-shade-56"}`} />
          <div className={`w-24 h-56 rounded-t transition-colors duration-1000 ${isNightMode ? "bg-shade-11" : "bg-shade-57"}`} />
          
          {/* KICC Silhouette (Iconic Nairobi) */}
          <div className="flex flex-col items-center">
            <div className={`w-1.5 h-20 transition-colors duration-1000 ${isNightMode ? "bg-night-sky-deep" : "bg-wood-shadow"}`} />
            <div className={`w-14 h-8 rounded-t-full transition-colors duration-1000 ${isNightMode ? "bg-night-sky-deep" : "bg-wood-shadow"}`} />
            <div className={`w-24 h-72 rounded-t-xl transition-colors duration-1000 ${isNightMode ? "bg-night-sky-deep" : "bg-wood-shadow"}`} />
          </div>

          <div className={`w-28 h-48 rounded-t-md transition-colors duration-1000 ${isNightMode ? "bg-night-sky-deep" : "bg-shade-58"}`} />
          <div className={`w-14 h-64 rounded-t transition-colors duration-1000 ${isNightMode ? "bg-shade-11" : "bg-shade-59"}`} />
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 2: The Main Office Wall (z: -100px)                 */}
      {/* ========================================================= */}
      <div className="absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-100px)] pointer-events-none">
        
        {/* Flat Evenly Green Back Wall */}
        <div className={`absolute w-[95%] h-[95%] rounded-2xl border-4 shadow-2xl transition-colors duration-1000 flex items-center justify-center overflow-hidden ${isNightMode ? "bg-green-racing-deep border-shade-61" : "bg-green-racing border-wood-dark"}`}>
          
          {/* Left: The Grand Bookshelf (Writings Hotspot) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenWritings}
            className="absolute left-2 md:left-16 top-16 md:top-16 w-32 md:w-64 h-64 md:h-96 rounded bg-wood-dark border-4 border-wood-mahogany shadow-[15px_15px_30px_rgba(0,0,0,0.6)] p-2 md:p-3 flex flex-col justify-between cursor-pointer pointer-events-auto group relative scale-75 md:scale-100 origin-left"
          >
            {/* Attention Badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-accent-terracotta rounded-full shadow-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-shade-62 transition-colors z-20">
               <BookOpen className="w-3 h-3 text-accent-gold" />
               <span className="text-[9px] font-serif font-bold text-white uppercase tracking-wider">Writings</span>
            </div>
            {/* Shelves & Books */}
            <div className="h-28 bg-wood-blackest border-b-4 border-wood-mahogany flex items-end p-2 gap-1 shadow-inner">
               <div className="w-6 h-20 bg-shade-63 rounded-t-sm border-r border-black/30" />
               <div className="w-5 h-18 bg-shade-64 rounded-t-sm border-r border-black/30" />
               <div className="w-8 h-24 bg-shade-12 rounded-t-sm border-r border-black/30" />
               <div className="w-4 h-22 bg-shade-13 rounded-t-sm border-r border-black/30 ml-4" />
            </div>
            <div className="h-28 bg-wood-blackest border-b-4 border-wood-mahogany flex items-end p-2 gap-1 justify-end shadow-inner">
               <div className="w-5 h-19 bg-shade-65 rounded-t-sm border-r border-black/30" />
               <div className="w-7 h-21 bg-shade-66 rounded-t-sm border-r border-black/30" />
               <div className="w-6 h-20 bg-shade-67 rounded-t-sm border-r border-black/30" />
            </div>
            <div className="h-28 bg-wood-blackest border-b-4 border-wood-mahogany flex items-end p-2 gap-1 shadow-inner">
               <div className="w-9 h-22 bg-shade-68 rounded-t-sm border-r border-black/30" />
               <div className="w-5 h-20 bg-green-racing rounded-t-sm border-r border-black/30 ml-2" />
            </div>
          </motion.div>

          {/* Center: Massive Arched Window */}
          <div className="absolute top-10 w-[45%] h-[85%] border-[12px] border-wood-dark rounded-t-full bg-transparent shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-end">
             {/* Window Grilles */}
             <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 pointer-events-none z-10">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-2 border-wood-dark/90 shadow-sm" />
                ))}
             </div>
             {/* Glass Reflection / Atmospheric haze */}
             <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000 z-0 ${
               isNightMode ? "bg-gradient-to-br from-shade-7/10 via-transparent to-black/50" : "bg-gradient-to-tr from-shade-8/20 via-transparent to-transparent"
             }`} />
          </div>

          {/* Right: Wall Art & Robes */}
          <div className="absolute right-2 md:right-24 top-16 md:top-24 flex flex-col items-center gap-12 scale-75 md:scale-100 origin-right">
            {/* Framed Quote */}
            <div className="w-40 h-48 bg-wood-blackest border-[6px] border-accent-brass shadow-[10px_10px_20px_rgba(0,0,0,0.6)] p-3 flex flex-col items-center justify-center text-center">
              <Scale className="w-8 h-8 text-accent-brass mb-3 opacity-80" />
              <p className="font-serif text-accent-brass font-bold tracking-widest text-sm leading-relaxed">
                JUSTICE<br/>EQUITY<br/><span className="text-xs">&amp;</span><br/>TRUTH
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 2.5: The Advocate (Emmanuel) in Leather Chair       */}
      {/* ========================================================= */}
      <div className="absolute bottom-16 inset-x-0 preserve-3d flex justify-center [transform:translateZ(0px)] pointer-events-none">
        
        {/* Executive Leather Chair Backrest */}
        <div className="absolute bottom-12 w-64 h-72 bg-gradient-to-b from-shade-69 to-shade-14 rounded-t-[3rem] border-4 border-wood-dark shadow-2xl flex flex-col items-center pt-8 overflow-hidden">
          {/* Tufted Leather Diamond Pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, var(--color-black) 25%, transparent 25%, transparent 75%, var(--color-black) 75%, var(--color-black)), linear-gradient(45deg, var(--color-black) 25%, transparent 25%, transparent 75%, var(--color-black) 75%, var(--color-black))', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }} />
        </div>

        {/* CSS Character: Emmanuel Baraka */}
        <div className={`absolute bottom-16 md:bottom-20 flex flex-col items-center z-10 scale-90 md:scale-100 origin-bottom ${prefersReducedMotion ? "" : "animate-breathe"} [transform-style:preserve-3d]`}>
          
          {/* Avatar Contact Shadow */}
          <div className="absolute -bottom-2 w-28 h-6 bg-black/40 blur-md rounded-[50%]" />
          {/* Head & Face */}
          <div className="relative w-24 h-32 mb-1">
            {/* Head Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-shade-70 to-shade-15 rounded-[2.5rem] shadow-inner" />
            {/* Hair / Receding Hairline */}
            <div className="absolute top-0 inset-x-0 h-10 bg-mono-950 rounded-t-[2.5rem] opacity-90 clip-hairline" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 60%, 50% 20%, 15% 60%, 0 100%)' }} />
            {/* Ears */}
            <div className="absolute top-12 -left-2 w-4 h-6 bg-shade-71 rounded-l-full" />
            <div className="absolute top-12 -right-2 w-4 h-6 bg-shade-15 rounded-r-full" />
            {/* Brows */}
            <div className="absolute top-10 left-3 w-6 h-1.5 bg-mono-950 rounded-full rotate-[5deg]" />
            <div className="absolute top-10 right-3 w-6 h-1.5 bg-mono-950 rounded-full -rotate-[5deg]" />
            {/* Eyes (Looking down at laptop) */}
            <div className={`absolute top-14 left-4 w-5 h-2.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-t-2 border-shade-16 shadow-inner ${prefersReducedMotion ? "" : "animate-blink"}`}>
               <div className="w-2.5 h-2.5 bg-shade-17 rounded-full translate-y-0.5" />
            </div>
            <div className={`absolute top-14 right-4 w-5 h-2.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-t-2 border-shade-16 shadow-inner ${prefersReducedMotion ? "" : "animate-blink"}`}>
               <div className="w-2.5 h-2.5 bg-shade-17 rounded-full translate-y-0.5" />
            </div>
            {/* Nose */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-8 bg-black/10 rounded-full border-b border-black/20" />
            {/* Goatee / Beard */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-8 bg-mono-950 rounded-b-full rounded-t-sm opacity-95 flex flex-col items-center justify-start pt-1">
               {/* Lips */}
               <div className="w-8 h-2.5 bg-shade-72 rounded-full mb-1" />
            </div>
            
            {/* Optional Glasses Reflection (Subtle) */}
            <div className="absolute top-13 left-3 w-7 h-5 border border-white/20 rounded-md" />
            <div className="absolute top-13 right-3 w-7 h-5 border border-white/20 rounded-md" />
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-white/20" />
          </div>

          {/* Torso / Suit */}
          <div className="relative w-44 h-40 flex flex-col items-center z-0 [transform-style:preserve-3d]">
            {/* Shoulders */}
            <div className="absolute top-0 w-full h-full bg-mono-925 rounded-t-3xl shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)]" />
            {/* White Shirt Collar */}
            <div className="absolute top-0 w-16 h-12 bg-white rounded-b-sm border-b-2 border-gray-300 flex justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
               {/* Tie */}
               <div className="w-4 h-full bg-shade-73 shadow-md" />
            </div>
            {/* Suit Lapels */}
            <div className="absolute top-0 left-[30%] w-6 h-32 bg-mono-950 border-r border-black/40 rotate-12 shadow-xl" />
            <div className="absolute top-0 right-[30%] w-6 h-32 bg-mono-950 border-l border-black/40 -rotate-12 shadow-xl" />
            
            {/* Arms reaching to laptop */}
            <div className="absolute top-8 -left-6 w-16 h-32 bg-mono-925 rounded-l-2xl origin-top rotate-45 shadow-lg" />
            <div className="absolute top-8 -right-6 w-16 h-32 bg-mono-925 rounded-r-2xl origin-top -rotate-45 shadow-lg flex flex-col justify-end items-center pb-2 [transform-style:preserve-3d]">
               {/* Hand holding the teacup (brought forward in Z space to clear the desk) */}
               <div className="absolute bottom-4 left-6 [transform:translateZ(90px)_rotate(45deg)]">
                 <TeaSteam />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 3: The Foreground Desk (z: +80px)                   */}
      {/* ========================================================= */}
      <div className="absolute bottom-4 inset-x-0 preserve-3d flex justify-center [transform:translateZ(80px)] pointer-events-auto">
        {/* Massive Executive Mahogany Desk */}
        <div className="relative w-[95%] md:w-[90%] max-w-5xl h-40 md:h-56 rounded-t-xl bg-gradient-to-b from-shade-74 via-shade-75 to-shade-14 border-t-8 border-shade-76 shadow-[0_-10px_30px_rgba(0,0,0,0.8),0_40px_80px_-10px_rgba(0,0,0,1)] p-3 md:p-5 flex items-start justify-between overflow-visible">
          
          {/* Night Mode Banker's Lamp Desk Cone (Spotlight) */}
          <div className={`absolute -top-24 left-1/4 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-shade-18/15 via-shade-18/5 to-transparent pointer-events-none transition-opacity duration-1000 ${isNightMode ? "opacity-100" : "opacity-0"}`} />

          {/* Left: Banker's Lamp & Scales of Justice */}
          <div className="flex flex-col gap-2 md:gap-4 z-10 -mt-12 md:-mt-16 ml-1 md:ml-12 scale-75 md:scale-100 origin-bottom-left">
            {/* Emerald Banker's Lamp */}
            <div className="flex flex-col items-center">
              <div className={`w-28 h-10 rounded-full bg-gradient-to-r from-shade-19 via-shade-77 to-shade-19 border border-shade-78 flex items-center justify-center transition-all duration-1000 ${
                isNightMode ? "shadow-[0_0_100px_rgba(46,194,116,0.6)]" : "shadow-[0_0_30px_rgba(46,194,116,0.4)]"
              }`}>
                <div className={`w-20 h-3 rounded-full filter blur-[3px] transition-colors duration-1000 ${
                  isNightMode ? "bg-white" : "bg-shade-79"
                }`} />
              </div>
              <div className="w-3 h-20 bg-gradient-to-b from-accent-brass to-accent-brass-dim shadow-lg" />
              <div className="w-16 h-4 rounded-full bg-gradient-to-r from-shade-13 to-accent-brass shadow-xl -mt-1" />
            </div>

            {/* Brass Scales of Justice */}
            <div className="flex flex-col items-center mt-6">
               <Scale className="w-12 h-12 md:w-16 md:h-16 text-accent-brass drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" strokeWidth={1.5} />
               <div className="w-10 h-2.5 rounded-full bg-accent-brass-dim mt-1 shadow-md" />
            </div>
          </div>

          {/* Center: Open Laptop (Terminal/Code) */}
          <div className="flex flex-col items-center z-10 -mt-8 mx-auto">
            {/* Screen */}
            <div className={`w-40 h-28 md:w-72 md:h-48 rounded-t-xl bg-shade-20 border-4 border-mono-950 p-2 md:p-3 flex flex-col justify-start transition-all duration-1000 relative overflow-hidden ${
              isNightMode ? "shadow-[0_0_80px_rgba(52,211,153,0.2)]" : "shadow-2xl"
            }`}>
              {/* Screen Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-3 bg-mono-900 -mx-3 -mt-3 p-2 border-b border-mono-800">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="text-[6px] text-gray-500 ml-2 font-mono">zsh - root@wakili</span>
              </div>
              
              {/* Terminal Code lines */}
              <TerminalScreen prefersReducedMotion={prefersReducedMotion} isNightMode={isNightMode} />
            </div>
            {/* Keyboard Base */}
            <div className="w-48 md:w-80 h-3 md:h-4 bg-mono-925 rounded-b-lg shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-t-2 border-white/10" />
          </div>

          {/* Right: Desk Plate, Books & Tea */}
          <div className="flex flex-col items-end gap-6 z-10 -mt-6 mr-2 md:mr-12 hidden sm:flex">
             
             {/* Desk Name Plate */}
             <div className="w-48 h-12 bg-gradient-to-b from-mono-950 to-shade-20 rounded-sm border-2 border-accent-brass shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-1 transform rotate-[-5deg]">
                <p className="text-accent-brass font-serif font-bold text-[9px] tracking-widest">EMMANUEL BARAKA</p>
                <div className="w-40 h-[1px] bg-accent-brass/40 my-0.5" />
                <p className="text-accent-gold/70 text-[5px] tracking-[0.1em] uppercase">© {new Date().getFullYear()} Emmanuel Baraka • wakili.barakalines.com</p>
             </div>

             {/* Stack of Leather Treatises */}
             <div className="flex flex-col items-center mt-2 rotate-6">
                <div className="w-28 h-5 bg-shade-12 rounded-sm border-l border-white/20 shadow-sm flex items-center px-2">
                   <div className="w-1 h-3 bg-accent-brass rounded-sm" />
                </div>
                <div className="w-32 h-6 bg-green-racing rounded-sm border-l border-accent-brass/40 shadow-sm mt-0.5 flex items-center px-2">
                   <div className="w-1 h-4 bg-accent-brass rounded-sm" />
                </div>
                <div className="w-36 h-7 bg-wood-dark rounded-sm border-l border-white/20 shadow-md mt-0.5 flex items-center px-2">
                   <div className="w-1 h-5 bg-accent-brass rounded-sm" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


function TerminalScreen({ prefersReducedMotion, isNightMode }: { prefersReducedMotion: boolean | null, isNightMode: boolean }) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState(0);

  const fullCommand = './compile_defense.sh --case="Republic v. State"';

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (phase === 0) {
      if (text.length < fullCommand.length) {
        const t = setTimeout(() => {
          setText(fullCommand.slice(0, text.length + 1));
        }, Math.random() * 30 + 20);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase(1), 500);
        return () => clearTimeout(t);
      }
    } else if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 1200);
      return () => clearTimeout(t);
    } else if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 800);
      return () => clearTimeout(t);
    } else if (phase === 3) {
      const t = setTimeout(() => {
        setText("");
        setPhase(0);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [text, phase, prefersReducedMotion, fullCommand]);

  if (prefersReducedMotion) {
    return (
      <div className={`space-y-2 font-mono text-[8px] md:text-[9px] tracking-widest transition-colors duration-1000 ${isNightMode ? "text-emerald-400" : "text-emerald-500"}`}>
        <p>&gt; ./compile_defense.sh --case="Republic v. State"</p>
        <p className="opacity-80">Loading precedents [██████████] 100%</p>
        <p className="opacity-80 text-blue-400">Defense strategy compiled.</p>
        <p className="mt-2 text-yellow-400">&gt; READY</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 font-mono text-[8px] md:text-[9px] tracking-widest transition-colors duration-1000 ${isNightMode ? "text-emerald-400" : "text-emerald-500"}`}>
      <p>&gt; {text}{phase === 0 && <span className="animate-pulse">_</span>}</p>
      {phase >= 1 && <p className="opacity-80">Loading precedents [████████░░] 80%</p>}
      {phase >= 2 && <p className="opacity-80 text-blue-400">Defense strategy compiled.</p>}
      {phase >= 3 && <p className="mt-2 text-yellow-400">&gt; READY<span className="animate-pulse">_</span></p>}
    </div>
  );
}
