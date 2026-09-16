with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

hooks_old = "  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);"
hooks_new = """  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
  
  // Hanging Bulb Scroll Animation
  const bulbScrollY = useTransform(scrollYProgress, [0.1, 0.3], [0, -200]);
  const bulbOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);"""

content = content.replace(hooks_old, hooks_new)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
