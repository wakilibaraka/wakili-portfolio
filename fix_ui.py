import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Remove LAYER 3 (Reception Desk)
# In the original file, LAYER 3 starts at:
#       {/* ========================================================= */}
#       {/* LAYER 3: Foreground Furniture (z: +80px)                    */}
#       {/* ========================================================= */}
layer3_start = content.find("      {/* ========================================================= */}\n      {/* LAYER 3: Foreground Furniture")
if layer3_start != -1:
    # Find where the next closing tags are
    # It is a motion.div containing the desk.
    # The block ends with:
    #          </div>
    #        </motion.div>
    
    # We can just use a regex to remove the whole LAYER 3 block up to the </motion.div>
    # Since we restored from git, let's look at the actual content.
    pass

# A safer way to remove LAYER 3:
layer3_pattern = re.compile(r'      \{/\* ========================================================= \*/\}\n      \{/\* LAYER 3: Foreground Furniture \(z: \+80px\)                    \*/\}\n      \{/\* ========================================================= \*/\}\n      <motion\.div\n        style=\{\{ x: fgPanX, y: fgPanY \}\}\n        className="absolute inset-0 pointer-events-none"\n      >.*?      </motion\.div>\n', re.DOTALL)

content = re.sub(layer3_pattern, '', content)


# 2. Modify Quick Action Navigation Bar in the HUD
old_hud = """          {/* Quick Action Navigation Bar */}
          <div className="flex items-center gap-2.5 pointer-events-auto">
            <button
              onClick={() => setIsPaintingOpen(true)}
              className="px-4 py-2 rounded-full bg-[#163024]/80 backdrop-blur border border-[#d4af37]/40 text-[#f3cf65] text-xs font-serif font-bold tracking-wider hover:bg-[#d4af37] hover:text-black transition-all shadow-md flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
            <button
              onClick={() => setIsBookshelfOpen(true)}
              className="px-4 py-2 rounded-full bg-[#c25e3e]/85 backdrop-blur border border-[#f5a289]/40 text-white text-xs font-serif font-bold tracking-wider hover:bg-[#c25e3e] transition-all shadow-md flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Writings</span>
            </button>
          </div>"""

new_hud = """          {/* Quick Action Navigation Bar (Golden Plaque Design) */}
          <div className="flex items-center pointer-events-auto">
            <button
              onClick={() => setIsPaintingOpen(true)}
              className="w-56 h-12 bg-gradient-to-b from-[#e6c86a] via-[#c69a30] to-[#b38520] border-2 border-[#f3cf65]/50 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center p-2 relative overflow-hidden group hover:scale-105 active:scale-95 transition-transform"
            >
               {/* Inner engrave line */}
               <div className="absolute inset-1 border border-[#6b4c10]/40 rounded-sm pointer-events-none" />
               {/* Text */}
               <p className="text-[#38260b] font-serif font-bold text-[9px] tracking-[0.15em] text-center uppercase leading-snug drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
                 BARAKALINES • CONTACT<br/>LAW SOCIETY OF KENYA
               </p>
            </button>
          </div>"""

content = content.replace(old_hud, new_hud)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
