import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Page/Stage Background
old_wrapper = r'<div className=\{`relative w-full h-\[250vh\] transition-colors duration-1000 \$\{isNightMode \? "bg-shade-1" : "bg-shade-2"\}`\}>'
new_wrapper = r'<div className="relative w-full h-[250vh] bg-green-racing-deep">'
content = re.sub(old_wrapper, new_wrapper, content)

old_stage = r'className=\{`fixed inset-0 w-full h-screen overflow-hidden perspective-stage flex items-center justify-center cursor-none transition-colors duration-1000 \$\{\n\s*isNightMode \n\s*\? "bg-gradient-to-b from-shade-25 via-shade-26 to-shade-1" \n\s*: "bg-gradient-to-b from-green-racing-deep via-green-racing to-shade-2"\n\s*\}`\}'
new_stage = r'className="fixed inset-0 w-full h-screen overflow-hidden perspective-stage flex items-center justify-center cursor-none bg-green-racing-deep"'
content = re.sub(old_stage, new_stage, content)

# 2. Deep Background Overlay (Remove paper-dim wash)
old_bg_layer = r'className=\{`absolute inset-0 preserve-3d flex items-center justify-center \[transform:translateZ\(-120px\)\] after:absolute after:inset-0 after:pointer-events-none transition-colors duration-1000 \$\{isNightMode \? "after:bg-\[linear-gradient\(to_bottom,var\(--color-night-sky-deep\),transparent\)\] after:opacity-70" : "after:bg-\[linear-gradient\(to_bottom,var\(--color-paper-dim\),transparent\)\] after:opacity-40"\}`\}'
new_bg_layer = r'className="absolute inset-0 preserve-3d flex items-center justify-center [transform:translateZ(-120px)]"'
content = re.sub(old_bg_layer, new_bg_layer, content)

# 3. Vignette & Radial Bulb Glow
old_vignette = r'<div className=\{`absolute inset-0 pointer-events-none z-40 transition-opacity duration-1000 \$\{isNightMode \? \'bg-\[radial-gradient\(circle_at_80%_10%,transparent_10%,var\(--color-black\)_140%\)\] opacity-80\' : \'bg-\[radial-gradient\(circle_at_80%_10%,transparent_20%,var\(--color-wood-mahogany\)_180%\)\] opacity-30\'\}`\} />'
new_vignette = r'<div className={`absolute inset-0 pointer-events-none z-40 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,var(--color-green-racing-deep)_120%)] ${isNightMode ? "opacity-80" : "opacity-40"}`} />'
content = re.sub(old_vignette, new_vignette, content)

# 4. Wall Unification
# Room 1
old_wall = r'className=\{`relative w-\[92%\] h-\[88%\] rounded-3xl border-4 border-wood-mahogany shadow-2xl overflow-hidden transition-colors duration-1000 \$\{isNightMode \? "bg-shade-27" : "bg-green-racing"\}`\}'
new_wall = r'className={`relative w-[92%] h-[88%] rounded-3xl border-4 border-wood-mahogany shadow-2xl overflow-hidden transition-colors duration-1000 ${isNightMode ? "bg-green-racing-deep" : "bg-green-racing"}`}'
content = re.sub(old_wall, new_wall, content)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)

with open("src/components/RoomTwo.tsx", "r") as f:
    content2 = f.read()

# Room 2 Wall
old_wall2 = r'className=\{`absolute w-\[95%\] h-\[95%\] rounded-2xl border-4 shadow-2xl transition-colors duration-1000 flex items-center justify-center overflow-hidden \$\{\n\s*isNightMode \? "bg-shade-60 border-shade-61" : "bg-green-racing border-wood-dark"\n\s*\}`\}'
new_wall2 = r'className={`absolute w-[95%] h-[95%] rounded-2xl border-4 shadow-2xl transition-colors duration-1000 flex items-center justify-center overflow-hidden ${isNightMode ? "bg-green-racing-deep border-shade-61" : "bg-green-racing border-wood-dark"}`}'
content2 = re.sub(old_wall2, new_wall2, content2)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content2)
