with open("src/components/OfficeRoom.tsx", "r") as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if "</motion.div>" in line and "Top-Right Hanging Bulb Indicator" in "".join(lines[i-20:i]):
        new_lines.append("          </div>\n")
        new_lines.append(line)
    else:
        new_lines.append(line)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.writelines(new_lines)
