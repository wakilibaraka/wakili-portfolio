import re
import collections
import os

files = [
    "src/components/OfficeRoom.tsx",
    "src/components/RoomTwo.tsx",
    "src/components/TeaSteam.tsx",
    "src/components/AboutModal.tsx",
    "src/components/BookshelfModal.tsx",
    "src/components/PaintingModal.tsx",
    "src/components/SimuYaJamiiModal.tsx"
]

all_hexes = []
for file in files:
    if os.path.exists(file):
        with open(file, 'r') as f:
            all_hexes.extend([h.lower() for h in re.findall(r'\[#([a-fA-F0-9]{3,6})\]', f.read())])

counts = collections.Counter(all_hexes)
sorted_hexes = [x[0] for x in counts.most_common()]

manual_mapping = {
    'd4af37': 'accent-brass',
    'f3cf65': 'accent-gold',
    '24140d': 'wood-dark',
    '382015': 'wood-mahogany',
    '111': 'mono-900',
    '444': 'mono-600',
    'c25e3e': 'accent-terracotta',
    '00a859': 'whatsapp-base',
    '333': 'mono-800',
    '1a1a1a': 'mono-950',
    '163024': 'green-racing',
    'f7f5ee': 'paper-cream',
    '222': 'mono-850',
    '0b0d12': 'night-sky-deep',
    '8c7324': 'accent-brass-dim',
    '683f2a': 'wood-warm',
    '5e5750': 'ink-muted',
    '1a0e09': 'wood-blackest',
    '151515': 'mono-925',
    'ffffff': 'white',
    'fff': 'white',
    'e5e0d3': 'paper-dim',
    'ccc': 'mono-300',
    '99791e': 'accent-dim',
    '94392e': 'terracotta-dark',
    '684903': 'accent-shadow',
    '2a1716': 'wood-shadow',
    '25d366': 'whatsapp-bright',
    '1a110c': 'wood-ink',
    '211611': 'wood-night',
    'c2b9a7': 'switch-night-bg',
    '8a8071': 'switch-night-border',
    'e8e2d5': 'switch-day-bg',
    'b5a995': 'switch-day-border',
    '000': 'black',
    '0e2018': 'green-racing-deep',
    '4f2e1e': 'wood-walnut',
    '191816': 'ink-deep'
}

mapping = {}
counters = collections.defaultdict(int)

# 1. Assign names
for hx in sorted_hexes:
    if hx in manual_mapping:
        mapping[hx] = manual_mapping[hx]
    else:
        counters['shade'] += 1
        mapping[hx] = f"shade-{counters['shade']}"

# 2. Update tsx files
for file in files:
    if not os.path.exists(file):
        continue
    with open(file, 'r') as f:
        content = f.read()
    
    def replacer(match):
        orig_hex = match.group(1)
        lower_hex = orig_hex.lower()
        if lower_hex in mapping:
            return mapping[lower_hex]
        return match.group(0)

    # replace [#hex] with just token-name because it's inside bg-[...], text-[...], etc.
    # WAIT! `bg-[#d4af37]` becomes `bg-accent-brass`.
    # So `\[#hex\]` becomes `-token`.
    # Let's do string replacement for the exact classes:
    # Actually, tailwind arbitrary values are `[#hex]`. We want to remove the brackets and the hash.
    # So `\[#([a-fA-F0-9]{3,6})\]` gets replaced by `-{token}`? 
    # NO, if the original is `bg-[#d4af37]`, and I match `\[#d4af37\]`, I should replace with `-accent-brass`?
    # NO! Then it becomes `bg--accent-brass`.
    # Let's match the prefix too! `([a-zA-Z0-9:-]+)-\[#([a-fA-F0-9]{3,6})\]` -> `\1-{token}`
    
    # Let's do that to be safe.
    def replacer_full(match):
        prefix = match.group(1)
        hx = match.group(2).lower()
        if hx in mapping:
            return f"{prefix}-{mapping[hx]}"
        return match.group(0)
    
    new_content = re.sub(r'([a-zA-Z0-9:-]+)-\[#([a-fA-F0-9]{3,6})\]', replacer_full, content)
    
    with open(file, 'w') as f:
        f.write(new_content)

# 3. Update globals.css
with open("src/app/globals.css", "r") as f:
    css_content = f.read()

# Generate new properties
theme_props = ""
for hx, token in mapping.items():
    theme_props += f"  --color-{token}: #{hx};\n"

# Inject into @theme block
if "@theme {" in css_content:
    css_content = css_content.replace("@theme {", "@theme {\n" + theme_props)
else:
    css_content = f"@theme {{\n{theme_props}}}\n" + css_content

with open("src/app/globals.css", "w") as f:
    f.write(css_content)

print(f"Mapped {len(mapping)} colors successfully.")
