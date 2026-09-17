import re

files_to_patch = ["src/components/OverlayUI.tsx", "src/components/PaintingModal.tsx"]

for file in files_to_patch:
    with open(file, "r") as f:
        content = f.read()
    
    content = content.replace("contact@barakalines.com", "info@barakalines.com")
    
    with open(file, "w") as f:
        f.write(content)

