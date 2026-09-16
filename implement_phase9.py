with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Imports and State
content = content.replace('import AboutModal from "./AboutModal";', 'import AboutModal from "./AboutModal";\nimport SimuYaJamiiModal from "./SimuYaJamiiModal";')
content = content.replace('const [isAboutOpen, setIsAboutOpen] = useState(false);', 'const [isAboutOpen, setIsAboutOpen] = useState(false);\n  const [isBookingOpen, setIsBookingOpen] = useState(false);')

# 2. Modals injection
content = content.replace('<AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />', '<AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />\n      <SimuYaJamiiModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />')


# 3. Update Plaque above door
import re
# The Plaque currently points to setIsPaintingOpen(true). Let's find it.
plaque_pattern = r'onClick=\{\(\) => setIsPaintingOpen\(true\)\}\s+whileHover=\{\{ scale: 1\.05, boxShadow: "0 0 30px rgba\(212,175,55,0\.6\)" \}\}\s+whileTap=\{\{ scale: 0\.95 \}\}\s+className="w-24 md:w-40 h-10 md:h-12 bg-gradient-to-b from-\[#e6c86a\].*?\{/\* Click indicator dot \*/\}'

# We'll just replace the onClick manually in that specific button.
# Let's find the plaque div.
plaque_start = '{/* The Contact Plaque (Above Door) */}'
plaque_end = '{/* The Grand Office Door'
if plaque_start in content and plaque_end in content:
    idx1 = content.find(plaque_start)
    idx2 = content.find(plaque_end, idx1)
    plaque_block = content[idx1:idx2]
    
    new_plaque_block = plaque_block.replace('setIsPaintingOpen', 'setIsBookingOpen')
    
    # Also fix the text if it's messed up.
    # It should say BOOK APPOINTMENT. Let's just force replace the text inside the p tag.
    p_start = new_plaque_block.find('<p className="text-[#38260b]')
    p_end = new_plaque_block.find('</p>', p_start)
    
    if p_start != -1 and p_end != -1:
        new_p = '<p className="text-[#38260b] font-serif font-bold text-[7px] md:text-[8px] tracking-[0.1em] md:tracking-[0.15em] text-center uppercase leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]">\n                   BOOK<br/>\n                   <span className="text-[#1a110c] text-[8px] md:text-[10px] leading-tight">APPOINTMENT</span>\n                 '
        new_plaque_block = new_plaque_block[:p_start] + new_p + new_plaque_block[p_end:]
        
    content = content[:idx1] + new_plaque_block + content[idx2:]


# 4. Move Light Switch and build Wall Payphone
# The switch is:
# {/* Interactive Light Switch (Wall Mounted - moved to left wall) */}
# <div className="absolute top-56 md:top-64 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left">
# We want to change the switch position and insert the Payphone where the switch used to be.

switch_start = '{/* Interactive Light Switch'
switch_end = '            {/* ========================================================= */}\n            {/* LAYER 2.5'
if switch_start in content and switch_end in content:
    idx1 = content.find(switch_start)
    idx2 = content.find(switch_end, idx1)
    
    switch_block = content[idx1:idx2]
    # Move the switch:
    new_switch_block = switch_block.replace('left-2 md:left-24', 'right-40 md:right-88').replace('origin-left', 'origin-right')
    
    payphone_block = """
            {/* The Wall Payphone (Contact Us) */}
            <div className="absolute top-48 md:top-56 left-4 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPaintingOpen(true)}
                className="group cursor-pointer relative"
              >
                 {/* Payphone Backboard */}
                 <div className="w-12 h-20 bg-[#2a1a11] rounded-sm border-2 border-[#1a110c] shadow-[10px_10px_20px_rgba(0,0,0,0.8)] flex flex-col items-center pt-1" />
                 {/* Payphone Red Body */}
                 <div className="absolute top-1 left-1 w-10 h-18 bg-gradient-to-br from-[#c23b22] to-[#801306] rounded-sm shadow-inner flex flex-col items-center">
                    {/* Coin Slot / Top Panel */}
                    <div className="w-8 h-4 mt-1 bg-[#111] rounded-sm border border-[#333] flex justify-center pt-0.5">
                       <div className="w-1 h-2 bg-[#d4af37] shadow-inner" />
                    </div>
                    {/* Keypad */}
                    <div className="w-6 h-6 mt-2 grid grid-cols-3 gap-0.5">
                       {[...Array(9)].map((_, i) => <div key={i} className="bg-[#ccc] rounded-sm shadow-sm" />)}
                    </div>
                    {/* Coin Return */}
                    <div className="w-4 h-3 mt-2 bg-[#111] rounded-sm border border-[#333]" />
                 </div>
                 {/* The Handset (Hanging on the left) */}
                 <div className="absolute top-2 -left-3 w-4 h-12 flex flex-col justify-between items-center rotate-[-10deg] group-hover:rotate-[-20deg] transition-transform">
                    {/* Earpiece */}
                    <div className="w-4 h-4 bg-[#111] rounded-full border border-[#222]" />
                    {/* Handle */}
                    <div className="w-2 h-6 bg-[#222]" />
                    {/* Mouthpiece */}
                    <div className="w-4 h-4 bg-[#111] rounded-full border border-[#222]" />
                    {/* Cord connecting handset to body */}
                    <svg className="absolute -bottom-4 left-2 w-6 h-6 overflow-visible" fill="transparent" stroke="#111" strokeWidth="1.5">
                       <path d="M 0 0 C -10 10, 10 10, 5 0" strokeDasharray="2 1" />
                    </svg>
                 </div>
                 {/* Indicator Dot */}
                 <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#f3cf65] rounded-full shadow-[0_0_5px_#f3cf65] animate-pulse" />
              </motion.div>
            </div>
"""
    content = content[:idx1] + payphone_block + new_switch_block + content[idx2:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
