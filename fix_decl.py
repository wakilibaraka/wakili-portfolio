with open("src/components/RoomTwo.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'export default function RoomTwo({\n  const prefersReducedMotion = useReducedMotion(); isNightMode, rotateX, rotateY, panX, panY, onOpenWritings }: RoomTwoProps) {',
    'export default function RoomTwo({ isNightMode, rotateX, rotateY, panX, panY, onOpenWritings }: RoomTwoProps) {\n  const prefersReducedMotion = useReducedMotion();'
)

with open("src/components/RoomTwo.tsx", "w") as f:
    f.write(content)
