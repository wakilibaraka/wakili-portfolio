import re

content = """import React from "react";
import { motion, MotionValue } from "framer-motion";
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
            ? "bg-gradient-to-t from-[#0a121a] via-[#151c2b] to-[#1c2236]" 
            : "bg-gradient-to-t from-[#ff8c6b] via-[#feba8b] to-[#5b4a62]"
        }`} />
        
        {/* Glowing Sun / Moon */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[50px] transition-all duration-1000 ${
          isNightMode ? "bg-[#a3c9e2]/30" : "bg-[#ffea8c]/60"
        }`} />
        
        {/* Silhouette Cityscape (Centered behind window) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-end gap-3 md:gap-5 opacity-100 scale-[1.4] origin-bottom">
          <div className={`w-16 h-40 rounded-t-sm transition-colors duration-1000 ${isNightMode ? "bg-[#0b0d12]" : "bg-[#2d1b19]"}`} />
          <div className={`w-24 h-56 rounded-t transition-colors duration-1000 ${isNightMode ? "bg-[#080a0e]" : "bg-[#251514]"}`} />
          
          {/* KICC Silhouette (Iconic Nairobi) */}
          <div className="flex flex-col items-center">
            <div className={`w-1.5 h-20 transition-colors duration-1000 ${isNightMode ? "bg-[#0b0d12]" : "bg-[#2a1716]"}`} />
            <div className={`w-14 h-8 rounded-t-full transition-colors duration-1000 ${isNightMode ? "bg-[#0b0d12]" : "bg-[#2a1716]"}`} />
            <div className={`w-24 h-72 rounded-t-xl transition-colors duration-1000 ${isNightMode ? "bg-[#0b0d12]" : "bg-[#2a1716]"}`} />
          </div>

          <div className={`w-28 h-48 rounded-t-md transition-colors duration-1000 ${isNightMode ? "bg-[#0b0d12]" : "bg-[#221211]"}`} />
          <div className={`w-14 h-64 rounded-t transition-colors duration-1000 ${isNightMode ? "bg-[#080a0e]" : "bg-[#1c0f0f]"}`} />
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 2: The Main Office Wall (z: -100px)                 */}
      {/* ========================================================= */}
      <div className="absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-100px)] pointer-events-none">
        
        {/* Flat Evenly Green Back Wall */}
        <div className={`absolute w-[95%] h-[95%] rounded-2xl border-4 shadow-2xl transition-colors duration-1000 flex items-center justify-center overflow-hidden ${
          isNightMode ? "bg-[#11241a] border-[#160d09]" : "bg-[#163024] border-[#24140d]"
        }`}>
          
          {/* Left: The Grand Bookshelf (Writings Hotspot) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenWritings}
            className="absolute left-8 md:left-16 top-16 w-48 md:w-64 h-96 rounded bg-[#24140d] border-4 border-[#382015] shadow-[15px_15px_30px_rgba(0,0,0,0.6)] p-3 flex flex-col justify-between cursor-pointer pointer-events-auto group relative"
          >
            {/* Attention Badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#c25e3e] rounded-full shadow-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-[#d86d4b] transition-colors z-20">
               <BookOpen className="w-3 h-3 text-[#f3cf65]" />
               <span className="text-[9px] font-serif font-bold text-white uppercase tracking-wider">Writings</span>
            </div>
            {/* Shelves & Books */}
            <div className="h-28 bg-[#1a0e09] border-b-4 border-[#382015] flex items-end p-2 gap-1 shadow-inner">
               <div className="w-6 h-20 bg-[#5e1f1c] rounded-t-sm border-r border-black/30" />
               <div className="w-5 h-18 bg-[#1d3557] rounded-t-sm border-r border-black/30" />
               <div className="w-8 h-24 bg-[#8b261e] rounded-t-sm border-r border-black/30" />
               <div className="w-4 h-22 bg-[#a38035] rounded-t-sm border-r border-black/30 ml-4" />
            </div>
            <div className="h-28 bg-[#1a0e09] border-b-4 border-[#382015] flex items-end p-2 gap-1 justify-end shadow-inner">
               <div className="w-5 h-19 bg-[#2a4d38] rounded-t-sm border-r border-black/30" />
               <div className="w-7 h-21 bg-[#7c4d32] rounded-t-sm border-r border-black/30" />
               <div className="w-6 h-20 bg-[#2b2b2b] rounded-t-sm border-r border-black/30" />
            </div>
            <div className="h-28 bg-[#1a0e09] border-b-4 border-[#382015] flex items-end p-2 gap-1 shadow-inner">
               <div className="w-9 h-22 bg-[#42221b] rounded-t-sm border-r border-black/30" />
               <div className="w-5 h-20 bg-[#163024] rounded-t-sm border-r border-black/30 ml-2" />
            </div>
          </motion.div>

          {/* Center: Massive Arched Window */}
          <div className="absolute top-10 w-[45%] h-[85%] border-[12px] border-[#24140d] rounded-t-full bg-transparent shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-end">
             {/* Window Grilles */}
             <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 pointer-events-none z-10">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border-2 border-[#24140d]/90 shadow-sm" />
                ))}
             </div>
             {/* Glass Reflection / Atmospheric haze */}
             <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000 z-0 ${
               isNightMode ? "bg-gradient-to-br from-[#88a5d6]/10 via-transparent to-black/50" : "bg-gradient-to-tr from-[#ffe8b3]/20 via-transparent to-transparent"
             }`} />
          </div>

          {/* Right: Wall Art & Robes */}
          <div className="absolute right-12 md:right-24 top-24 flex flex-col items-center gap-12">
            {/* Framed Quote */}
            <div className="w-40 h-48 bg-[#1a0e09] border-[6px] border-[#d4af37] shadow-[10px_10px_20px_rgba(0,0,0,0.6)] p-3 flex flex-col items-center justify-center text-center">
              <Scale className="w-8 h-8 text-[#d4af37] mb-3 opacity-80" />
              <p className="font-serif text-[#d4af37] font-bold tracking-widest text-sm leading-relaxed">
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
        <div className="absolute bottom-12 w-64 h-72 bg-gradient-to-b from-[#3a1b12] to-[#1a0a05] rounded-t-[3rem] border-4 border-[#24140d] shadow-2xl flex flex-col items-center pt-8 overflow-hidden">
          {/* Tufted Leather Diamond Pattern */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }} />
        </div>

        {/* CSS Character: Emmanuel Baraka */}
        <div className="absolute bottom-20 flex flex-col items-center z-10">
          
          {/* Head & Face */}
          <div className="relative w-24 h-32 mb-1">
            {/* Head Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7a4b2b] to-[#4a2b16] rounded-[2.5rem] shadow-inner" />
            {/* Hair / Receding Hairline */}
            <div className="absolute top-0 inset-x-0 h-10 bg-[#1a1a1a] rounded-t-[2.5rem] opacity-90 clip-hairline" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 60%, 50% 20%, 15% 60%, 0 100%)' }} />
            {/* Ears */}
            <div className="absolute top-12 -left-2 w-4 h-6 bg-[#5a351c] rounded-l-full" />
            <div className="absolute top-12 -right-2 w-4 h-6 bg-[#4a2b16] rounded-r-full" />
            {/* Brows */}
            <div className="absolute top-10 left-3 w-6 h-1.5 bg-[#1a1a1a] rounded-full rotate-[5deg]" />
            <div className="absolute top-10 right-3 w-6 h-1.5 bg-[#1a1a1a] rounded-full -rotate-[5deg]" />
            {/* Eyes (Looking down at laptop) */}
            <div className="absolute top-14 left-4 w-5 h-2.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-t-2 border-[#3a1f10] shadow-inner">
               <div className="w-2.5 h-2.5 bg-[#2a170b] rounded-full translate-y-0.5" />
            </div>
            <div className="absolute top-14 right-4 w-5 h-2.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-t-2 border-[#3a1f10] shadow-inner">
               <div className="w-2.5 h-2.5 bg-[#2a170b] rounded-full translate-y-0.5" />
            </div>
            {/* Nose */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-8 bg-black/10 rounded-full border-b border-black/20" />
            {/* Goatee / Beard */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-8 bg-[#1a1a1a] rounded-b-full rounded-t-sm opacity-95 flex flex-col items-center justify-start pt-1">
               {/* Lips */}
               <div className="w-8 h-2.5 bg-[#8b4f4f] rounded-full mb-1" />
            </div>
            
            {/* Optional Glasses Reflection (Subtle) */}
            <div className="absolute top-13 left-3 w-7 h-5 border border-white/20 rounded-md" />
            <div className="absolute top-13 right-3 w-7 h-5 border border-white/20 rounded-md" />
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-white/20" />
          </div>

          {/* Torso / Suit */}
          <div className="relative w-44 h-40 flex flex-col items-center z-0">
            {/* Shoulders */}
            <div className="absolute top-0 w-full h-full bg-[#151515] rounded-t-3xl shadow-[inset_0_10px_20px_rgba(0,0,0,0.8)]" />
            {/* White Shirt Collar */}
            <div className="absolute top-0 w-16 h-12 bg-white rounded-b-sm border-b-2 border-gray-300 flex justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}>
               {/* Tie */}
               <div className="w-4 h-full bg-[#1e293b] shadow-md" />
            </div>
            {/* Suit Lapels */}
            <div className="absolute top-0 left-[30%] w-6 h-32 bg-[#1a1a1a] border-r border-black/40 rotate-12 shadow-xl" />
            <div className="absolute top-0 right-[30%] w-6 h-32 bg-[#1a1a1a] border-l border-black/40 -rotate-12 shadow-xl" />
            
            {/* Arms reaching to laptop */}
            <div className="absolute top-8 -left-6 w-16 h-32 bg-[#151515] rounded-l-2xl origin-top rotate-45 shadow-lg" />
            <div className="absolute top-8 -right-6 w-16 h-32 bg-[#151515] rounded-r-2xl origin-top -rotate-45 shadow-lg" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LAYER 3: The Foreground Desk (z: +80px)                   */}
      {/* ========================================================= */}
      <div className="absolute bottom-4 inset-x-0 preserve-3d flex justify-center [transform:translateZ(80px)] pointer-events-auto">
        {/* Massive Executive Mahogany Desk */}
        <div className="relative w-[90%] max-w-5xl h-56 rounded-t-xl bg-gradient-to-b from-[#5c3725] via-[#3a1b0d] to-[#1a0a05] border-t-8 border-[#7a432b] shadow-[0_-10px_30px_rgba(0,0,0,0.8),0_40px_80px_-10px_rgba(0,0,0,1)] p-5 flex items-start justify-between overflow-visible">
          
          {/* Night Mode Banker's Lamp Desk Cone (Spotlight) */}
          <div className={`absolute -top-24 left-1/4 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4ade80]/15 via-[#4ade80]/5 to-transparent pointer-events-none transition-opacity duration-1000 ${isNightMode ? "opacity-100" : "opacity-0"}`} />

          {/* Left: Banker's Lamp & Scales of Justice */}
          <div className="flex flex-col gap-4 z-10 -mt-16 ml-2 md:ml-12">
            {/* Emerald Banker's Lamp */}
            <div className="flex flex-col items-center">
              <div className={`w-28 h-10 rounded-full bg-gradient-to-r from-[#1b5e39] via-[#2ec274] to-[#1b5e39] border border-[#a8f0c6] flex items-center justify-center transition-all duration-1000 ${
                isNightMode ? "shadow-[0_0_100px_rgba(46,194,116,0.6)]" : "shadow-[0_0_30px_rgba(46,194,116,0.4)]"
              }`}>
                <div className={`w-20 h-3 rounded-full filter blur-[3px] transition-colors duration-1000 ${
                  isNightMode ? "bg-[#ffffff]" : "bg-[#fff4cc]"
                }`} />
              </div>
              <div className="w-3 h-20 bg-gradient-to-b from-[#d4af37] to-[#8c7324] shadow-lg" />
              <div className="w-16 h-4 rounded-full bg-gradient-to-r from-[#a38035] to-[#d4af37] shadow-xl -mt-1" />
            </div>

            {/* Brass Scales of Justice */}
            <div className="flex flex-col items-center mt-6">
               <Scale className="w-12 h-12 md:w-16 md:h-16 text-[#d4af37] drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" strokeWidth={1.5} />
               <div className="w-10 h-2.5 rounded-full bg-[#8c7324] mt-1 shadow-md" />
            </div>
          </div>

          {/* Center: Open Laptop (Terminal/Code) */}
          <div className="flex flex-col items-center z-10 -mt-8 mx-auto">
            {/* Screen */}
            <div className={`w-56 h-40 md:w-72 md:h-48 rounded-t-xl bg-[#0a0a0a] border-4 border-[#1a1a1a] p-3 flex flex-col justify-start transition-all duration-1000 relative overflow-hidden ${
              isNightMode ? "shadow-[0_0_80px_rgba(52,211,153,0.2)]" : "shadow-2xl"
            }`}>
              {/* Screen Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-3 bg-[#111] -mx-3 -mt-3 p-2 border-b border-[#333]">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 rounded-full bg-green-500/80" />
                <span className="text-[6px] text-gray-500 ml-2 font-mono">zsh - root@wakili</span>
              </div>
              
              {/* Terminal Code lines */}
              <div className={`space-y-2 font-mono text-[8px] md:text-[9px] tracking-widest transition-colors duration-1000 ${isNightMode ? "text-emerald-400" : "text-emerald-500"}`}>
                <p>&gt; ./compile_defense.sh --case="Republic v. State"</p>
                <p className="opacity-80">Loading precedents [████████░░] 80%</p>
                <p className="opacity-80 text-blue-400">Fetching constitutional clauses...</p>
                <div className="w-full h-1.5 bg-[#111] rounded mt-2 overflow-hidden border border-[#333]">
                   <div className="w-3/4 h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
                <p className="mt-2 text-yellow-400">&gt; ANALYZING LOOPHOLES_</p>
              </div>
            </div>
            {/* Keyboard Base */}
            <div className="w-64 md:w-80 h-4 bg-[#151515] rounded-b-lg shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-t-2 border-white/10" />
          </div>

          {/* Right: Desk Plate, Books & Tea */}
          <div className="flex flex-col items-end gap-6 z-10 -mt-6 mr-2 md:mr-12 hidden sm:flex">
             
             {/* Desk Name Plate */}
             <div className="w-40 h-12 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-sm border-2 border-[#d4af37] shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-1 transform rotate-[-5deg]">
                <p className="text-[#d4af37] font-serif font-bold text-[10px] tracking-widest">EMMANUEL BARAKA</p>
                <div className="w-32 h-[1px] bg-[#d4af37]/40 my-0.5" />
                <p className="text-[#f3cf65]/70 text-[7px] tracking-[0.2em] uppercase">Advocate, High Court</p>
             </div>

             {/* Stack of Leather Treatises */}
             <div className="flex flex-col items-center mt-2 rotate-6">
                <div className="w-28 h-5 bg-[#8b261e] rounded-sm border-l border-white/20 shadow-sm flex items-center px-2">
                   <div className="w-1 h-3 bg-[#d4af37] rounded-sm" />
                </div>
                <div className="w-32 h-6 bg-[#163024] rounded-sm border-l border-[#d4af37]/40 shadow-sm mt-0.5 flex items-center px-2">
                   <div className="w-1 h-4 bg-[#d4af37] rounded-sm" />
                </div>
                <div className="w-36 h-7 bg-[#24140d] rounded-sm border-l border-white/20 shadow-md mt-0.5 flex items-center px-2">
                   <div className="w-1 h-5 bg-[#d4af37] rounded-sm" />
                </div>
             </div>
             
             {/* Tea */}
             <div className="mr-6 mt-2">
               <TeaSteam />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
"""

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)
