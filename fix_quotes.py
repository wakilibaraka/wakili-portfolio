import re
with open("src/components/RoomTwo.tsx", "r") as f:
    content = f.read()

# find className=" ... ${prefersReducedMotion ? "" : "animate-blink"} ... " and replace with template literals
content = re.sub(
    r'className="([^"]*\$\{prefersReducedMotion \? "" : "[^"]+"}[^"]*)"',
    r'className={`\1`}',
    content
)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)

