import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Remove the Desk from OfficeRoom.tsx (Room 1)
start_marker = "{/* ========================================================= */}\n        {/* LAYER 3: Foreground Advocate Desk & Tea (z: +60px)        */}\n        {/* ========================================================= */}"
# We need to find the matching motion.div.
# It ends just before "        </motion.div>\n        </motion.div>\n\n        {/* ROOM 2: Scroll Target */}"

if start_marker in content:
    start_idx = content.find(start_marker)
    end_marker = "        </motion.div>\n        </motion.div>\n\n        {/* ROOM 2: Scroll Target */}"
    end_idx = content.find(end_marker)
    if start_idx != -1 and end_idx != -1:
        # Keep the closing tags for the room rig
        content = content[:start_idx] + "        </motion.div>\n        </motion.div>\n\n        {/* ROOM 2: Scroll Target */}" + content[end_idx + len(end_marker):]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
