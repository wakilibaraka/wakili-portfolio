import re

with open("src/components/RoomTwo.tsx", "r") as f:
    content = f.read()

# 1. Imports
content = content.replace('import React from "react";', 'import React, { useState, useEffect } from "react";')

# 2. Add TerminalScreen component at the bottom of the file
terminal_component = """
function TerminalScreen({ prefersReducedMotion, isNightMode }: { prefersReducedMotion: boolean | null, isNightMode: boolean }) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState(0);

  const fullCommand = './compile_defense.sh --case="Republic v. State"';

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (phase === 0) {
      if (text.length < fullCommand.length) {
        const t = setTimeout(() => {
          setText(fullCommand.slice(0, text.length + 1));
        }, Math.random() * 30 + 20);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase(1), 500);
        return () => clearTimeout(t);
      }
    } else if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 1200);
      return () => clearTimeout(t);
    } else if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 800);
      return () => clearTimeout(t);
    } else if (phase === 3) {
      const t = setTimeout(() => {
        setText("");
        setPhase(0);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [text, phase, prefersReducedMotion, fullCommand]);

  if (prefersReducedMotion) {
    return (
      <div className={`space-y-2 font-mono text-[8px] md:text-[9px] tracking-widest transition-colors duration-1000 ${isNightMode ? "text-emerald-400" : "text-emerald-500"}`}>
        <p>&gt; ./compile_defense.sh --case="Republic v. State"</p>
        <p className="opacity-80">Loading precedents [██████████] 100%</p>
        <p className="opacity-80 text-blue-400">Defense strategy compiled.</p>
        <p className="mt-2 text-yellow-400">&gt; READY</p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 font-mono text-[8px] md:text-[9px] tracking-widest transition-colors duration-1000 ${isNightMode ? "text-emerald-400" : "text-emerald-500"}`}>
      <p>&gt; {text}{phase === 0 && <span className="animate-pulse">_</span>}</p>
      {phase >= 1 && <p className="opacity-80">Loading precedents [████████░░] 80%</p>}
      {phase >= 2 && <p className="opacity-80 text-blue-400">Defense strategy compiled.</p>}
      {phase >= 3 && <p className="mt-2 text-yellow-400">&gt; READY<span className="animate-pulse">_</span></p>}
    </div>
  );
}
"""

content = content + "\n" + terminal_component

# 3. Replace the static code block
old_block = """              {/* Terminal Code lines */}
              <div className={`space-y-2 font-mono text-[8px] md:text-[9px] tracking-widest transition-colors duration-1000 ${isNightMode ? "text-emerald-400" : "text-emerald-500"}`}>
                <p>&gt; ./compile_defense.sh --case="Republic v. State"</p>
                <p className="opacity-80">Loading precedents [████████░░] 80%</p>
                <p className="opacity-80 text-blue-400">Fetching constitutional clauses...</p>
                <div className="w-full h-1.5 bg-mono-900 rounded mt-2 overflow-hidden border border-mono-800">
                   <div className="w-3/4 h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
                <p className="mt-2 text-yellow-400">&gt; ANALYZING LOOPHOLES_</p>
              </div>"""

new_block = """              {/* Terminal Code lines */}
              <TerminalScreen prefersReducedMotion={prefersReducedMotion} isNightMode={isNightMode} />"""

if old_block in content:
    content = content.replace(old_block, new_block)
else:
    print("Warning: old block not found perfectly, trying regex...")
    content = re.sub(r'\{/\* Terminal Code lines \*/\}.*?</p>\s*</div>', new_block, content, flags=re.DOTALL)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)
