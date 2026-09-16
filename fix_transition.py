with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Faster crossfade
old_op1 = "const scrollRoom1Opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);"
new_op1 = "const scrollRoom1Opacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);"
content = content.replace(old_op1, new_op1)

old_op2 = "const scrollRoom2Opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);"
new_op2 = "const scrollRoom2Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);"
content = content.replace(old_op2, new_op2)

# Make the Z-push less dramatic so it doesn't look weird when rotating fast
old_z1 = "const scrollRoom1Z = useTransform(scrollYProgress, [0, 1], [0, -200]);"
new_z1 = "const scrollRoom1Z = useTransform(scrollYProgress, [0, 1], [0, -100]);"
content = content.replace(old_z1, new_z1)

old_z2 = "const scrollRoom2Z = useTransform(scrollYProgress, [0, 1], [-200, 0]);"
new_z2 = "const scrollRoom2Z = useTransform(scrollYProgress, [0, 1], [-100, 0]);"
content = content.replace(old_z2, new_z2)


# 2. Reduce the total scroll height to make the whole site feel faster
content = content.replace('h-[250vh]', 'h-[160vh]')

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
