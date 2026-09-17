import re

with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# 1. LIGHT SWITCH
# Add role="button", tabIndex={0}, onKeyDown, click sound, active:scale-95.
content = content.replace(
    'onClick={toggleNightMode}',
    'role="button" tabIndex={0} aria-label="Toggle Night Mode" onClick={() => { playClickSound(); toggleNightMode(); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playClickSound(); toggleNightMode(); } }}'
)
# The switch active scale is added to className
content = re.sub(
    r'(className={`w-8 h-12 rounded border-2 shadow-\[2px_4px_12px_rgba\(0,0,0,0\.6\)\] flex flex-col items-center justify-center relative cursor-pointer transition-colors duration-1000)',
    r'\1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass active:scale-95 group',
    content
)
# Inner toggle feedback on press
content = re.sub(
    r'(<div className={`w-3 h-5 rounded-sm bg-gradient-to-b shadow-md transition-all duration-150 \$\{)',
    r'\1\n                  "group-active:scale-y-95 group-active:brightness-90 " +',
    content
)


# 2. HANGING BULB
# role="button", tabIndex={0}, pull feedback on press, glow on hover.
content = re.sub(
    r'(onClick=\{\(\) => setIsAboutOpen\(true\)\} className={`absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 \$\{prefersReducedMotion \? "" : "animate-swing"\} touch-manipulation)',
    r'role="button" tabIndex={0} aria-label="About Emmanuel Baraka" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsAboutOpen(true); } }} \1 active:scale-95',
    content
)
# Group hover glow and inner translation on press
content = content.replace(
    '{/* The Cord */}',
    '<div className={`flex flex-col items-center transition-all duration-300 ${prefersReducedMotion ? "" : "group-hover:translate-y-1 group-active:translate-y-4"}`}>\n          {/* The Cord */}'
)
content = content.replace(
    '{/* Inner filament */}',
    '{/* Inner filament */}'
)
# Close the inner wrapper right before the end of the bulb motion.div
content = re.sub(
    r'(<div className="w-2 h-3 border-2 border-orange-500/50 rounded-t-full opacity-0" />\n\s*</div>\n\s*</div>)',
    r'\1\n          </div>',
    content
)
# Add glow to the bulb glass
content = re.sub(
    r'(isNightMode \n\s*\? "bg-shade-48 shadow-\[0_0_50px_rgba\(255,170,0,0\.8\),inset_0_0_10px_rgba\(255,255,255,0\.8\)\]"\n\s*: "bg-white/10 shadow-\[inset_0_0_5px_rgba\(255,255,255,0\.2\)\] border border-white/20 backdrop-blur-sm")',
    r'\1 + " group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] group-active:brightness-150"',
    content
)


# 3. DOORS (BOOK APPOINTMENT)
# Already has active:scale-95 and focus-visible. Add a highlight overlay.
content = re.sub(
    r'(<span className="font-display font-black text-mono-900 text-\[8px\] md:text-\[10px\] uppercase tracking-wider relative z-10">BOOK<br/>APPOINTMENT</span>)',
    r'<div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 group-active:bg-black/20 transition-colors pointer-events-none z-0" />\n                 \1',
    content
)
# And make sure it reacts on keyboard Enter/Space
content = content.replace(
    'onClick={() => setIsBookingOpen(true)}',
    'onClick={() => setIsBookingOpen(true)}\n               onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsBookingOpen(true); } }}'
)


# 4. PHONES
# Payphone - Add group-active transform
content = re.sub(
    r'(isPhonePickedUp \? "-translate-x-6 -translate-y-4 rotate-\[-60deg\]" : "rotate-\[-10deg\] group-hover:rotate-\[-20deg\]")',
    r'\1 + " group-active:-translate-x-2 group-active:-translate-y-2 group-active:rotate-[-30deg]"',
    content
)
content = re.sub(
    r'(className={`group cursor-pointer relative focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass focus-visible:ring-offset-8 focus-visible:ring-offset-transparent rounded-lg before:absolute before:-inset-4 before:content-\[\\\'\\\'\] shadow-\[0_0_20px_rgba\(212,175,55,0\.15\)\] \$\{)',
    r'\1"active:scale-95 " + ',
    content
)

# Desk Phone - Add group class and handset transform
content = re.sub(
    r'(className="absolute bottom-10 right-6 md:bottom-4 md:right-16 w-12 md:w-16 h-8 md:h-10 bg-mono-900 rounded shadow-lg border-t-2 border-mono-800 flex flex-col items-center justify-center rotate-\[15deg\] pointer-events-auto cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass touch-manipulation")',
    r'className="absolute bottom-10 right-6 md:bottom-4 md:right-16 w-12 md:w-16 h-8 md:h-10 bg-mono-900 rounded shadow-lg border-t-2 border-mono-800 flex flex-col items-center justify-center rotate-[15deg] pointer-events-auto cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-brass touch-manipulation group active:scale-95"',
    content
)
# Let's find the Desk Phone handset and add group-hover and group-active transforms
content = content.replace(
    '<div className="w-10 md:w-14 h-3 bg-mono-850 rounded-full border border-black -translate-y-2 flex justify-between px-1 shadow-inner">',
    '<div className="w-10 md:w-14 h-3 bg-mono-850 rounded-full border border-black -translate-y-2 flex justify-between px-1 shadow-inner transition-transform group-hover:-translate-y-3 group-hover:rotate-[-5deg] group-active:-translate-y-4 group-active:rotate-[-10deg]">'
)

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
