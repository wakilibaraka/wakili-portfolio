import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Remove onClick from the guestbook in Room 1
old_guestbook = """             {/* Guestbook Hotspot */}
             <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsBookshelfOpen(true)}
               className="absolute top-4 right-8 w-16 h-10 bg-[#f7f5ee] rounded shadow-md border-b-2 border-[#c25e3e] flex items-center justify-center cursor-pointer group"
             >
                <div className="w-3/4 h-3/4 border border-[#e5e0d3] flex flex-col items-center justify-center">
                   <div className="text-[5px] uppercase font-serif text-[#c25e3e] font-bold">Writings</div>
                   <div className="w-8 h-0.5 bg-[#e5e0d3] mt-1" />
                </div>
                {/* Attention badge */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#d4af37] rounded-full flex items-center justify-center shadow animate-bounce">
                  <BookOpen className="w-2.5 h-2.5 text-black" />
                </div>
             </motion.div>"""

new_guestbook = """             {/* Guestbook (Prop) */}
             <div 
               className="absolute top-4 right-8 w-16 h-10 bg-[#f7f5ee] rounded shadow-md border-b-2 border-[#c25e3e] flex items-center justify-center"
             >
                <div className="w-3/4 h-3/4 border border-[#e5e0d3] flex flex-col items-center justify-center">
                   <div className="text-[4px] uppercase font-serif text-[#c25e3e] font-bold opacity-60">Guestbook</div>
                   <div className="w-8 h-0.5 bg-[#e5e0d3] mt-1 opacity-50" />
                </div>
             </div>"""

content = content.replace(old_guestbook, new_guestbook)

# 2. Pass the prop to RoomTwo
old_room2 = "<RoomTwo isNightMode={isNightMode} rotateX={rotateX} rotateY={rotateY} panX={panX} panY={panY} />"
new_room2 = "<RoomTwo isNightMode={isNightMode} rotateX={rotateX} rotateY={rotateY} panX={panX} panY={panY} onOpenWritings={() => setIsBookshelfOpen(true)} />"
content = content.replace(old_room2, new_room2)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
