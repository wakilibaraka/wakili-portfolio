import re

with open("src/components/PaintingModal.tsx", "r") as f:
    content = f.read()

content = content.replace('tel:+254700000000', 'tel:254712345678')
content = content.replace('+254 (0) 700 000 000', '+254 712 345 678')

with open("src/components/PaintingModal.tsx", "w") as f:
    f.write(content)

