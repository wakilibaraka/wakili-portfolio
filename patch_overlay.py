import re

with open("src/components/OverlayUI.tsx", "r") as f:
    content = f.read()

content = content.replace('+254 (0) 700 000 000', '+254 712 345 678')
content = content.replace('href="#"', 'href="tel:254712345678" aria-label="Call Emmanuel Baraka"')

with open("src/components/OverlayUI.tsx", "w") as f:
    f.write(content)

