with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

switch_start = '{/* Interactive Retro Brutalist Light Switch */}'
# Ends at {/* Arched Window
idx1 = content.find(switch_start)
idx2 = content.find('{/* Arched Window', idx1)

if idx1 != -1 and idx2 != -1:
    new_switch = """{/* Interactive Realistic Brutalist Light Switch */}
            <div className="absolute top-48 md:top-64 right-32 md:right-[320px] pointer-events-auto scale-75 md:scale-100 origin-right touch-manipulation z-30">
              
              {/* Outer Casing / Faceplate (Brushed Metal) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNightMode}
                className="relative w-12 h-20 bg-gradient-to-b from-[#d9d9d9] to-[#bfbfbf] rounded-sm border border-[#fff]/40 shadow-[1px_2px_5px_rgba(0,0,0,0.6),inset_1px_1px_0_rgba(255,255,255,0.8)] flex flex-col items-center justify-center cursor-pointer group"
              >
                {/* Faceplate Screws */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#999] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex items-center justify-center">
                   <div className="w-1 h-[0.5px] bg-[#666] rotate-45" />
                </div>
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#999] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)] flex items-center justify-center">
                   <div className="w-1 h-[0.5px] bg-[#666] rotate-12" />
                </div>

                {/* Status Indicator (Text + LED on same plane) */}
                <div className="absolute top-[14px] w-full flex flex-col items-center justify-center gap-[2px]">
                   <span className={`font-mono text-[5px] font-bold tracking-widest ${!isNightMode ? 'text-[#34d399]' : 'text-[#f87171]'} drop-shadow-[0_0_2px_currentColor] transition-colors duration-300`}>
                     {!isNightMode ? 'ON' : 'OFF'}
                   </span>
                   <div className={`w-1 h-1 rounded-full ${!isNightMode ? 'bg-[#34d399] shadow-[0_0_4px_1px_#34d399]' : 'bg-[#f87171] shadow-[0_0_4px_1px_#f87171]'} transition-all duration-300`} />
                </div>

                {/* Recessed Hole for the Rocker */}
                <div className="absolute bottom-[14px] w-8 h-10 bg-[#1a1a1a] rounded-[1px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.4)] overflow-hidden preserve-3d">
                   
                  {/* The Rocker Switch Mechanism */}
                  <div className={`w-full h-full preserve-3d origin-center transition-transform duration-150 ${isNightMode ? '[transform:rotateX(25deg)]' : '[transform:rotateX(-25deg)]'}`}>
                       
                       {/* Top Half of Rocker */}
                       <div className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b ${isNightMode ? 'from-[#fdfcf9] to-[#d4d1cd] shadow-[0_3px_5px_rgba(0,0,0,0.7)] z-10' : 'from-[#a3a19e] to-[#8a8885] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'} border border-black/10 flex items-center justify-center`}>
                          {isNightMode && <div className="w-2.5 h-0.5 bg-black/10 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />}
                       </div>
                       
                       {/* Bottom Half of Rocker */}
                       <div className={`absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-b ${isNightMode ? 'from-[#8a8885] to-[#706e6b] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]' : 'from-[#fdfcf9] to-[#d4d1cd] shadow-[0_-3px_5px_rgba(0,0,0,0.7)] z-10'} border border-black/10 flex items-center justify-center`}>
                          {!isNightMode && <div className="w-2.5 h-0.5 bg-black/10 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />}
                       </div>
                  </div>
                </div>
              </motion.div>
            </div>

            """
    content = content[:idx1] + new_switch + content[idx2:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
