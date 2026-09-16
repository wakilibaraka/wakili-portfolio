with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

switch_start = '{/* Interactive Light Switch (Moved next to double doors) */}'
# Ends at {/* Arched Window
idx1 = content.find(switch_start)
idx2 = content.find('{/* Arched Window', idx1)

if idx1 != -1 and idx2 != -1:
    new_switch = """{/* Interactive Light Switch (Moved next to double doors) */}
            <div className="absolute top-48 md:top-64 right-40 md:right-[350px] pointer-events-auto scale-75 md:scale-100 origin-right touch-manipulation z-30 flex flex-col items-center">
              
              {/* LED Indicator Dot */}
              <div className={`mb-1.5 w-1.5 h-1.5 rounded-full ${!isNightMode ? 'bg-[#34d399] shadow-[0_0_6px_1px_#34d399]' : 'bg-[#f87171] shadow-[0_0_6px_1px_#f87171]'} transition-colors duration-300`} />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNightMode}
                className={`w-8 h-12 rounded border-2 shadow-[2px_4px_12px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center relative cursor-pointer transition-colors duration-1000 ${
                  isNightMode ? "bg-[#c2b9a7] border-[#8a8071]" : "bg-[#e8e2d5] border-[#b5a995]"
                }`}
              >
                {/* Switch Plate Screws */}
                <div className="w-1 h-1 rounded-full bg-[#6b6255] absolute top-1.5 shadow-inner" />
                <div className="w-1 h-1 rounded-full bg-[#6b6255] absolute bottom-1.5 shadow-inner" />
                
                {/* The Toggle */}
                <div className={`w-3 h-5 rounded-sm bg-gradient-to-b shadow-md transition-all duration-150 ${
                  isNightMode 
                    ? "from-[#ffffff] to-[#d6cbbb] translate-y-1.5 shadow-[0_-2px_4px_rgba(0,0,0,0.3)]" 
                    : "from-[#d6cbbb] to-[#ffffff] -translate-y-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                }`} />
              </motion.div>
            </div>

            """
    content = content[:idx1] + new_switch + content[idx2:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
