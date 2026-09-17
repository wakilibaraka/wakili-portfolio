import re

def read_file(path):
    with open(path, 'r') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w') as f:
        f.write(content)

content = read_file("src/components/OfficeRoom.tsx")

# 1. Imports and Hooks
if "useReducedMotion" not in content:
    content = content.replace('AnimatePresence } from "framer-motion"', 'AnimatePresence, useReducedMotion } from "framer-motion"')

if "const prefersReducedMotion = useReducedMotion();" not in content:
    content = content.replace('const { scrollYProgress } = useScroll();', 'const prefersReducedMotion = useReducedMotion();\n  const { scrollYProgress } = useScroll();')

# 2. Spring config (Pass 2.4 Weighty Parallax)
content = content.replace('const springConfig = { damping: 25, stiffness: 140 };', 'const springConfig = { damping: 35, stiffness: 120 };')

# 3. Scroll Logic (Pass 1.4)
content = re.sub(
    r'const scrollRoom1RotateY = useTransform\(scrollYProgress, \[0, 1\], \[0, -90\]\);',
    r'const scrollRoom1RotateY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -90]);',
    content
)
content = re.sub(
    r'const scrollRoom1Z = useTransform\(scrollYProgress, \[0, 1\], \[0, -200\]\);',
    r'const scrollRoom1Z = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -200]);',
    content
)
content = re.sub(
    r'const scrollRoom1Opacity = useTransform\(scrollYProgress, \[0, 0\.6\], \[1, 0\]\);',
    r'const scrollRoom1Opacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], prefersReducedMotion ? [1, 1, 0, 0] : [1, 0.25, 0.08, 0]);',
    content
)

content = re.sub(
    r'const scrollRoom2RotateY = useTransform\(scrollYProgress, \[0, 1\], \[90, 0\]\);',
    r'const scrollRoom2RotateY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [90, 0]);',
    content
)
content = re.sub(
    r'const scrollRoom2Z = useTransform\(scrollYProgress, \[0, 1\], \[-200, 0\]\);',
    r'const scrollRoom2Z = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-200, 0]);',
    content
)
content = re.sub(
    r'const scrollRoom2Opacity = useTransform\(scrollYProgress, \[0\.4, 1\], \[0, 1\]\);',
    r'const scrollRoom2Opacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], prefersReducedMotion ? [0, 0, 1, 1] : [0, 0.08, 0.25, 1]);',
    content
)

content = re.sub(
    r'const bulbScrollY = useTransform\(scrollYProgress, \[0\.1, 0\.3\], \[0, -200\]\);',
    r'const bulbScrollY = useTransform(scrollYProgress, [0.1, 0.3], prefersReducedMotion ? [0, 0] : [0, -200]);',
    content
)
content = re.sub(
    r'const doorLeftRotateY = useTransform\(scrollYProgress, \[0, 0\.4\], \[0, -110\]\);',
    r'const doorLeftRotateY = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? [-15, -15] : [0, -110]);',
    content
)
content = re.sub(
    r'const doorRightRotateY = useTransform\(scrollYProgress, \[0, 0\.4\], \[0, 110\]\);',
    r'const doorRightRotateY = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? [15, 15] : [0, 110]);',
    content
)


# 4. Parallax Returns (Pass 1.4)
content = content.replace(
    'const handleMouseMove = (e: React.MouseEvent) => {\n    if (interactionMode === "gyro") return;',
    'const handleMouseMove = (e: React.MouseEvent) => {\n    if (prefersReducedMotion) return;\n    if (interactionMode === "gyro") return;'
)
content = content.replace(
    'useEffect(() => {\n    const handleOrientation = (e: DeviceOrientationEvent) => {',
    'useEffect(() => {\n    if (prefersReducedMotion) return;\n    const handleOrientation = (e: DeviceOrientationEvent) => {'
)
content = content.replace(
    'const handleTouchMove = (e: React.TouchEvent) => {\n    if (interactionMode === "gyro") return;',
    'const handleTouchMove = (e: React.TouchEvent) => {\n    if (prefersReducedMotion) return;\n    if (interactionMode === "gyro") return;'
)
content = content.replace(
    '}, [rawX, rawY]);',
    '}, [rawX, rawY, prefersReducedMotion]);'
)

# 5. Ambient Loops (Pass 1.4)
content = content.replace(
    '${!isPhonePickedUp ? "animate-telephone-ring" : ""}',
    '${(!isPhonePickedUp && !prefersReducedMotion) ? "animate-telephone-ring" : ""}'
)
content = content.replace(
    'animate-swing',
    '${prefersReducedMotion ? "" : "animate-swing"}'
)
content = content.replace(
    'className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 ${prefersReducedMotion ? "" : "animate-swing"} touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-full before:absolute before:-inset-6 before:content-[\'\']"',
    'className={`absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 ${prefersReducedMotion ? "" : "animate-swing"} touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-full before:absolute before:-inset-6 before:content-[\'\']`}'
)


# 6. Lighting and Depth Polish (Pass 2.4)
# Atmospheric Background Depth (Layer 1)
content = content.replace(
    'className="absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-120px)]"',
    'className={`absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-120px)] after:absolute after:inset-0 after:pointer-events-none transition-colors duration-1000 ${isNightMode ? "after:bg-[linear-gradient(to_bottom,var(--color-night-sky-deep),transparent)] after:opacity-70" : "after:bg-[linear-gradient(to_bottom,var(--color-paper-dim),transparent)] after:opacity-40"}`}'
)

# Desk Contact Shadow
content = content.replace(
    'className="absolute bottom-12 md:bottom-16 w-[85%] max-w-4xl h-32 md:h-40 rounded-t-sm bg-gradient-to-b from-wood-25 to-wood-11 shadow-[0_30px_50px_rgba(0,0,0,0.9)] flex flex-col items-center opacity-100 z-10 [transform-style:preserve-3d]"',
    'className="absolute bottom-12 md:bottom-16 w-[85%] max-w-4xl h-32 md:h-40 rounded-t-sm bg-gradient-to-b from-wood-25 to-wood-11 shadow-[0_40px_80px_-10px_var(--color-black),0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center opacity-100 z-10 [transform-style:preserve-3d]"'
)
# Note: since the tokens might be different, let's just do a regex replace on the desk shadow
content = re.sub(
    r'shadow-\[0_30px_50px_rgba\(0,0,0,0\.9\)\]',
    r'shadow-[0_40px_80px_-10px_var(--color-black),0_20px_40px_rgba(0,0,0,0.8)]',
    content
)

# Lit Accents for gold interactive elements
# Payphone
content = re.sub(
    r'className={`group cursor-pointer relative focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-lg before:absolute before:-inset-4 before:content-\[\'\'\] \$\{\(\!isPhonePickedUp && \!prefersReducedMotion\) \? "animate-telephone-ring" : ""\}`}',
    r'className={`group cursor-pointer relative focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-lg before:absolute before:-inset-4 before:content-[\'\'] shadow-[0_0_20px_rgba(212,175,55,0.15)] ${(!isPhonePickedUp && !prefersReducedMotion) ? "animate-telephone-ring" : ""}`}',
    content
)

# Book Appointment
content = re.sub(
    r'className="w-24 md:w-40 h-10 md:h-12 bg-gradient-to-b from-shade-29 via-shade-30 to-shade-31 border-2 border-accent-gold/50 rounded-sm shadow-\[0_10px_20px_rgba\(0,0,0,0\.8\),inset_0_2px_4px_rgba\(255,255,255,0\.4\)\] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-4 focus-visible:ring-offset-transparent active:scale-95"',
    r'className="w-24 md:w-40 h-10 md:h-12 bg-gradient-to-b from-shade-29 via-shade-30 to-shade-31 border-2 border-accent-gold/50 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4),0_0_20px_rgba(212,175,55,0.2)] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-4 focus-visible:ring-offset-transparent active:scale-95"',
    content
)

# Vignette & Main Bulb Glow (Layer 4)
vignette_div = """
      {/* VIGNETTE & RADIAL BULB GLOW */}
      <div className={`absolute inset-0 pointer-events-none z-40 transition-opacity duration-1000 ${isNightMode ? 'bg-[radial-gradient(circle_at_80%_10%,transparent_10%,var(--color-black)_140%)] opacity-80' : 'bg-[radial-gradient(circle_at_80%_10%,transparent_20%,var(--color-wood-mahogany)_180%)] opacity-30'}`} />
"""
content = content.replace('{/* Top-Right Hanging Bulb Indicator */}', vignette_div + '\n        {/* Top-Right Hanging Bulb Indicator */}')

write_file("src/components/OfficeRoom.tsx", content)

