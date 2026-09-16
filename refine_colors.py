import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Make Room 1 night mode walls slightly brighter
content = content.replace('bg-[#08120e]', 'bg-[#0d1c15]') # Main wall
content = content.replace('bg-[#160d09]', 'bg-[#211611]') # Wainscoting
content = content.replace('bg-[#120a06]/80', 'bg-[#1a110c]/80') # Wainscoting panels

# Make the parquet floor slightly brighter in night mode
content = content.replace('bg-[#140b06]', 'bg-[#1f130d]')

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
