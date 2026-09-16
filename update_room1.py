import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Remove LAYER 3 (Reception Desk)
start_marker = "{/* LAYER 3: Foreground Furniture"
end_marker = "</motion.div>\n\n        </motion.div>\n        </motion.div>\n\n        {/* ROOM 2: Scroll Target */}"

start_idx = content.find(start_marker)
# Find the start of the previous comment block to remove it fully
actual_start = content.rfind("{/* ====", 0, start_idx)
end_idx = content.find(end_marker)

new_content = content[:actual_start] + end_marker + content[end_idx + len(end_marker):]

# 2. Change the Contact Painting to a Golden Plaque
old_painting_start = "{/* The Contact Painting (Clickable) */}"
old_painting_end = "             </motion.div>\n          </div>"
p_start = new_content.find(old_painting_start)
p_end = new_content.find(old_painting_end) + len(old_painting_end)

new_plaque = """{/* The Contact Plaque (Clickable) */}
             <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsPaintingOpen(true)}
               className="absolute top-12 right-6 md:right-32 pointer-events-auto scale-75 md:scale-100 origin-right cursor-pointer"
             >
                <div className="w-56 h-16 bg-gradient-to-b from-[#e6c86a] via-[#c69a30] to-[#b38520] border-2 border-[#f3cf65]/50 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                   {/* Inner engrave line */}
                   <div className="absolute inset-1 border border-[#6b4c10]/40 rounded-sm pointer-events-none" />
                   {/* Text */}
                   <p className="text-[#38260b] font-serif font-bold text-[9px] tracking-[0.15em] text-center uppercase leading-snug drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">
                     BARAKALINES • LAW SOCIETY OF<br/>KENYA
                   </p>
                </div>
             </motion.div>
          </div>"""

new_content = new_content[:p_start] + new_plaque + new_content[p_end:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(new_content)
