import re

with open("src/components/RoomTwo.tsx", "r") as f:
    content = f.read()

# 1. Update Props Interface
old_props = """interface RoomTwoProps {
  isNightMode: boolean;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  panX: MotionValue<number>;
  panY: MotionValue<number>;
}

export default function RoomTwo({ isNightMode, rotateX, rotateY, panX, panY }: RoomTwoProps) {"""

new_props = """import { BookOpen } from "lucide-react";

interface RoomTwoProps {
  isNightMode: boolean;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  panX: MotionValue<number>;
  panY: MotionValue<number>;
  onOpenWritings: () => void;
}

export default function RoomTwo({ isNightMode, rotateX, rotateY, panX, panY, onOpenWritings }: RoomTwoProps) {"""

content = content.replace(old_props, new_props)

# 2. Add interaction to the Bookshelf on the Left Wall
old_bookshelf = """          {/* Bookshelf on Left Wall */}
          <div className="w-64 h-80 rounded bg-[#24140d] border-4 border-[#382015] shadow-inner p-3 flex flex-col justify-between [transform:translateZ(10px)]">"""

new_bookshelf = """          {/* Bookshelf on Left Wall (Writings Hotspot) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenWritings}
            className="w-64 h-80 rounded bg-[#24140d] border-4 border-[#382015] shadow-inner p-3 flex flex-col justify-between [transform:translateZ(10px)] cursor-pointer pointer-events-auto group relative"
          >
            {/* Attention Badge */}
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-[#c25e3e] rounded-full shadow-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-[#d86d4b] transition-colors z-20">
               <BookOpen className="w-3 h-3 text-[#f3cf65]" />
               <span className="text-[9px] font-serif font-bold text-white uppercase tracking-wider">Writings</span>
            </div>"""

content = content.replace(old_bookshelf, new_bookshelf)

# Change closing div to motion.div for the bookshelf
old_bookshelf_end = """            <div className="h-24 bg-[#1a0e09] border-b-4 border-[#382015] flex items-end p-2 gap-1 justify-end">
               <div className="w-5 h-19 bg-[#2a4d38] rounded-t-sm border-r border-black/30" />
               <div className="w-7 h-21 bg-[#7c4d32] rounded-t-sm border-r border-black/30" />
            </div>
          </div>"""

new_bookshelf_end = """            <div className="h-24 bg-[#1a0e09] border-b-4 border-[#382015] flex items-end p-2 gap-1 justify-end">
               <div className="w-5 h-19 bg-[#2a4d38] rounded-t-sm border-r border-black/30" />
               <div className="w-7 h-21 bg-[#7c4d32] rounded-t-sm border-r border-black/30" />
            </div>
          </motion.div>"""

content = content.replace(old_bookshelf_end, new_bookshelf_end)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)
