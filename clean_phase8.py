with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Delete HOTSPOT 1 entirely (lines 284-309 approximately)
start_hotspot = "{/* ========================================================= */}\n        {/* LAYER 2: Midground Wall Decor & Hotspots (z: -40px)      */}\n        {/* ========================================================= */}\n        <div className=\"absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-40px)] pointer-events-none\">\n          {/* HOTSPOT 1: The Framed Wall Painting (Contact Card) - Moved above door! */}"
end_hotspot = "          </div>\n        </div>"

if start_hotspot in content and end_hotspot in content:
    idx1 = content.find(start_hotspot)
    idx2 = content.find(end_hotspot, idx1) + len(end_hotspot)
    content = content[:idx1] + content[idx2:]


# 2. Delete LAYER 3: Receptionist Desk (lines 341-375)
start_desk = "{/* ========================================================= */}\n        {/* LAYER 3: Receptionist Desk (z: +80px)                     */}\n        {/* ========================================================= */}"
end_desk = "             </div>\n          </div>\n        </motion.div>\n"

if start_desk in content and end_desk in content:
    idx1 = content.find(start_desk)
    idx2 = content.find(end_desk, idx1) + len(end_desk)
    content = content[:idx1] + content[idx2:]


# 3. Enhance Rug and add MLK quote
# We want to replace the `Center Persian Rug` with the new Enhanced Rug.
old_rug = """            {/* Center Persian Rug */}
            <div className="absolute bottom-16 w-[80%] max-w-3xl h-36 rounded-md bg-[#4a1c18] border-2 border-[#732a22] shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-center opacity-95">
               <div className="w-[96%] h-[84%] border-2 border-[#94392e] rounded-sm flex items-center justify-center">
                  <div className="w-2/3 h-2/3 border border-[#94392e]/60 rounded-full flex items-center justify-center">
                     <div className="w-4 h-4 bg-[#94392e]/40 rotate-45" />
                  </div>
               </div>
            </div>"""

enhanced_rug = """            {/* The Main Long Desk (3D Extruded) */}
            <div className="absolute bottom-12 md:bottom-16 w-[85%] max-w-4xl h-32 md:h-40 rounded-t-sm bg-gradient-to-b from-[#4a1c18] to-[#2b0f0c] shadow-[0_30px_50px_rgba(0,0,0,0.9)] flex flex-col items-center opacity-100 z-10 [transform-style:preserve-3d]">
               
               {/* 3D Front Edge / Bevel */}
               <div className="absolute bottom-0 w-full h-4 bg-gradient-to-r from-[#240c08] via-[#3a1510] to-[#240c08] border-t border-[#6b2c22] rounded-b-sm flex items-center justify-center shadow-md [transform:translateZ(10px)]">
                  {/* MLK Quote Engraving */}
                  <p className="font-serif text-[4px] md:text-[6px] tracking-[0.2em] md:tracking-[0.3em] text-[#d4af37]/80 uppercase shadow-inner">
                    "Injustice anywhere is a threat to justice everywhere." - MLK Jr.
                  </p>
               </div>
               
               {/* Surface Detail (Leather Insert) */}
               <div className="w-[96%] h-[80%] mt-2 border border-[#94392e]/40 rounded-sm flex items-center justify-center bg-[#3a1510]/30 relative">
                  <div className="w-2/3 h-2/3 border border-[#94392e]/20 rounded-full flex items-center justify-center">
                     <div className="w-4 h-4 bg-[#94392e]/20 rotate-45" />
                  </div>
                  
                  {/* Classic Office Phone */}
                  <div className="absolute bottom-4 right-8 md:right-16 w-12 md:w-16 h-8 md:h-10 bg-[#111] rounded shadow-lg border-t-2 border-[#333] flex flex-col items-center justify-center rotate-[15deg] pointer-events-auto cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all">
                     <div className="w-10 md:w-14 h-3 bg-[#222] rounded-full border border-[#000] -translate-y-2 flex justify-between px-1 shadow-inner">
                        <div className="w-3 h-full bg-[#111] rounded-full" />
                        <div className="w-3 h-full bg-[#111] rounded-full" />
                     </div>
                     <div className="w-6 h-4 bg-[#333] grid grid-cols-3 gap-0.5 p-0.5 rounded-sm">
                        <div className="bg-[#444] rounded-sm" /><div className="bg-[#444] rounded-sm" /><div className="bg-[#444] rounded-sm" />
                        <div className="bg-[#444] rounded-sm" /><div className="bg-[#444] rounded-sm" /><div className="bg-[#444] rounded-sm" />
                        <div className="bg-[#444] rounded-sm" /><div className="bg-[#444] rounded-sm" /><div className="bg-[#444] rounded-sm" />
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Scattered Papers on the Floor */}
            <div className="absolute bottom-2 md:bottom-6 left-12 md:left-32 w-10 md:w-12 h-14 md:h-16 bg-[#f7f5ee] border border-[#e5e0d3] shadow-md rotate-[12deg] [transform:translateZ(2px)]">
               <div className="w-full h-1 bg-[#d4af37]/20 mt-2" />
            </div>
            <div className="absolute bottom-4 md:bottom-8 left-16 md:left-40 w-10 md:w-12 h-14 md:h-16 bg-[#f7f5ee] border border-[#e5e0d3] shadow-md -rotate-[22deg] [transform:translateZ(1px)]">
               <div className="w-full h-1 bg-[#d4af37]/20 mt-1" />
               <div className="w-1/2 h-0.5 bg-[#ccc] mt-2 ml-1" />
               <div className="w-3/4 h-0.5 bg-[#ccc] mt-1 ml-1" />
            </div>"""

content = content.replace(old_rug, enhanced_rug)


# 4. Plaque text to 2 lines
old_plaque = 'EMMANUEL BARAKA<br/>\n                   <span className="text-[#1a110c] text-[6px] md:text-[7px]">CONTACT ME</span>'
new_plaque = 'BOOK<br/>\n                   <span className="text-[#1a110c] text-[9px] md:text-[10px] leading-tight">APPOINTMENT</span>'
content = content.replace(old_plaque, new_plaque)


# 5. Move Light Switch Down
old_switch = 'className="absolute top-36 md:top-48 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left"'
new_switch = 'className="absolute top-56 md:top-64 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left"'
content = content.replace(old_switch, new_switch)


# 6. Hanging bulb animation
hooks_old = "  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);"
hooks_new = """  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  
  // Hanging Bulb Scroll Animation
  const bulbScrollY = useTransform(scrollYProgress, [0.1, 0.3], [0, -200]);
  const bulbOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);"""
content = content.replace(hooks_old, hooks_new)

old_bulb_div = '<div className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-none origin-top hover:rotate-6 transition-transform duration-700 ease-in-out">'
new_bulb_div = '<motion.div style={{ y: bulbScrollY, opacity: bulbOpacity }} className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-none origin-top hover:rotate-6 transition-transform duration-700 ease-in-out">'
content = content.replace(old_bulb_div, new_bulb_div)

# Replace the closing tag for the bulb div
content = content.replace('            </div>\n          </div>\n        </div>\n\n        {/* Header HUD */}', '            </div>\n          </div>\n        </motion.div>\n\n        {/* Header HUD */}')

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
