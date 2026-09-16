with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Add Payphone and Move Switch
# The switch is:
# {/* Interactive Light Switch (Wall Mounted - moved to left wall) */}
# <div className="absolute top-56 md:top-64 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left">

old_switch_div = '            {/* Interactive Light Switch (Wall Mounted - moved to left wall) */}\n            <div className="absolute top-56 md:top-64 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left">'

new_payphone_and_switch = """            {/* The Wall Payphone (Contact Us) */}
            <div className="absolute top-48 md:top-56 left-4 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left z-20">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPaintingOpen(true)}
                className="group cursor-pointer relative"
              >
                 {/* Payphone Backboard */}
                 <div className="w-12 h-20 bg-[#2a1a11] rounded-sm border-2 border-[#1a110c] shadow-[10px_10px_20px_rgba(0,0,0,0.8)] flex flex-col items-center pt-1" />
                 {/* Payphone Red Body */}
                 <div className="absolute top-1 left-1 w-10 h-[72px] bg-gradient-to-br from-[#c23b22] to-[#801306] rounded-sm shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] flex flex-col items-center z-10">
                    {/* Coin Slot */}
                    <div className="w-8 h-4 mt-1 bg-[#111] rounded-sm border border-[#333] flex justify-center pt-0.5 shadow-inner">
                       <div className="w-1 h-2 bg-[#d4af37] shadow-[inset_0_0_2px_black]" />
                    </div>
                    {/* Keypad */}
                    <div className="w-6 h-6 mt-2 grid grid-cols-3 gap-0.5">
                       {[...Array(9)].map((_, i) => <div key={i} className="bg-[#ccc] rounded-sm shadow-sm" />)}
                    </div>
                    {/* Coin Return */}
                    <div className="w-4 h-3 mt-2 bg-[#111] rounded-sm border border-[#333]" />
                 </div>
                 {/* The Handset (Hanging on the left) */}
                 <div className="absolute top-2 -left-3 w-4 h-12 flex flex-col justify-between items-center rotate-[-10deg] group-hover:rotate-[-20deg] transition-transform z-20 pointer-events-none">
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
                 <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#f3cf65] rounded-full shadow-[0_0_5px_#f3cf65] animate-pulse z-20" />
              </motion.div>
            </div>

            {/* Interactive Light Switch (Moved next to double doors) */}
            <div className="absolute top-48 md:top-64 right-40 md:right-[350px] pointer-events-auto scale-75 md:scale-100 origin-right">"""

content = content.replace(old_switch_div, new_payphone_and_switch)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
