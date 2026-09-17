import re
import colorsys

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    if len(hex_str) == 3:
        hex_str = ''.join(c*2 for c in hex_str)
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def get_category(hex_str):
    if hex_str.lower() == '#d4af37': return 'accent'
    if hex_str.lower() in ('#f3cf65', '#f3cf65'): return 'accent-bright'
    
    r, g, b = hex_to_rgb(hex_str)
    h, l, s = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
    h, l, s = h*360, l*100, s*100
    
    # Grays / Monochromes
    if s < 10 or (r == g and g == b):
        return 'mono'
    
    # Greens (Plants/Terminal)
    if 90 <= h <= 160:
        return 'green'
        
    # Blues (Sky/Night)
    if 190 <= h <= 280:
        return 'blue'
        
    # Reds / Oranges (Terracotta / Tea / Desk / Woods)
    if 0 <= h <= 45 or 330 <= h <= 360:
        # separate by lightness and saturation
        if l > 70:
            return 'warm-light'
        elif s > 50 and l > 35:
            return 'terracotta'
        else:
            return 'wood'
            
    # Yellows (Golds/Lights)
    if 45 < h < 90:
        return 'gold'
        
    return 'misc'

files_to_scan = [
    "src/components/OfficeRoom.tsx",
    "src/components/RoomTwo.tsx",
    "src/components/TeaSteam.tsx",
    "src/components/AboutModal.tsx",
    "src/components/BookshelfModal.tsx",
    "src/components/PaintingModal.tsx",
    "src/components/SimuYaJamiiModal.tsx"
]

all_hexes = set()
for file in files_to_scan:
    with open(file, 'r') as f:
        content = f.read()
        hexes = re.findall(r'\[#([a-fA-F0-9]{3,6})\]', content)
        for h in hexes:
            all_hexes.add('#' + h.lower())

# Build mapping
hex_mapping = {}
cat_counts = {}

# Special overrides
overrides = {
    '#d4af37': 'accent',
    '#f3cf65': 'accent-bright',
    '#e6c86a': 'accent-light',
    '#c69a30': 'accent-mid',
    '#b38520': 'accent-deep',
    '#25d366': 'whatsapp',
    '#1da851': 'whatsapp-dark',
}

for hx in sorted(list(all_hexes), key=lambda x: hex_to_rgb(x)[0] + hex_to_rgb(x)[1] + hex_to_rgb(x)[2]):
    if hx in overrides:
        hex_mapping[hx] = overrides[hx]
        continue
        
    cat = get_category(hx)
    cat_counts[cat] = cat_counts.get(cat, 0) + 1
    # Use L value for naming (like 100-900)
    r,g,b = hex_to_rgb(hx)
    _, l, _ = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
    
    # We will just append an index to make it unique and stable
    hex_mapping[hx] = f"{cat}-{cat_counts[cat]}"

print("Mapped", len(hex_mapping), "colors.")
for k, v in hex_mapping.items():
    print(f"{k} -> {v}")
    
# Now, generate replacement script for the actual files
