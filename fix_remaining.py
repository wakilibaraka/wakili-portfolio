import re

files = [
    "src/components/AboutModal.tsx",
    "src/components/OfficeRoom.tsx",
    "src/components/PaintingModal.tsx",
    "src/components/RoomTwo.tsx",
    "src/components/SimuYaJamiiModal.tsx"
]

mapping = {
    'd4af37': 'accent-brass',
    '111': 'mono-900',
    'f3cf65': 'accent-gold',
    '000': 'black',
    '34d399': 'shade-16', # We'll just define these two explicitly
    'f87171': 'shade-64'
}

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # We will just replace literal occurrences of these hex strings with var(--color-X)
    content = content.replace('#d4af37', 'var(--color-accent-brass)')
    content = content.replace('#111', 'var(--color-mono-900)')
    content = content.replace('#f3cf65', 'var(--color-accent-gold)')
    content = content.replace('#000', 'var(--color-black)')
    content = content.replace('#34d399', 'var(--color-shade-16)')
    content = content.replace('#f87171', 'var(--color-shade-64)')
    
    with open(file, 'w') as f:
        f.write(content)

