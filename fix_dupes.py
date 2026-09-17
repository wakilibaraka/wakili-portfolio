import re

with open("src/app/globals.css", "r") as f:
    content = f.read()

# We'll split the content into lines, track seen variables inside @theme, and filter duplicates (keeping the first one we see)
lines = content.split('\n')
new_lines = []
seen_vars = set()
in_theme = False

for line in lines:
    if line.strip() == "@theme {":
        in_theme = True
        new_lines.append(line)
        continue
    
    if in_theme and line.strip() == "}":
        in_theme = False
        new_lines.append(line)
        continue
        
    if in_theme and line.strip().startswith("--color-"):
        var_name = line.split(":")[0].strip()
        if var_name in seen_vars:
            continue
        seen_vars.add(var_name)
    
    new_lines.append(line)

with open("src/app/globals.css", "w") as f:
    f.write('\n'.join(new_lines))

