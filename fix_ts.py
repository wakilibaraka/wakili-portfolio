import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

content = content.replace("style={{ x: fgPanX, y: fgPanY }}", "style={{ x: fgShiftX, y: fgShiftY }}")

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
