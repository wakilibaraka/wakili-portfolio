import re
import os

files_to_update = [
    "src/components/OverlayUI.tsx",
    "src/components/ContactModal.tsx",
    "src/components/SimuYaJamiiModal.tsx",
    "src/components/PaintingModal.tsx"
]

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            content = f.read()
        
        # Phone numbers
        content = content.replace("254712345678", "254797078998")
        content = content.replace("+254 712 345 678", "+254 797 078 998")
        content = content.replace("+254700000000", "+254797078998")
        
        # Email
        content = content.replace("info@barakalines.com", "wakilibara@gmail.com")
        
        with open(filepath, "w") as f:
            f.write(content)
