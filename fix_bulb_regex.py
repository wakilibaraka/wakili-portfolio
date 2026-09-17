import re
with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

content = re.sub(
    r'className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 \$\{prefersReducedMotion \? "" : "animate-swing"\} touch-manipulation"',
    r'className={`absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 ${prefersReducedMotion ? "" : "animate-swing"} touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-full before:absolute before:-inset-6 before:content-[\'\']`}',
    content
)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
