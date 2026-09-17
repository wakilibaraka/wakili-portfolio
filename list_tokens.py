import re

with open("src/app/globals.css", "r") as f:
    content = f.read()

# Extract --color-X: #Y;
tokens = re.findall(r'--(color-[a-zA-Z0-9-]+):\s*(#[a-fA-F0-9]+);', content)

# Sort by name
tokens.sort(key=lambda x: x[0])

for name, hex_val in tokens:
    print(f"- `{name}`: {hex_val}")

