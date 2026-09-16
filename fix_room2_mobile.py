import re

with open("src/components/RoomTwo.tsx", "r") as f:
    content = f.read()

# 1. Fix Bookshelf
content = content.replace(
    'className="absolute left-8 md:left-16 top-16 w-48 md:w-64 h-96 rounded bg-[#24140d] border-4 border-[#382015] shadow-[15px_15px_30px_rgba(0,0,0,0.6)] p-3 flex flex-col justify-between cursor-pointer pointer-events-auto group relative"',
    'className="absolute left-2 md:left-16 top-16 md:top-16 w-32 md:w-64 h-64 md:h-96 rounded bg-[#24140d] border-4 border-[#382015] shadow-[15px_15px_30px_rgba(0,0,0,0.6)] p-2 md:p-3 flex flex-col justify-between cursor-pointer pointer-events-auto group relative scale-75 md:scale-100 origin-left"'
)

# 2. Fix Framed Quote
content = content.replace(
    'className="absolute right-12 md:right-24 top-24 flex flex-col items-center gap-12"',
    'className="absolute right-2 md:right-24 top-16 md:top-24 flex flex-col items-center gap-12 scale-75 md:scale-100 origin-right"'
)

# 3. Fix Desk
content = content.replace(
    'className="relative w-[90%] max-w-5xl h-56 rounded-t-xl bg-gradient-to-b from-[#5c3725] via-[#3a1b0d] to-[#1a0a05] border-t-8 border-[#7a432b] shadow-[0_-10px_30px_rgba(0,0,0,0.8),0_40px_80px_-10px_rgba(0,0,0,1)] p-5 flex items-start justify-between overflow-visible"',
    'className="relative w-[95%] md:w-[90%] max-w-5xl h-40 md:h-56 rounded-t-xl bg-gradient-to-b from-[#5c3725] via-[#3a1b0d] to-[#1a0a05] border-t-8 border-[#7a432b] shadow-[0_-10px_30px_rgba(0,0,0,0.8),0_40px_80px_-10px_rgba(0,0,0,1)] p-3 md:p-5 flex items-start justify-between overflow-visible"'
)

# 4. Fix Lamp & Scales
content = content.replace(
    'className="flex flex-col gap-4 z-10 -mt-16 ml-2 md:ml-12"',
    'className="flex flex-col gap-2 md:gap-4 z-10 -mt-12 md:-mt-16 ml-1 md:ml-12 scale-75 md:scale-100 origin-bottom-left"'
)

# 5. Fix Laptop
content = content.replace(
    'className={`w-56 h-40 md:w-72 md:h-48 rounded-t-xl bg-[#0a0a0a] border-4 border-[#1a1a1a] p-3 flex flex-col justify-start transition-all duration-1000 relative overflow-hidden ${',
    'className={`w-40 h-28 md:w-72 md:h-48 rounded-t-xl bg-[#0a0a0a] border-4 border-[#1a1a1a] p-2 md:p-3 flex flex-col justify-start transition-all duration-1000 relative overflow-hidden ${'
)
content = content.replace(
    'className="w-64 md:w-80 h-4 bg-[#151515] rounded-b-lg shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-t-2 border-white/10"',
    'className="w-48 md:w-80 h-3 md:h-4 bg-[#151515] rounded-b-lg shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-t-2 border-white/10"'
)

# 6. Adjust Character Position for Mobile
content = content.replace(
    'className="absolute bottom-20 flex flex-col items-center z-10"',
    'className="absolute bottom-16 md:bottom-20 flex flex-col items-center z-10 scale-90 md:scale-100 origin-bottom"'
)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)
