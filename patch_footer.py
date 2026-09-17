import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Add imports
content = content.replace(
    'import { Scale, BookOpen, Mail, Phone, Compass, Sparkles, Power } from "lucide-react";',
    'import { Scale, BookOpen, Mail, Phone, Compass, Sparkles, Power, Linkedin, Twitter, Instagram } from "lucide-react";'
)

# Add footer icons
socials = """          <div className="flex items-center gap-4 z-50 pointer-events-auto">
            <a href="https://linkedin.com/in/{{LINKEDIN_URL}}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass rounded">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/{{X_URL}}" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass rounded">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/{{INSTAGRAM_URL}}" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brass rounded">
              <Instagram className="w-4 h-4" />
            </a>
          </div>"""

# Replace empty lines in footer
content = re.sub(
    r'(<footer className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-accent-brass/75">\s*\n\s*\n\s*)',
    r'\1' + socials + '\n',
    content
)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
