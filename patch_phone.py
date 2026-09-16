with open("src/components/OfficeRoom.tsx", "r") as f:
    content = f.read()

# Imports
content = content.replace('import AboutModal from "./AboutModal";', 'import AboutModal from "./AboutModal";\nimport { useTelephoneRing } from "../hooks/useTelephoneRing";')

# State
state_block = '  const [isBookingOpen, setIsBookingOpen] = useState(false);'
new_state = '  const [isBookingOpen, setIsBookingOpen] = useState(false);\n  const [isPhonePickedUp, setIsPhonePickedUp] = useState(false);\n  const { playPickUpClack } = useTelephoneRing();'
content = content.replace(state_block, new_state)

# Handset pick-up logic
old_payphone = """                 {/* The Handset (Hanging on the left) */}
                 <div className="absolute top-2 -left-3 w-4 h-12 flex flex-col justify-between items-center rotate-[-10deg] group-hover:rotate-[-20deg] transition-transform z-20 pointer-events-none">"""
new_payphone = """                 {/* The Handset */}
                 <div className={`absolute top-2 -left-3 w-4 h-12 flex flex-col justify-between items-center transition-all duration-300 z-20 pointer-events-none ${
                   isPhonePickedUp ? "-translate-x-6 -translate-y-4 rotate-[-60deg]" : "rotate-[-10deg] group-hover:rotate-[-20deg]"
                 }`}>"""
content = content.replace(old_payphone, new_payphone)

# Wrapper to apply animate-ring if not picked up
old_wrapper = """            {/* The Wall Payphone (Contact Us) */}
            <div className="absolute top-48 md:top-56 left-4 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left z-20">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPaintingOpen(true)}
                className="group cursor-pointer relative"
              >"""
new_wrapper = """            {/* The Wall Payphone (Contact Us) */}
            <div className="absolute top-48 md:top-56 left-4 md:left-24 pointer-events-auto scale-75 md:scale-100 origin-left z-20 touch-manipulation">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playPickUpClack();
                  setIsPhonePickedUp(true);
                  setTimeout(() => setIsPaintingOpen(true), 300);
                }}
                className={`group cursor-pointer relative ${!isPhonePickedUp ? "animate-telephone-ring" : ""}`}
              >"""
content = content.replace(old_wrapper, new_wrapper)

# Handle modal close to put phone back
old_modal = '<PaintingModal isOpen={isPaintingOpen} onClose={() => setIsPaintingOpen(false)} />'
new_modal = '<PaintingModal isOpen={isPaintingOpen} onClose={() => { setIsPaintingOpen(false); setIsPhonePickedUp(false); }} />'
content = content.replace(old_modal, new_modal)

# Touch optimization on bulb and light switch
content = content.replace('className="absolute top-48 md:top-64 right-40 md:right-[350px] pointer-events-auto scale-75 md:scale-100 origin-right"', 'className="absolute top-48 md:top-64 right-40 md:right-[350px] pointer-events-auto scale-75 md:scale-100 origin-right touch-manipulation"')
content = content.replace('className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 animate-swing"', 'className="absolute top-0 right-12 md:right-32 flex flex-col items-center group pointer-events-auto cursor-pointer origin-top hover:rotate-6 transition-transform duration-700 ease-in-out z-50 animate-swing touch-manipulation"')
content = content.replace('className="absolute bottom-16 md:bottom-28 right-4 md:right-24 preserve-3d"', 'className="absolute bottom-16 md:bottom-28 right-4 md:right-24 preserve-3d touch-manipulation"')

with open("src/components/OfficeRoom.tsx", "w") as f:
    f.write(content)
