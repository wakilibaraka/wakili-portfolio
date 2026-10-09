import React, { useState, useEffect } from "react";
import { motion, MotionValue, useReducedMotion, useTransform, AnimatePresence } from "framer-motion";
import { Scale, BookOpen } from "lucide-react";

const WEIGH_VERDICTS = [
  "The scales tip toward mercy — matter adjourned for tea.",
  "Evidence weighed: 100% curiosity, 0% doubt sustained.",
  "Objection overruled — the scales admire your persistence.",
  "Judgment reserved… the scales need a recess (and a biscuit).",
];

interface RoomTwoProps {
  isNightMode: boolean;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  panX: MotionValue<number>;
  panY: MotionValue<number>;
  onOpenWritings: () => void;
  onOpenMission: () => void;
  onOpenTerminal: () => void;
}

export default function RoomTwo({ isNightMode, rotateX, rotateY, panX, panY, onOpenWritings, onOpenMission, onOpenTerminal }: RoomTwoProps) {
  const prefersReducedMotion = useReducedMotion();
  // P10: hotspot dots dismiss after first interaction each
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const markSeen = (id: string) => setSeen((s) => (s[id] ? s : { ...s, [id]: true }));
  // P13: scales easter egg — click 5x for a verdict
  const [weighs, setWeighs] = useState(0);
  const [verdict, setVerdict] = useState<string | null>(null);
  // P7: gaze follows the same pointer springs that drive room parallax
  const eyeX = useTransform(panX, [-26, 26], [-2.5, 2.5]);
  const eyeY = useTransform(panY, [-20, 20], [-1.5, 2]);
  const headX = useTransform(panX, [-26, 26], [-4, 4]);
  const headShiftY = useTransform(panY, [-20, 20], [-2, 3]);

  const handleWeigh = () => {
    const next = weighs + 1;
    if (next >= 5) {
      setVerdict(WEIGH_VERDICTS[Math.floor(Math.random() * WEIGH_VERDICTS.length)]);
      setWeighs(0);
      window.setTimeout(() => setVerdict(null), 3600);
    } else {
      setWeighs(next);
    }
  };
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

          {/* Center: Massive Arched Window */}
          <div className="absolute top-10 w-[45%] h-[85%] border-[12px] border-wood-dark rounded-t-full bg-transparent shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-end">
              {/* P6: sun / moon that swaps with night mode */}
              <div
                aria-hidden="true"
                className={`absolute top-[8%] left-1/2 -translate-x-1/2 rounded-full transition-colors duration-1000 ${
                  isNightMode
                    ? "w-10 h-10 md:w-14 md:h-14 bg-slate-100 shadow-[0_0_30px_rgba(226,232,240,0.8)]"
                    : "w-12 h-12 md:w-16 md:h-16 bg-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.9)]"
                }`}
              >
                {isNightMode && (
                  <>
                    <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-slate-300/80" />
                    <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-slate-300/70" />
                  </>
                )}
              </div>
              {/* P6: drifting clouds */}
              {!prefersReducedMotion && (
                <>
                  <div aria-hidden="true" className={`absolute top-[22%] left-[8%] w-24 h-6 md:w-32 md:h-8 rounded-full blur-md transition-opacity duration-1000 ${isNightMode ? "bg-slate-400/20" : "bg-white/50"} animate-cloud-drift`} />
                  <div aria-hidden="true" className={`absolute top-[32%] right-[6%] w-20 h-5 md:w-28 md:h-7 rounded-full blur-md transition-opacity duration-1000 ${isNightMode ? "bg-slate-400/15" : "bg-white/40"} animate-cloud-drift`} style={{ animationDelay: "-6s" }} />
                </>
              )}
              {/* P6: animated rain streaks */}
              {!prefersReducedMotion && (
                <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-1000 ${isNightMode ? "opacity-70" : "opacity-40"}`}>
                  {[...Array(12)].map((_, i) => (
                    <span
                      key={i}
                      className="animate-rain-line absolute top-0 w-px h-10 bg-gradient-to-b from-transparent via-sky-200/80 to-transparent"
                      style={{
                        left: `${6 + i * 8}%`,
                        animationDelay: `${(i % 5) * 0.28}s`,
                        animationDuration: `${1.1 + (i % 4) * 0.22}s`,
                      }}
                    />
                  ))}
                </div>
              )}
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
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenMission}
              className="w-40 h-40 bg-wood-blackest border-[6px] border-accent-brass shadow-[10px_10px_20px_rgba(0,0,0,0.6)] p-2 flex flex-col items-center justify-center text-center cursor-pointer pointer-events-auto group relative"
            >
              <div className="absolute inset-0 bg-accent-brass/0 group-hover:bg-accent-brass/5 transition-colors" />
              <Scale className="w-6 h-6 text-accent-brass mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />
              <p className="font-serif text-accent-brass font-bold tracking-widest text-xs leading-relaxed group-hover:text-accent-gold transition-colors">
                JUSTICE<br/>EQUITY<br/><span className="text-[10px]">&amp;</span><br/>TRUTH
              </p>
            </motion.div>
          
          {/* Left: The Grand Bookshelf (Writings Hotspot) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { markSeen("bookshelf"); onOpenWritings(); }}
            className="group/hotspot relative w-40 md:w-56 h-56 md:h-80 rounded bg-wood-dark border-4 border-wood-mahogany shadow-[15px_15px_30px_rgba(0,0,0,0.6)] p-2 flex flex-col justify-between cursor-pointer pointer-events-auto group mt-4 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {/* P10: hotspot dot, dismissed after first open */}
            {!seen.bookshelf && !prefersReducedMotion && (
              <span className="absolute -top-1.5 -left-1.5 z-20 flex w-5 h-5" aria-hidden="true">
                <span className="hotspot-ping absolute inline-flex h-full w-full rounded-full bg-amber-300" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 m-auto bg-amber-300 border border-black/40" />
                <span className="hotspot-tooltip absolute left-1/2 top-full mt-2 whitespace-nowrap rounded bg-black/85 px-2 py-1 text-[10px] font-sans text-amber-200">Writings</span>
              </span>
            )}
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
          {/* Head & Face (P7: head drifts subtly with pointer) */}
          <motion.div style={prefersReducedMotion ? undefined : { x: headX, y: headShiftY }} className="relative w-24 h-32 mb-1">
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
            {/* Eyes (P7: gaze follows cursor; lids blink) */}
            <div className={`absolute top-14 left-4 w-5 h-2.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-t-2 border-shade-16 shadow-inner ${prefersReducedMotion ? "" : "animate-blink"}`}>
               <motion.div style={prefersReducedMotion ? undefined : { x: eyeX, y: eyeY }} className="w-2.5 h-2.5 bg-shade-17 rounded-full translate-y-0.5" />
            </div>
            <div className={`absolute top-14 right-4 w-5 h-2.5 bg-white rounded-full flex items-center justify-center overflow-hidden border-t-2 border-shade-16 shadow-inner ${prefersReducedMotion ? "" : "animate-blink"}`}>
               <motion.div style={prefersReducedMotion ? undefined : { x: eyeX, y: eyeY }} className="w-2.5 h-2.5 bg-shade-17 rounded-full translate-y-0.5" />
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
          </motion.div>

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
            
            {/* Arms holding a book (P7: subtle typing bob) */}
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, 1.5, 0] }}
              transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="absolute top-8 -left-3 w-16 h-32 bg-mono-925 rounded-l-2xl origin-top rotate-[25deg] shadow-lg flex flex-col justify-end items-center pb-2 z-10"
            >
               <div className="w-5 h-6 bg-shade-71 rounded-full translate-x-2 translate-y-1 shadow-inner" />
            </motion.div>
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, 1.5, 0] }}
              transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-8 -right-3 w-16 h-32 bg-mono-925 rounded-r-2xl origin-top -rotate-[25deg] shadow-lg flex flex-col justify-end items-center pb-2 z-10"
            >
               <div className="w-5 h-6 bg-shade-71 rounded-full -translate-x-2 translate-y-1 shadow-inner" />
            </motion.div>
            
            {/* The Book being held */}
            <div className="absolute top-[110px] left-1/2 -translate-x-1/2 w-24 h-14 bg-shade-13 rounded-sm border-r border-l border-wood-mahogany shadow-[0_15px_30px_rgba(0,0,0,0.8)] z-20 flex p-0.5 [transform:translateZ(40px)_rotateX(20deg)]">
                {/* Left Page */}
                <div className="w-1/2 h-full bg-paper-cream border-r border-black/10 rounded-l-sm shadow-inner flex flex-col gap-1.5 p-1.5">
                   <div className="w-full h-1 bg-black/15 rounded-full" />
                   <div className="w-5/6 h-1 bg-black/15 rounded-full" />
                   <div className="w-full h-1 bg-black/15 rounded-full" />
                   <div className="w-4/6 h-1 bg-black/15 rounded-full" />
                </div>
                {/* Right Page */}
                <div className="w-1/2 h-full bg-paper-cream rounded-r-sm shadow-inner flex flex-col gap-1.5 p-1.5">
                   <div className="w-full h-1 bg-black/15 rounded-full" />
                   <div className="w-full h-1 bg-black/15 rounded-full" />
                   <div className="w-5/6 h-1 bg-black/15 rounded-full" />
                   <div className="w-3/4 h-1 bg-black/15 rounded-full" />
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

            {/* Brass Scales of Justice (P13: click 5x to weigh) */}
            <motion.button
              type="button"
              onClick={handleWeigh}
              key={weighs}
              animate={weighs > 0 && !prefersReducedMotion ? { rotate: [0, -8, 8, -4, 0] } : {}}
              transition={{ duration: 0.5 }}
              aria-label="Weigh evidence on the scales of justice"
              title={weighs > 0 ? `${5 - weighs} more…` : "Click the scales"}
              className="relative flex flex-col items-center mt-6 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass"
            >
               <Scale className="w-12 h-12 md:w-16 md:h-16 text-accent-brass drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]" strokeWidth={1.5} />
               <div className="w-10 h-2.5 rounded-full bg-accent-brass-dim mt-1 shadow-md" />
               <AnimatePresence>
                 {verdict && (
                   <motion.span
                     initial={{ opacity: 0, y: 6 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="absolute -top-14 left-1/2 -translate-x-1/2 w-44 rounded-lg bg-black/85 px-2.5 py-1.5 text-[10px] leading-snug text-amber-200 shadow-xl z-20 pointer-events-none"
                   >
                     ⚖️ {verdict}
                   </motion.span>
                 )}
               </AnimatePresence>
            </motion.button>
          </div>

          {/* Center: Open Laptop (Terminal/Code) — click to open the interactive shell */}
          <div className="flex flex-col items-center z-10 -mt-8 mx-auto">
            {/* Screen */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Open interactive terminal"
              title="Click to type in the terminal"
              onClick={() => { markSeen("laptop"); onOpenTerminal(); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); markSeen("laptop"); onOpenTerminal(); } }}
              className={`group group/hotspot w-40 h-28 md:w-72 md:h-48 rounded-t-xl bg-shade-20 border-4 border-mono-950 p-2 md:p-3 flex flex-col justify-start transition-all duration-1000 relative overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass hover:border-accent-brass/60 ${
              isNightMode ? "shadow-[0_0_80px_rgba(52,211,153,0.2)]" : "shadow-2xl"
            }`}>
              {/* P10: hotspot dot */}
              {!seen.laptop && !prefersReducedMotion && (
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 flex w-5 h-5" aria-hidden="true">
                  <span className="hotspot-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 m-auto bg-emerald-300 border border-black/40" />
                  <span className="hotspot-tooltip absolute left-1/2 top-full mt-2 whitespace-nowrap rounded bg-black/85 px-2 py-1 text-[10px] font-sans text-emerald-200">Try typing</span>
                </span>
              )}
              {/* Screen Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              {/* Hover hint */}
              <div className="absolute bottom-1.5 right-2 px-2 py-0.5 rounded-full bg-black/60 text-emerald-300 font-mono text-[8px] md:text-[10px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none">
                click to type ▸
              </div>
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
                <p className="text-accent-gold/70 text-[5px] tracking-[0.1em] uppercase text-center">LL.B (Hons) · Advocates Training Program, KSL</p>
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

  const fullCommand = './research_brief.sh --topic="Constitutional Rights"';

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
        <p>&gt; ./research_brief.sh --topic="Constitutional Rights"</p>
        <p className="opacity-80">Loading precedents [██████████] 100%</p>
        <p className="opacity-80 text-blue-400">COMPILING HUMAN RIGHTS BRIEF</p>
        <p className="mt-2 text-yellow-400">&gt; READY</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 font-mono text-[8px] md:text-[9px] tracking-widest transition-colors duration-1000 ${isNightMode ? "text-emerald-400" : "text-emerald-500"}`}>
      <p>&gt; {text}{phase === 0 && <span className="animate-pulse">_</span>}</p>
      {phase >= 1 && <p className="opacity-80">Loading precedents [████████░░] 80%</p>}
      {phase >= 2 && <p className="opacity-80 text-blue-400">COMPILING HUMAN RIGHTS BRIEF</p>}
      {phase >= 3 && <p className="mt-2 text-yellow-400">&gt; READY<span className="animate-pulse">_</span></p>}
    </div>
  );
}
