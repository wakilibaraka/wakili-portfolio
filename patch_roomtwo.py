import re

with open("src/components/RoomTwo.tsx", "r") as f:
    content = f.read()

# 1. Update Desk Plaque
old_plaque = """             <div className="w-48 h-12 bg-gradient-to-b from-mono-950 to-shade-20 rounded-sm border-2 border-accent-brass shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-1 transform rotate-[-5deg]">
                <p className="text-accent-brass font-serif font-bold text-[9px] tracking-widest">EMMANUEL BARAKA</p>
                <div className="w-40 h-[1px] bg-accent-brass/40 my-0.5" />
                <p className="text-accent-gold/70 text-[5px] tracking-[0.1em] uppercase">© {new Date().getFullYear()} Emmanuel Baraka • wakili.barakalines.com</p>
             </div>"""
new_plaque = """             <div className="w-48 h-12 bg-gradient-to-b from-mono-950 to-shade-20 rounded-sm border-2 border-accent-brass shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center p-1 transform rotate-[-5deg]">
                <p className="text-accent-brass font-serif font-bold text-[9px] tracking-widest">EMMANUEL BARAKA</p>
                <div className="w-40 h-[1px] bg-accent-brass/40 my-0.5" />
                <p className="text-accent-gold/70 text-[5px] tracking-[0.1em] uppercase text-center">LL.B (Hons) · Advocates Training Program, KSL</p>
             </div>"""
content = content.replace(old_plaque, new_plaque)

# 2. Update Terminal Screen
content = content.replace(
    'const fullCommand = \'./compile_defense.sh --case="Republic v. State"\';',
    'const fullCommand = \'./research_brief.sh --topic="Constitutional Rights"\';'
)
content = content.replace('./compile_defense.sh --case="Republic v. State"', './research_brief.sh --topic="Constitutional Rights"')
content = content.replace('Defense strategy compiled.', 'COMPILING HUMAN RIGHTS BRIEF')

# 3. Add Credentials Panel
old_art = """            {/* Framed Quote */}
            <div className="w-40 h-48 bg-wood-blackest border-[6px] border-accent-brass shadow-[10px_10px_20px_rgba(0,0,0,0.6)] p-3 flex flex-col items-center justify-center text-center">
              <Scale className="w-8 h-8 text-accent-brass mb-3 opacity-80" />
              <p className="font-serif text-accent-brass font-bold tracking-widest text-sm leading-relaxed">
                JUSTICE<br/>EQUITY<br/><span className="text-xs">&amp;</span><br/>TRUTH
              </p>
            </div>"""

new_art = """            {/* Framed Quote */}
            <div className="w-40 h-40 bg-wood-blackest border-[6px] border-accent-brass shadow-[10px_10px_20px_rgba(0,0,0,0.6)] p-2 flex flex-col items-center justify-center text-center">
              <Scale className="w-6 h-6 text-accent-brass mb-2 opacity-80" />
              <p className="font-serif text-accent-brass font-bold tracking-widest text-xs leading-relaxed">
                JUSTICE<br/>EQUITY<br/><span className="text-[10px]">&amp;</span><br/>TRUTH
              </p>
            </div>
            
            {/* Credentials Panel */}
            <div className="w-48 bg-wood-blackest border-[4px] border-accent-brass shadow-[10px_10px_20px_rgba(0,0,0,0.6)] p-3 text-accent-brass flex flex-col gap-1.5 -mt-6">
              <h3 className="font-serif font-bold text-[9px] tracking-widest text-center border-b border-accent-brass/30 pb-1 mb-1">EDUCATION</h3>
              <ul className="text-[7px] tracking-wider space-y-1.5 font-sans opacity-90 leading-[1.2]">
                <li><span className="font-bold text-accent-gold">LL.B (Hons, Upper Second)</span><br/>Kisii University</li>
                <li><span className="font-bold text-accent-gold">Advocates Training Program</span><br/>Kenya School of Law</li>
                <li><span className="font-bold text-accent-gold">MSc, Security & Human Rights</span><br/>Kenya School of Law (ongoing)</li>
              </ul>
              <h3 className="font-serif font-bold text-[9px] tracking-widest text-center border-b border-accent-brass/30 pb-1 mb-1 mt-2">FOCUS</h3>
              <p className="text-[7px] tracking-wider font-sans opacity-90 leading-tight text-center">
                Constitutional & human-rights litigation · Strategic litigation · Policy
              </p>
            </div>"""

content = content.replace(old_art, new_art)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)
