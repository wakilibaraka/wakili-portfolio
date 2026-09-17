import re

with open("src/components/ContactModal.tsx", "r") as f:
    content = f.read()

# Replace Call link
content = content.replace('href="tel:+254700000000"', 'href="tel:254712345678" aria-label="Call Emmanuel Baraka"')
content = content.replace('+254 700 000 000', '+254 712 345 678')

# Replace WhatsApp link
content = content.replace('href="https://wa.me/254700000000"', 'href="https://wa.me/254712345678?text=Hello%20Emmanuel%2C%20I%27d%20like%20to%20book%20a%20consultation." aria-label="Message on WhatsApp"')

# Add aria-label to email
content = content.replace('href="mailto:info@barakalines.com"', 'href="mailto:info@barakalines.com" aria-label="Email Emmanuel Baraka"')

with open("src/components/ContactModal.tsx", "w") as f:
    f.write(content)
