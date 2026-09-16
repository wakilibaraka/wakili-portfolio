import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Remove HOTSPOT 1 completely
hotspot_pattern = re.compile(r'          \{/\* HOTSPOT 1: The Framed Wall Painting.*?          </div>\n', re.DOTALL)
content = re.sub(hotspot_pattern, '', content)

# 2. Remove LAYER 3: Receptionist Desk completely
layer3_pattern = re.compile(r'        \{/\* ========================================================= \*/\}\n        \{/\* LAYER 3: Receptionist Desk \(z: \+80px\)                     \*/\}\n        \{/\* ========================================================= \*/\}\n        <motion\.div\n          style=\{\{ x: fgShiftX, y: fgShiftY \}\}\n          className="absolute bottom-4 md:bottom-8 left-2 md:left-24 preserve-3d pointer-events-auto"\n        >.*?        </motion\.div>\n', re.DOTALL)
content = re.sub(layer3_pattern, '', content)

# 3. Update Plaque Text
old_plaque_text = """EMMANUEL BARAKA<br/>
                   <span className="text-[#1a110c] text-[6px] md:text-[7px]">BOOK APPOINTMENT</span>"""
new_plaque_text = """BOOK<br/>
                   <span className="text-[#1a110c] text-[9px] md:text-[10px]">APPOINTMENT</span>"""
content = content.replace(old_plaque_text, new_plaque_text)
# Also try replacing the original Contact Me just in case the previous script failed
content = content.replace("""EMMANUEL BARAKA<br/>
                   <span className="text-[#1a110c] text-[6px] md:text-[7px]">CONTACT ME</span>""", new_plaque_text)


# 4. Move Light Switch down
old_switch = 'className="absolute top-36 md:top-48 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left"'
new_switch = 'className="absolute top-56 md:top-64 left-2 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left"'
content = content.replace(old_switch, new_switch)


with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
