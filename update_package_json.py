import json

with open("package.json", "r") as f:
    data = json.load(f)

data["scripts"]["deploy"] = "next build && gh-pages -d out -t true"

with open("package.json", "w") as f:
    json.dump(data, f, indent=2)
