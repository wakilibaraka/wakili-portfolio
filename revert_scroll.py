with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Replace the advanced zoom logic back to the original
bad_scroll_logic = """  // Advanced 3D Scroll Physics (Zoom through the door portal)
  const { scrollYProgress } = useScroll();
  
  // Room 1 (Reception): Pans to center the door and zooms massively forward (Z-axis push)
  const scrollRoom1X = useTransform(scrollYProgress, [0.2, 0.8], [0, -300]); // Pan left
  const scrollRoom1Y = useTransform(scrollYProgress, [0.2, 0.8], [0, -150]); // Pan up
  const scrollRoom1Z = useTransform(scrollYProgress, [0.2, 0.8], [0, 1000]); // Deep Zoom
  const scrollRoom1Opacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);
  
  // Room 2 (Office): Zooms in from the distance through the doorway
  const scrollRoom2Z = useTransform(scrollYProgress, [0.3, 0.85], [-800, 0]);
  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);"""

original_scroll_logic = """  // Multi-Room Scroll Logic (Revolving Door on Y Axis)
  const { scrollYProgress } = useScroll();
  
  // Room 1 (Reception): Rotates to the right (-90deg on Y axis)
  const scrollRoom1RotateY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const scrollRoom1Z = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scrollRoom1Opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  
  // Room 2 (Office): Rotates in from the left (90deg to 0 on Y axis)
  const scrollRoom2RotateY = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scrollRoom2Z = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const scrollRoom2Opacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);"""
content = content.replace(bad_scroll_logic, original_scroll_logic)

# Revert Room 1 and Room 2 styles
content = content.replace('style={{ x: scrollRoom1X, y: scrollRoom1Y, z: scrollRoom1Z, opacity: scrollRoom1Opacity }}', 'style={{ rotateY: scrollRoom1RotateY, z: scrollRoom1Z, opacity: scrollRoom1Opacity }}')
content = content.replace('style={{ z: scrollRoom2Z, opacity: scrollRoom2Opacity }}', 'style={{ rotateY: scrollRoom2RotateY, z: scrollRoom2Z, opacity: scrollRoom2Opacity }}')

# Revert container height
content = content.replace('h-[300vh]', 'h-[250vh]')
# Also check if it was h-[160vh] in case the script missed it
content = content.replace('h-[160vh]', 'h-[250vh]')

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
