with open("src/components/AboutModal.tsx", "r") as f:
    content = f.read()

# Left side profile label
content = content.replace(
    '                    Law Society of Kenya\n                  </p>',
    '                    Legal Research\n                  </p>'
)

# Title
content = content.replace('Advocate & Policy Strategist', 'Lawyer & Policy Strategist')

# Bio text
old_bio = """                  <div className="space-y-4 text-sm md:text-base leading-relaxed font-light">
                    <p>
                      Emmanuel Baraka is a dedicated advocate committed to justice, policy reform, and meticulous legal representation. BarakaLines serves as a premier legal chamber where complex challenges meet strategic, principled solutions.
                    </p>
                    <p>
                      With a profound understanding of the law and an unwavering commitment to our clients' causes, we navigate the intricacies of the legal system with discretion, diligence, and unparalleled expertise.
                    </p>
                  </div>"""

new_bio = """                  <div className="space-y-3 text-sm md:text-[15px] leading-relaxed font-light">
                    <p>
                      Emmanuel Baraka is a law graduate and human-rights practitioner completing his admission as an Advocate of the High Court of Kenya. He holds an LL.B (Upper Second) from Kisii University, completed the Advocates Training Program at the Kenya School of Law, and is pursuing an MSc in Security and Human Rights.
                    </p>
                    <div className="pt-2">
                      <h4 className="text-accent-gold font-serif font-bold text-sm tracking-wide mb-2 uppercase">Experience</h4>
                      <ul className="space-y-3 text-sm opacity-90">
                        <li className="flex gap-2">
                          <span className="text-accent-brass mt-1">•</span>
                          <span><strong>Paralegal, KEJUDE (Kenyans for Justice and Development Trust)</strong> — supported strategic constitutional litigation challenging unconstitutional laws under Sen. Okiya Omtatah; contributed to habeas corpus applications for youth unlawfully detained during the 2024 Gen Z protests; campaigned against femicide and police brutality.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-accent-brass mt-1">•</span>
                          <span><strong>Junior Paralegal, Mokaya J.M. Law Advocates</strong> — civil and criminal legal research, drafting, and litigation support.</span>
                        </li>
                      </ul>
                    </div>
                  </div>"""

content = content.replace(old_bio, new_bio)

# Replace Highlights
old_highlights = """                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-accent-brass/20">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-accent-brass">
                      <Bookmark className="w-4 h-4" />
                      <span>Legal Counsel</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-accent-brass">
                      <BookOpen className="w-4 h-4" />
                      <span>Policy Strategy</span>
                    </div>
                  </div>"""

new_highlights = """                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-accent-brass/20">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-accent-brass">
                      <Bookmark className="w-4 h-4" />
                      <span>Human Rights</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-accent-brass">
                      <BookOpen className="w-4 h-4" />
                      <span>Policy Strategy</span>
                    </div>
                  </div>"""

content = content.replace(old_highlights, new_highlights)

with open("src/components/AboutModal.tsx", "w") as f:
    f.write(content)
