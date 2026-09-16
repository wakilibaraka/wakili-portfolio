with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Imports
content = content.replace('import BookshelfModal from "./BookshelfModal";', 'import BookshelfModal from "./BookshelfModal";\nimport AboutModal from "./AboutModal";')

# 2. State
content = content.replace('const [isPaintingOpen, setIsPaintingOpen] = useState(false);', 'const [isPaintingOpen, setIsPaintingOpen] = useState(false);\n  const [isAboutOpen, setIsAboutOpen] = useState(false);')

# 3. Modal injection
content = content.replace('<BookshelfModal isOpen={isBookshelfOpen} onClose={() => setIsBookshelfOpen(false)} />', '<BookshelfModal isOpen={isBookshelfOpen} onClose={() => setIsBookshelfOpen(false)} />\n      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />')

# 4. Make bulb clickable
old_bulb = '<motion.div style={{ y: bulbScrollY, opacity: bulbOpacity }} className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-none origin-top hover:rotate-6 transition-transform duration-700 ease-in-out">'
new_bulb = '<motion.div style={{ y: bulbScrollY, opacity: bulbOpacity }} onClick={() => setIsAboutOpen(true)} className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50">'
content = content.replace(old_bulb, new_bulb)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
