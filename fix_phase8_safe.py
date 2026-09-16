with open("src/components/OfficeRoom.tsx", "r") as f:
    lines = f.readlines()

# We will build a new list of lines
new_lines = []
skip = False
for i, line in enumerate(lines):
    # HOTSPOT 1 (lines 286 to 308)
    if i >= 285 and i <= 307:
        continue
    # LAYER 3 (lines 340 to 373) -> wait, index is i+1.
    # 341 is i=340, 374 is i=373.
    if i >= 340 and i <= 373:
        continue
        
    new_lines.append(line)

content = "".join(new_lines)

# 1. Update Plaque text
content = content.replace(
    'EMMANUEL BARAKA<br/>\n                   <span className="text-[#1a110c] text-[6px] md:text-[7px]">CONTACT ME</span>',
    'BOOK<br/>\n                   <span className="text-[#1a110c] text-[9px] md:text-[10px] leading-tight">APPOINTMENT</span>'
)

# 2. Move Light Switch down
content = content.replace('className="absolute top-36 md:top-48 left-2 md:left-24', 'className="absolute top-56 md:top-64 left-2 md:left-24')

# 3. Add 3D thickness to floor, MLK quote, papers, and phone
rug_start = '            {/* Center Persian Rug */}'
rug_end = '            {/* Inlaid Brass Footer Plaque */}'

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
                        {[...Array(9)].map((_, i) => <div key={i} className="bg-[#444] rounded-sm" />)}
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
            </div>
"""

import re
rug_match = re.search(r'            \{/\* Center Persian Rug \*/\}.*?            \{/\* Inlaid Brass Footer Plaque \*/\}', content, re.DOTALL)
if rug_match:
    content = content[:rug_match.start()] + enhanced_rug + "\n            {/* Inlaid Brass Footer Plaque */}" + content[rug_match.end():]

# 4. Animate hanging bulb out of view on scroll to Room 2
hooks_insertion = """  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  
  // Hanging Bulb Scroll Animation
  const bulbScrollY = useTransform(scrollYProgress, [0.1, 0.3], [0, -200]);
  const bulbOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);"""
content = content.replace("  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);", hooks_insertion)

bulb_div = '<div className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-none origin-top hover:rotate-6 transition-transform duration-700 ease-in-out">'
new_bulb_div = '<motion.div style={{ y: bulbScrollY, opacity: bulbOpacity }} className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-none origin-top hover:rotate-6 transition-transform duration-700 ease-in-out">'
content = content.replace(bulb_div, new_bulb_div)

# Replace the closing tag for the bulb div
content = content.replace('            </div>\n          </div>\n        </div>', '            </div>\n          </div>\n        </motion.div>')

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
