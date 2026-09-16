with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Let's find exactly the spot where ROOM 2 closes.
start_marker = "{/* ROOM 2: Scroll Target */}"
end_marker = "{/* ========================================================= */}\n      {/* LAYER 4: Interface HUD"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_room2 = """{/* ROOM 2: Scroll Target */}
        <motion.div
          style={{ rotateY: scrollRoom2RotateY, z: scrollRoom2Z, opacity: scrollRoom2Opacity }}
          className="absolute inset-0 preserve-3d flex items-center justify-center pointer-events-none"
        >
          <RoomTwo isNightMode={isNightMode} rotateX={rotateX} rotateY={rotateY} panX={panX} panY={panY} onOpenWritings={() => setIsBookshelfOpen(true)} />
        </motion.div>
      </motion.div>

      """

content = content[:start_idx] + new_room2 + content[end_idx:]

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
