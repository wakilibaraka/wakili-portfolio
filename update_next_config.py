with open("next.config.ts", "r") as f:
    content = f.read()

if "basePath" not in content:
    content = content.replace("output: 'export',", "output: 'export',\n  basePath: '/wakili-portfolio',")

with open("next.config.ts", "w") as f:
    f.write(content)
