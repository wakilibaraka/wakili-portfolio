with open("src/components/PaintingModal.tsx", "r") as f:
    content = f.read()

content = content.replace("Advocate of the High Court • Legal Counsel", "Law · Human Rights · Policy")

# Update WhatsApp link message
old_wa = 'https://wa.me/254797078998?text=Hello%20Emmanuel%2C%20I%27d%20like%20to%20book%20a%20consultation.'
new_wa = 'https://wa.me/254797078998?text=Hello%20Emmanuel%2C%20I%27d%20like%20to%20get%20in%20touch.'
content = content.replace(old_wa, new_wa)

with open("src/components/PaintingModal.tsx", "w") as f:
    f.write(content)
