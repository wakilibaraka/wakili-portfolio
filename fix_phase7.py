import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Remove LAYER 3: Receptionist Desk (the old one)
pattern_layer3_old = re.compile(r'      \{/\* ========================================================= \*/\}\n      \{/\* LAYER 3: Receptionist Desk \(z: \+80px\)                     \*/\}\n      \{/\* ========================================================= \*/\}\n      <motion\.div\n        style=\{\{ x: fgShiftX, y: fgShiftY \}\}\n        className="absolute bottom-4 md:bottom-8 left-2 md:left-24 preserve-3d pointer-events-auto"\n      >\n.*?      </motion\.div>\n', re.DOTALL)
content = re.sub(pattern_layer3_old, '', content)

# 2. Remove LAYER 3: Detailed Reception Desk (the new one)
pattern_layer3_new = re.compile(r'      \{/\* ========================================================= \*/\}\n      \{/\* LAYER 3: Detailed Reception Desk \(z: \+80px\)                 \*/\}\n      \{/\* ========================================================= \*/\}\n      <motion\.div\n        style=\{\{ x: fgShiftX, y: fgShiftY \}\}\n        className="absolute inset-0 pointer-events-none"\n      >\n.*?      </motion\.div>\n', re.DOTALL)
content = re.sub(pattern_layer3_new, '', content)


# 3. Rewrite the entire LAYER 4 Header HUD
# First, find where LAYER 4 starts.
layer4_start = content.find('{/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}')
# Find where the footer starts
footer_start = content.find('{/* Footer Ambient Cue */}')

new_hud = """{/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-8 z-30">
        
        {/* Top-Right Hanging Bulb Indicator */}
        <div className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-none origin-top hover:rotate-6 transition-transform duration-700 ease-in-out">
          {/* The Cord */}
          <div className="w-[2px] h-16 md:h-24 bg-[#111] shadow-[1px_0_0_rgba(255,255,255,0.1)]" />
          {/* The Bulb Base */}
          <div className="w-4 h-5 bg-gradient-to-b from-[#222] to-[#444] rounded-t-sm border border-[#111]" />
          {/* The Bulb Glass */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center -mt-1 transition-all duration-1000 ${
            isNightMode 
              ? "bg-[#ffaa00] shadow-[0_0_50px_rgba(255,170,0,0.8),inset_0_0_10px_rgba(255,255,255,0.8)]"
              : "bg-white/10 shadow-[inset_0_0_5px_rgba(255,255,255,0.2)] border border-white/20 backdrop-blur-sm"
          }`}>
            {/* Inner filament */}
            <div className={`w-3 h-3 border border-x-transparent border-t-transparent rounded-b-full transition-colors duration-1000 ${
              isNightMode ? "border-b-[#fff] shadow-[0_0_5px_white]" : "border-b-white/40"
            }`} />
          </div>
        </div>

        {/* Header HUD */}
        <header className="flex justify-between items-start pointer-events-none relative z-40">
          
          {/* Top-Left Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#99791e] p-[1px] shadow-lg">
              <div className="w-full h-full bg-[#163024] rounded-[10px] flex items-center justify-center text-[#f3cf65]">
                <Scale className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-lg md:text-xl font-bold tracking-wide text-[#f3cf65] drop-shadow-md">
                Emmanuel Baraka
              </h1>
              <p className="text-[9px] md:text-xs uppercase tracking-widest text-[#d4af37]/80 font-medium">
                Advocate & Policy Strategist
              </p>
            </div>
          </div>

        </header>

        """

content = content[:layer4_start] + new_hud + content[footer_start:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
