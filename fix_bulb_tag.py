with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

content = content.replace("          </div>\n        </div>\n\n        {/* Header HUD */}", "          </div>\n        </motion.div>\n\n        {/* Header HUD */}")

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
