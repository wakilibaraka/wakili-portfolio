with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

old_bulb_class = 'className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50"'
new_bulb_class = 'className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 animate-swing"'

content = content.replace(old_bulb_class, new_bulb_class)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
