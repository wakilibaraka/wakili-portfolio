with open("src/components/SimuYaJamiiModal.tsx", "r") as f:
    content = f.read()

content = content.replace("Chambers Booking Terminal", "Consultation Terminal")
content = content.replace("WhatsApp Booking", "WhatsApp / Get in Touch")

with open("src/components/SimuYaJamiiModal.tsx", "w") as f:
    f.write(content)
