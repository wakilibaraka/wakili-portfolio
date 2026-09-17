import re

file = "src/components/CustomCursor.tsx"
with open(file, 'r') as f:
    content = f.read()

mapping = {
    'd4af37': 'accent-brass',
    'f3cf65': 'accent-gold',
    '382015': 'wood-mahogany'
}

def replacer(match):
    prefix = match.group(1)
    hx = match.group(2).lower()
    if hx in mapping:
        return f"{prefix}-{mapping[hx]}"
    return match.group(0)

new_content = re.sub(r'([a-zA-Z0-9:-]+)-\[#([a-fA-F0-9]{3,6})\]', replacer, content)

with open(file, 'w') as f:
    f.write(new_content)
