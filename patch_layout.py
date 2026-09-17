import re

with open("src/app/layout.tsx", "r") as f:
    content = f.read()

# Replace titles
content = content.replace(
    '"Emmanuel Baraka — Advocate of the High Court of Kenya"',
    '"Emmanuel Baraka — Law, Human Rights & Policy"'
)

# Replace descriptions
content = content.replace(
    '"Emmanuel Baraka is an Advocate of the High Court of Kenya and policy strategist committed to justice, equity, and truth."',
    '"Emmanuel Baraka is a law graduate and human-rights practitioner completing admission as an Advocate of the High Court of Kenya — focused on constitutional litigation, human rights, and policy."'
)

with open("src/app/layout.tsx", "w") as f:
    f.write(content)
