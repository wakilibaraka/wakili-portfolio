with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Replace CONTACT ME with BOOK APPOINTMENT
content = content.replace("CONTACT ME</span>", "BOOK APPOINTMENT</span>")

# 2. Remove "Tilt phone to shift perspective" block
footer_block = """          <div className="flex items-center gap-2 bg-[#0e2018]/80 backdrop-blur px-4 py-2 rounded-full border border-[#d4af37]/20">
            <Compass className="w-4 h-4 text-[#f3cf65] animate-spin [animation-duration:12s]" />
            <span>
              {hasGyroscope ? "Tilt phone to shift perspective" : "Move mouse to explore the chamber"}
            </span>
          </div>"""
content = content.replace(footer_block, "")

# 3. Remove LAYER 3: Receptionist Desk
start_marker = "{/* ========================================================= */}\n        {/* LAYER 3: Receptionist Desk (z: +80px)                     */}\n        {/* ========================================================= */}"
# The desk ends at the end of the motion.div
end_marker = "             </div>\n          </div>\n        </motion.div>\n\n        {/* ROOM 2: Scroll Target */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + "{/* ROOM 2: Scroll Target */}" + content[end_idx + len(end_marker):]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)

