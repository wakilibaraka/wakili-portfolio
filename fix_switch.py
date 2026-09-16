with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

switch_start = '{/* Interactive Light Switch (Moved next to double doors) */}'
# Ends at {/* Arched Window
idx1 = content.find(switch_start)
idx2 = content.find('{/* Arched Window', idx1)

if idx1 != -1 and idx2 != -1:
    new_switch = """{/* Interactive Retro Brutalist Light Switch */}
            <div className="absolute top-48 md:top-64 right-32 md:right-[320px] pointer-events-auto scale-75 md:scale-100 origin-right touch-manipulation z-30">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNightMode}
                className="relative w-10 h-16 bg-[#c4c4c4] cursor-pointer group"
                style={{ filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.5))" }}
              >
                {/* Glowing Dot on top of the plate */}
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${!isNightMode ? 'bg-[#4ade80] shadow-[0_0_8px_2px_#4ade80]' : 'bg-[#ef4444] shadow-[0_0_8px_2px_#ef4444]'} z-20 transition-all duration-300`} />
                
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#f3cf65] font-bold tracking-widest drop-shadow-md">ON</span>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#f3cf65] font-bold tracking-widest drop-shadow-md">OFF</span>

                {/* Switch Body */}
                <div className="absolute inset-0 preserve-3d">
                  {isNightMode ? (
                    // OFF STATE (Switch is flipped DOWN)
                    <>
                      {/* Top half: Recessed */}
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-[#a0a0a0] border-t-2 border-l-2 border-black/80 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.4)]" />
                      {/* Bottom half: Protruding Wedge */}
                      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#e0e0e0] origin-top [transform:perspective(150px)_rotateX(25deg)] border-l-2 border-[#333] shadow-[0_12px_10px_-5px_rgba(0,0,0,0.9)] z-10 flex items-center justify-center">
                         <div className="w-4 h-0.5 bg-black/10 rounded-full" />
                      </div>
                    </>
                  ) : (
                    // ON STATE (Switch is flipped UP)
                    <>
                      {/* Top half: Protruding Wedge */}
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-[#e0e0e0] origin-bottom [transform:perspective(150px)_rotateX(-25deg)] border-l-2 border-[#333] shadow-[0_-12px_10px_-5px_rgba(0,0,0,0.9)] z-10 flex items-center justify-center">
                         <div className="w-4 h-0.5 bg-black/10 rounded-full" />
                      </div>
                      {/* Bottom half: Recessed */}
                      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#a0a0a0] border-b-2 border-l-2 border-black/80 shadow-[inset_2px_-2px_10px_rgba(0,0,0,0.4)]" />
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            """
    content = content[:idx1] + new_switch + content[idx2:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
