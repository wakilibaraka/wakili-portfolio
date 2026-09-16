import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Import CustomCursor
if "import CustomCursor" not in content:
    content = content.replace('import TeaSteam from "./TeaSteam";', 'import TeaSteam from "./TeaSteam";\nimport CustomCursor from "./CustomCursor";')

# 2. Add an entry animation state
if "const [isMounted, setIsMounted] = useState(false);" not in content:
    content = content.replace("export default function OfficeRoom() {", "export default function OfficeRoom() {\n  const [isMounted, setIsMounted] = useState(false);\n  useEffect(() => { setIsMounted(true); }, []);")

# 3. Add CustomCursor inside the outer div and add an initial fade-in motion.div wrapper around the rig
old_outer_div = """    <div className={`relative w-full h-[250vh] transition-colors duration-1000 ${isNightMode ? "bg-[#0a120e]" : "bg-[#09150f]"}`}>
      <div
        className={`fixed inset-0 w-full h-screen perspective-stage flex items-center justify-center cursor-default transition-colors duration-1000 ${
          isNightMode ? "bg-[#0d1c15]" : "bg-[#0b1a13]"
        }`}
      >"""

new_outer_div = """    <div className={`relative w-full h-[250vh] transition-colors duration-1000 ${isNightMode ? "bg-[#0a120e]" : "bg-[#09150f]"}`}>
      <CustomCursor isNightMode={isNightMode} />
      <div
        className={`fixed inset-0 w-full h-screen perspective-stage flex items-center justify-center cursor-default transition-colors duration-1000 ${
          isNightMode ? "bg-[#0d1c15]" : "bg-[#0b1a13]"
        }`}
      >
        <AnimatePresence>
          {!isMounted && (
            <motion.div
              key="loading-curtain"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 z-50 bg-[#09150f]"
            />
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="w-full h-full preserve-3d"
        >"""

content = content.replace(old_outer_div, new_outer_div)

# Close the new motion.div around the rig
old_rig_end = """      {/* ========================================================= */}
      {/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}
      {/* ========================================================= */}"""

new_rig_end = """        </motion.div>

      {/* ========================================================= */}
      {/* LAYER 4: Interface HUD / Header Overlay (z: +150px)       */}
      {/* ========================================================= */}"""

content = content.replace(old_rig_end, new_rig_end)

# Since cursor is replaced by CustomCursor, let's remove cursor-default
content = content.replace('cursor-default transition-colors duration-1000', 'cursor-none transition-colors duration-1000')


with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
