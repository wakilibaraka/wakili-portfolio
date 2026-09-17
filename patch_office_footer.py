import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Replace Imports
content = content.replace(
    'import { Scale, BookOpen, Mail, Phone, Compass, Sparkles, Power } from "lucide-react";',
    'import { Scale, BookOpen, Mail, Phone, Compass, Sparkles, Power, Linkedin, Instagram, Twitter, Facebook } from "lucide-react";'
)

# Insert Footer Social Icons
footer_jsx = """          <div className="flex items-center gap-4 z-50 pointer-events-auto">
            <a href="https://www.linkedin.com/in/wakilibaraka" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass rounded"><Linkedin className="w-4 h-4" /></a>
            <a href="https://www.instagram.com/wakilibaraka" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass rounded"><Instagram className="w-4 h-4" /></a>
            <a href="https://x.com/wakilibaraka" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass rounded"><Twitter className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/wakilibaraka" target="_blank" rel="noopener noreferrer" aria-label="Facebook profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass rounded"><Facebook className="w-4 h-4" /></a>
          </div>\n"""

# We'll use a reliable regex for the empty lines in the footer
content = re.sub(
    r'(<footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-accent-brass/75">\s*\n)',
    r'\1' + footer_jsx,
    content
)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
