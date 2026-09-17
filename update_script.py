import re

with open('src/components/OfficeRoom.tsx', 'r') as f:
    content = f.read()

# Add state and effect for scaling
scale_code = """  const [isNightMode, setIsNightMode] = useState(false);
  const [stageScale, setStageScale] = useState(1);

  // Responsive stage scaling (Pass 1.1)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateScale = () => {
      const width = window.innerWidth;
      // clamp(minScale, viewportWidth / 896, maxScale)
      // 896px is max-w-4xl which is the design width of the stage
      const scale = Math.max(0.3, Math.min(width / 896, 1.4));
      setStageScale(scale);
    };

    updateScale();
    
    let ticking = false;
    const handleResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScale();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);"""

content = content.replace('  const [isNightMode, setIsNightMode] = useState(false);', scale_code)

# Update the main wrapper
old_wrapper = """      <div
        className={`fixed inset-0 w-full h-screen overflow-hidden perspective-stage flex items-center justify-center cursor-none transition-colors duration-1000 ${
          isNightMode 
            ? "bg-gradient-to-b from-[#050a07] via-[#08120e] to-[#030604]" 
            : "bg-gradient-to-b from-[#0e2018] via-[#163024] to-[#09150f]"
        }`}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >"""

new_wrapper = """      <div
        className={`fixed inset-0 w-full h-screen overflow-x-clip flex items-center justify-center cursor-none transition-colors duration-1000 ${
          isNightMode 
            ? "bg-gradient-to-b from-[#050a07] via-[#08120e] to-[#030604]" 
            : "bg-gradient-to-b from-[#0e2018] via-[#163024] to-[#09150f]"
        }`}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <div 
          className="w-full h-full perspective-stage flex items-center justify-center"
          style={{
            transform: `scale(${stageScale})`,
            transformOrigin: "center center"
          }}
        >"""

content = content.replace(old_wrapper, new_wrapper)

# Note: Because we added a div wrapper, we need to add a closing div at the end.
# Let's find the closing tag for the main container.
# It ends right before the modals.
old_end = """        <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#d4af37]/75">
          <p className="tracking-wider">© 2026 Emmanuel Baraka • wakili.barakalines.com</p>
        </footer>
      </div>
      
      {/* ========================================================= */}
      {/* LAYER 5: Overlays & Modals (z: +999px)                      */}"""

new_end = """        <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#d4af37]/75">
          <p className="tracking-wider">© 2026 Emmanuel Baraka • wakili.barakalines.com</p>
        </footer>
      </div>
      </div>
      
      {/* ========================================================= */}
      {/* LAYER 5: Overlays & Modals (z: +999px)                      */}"""

content = content.replace(old_end, new_end)

with open('src/components/OfficeRoom.tsx', 'w') as f:
    f.write(content)

