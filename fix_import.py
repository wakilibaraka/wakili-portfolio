with open("src/components/RoomTwo.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'import { motion, MotionValue } , useReducedMotion } from "framer-motion";',
    'import { motion, MotionValue, useReducedMotion } from "framer-motion";'
)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)
