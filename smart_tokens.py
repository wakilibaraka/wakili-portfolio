import re
import collections

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
    with open(file, 'r') as f:
        all_hexes.extend([h.lower() for h in re.findall(r'\[#([a-fA-F0-9]{3,6})\]', f.read())])

counts = collections.Counter(all_hexes)
sorted_hexes = [x[0] for x in counts.most_common()]

mapping = {}

manual_names = {
    'd4af37': 'accent',
    'f3cf65': 'accent-bright',
    '24140d': 'wood-deep',
    '382015': 'wood-mid',
    '111': 'mono-900',
    '444': 'mono-600',
    'c25e3e': 'terracotta-base',
    '00a859': 'whatsapp-base',
    '333': 'mono-800',
    '1a1a1a': 'mono-950',
    '163024': 'green-deep',
    'f7f5ee': 'surface-light',
    '222': 'mono-850',
    '0b0d12': 'night-sky-deep',
    '8c7324': 'accent-muted',
    '683f2a': 'wood-warm',
    '5e5750': 'stone-mid',
    '1a0e09': 'wood-darkest',
    '151515': 'mono-925',
    'ffffff': 'white',
    'fff': 'white',
    'e5e0d3': 'surface-dim',
    'ccc': 'mono-300',
    '99791e': 'accent-dim',
    '94392e': 'terracotta-dark',
    '684903': 'accent-shadow',
    '2a1716': 'wood-shadow',
    '25d366': 'whatsapp-bright',
    '1a110c': 'wood-black',
    
    # Toggle colors for night mode (wainscoting and switch)
    '211611': 'wood-night',
    'c2b9a7': 'switch-night-bg',
    '8a8071': 'switch-night-border',
    'e8e2d5': 'switch-day-bg',
    'b5a995': 'switch-day-border',
    '000': 'black',
}

counters = collections.defaultdict(int)

for hx in sorted_hexes:
    if hx in manual_names:
        mapping[hx] = manual_names[hx]
    else:
        # fallback naming
        counters['misc'] += 1
        mapping[hx] = f"ill-{counters['misc']}"

# Now replace in files
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    def replacer(match):
        orig_hex = match.group(1)
        lower_hex = orig_hex.lower()
        if lower_hex in mapping:
            # We are inside a tailwind class like `bg-[#hex]` or `text-[#hex]`
            # but regex matches just the `[#hex]` part.
            # wait, the regex was `\[#([a-fA-F0-9]{3,6})\]`.
            # I want to replace `[#hex]` with `var-name`.
            # BUT wait, the class is `bg-[#hex]`. We want `bg-accent`.
            # So `\[#{orig_hex}\]` gets replaced by `-{mapping[lower_hex]}`
            # wait, if I replace `[#hex]` with `accent`, then `text-[#d4af37]` becomes `text-accent`.
            return mapping[lower_hex]
        return match.group(0)

    # Note: re.sub replaces `\[#[a-fA-F0-9]+\]` with `mapping[lower_hex]`
    new_content = re.sub(r'\[#([a-fA-F0-9]{3,6})\]', replacer, content)
    
    with open(file, 'w') as f:
        f.write(new_content)

print("Files updated with tokens.")

# Generate globals.css additions
css_additions = "\n@theme {\n"
for hx, token in mapping.items():
    css_additions += f"  --color-{token}: #{hx};\n"
css_additions += "}\n"

with open("src/app/globals.css", "r") as f:
    css_content = f.read()

# We will just append the @theme block if it doesn't exist
if "@theme {" not in css_content:
    with open("src/app/globals.css", "a") as f:
        f.write(css_additions)
else:
    print("WARNING: @theme already exists in globals.css. You need to merge manually.")

