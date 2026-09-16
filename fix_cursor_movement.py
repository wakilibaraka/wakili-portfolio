import re

with open("src/components/CustomCursor.tsx", "r") as f:
    content = f.read()

# Make position instant, only spring animate the scale/rotate
# We can do this by using separate divs, or by using a useMotionValue for instant tracking.
# The easiest way with framer-motion is just setting `type: "tween", duration: 0` for x and y.

old_transition = """        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 35, 
          mass: 0.5 
        }}"""

new_transition = """        transition={{ 
          x: { type: "tween", duration: 0 },
          y: { type: "tween", duration: 0 },
          scale: { type: "spring", stiffness: 800, damping: 35 },
          rotate: { type: "spring", stiffness: 800, damping: 35 }
        }}"""

content = content.replace(old_transition, new_transition)

with open("src/components/CustomCursor.tsx", "w") as f:
    f.write(content)
