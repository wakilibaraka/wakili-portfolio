with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

content = content.replace("Advocate & Policy Strategist", "Lawyer & Policy Strategist")

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
