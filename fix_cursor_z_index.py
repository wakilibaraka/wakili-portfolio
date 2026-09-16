with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Remove CustomCursor from the top
content = content.replace("      <CustomCursor isNightMode={isNightMode} />\n", "")

# Add it to the very bottom, right before the last closing div of the component
# Actually the structure is:
#     </div>
#       </div>
#   );
# }

# We want it after the Modals, before the last `</div>`.
new_bottom = """      {/* Modals */}
      <PaintingModal isOpen={isPaintingOpen} onClose={() => setIsPaintingOpen(false)} />
      <BookshelfModal isOpen={isBookshelfOpen} onClose={() => setIsBookshelfOpen(false)} />
      
      {/* Custom Cursor (Rendered last to stay on top of everything) */}
      <CustomCursor isNightMode={isNightMode} />
    </div>
"""
content = content.replace("      {/* Modals */}\n      <PaintingModal isOpen={isPaintingOpen} onClose={() => setIsPaintingOpen(false)} />\n      <BookshelfModal isOpen={isBookshelfOpen} onClose={() => setIsBookshelfOpen(false)} />\n    </div>", new_bottom)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
