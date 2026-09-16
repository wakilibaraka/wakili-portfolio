import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Scale Perspective Container
content = content.replace(
    'className="relative w-full max-w-4xl h-[620px] md:h-[680px] preserve-3d flex items-center justify-center select-none"',
    'className="relative w-full max-w-4xl h-[620px] md:h-[680px] preserve-3d flex items-center justify-center select-none scale-[0.8] md:scale-100 will-change-transform"'
)


# 2. Add Contact Plaque above the door
plaque_code = """
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
            
            {/* The Grand Office Door"""

content = content.replace("{/* The Grand Office Door", plaque_code)


# 3. Add Detailed Reception Desk (LAYER 3)
# We will inject it right before ROOM 2: Scroll Target
desk_code = """      {/* ========================================================= */}
      {/* LAYER 3: Detailed Reception Desk (z: +80px)                 */}
      {/* ========================================================= */}
      <motion.div
        style={{ x: fgPanX, y: fgPanY }}
        className="absolute inset-0 pointer-events-none"
      >
          <div className="absolute bottom-8 md:bottom-12 left-8 md:left-24 [transform:translateZ(80px)]">
             {/* The Desk Base */}
             <div className="w-56 md:w-80 h-28 md:h-40 bg-gradient-to-b from-[#4f2e1e] to-[#24140d] rounded-tl-xl rounded-tr-sm border-t-4 border-[#683f2a] shadow-[10px_20px_30px_rgba(0,0,0,0.8)] p-4 flex flex-col relative">
                {/* Front Panel Wainscoting */}
                <div className="w-full h-full border-2 border-[#683f2a]/30 rounded-sm flex items-center justify-center gap-4">
                   <div className="w-1/3 h-2/3 border border-[#683f2a]/20" />
                   <div className="w-1/3 h-2/3 border border-[#683f2a]/20" />
                </div>
                
                {/* Top Desk Surface Clutter */}
                <div className="absolute -top-4 md:-top-6 left-0 w-full h-6 flex items-end justify-between px-4">
                   {/* Modern Computer Monitor */}
                   <div className="w-16 md:w-24 h-12 md:h-16 bg-[#111] border-2 border-[#222] rounded-sm shadow-xl flex items-center justify-center relative -rotate-6">
                      <div className="w-full h-full border-[3px] border-[#333] rounded-sm flex items-center justify-center overflow-hidden relative">
                         {/* Screen glow */}
                         <div className="absolute inset-0 bg-[#e0f7fa]/10 pointer-events-none" />
                         <div className="w-full h-1/4 bg-[#e0f7fa]/20 absolute top-0" />
                      </div>
                      <div className="absolute -bottom-2 w-4 h-2 bg-[#444]" />
                      <div className="absolute -bottom-3 w-8 h-1 bg-[#555] rounded-full" />
                   </div>
                   
                   {/* Yellow BarakaLines Sign */}
                   <div className="w-12 md:w-16 h-6 md:h-8 bg-gradient-to-br from-[#f3cf65] to-[#c69a30] rounded-sm shadow-md flex items-center justify-center border border-[#d4af37] rotate-6 mb-1">
                      <span className="text-[5px] md:text-[6px] font-serif font-bold text-[#38260b] uppercase">BarakaLines</span>
                   </div>
                </div>

                {/* Left Side Printer */}
                <div className="absolute -left-6 bottom-4 w-12 md:w-16 h-10 md:h-14 bg-[#e5e0d3] rounded shadow-xl flex flex-col items-center justify-start pt-1 border border-[#ccc]">
                   <div className="w-3/4 h-2 bg-[#333] rounded-sm" />
                   {/* Printed paper sticking out */}
                   <div className="w-3/4 h-4 bg-white mt-1 shadow-sm rotate-2" />
                </div>
                
                {/* Floor Clutter (Papers) */}
                <div className="absolute -bottom-6 left-12 w-6 h-8 bg-white rotate-[15deg] shadow-md opacity-90" />
                <div className="absolute -bottom-4 left-16 w-6 h-8 bg-white -rotate-[25deg] shadow-md opacity-80" />
                
                {/* Desk Picture/Painting */}
                <div className="absolute -top-12 right-2 w-10 md:w-14 h-12 md:h-16 bg-[#2a1a11] border-4 border-[#8c7324] shadow-lg flex items-center justify-center rotate-12">
                   <div className="w-3/4 h-3/4 bg-[#163024] flex items-center justify-center">
                     <Scale className="w-4 h-4 text-[#d4af37]" />
                   </div>
                </div>
             </div>
          </div>
      </motion.div>

        {/* ROOM 2: Scroll Target */"""

content = content.replace("{/* ROOM 2: Scroll Target */", desk_code)


# 4. Redesign HUD Header (Centered Glass Watermark)
# First, remove the old Quick Action bar if it exists (the Golden Plaque we added last step).
old_hud_pattern = re.compile(r'          \{/\* Quick Action Navigation Bar \(Golden Plaque Design\) \*/\}.*?          </div>', re.DOTALL)
content = re.sub(old_hud_pattern, '', content)

old_header_start = """        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 pointer-events-auto">"""
          
new_header = """        {/* Centered Glass Watermark Header */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <header className="flex justify-center pt-2 md:pt-4 pointer-events-none">
          <div className="flex flex-col items-center gap-1 opacity-75 mix-blend-screen transition-opacity duration-1000">
             <div className="w-10 h-10 rounded-full border border-[#f3cf65]/30 flex items-center justify-center bg-[#f3cf65]/10 backdrop-blur-md">
               <Scale className="w-5 h-5 text-[#f3cf65]" />
             </div>
             <h1 className="font-serif text-lg md:text-xl font-bold tracking-widest text-[#f3cf65] uppercase mt-2">
               Emmanuel Baraka
             </h1>
             <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#f3cf65]/60 font-light">
               Advocate & Policy Strategist
             </p>
          </div>"""
content = content.replace(old_header_start, new_header)

# The end of the old header was `</div>\n        </header>`
content = content.replace("          </div>\n\n\n        </header>", "        </header>")


with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)

