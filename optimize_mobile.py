import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Optimize Dust/Noise blend mode (remove mix-blend-overlay on mobile, keep on md)
content = content.replace(
    'className="absolute inset-0 z-40 pointer-events-none opacity-[0.15] mix-blend-overlay"',
    'className="absolute inset-0 z-40 pointer-events-none opacity-[0.05] md:opacity-[0.15] md:mix-blend-overlay"'
)

# 2. Add will-change to the 3D scroll targets for better FPS on mobile
content = content.replace(
    'className="w-full h-full preserve-3d"',
    'className="w-full h-full preserve-3d will-change-transform"'
)

# 3. Increase Light Switch touch target size for mobile
content = content.replace(
    'className="w-8 h-12 bg-[#f7f5ee] rounded shadow-md border-2 border-[#e5e0d3] flex flex-col items-center justify-center relative"',
    'className="w-8 h-12 bg-[#f7f5ee] rounded shadow-md border-2 border-[#e5e0d3] flex flex-col items-center justify-center relative p-6 -m-6 box-content"'
)

# Wait, padding/margin box-content on a specific sized element might mess up the layout.
# Let's instead wrap the light switch in a larger clickable area.
old_switch = """            <motion.div 
              whileTap={{ scale: 0.9 }}
              onClick={toggleNightMode}
              className="w-8 h-12 bg-[#f7f5ee] rounded shadow-md border-2 border-[#e5e0d3] flex flex-col items-center justify-center relative cursor-pointer"
            >"""

new_switch = """            <motion.div 
              whileTap={{ scale: 0.9 }}
              onClick={toggleNightMode}
              className="w-8 h-12 bg-[#f7f5ee] rounded shadow-md border-2 border-[#e5e0d3] flex flex-col items-center justify-center relative cursor-pointer after:content-[''] after:absolute after:-inset-4"
            >"""
content = content.replace(old_switch, new_switch)


with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)

with open("src/components/RoomTwo.tsx", "r") as f:
    content2 = f.read()

# Reduce blur on mobile for the window glare in RoomTwo
content2 = content2.replace(
    'className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[50px] transition-all duration-1000',
    'className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 md:w-48 h-32 md:h-48 rounded-full blur-[30px] md:blur-[50px] transition-all duration-1000'
)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content2)

