import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Fix Double Door
content = content.replace(
    'className="absolute bottom-0 right-8 md:right-24 w-40 md:w-56 h-72 md:h-88 border-4 border-[#24140d] bg-black/80 flex perspective-stage z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]"',
    'className="absolute bottom-0 right-4 md:right-24 w-32 md:w-56 h-56 md:h-88 border-4 border-[#24140d] bg-black/80 flex perspective-stage z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]"'
)

# 2. Fix Window
content = content.replace(
    'className={`absolute top-10 left-32 md:left-56 w-36 md:w-44 h-56 md:h-64 rounded-t-full border-4 border-[#382015] shadow-inner overflow-hidden flex flex-col justify-end transition-colors duration-1000 ${',
    'className={`absolute top-10 md:top-10 left-4 md:left-56 w-24 md:w-44 h-40 md:h-64 rounded-t-full border-4 border-[#382015] shadow-inner overflow-hidden flex flex-col justify-end transition-colors duration-1000 ${'
)

# 3. Fix Light Switch
content = content.replace(
    'className="absolute top-48 md:top-48 left-10 md:left-24 pointer-events-auto"',
    'className="absolute top-36 md:top-48 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left"'
)

# 4. Fix Contact Painting
content = content.replace(
    'className="absolute top-12 right-20 md:right-40 pointer-events-auto"',
    'className="absolute top-6 md:top-12 right-6 md:right-40 pointer-events-auto scale-75 md:scale-100 origin-right"'
)

# 5. Fix Reception Desk
content = content.replace(
    'className="absolute bottom-2 md:bottom-8 left-4 md:left-24 preserve-3d pointer-events-auto"',
    'className="absolute bottom-4 md:bottom-8 left-2 md:left-24 preserve-3d pointer-events-auto"'
)
content = content.replace(
    'className="w-64 md:w-80 h-32 md:h-40 bg-gradient-to-b from-[#4f2e1e] to-[#24140d] rounded-t-lg border-t-4 border-[#683f2a] shadow-2xl p-4 flex flex-col justify-between relative [transform:translateZ(80px)]"',
    'className="w-52 md:w-80 h-24 md:h-40 bg-gradient-to-b from-[#4f2e1e] to-[#24140d] rounded-t-lg border-t-4 border-[#683f2a] shadow-2xl p-2 md:p-4 flex flex-col justify-between relative [transform:translateZ(80px)]"'
)
content = content.replace(
    'className="absolute top-4 right-8 w-16 h-10 bg-[#f7f5ee] rounded shadow-md border-b-2 border-[#c25e3e] flex items-center justify-center"',
    'className="absolute top-2 md:top-4 right-4 md:right-8 w-12 md:w-16 h-8 md:h-10 bg-[#f7f5ee] rounded shadow-md border-b-2 border-[#c25e3e] flex items-center justify-center"'
)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
