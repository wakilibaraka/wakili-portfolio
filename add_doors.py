import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Add door motion values
door_logic = """  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
  
  // Door Opening Animation
  const doorLeftRotateY = useTransform(scrollYProgress, [0, 0.4], [0, -110]);
  const doorRightRotateY = useTransform(scrollYProgress, [0, 0.4], [0, 110]);"""

content = content.replace("  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);", door_logic)

# 2. Add the door into the main wall of Room 1
door_html = """
            {/* The Grand Office Door (Center) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 md:w-64 h-80 md:h-96 border-4 border-[#24140d] bg-black/80 flex perspective-stage z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)]">
                {/* Left Door Panel */}
                <motion.div 
                  style={{ rotateY: doorLeftRotateY }} 
                  className="w-1/2 h-full bg-gradient-to-br from-[#4f2e1e] to-[#24140d] border-r border-black/40 origin-left shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center py-8 gap-4"
                >
                   <div className="w-2/3 h-1/4 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   <div className="w-2/3 h-1/2 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   {/* Handle */}
                   <div className="absolute right-2 top-1/2 w-1.5 h-10 bg-gradient-to-b from-[#f3cf65] to-[#8c7324] rounded-full shadow-md" />
                </motion.div>
                {/* Right Door Panel */}
                <motion.div 
                  style={{ rotateY: doorRightRotateY }} 
                  className="w-1/2 h-full bg-gradient-to-bl from-[#4f2e1e] to-[#24140d] border-l border-black/40 origin-right shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex flex-col items-center py-8 gap-4"
                >
                   <div className="w-2/3 h-1/4 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   <div className="w-2/3 h-1/2 border-2 border-[#683f2a]/40 rounded shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                   {/* Handle */}
                   <div className="absolute left-2 top-1/2 w-1.5 h-10 bg-gradient-to-b from-[#f3cf65] to-[#8c7324] rounded-full shadow-md" />
                </motion.div>
            </div>
"""

# Insert right before Interactive Light Switch
wainscoting_end = """              ))}
            </div>"""

content = content.replace(wainscoting_end, wainscoting_end + door_html)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
