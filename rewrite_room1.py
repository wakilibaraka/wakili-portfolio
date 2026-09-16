import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# We need to extract everything from {/* ROOM 1: Landing Viewport */} to the start of {/* ROOM 2: Scroll Target */}
start_marker = "{/* ROOM 1: Landing Viewport */}"
end_marker = "{/* ROOM 2: Scroll Target */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers")
    exit(1)

room1_code = """{/* ROOM 1: Landing Viewport (Reception) */}
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
            className="relative w-full max-w-4xl h-[620px] md:h-[680px] preserve-3d flex items-center justify-center select-none"
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

            {/* The Grand Office Door (Right side, leading to Chamber) */}
            <div className="absolute bottom-0 right-8 md:right-24 w-40 md:w-56 h-72 md:h-88 border-4 border-[#24140d] bg-black/80 flex perspective-stage z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
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
            <div className="absolute top-48 md:top-48 left-10 md:left-24 pointer-events-auto">
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
            <div className={`absolute top-10 left-32 md:left-56 w-36 md:w-44 h-56 md:h-64 rounded-t-full border-4 border-[#382015] shadow-inner overflow-hidden flex flex-col justify-end transition-colors duration-1000 ${
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
          <div className="absolute top-12 right-20 md:right-40 pointer-events-auto">
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
          className="absolute bottom-2 md:bottom-8 left-4 md:left-24 preserve-3d pointer-events-auto"
        >
          {/* Wooden Reception Desk */}
          <div className="w-64 md:w-80 h-32 md:h-40 bg-gradient-to-b from-[#4f2e1e] to-[#24140d] rounded-t-lg border-t-4 border-[#683f2a] shadow-2xl p-4 flex flex-col justify-between relative [transform:translateZ(80px)]">
             {/* Guestbook Hotspot */}
             <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsBookshelfOpen(true)}
               className="absolute top-4 right-8 w-16 h-10 bg-[#f7f5ee] rounded shadow-md border-b-2 border-[#c25e3e] flex items-center justify-center cursor-pointer group"
             >
                <div className="w-3/4 h-3/4 border border-[#e5e0d3] flex flex-col items-center justify-center">
                   <div className="text-[5px] uppercase font-serif text-[#c25e3e] font-bold">Writings</div>
                   <div className="w-8 h-0.5 bg-[#e5e0d3] mt-1" />
                </div>
                {/* Attention badge */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#d4af37] rounded-full flex items-center justify-center shadow animate-bounce">
                  <BookOpen className="w-2.5 h-2.5 text-black" />
                </div>
             </motion.div>
             
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
"""

new_content = content[:start_idx] + room1_code + "\n        " + content[end_idx:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(new_content)
