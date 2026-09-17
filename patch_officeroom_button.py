with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

old_btn = """                   BOOK<br/>
                   <span className="text-wood-ink text-[8px] md:text-[10px] leading-tight">APPOINTMENT</span>"""

new_btn = """                   GET IN<br/>
                   <span className="text-wood-ink text-[8px] md:text-[10px] leading-tight">TOUCH</span>"""

content = content.replace(old_btn, new_btn)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
