import re

with open("src/components/SimuYaJamiiModal.tsx", "r") as f:
    content = f.read()

content = content.replace('https://wa.me/254700000000?text=Hello,%20I%20would%20like%20to%20book%20a%20legal%20consultation', 'https://wa.me/254712345678?text=Hello%20Emmanuel%2C%20I%27d%20like%20to%20book%20a%20consultation.')
content = content.replace('mailto:appointments@barakalines.com', 'mailto:info@barakalines.com')

with open("src/components/SimuYaJamiiModal.tsx", "w") as f:
    f.write(content)
