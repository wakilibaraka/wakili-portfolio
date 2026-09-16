import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

start_marker = "{/* Reception Desk */}"
end_marker = "</motion.div>\n\n        </motion.div>\n        </motion.div>\n\n        {/* ROOM 2: Scroll Target */}"

start_idx = content.find(start_marker)
# Find the closing tag of the LAYER 3 motion.div
# Let's just find the LAYER 3 marker
layer3_marker = "{/* LAYER 3: Foreground Furniture (z: +80px)                    */}"
start_layer3 = content.find(layer3_marker)

# Actually, I can just remove the whole LAYER 3 if the desk is the only thing in there.
# Let's check what's inside LAYER 3.
