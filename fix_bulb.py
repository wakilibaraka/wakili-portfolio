import re
with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Fix the string literal issue on the hanging bulb
bad_str = 'className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 ${prefersReducedMotion ? \\"\\" : \\"animate-swing\\"} touch-manipulation"'
good_str = 'className={`absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 ${prefersReducedMotion ? "" : "animate-swing"} touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-full before:absolute before:-inset-6 before:content-[\'\']`}'

content = content.replace(bad_str, good_str)
with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
