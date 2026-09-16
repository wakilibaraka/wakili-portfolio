import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Add imports
content = content.replace(
    'import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";',
    'import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";\nimport RoomTwo from "./RoomTwo";'
)

# 2. Add useScroll hooks right after isNightMode state
scroll_hooks = """
  // Multi-Room Scroll Logic
  const { scrollYProgress } = useScroll();
  const scrollRoom1RotateX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scrollRoom1Z = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scrollRoom1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  const scrollRoom2RotateX = useTransform(scrollYProgress, [0, 1], [-90, 0]);
  const scrollRoom2Z = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
"""
content = content.replace('const [isNightMode, setIsNightMode] = useState(false);', 'const [isNightMode, setIsNightMode] = useState(false);\n' + scroll_hooks)

# 3. Replace the return statement structure
old_return = """  return (
    <div
      className={`relative w-full h-screen overflow-hidden perspective-stage flex items-center justify-center cursor-default transition-colors duration-1000 ${
        isNightMode 
          ? "bg-gradient-to-b from-[#050a07] via-[#08120e] to-[#030604]" 
          : "bg-gradient-to-b from-[#0e2018] via-[#163024] to-[#09150f]"
      }`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* 2.5D Room Isometric Rig */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: panX,
          y: panY,
        }}
        className="relative w-full max-w-4xl h-[620px] md:h-[680px] preserve-3d flex items-center justify-center select-none"
      >"""

new_return = """  return (
    <div className={`relative w-full h-[250vh] transition-colors duration-1000 ${isNightMode ? "bg-[#030604]" : "bg-[#09150f]"}`}>
      <div
        className={`fixed inset-0 w-full h-screen overflow-hidden perspective-stage flex items-center justify-center cursor-default transition-colors duration-1000 ${
          isNightMode 
            ? "bg-gradient-to-b from-[#050a07] via-[#08120e] to-[#030604]" 
            : "bg-gradient-to-b from-[#0e2018] via-[#163024] to-[#09150f]"
        }`}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* ROOM 1: Landing Viewport */}
        <motion.div
          style={{ rotateX: scrollRoom1RotateX, z: scrollRoom1Z, opacity: scrollRoom1Opacity }}
          className="absolute inset-0 preserve-3d flex items-center justify-center"
        >
          {/* 2.5D Room Isometric Rig */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: panX,
              y: panY,
            }}
            className="relative w-full max-w-4xl h-[620px] md:h-[680px] preserve-3d flex items-center justify-center select-none"
          >"""
content = content.replace(old_return, new_return)

# 4. Insert Room Two before the HUD
old_hud_start = """      {/* ========================================================= */}
      {/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-8 z-30">"""

new_room_two = """          </motion.div>
        </motion.div>

        {/* ROOM 2: Scroll Target */}
        <motion.div
          style={{ rotateX: scrollRoom2RotateX, z: scrollRoom2Z, opacity: scrollRoom2Opacity }}
          className="absolute inset-0 preserve-3d flex items-center justify-center pointer-events-none"
        >
          <RoomTwo isNightMode={isNightMode} rotateX={rotateX} rotateY={rotateY} panX={panX} panY={panY} />
        </motion.div>

      {/* ========================================================= */}
      {/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-8 z-30">"""

# We need to replace the closing `</motion.div>` of the Room 1 rig as well.
# Let's use regex to find the closing motion.div before LAYER 4.
content = re.sub(r'(\s*</motion\.div>\s*)' + re.escape("""      {/* ========================================================= */}
      {/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-8 z-30">"""), new_room_two, content)


# 5. Add closing div for the scroll container at the very end
content = re.sub(r'(      <BookshelfModal isOpen=\{isBookshelfOpen\} onClose=\{\(\) => setIsBookshelfOpen\(false\)\} />\s*</div>\s*)\);\s*\}', r'\1    </div>\n  );\n}', content)


with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
