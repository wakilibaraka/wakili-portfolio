import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. Imports
content = content.replace(
    'import AboutModal from "./AboutModal";',
    'import AboutModal from "./AboutModal";\nimport ContactModal from "./ContactModal";'
)

# 2. State
content = content.replace(
    'const [isBookshelfOpen, setIsBookshelfOpen] = useState(false);',
    'const [isBookshelfOpen, setIsBookshelfOpen] = useState(false);\n  const [isDeskPhoneOpen, setIsDeskPhoneOpen] = useState(false);'
)

# 3. Desk Phone JSX
old_phone = '                  {/* Classic Office Phone */}\n                  <div className="absolute bottom-4 right-8 md:right-16 w-12 md:w-16 h-8 md:h-10 bg-mono-900 rounded shadow-lg border-t-2 border-mono-800 flex flex-col items-center justify-center rotate-[15deg] pointer-events-auto cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all">'
new_phone = '''                  {/* Classic Office Phone */}
                  <div 
                    role="button"
                    tabIndex={0}
                    aria-label="Quick Contact"
                    onClick={() => { playPickUpClack(); setIsDeskPhoneOpen(true); }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        playPickUpClack();
                        setIsDeskPhoneOpen(true);
                      }
                    }}
                    className="absolute bottom-10 right-6 md:bottom-4 md:right-16 w-12 md:w-16 h-8 md:h-10 bg-mono-900 rounded shadow-lg border-t-2 border-mono-800 flex flex-col items-center justify-center rotate-[15deg] pointer-events-auto cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass touch-manipulation"
                  >'''
content = content.replace(old_phone, new_phone)

# 4. Inject Modal
content = content.replace(
    '<AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />',
    '<AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />\n      <ContactModal isOpen={isDeskPhoneOpen} onClose={() => setIsDeskPhoneOpen(false)} />'
)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
