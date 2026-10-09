"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, BookOpen, ExternalLink, Sparkles, Loader2 } from "lucide-react";
import { useModalAccessibility } from "../hooks/useModalAccessibility";

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  link: string;
  date: string;
}

interface BookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// P3: typed, editable shelf — content lives here, not in markup.
interface Writing {
  id: string;
  title: string;
  year: string;
  abstract: string;
  tags: string[];
  spine: string;
  link: string;
}

const WRITINGS: Writing[] = [
  {
    id: "constitutional-litigation",
    title: "Constitutional Litigation in Kenya",
    year: "2024",
    abstract: "Standing, ripeness, and remedies — practical reflections from the corridors of the High Court on moving constitutional claims from theory to orders.",
    tags: ["Constitutional Law", "Litigation"],
    spine: "bg-[#5e1f1c]",
    link: "https://barakalines.com",
  },
  {
    id: "human-rights-briefs",
    title: "Human Rights Briefs: Research to Courtroom",
    year: "2024",
    abstract: "How a research memo becomes pleadings — method, precedent, and storytelling in public-interest briefs.",
    tags: ["Human Rights", "Method"],
    spine: "bg-[#1d3557]",
    link: "https://barakalines.com",
  },
  {
    id: "policy-strategy",
    title: "Policy Strategy for Public-Interest Lawyers",
    year: "2023",
    abstract: "Litigation is one lever among many — pairing cases with policy advocacy, coalition work, and legislative drafting.",
    tags: ["Policy", "Strategy"],
    spine: "bg-[#2a4d38]",
    link: "https://barakalines.com",
  },
  {
    id: "devolution",
    title: "Devolution & County Governance",
    year: "2023",
    abstract: "Notes on county assemblies, oversight, and making devolution deliver on the promise of Article 174.",
    tags: ["Devolution", "Governance"],
    spine: "bg-[#a38035]",
    link: "https://barakalines.com",
  },
  {
    id: "tech-privacy",
    title: "Technology, Privacy & the Bill of Rights",
    year: "2025",
    abstract: "Data protection, surveillance, and expression — reading the Bill of Rights into Kenya's digital present.",
    tags: ["Technology", "Privacy"],
    spine: "bg-[#3a1b12]",
    link: "https://barakalines.com",
  },
  {
    id: "plain-language",
    title: "Plain-Language Pleadings",
    year: "2022",
    abstract: "On writing so judges, clients, and citizens can follow — clarity as an ethical duty of the advocate.",
    tags: ["Writing", "Craft"],
    spine: "bg-[#7c4d32]",
    link: "https://barakalines.com",
  },
];
const FALLBACK_POSTS: Post[] = [
  {
    id: -1,
    title: { rendered: "Constitutional Litigation in Kenya: A Practitioner's Notes" },
    excerpt: { rendered: "Standing, ripeness, and remedies — practical reflections from the corridors of the High Court." },
    slug: "constitutional-litigation-notes",
    link: "https://barakalines.com",
    date: "",
  },
  {
    id: -2,
    title: { rendered: "Human Rights Briefs: From Research to the Courtroom" },
    excerpt: { rendered: "How a research memo becomes pleadings — method, precedent, and storytelling." },
    slug: "human-rights-briefs",
    link: "https://barakalines.com",
    date: "",
  },
  {
    id: -3,
    title: { rendered: "Policy Strategy for Public-Interest Lawyers" },
    excerpt: { rendered: "Litigation is one lever among many — on pairing cases with policy advocacy." },
    slug: "policy-strategy",
    link: "https://barakalines.com",
    date: "",
  },
];

export default function BookshelfModal({ isOpen, onClose }: BookshelfModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  // P3: which spine is flipped open
  const [openSpine, setOpenSpine] = useState<string | null>(null);
  const activeWriting = WRITINGS.find((w) => w.id === openSpine) ?? null;
  const modalRef = useRef<HTMLDivElement>(null);
  useModalAccessibility(isOpen, onClose, modalRef);

  useEffect(() => {
    if (isOpen && posts.length === 0) {
      setLoading(true);
      fetch("https://barakalines.com/wp-json/wp/v2/posts?per_page=6")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data);
          } else {
            setPosts(FALLBACK_POSTS);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
          setPosts(FALLBACK_POSTS);
          setLoading(false);
        });
    }
  }, [isOpen, posts.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          {/* 3D Book Container */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.75, rotateY: -25, z: -100 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, rotateY: 0, z: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.8, rotateY: -15, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { type: "spring", damping: 28, stiffness: 240 }}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Selected writings and legal epistles"
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-paper-cream text-ink-deep rounded-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] overflow-hidden border-8 border-wood-mahogany"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Book Spine / Leather Texture Header */}
            <div className="bg-gradient-to-r from-wood-dark via-wood-mahogany to-wood-dark text-paper-cream px-6 py-4 flex items-center justify-between border-b border-accent-brass/30">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-accent-brass" />
                <div>
                  <h3 className="font-serif text-lg tracking-wide text-accent-gold">
                    Selected Writings & Legal Epistles
                  </h3>
                  <p className="text-[11px] text-accent-brass/80 uppercase tracking-widest">
                    Volume I • From BarakaLines
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-accent-brass hover:bg-white/10 transition-colors"
                aria-label="Close Book"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Book Pages Interior */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="text-center max-w-xl mx-auto mb-6">
                <p className="font-serif italic text-sm text-ink-muted">
                  "Thoughts on law, constitutional governance, technology, and writing."
                </p>
              </div>

              {/* P3: spine shelf — hover lifts, click flips open */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-3">
                  The spine shelf — click a spine
                </p>
                <div className="flex items-end gap-2 rounded-xl bg-wood-blackest border-4 border-wood-mahogany p-4 shadow-inner min-h-44">
                  {WRITINGS.map((w) => {
                    const open = openSpine === w.id;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setOpenSpine(open ? null : w.id)}
                        aria-expanded={open}
                        aria-label={`${w.title} (${w.year})`}
                        className={`${w.spine} group relative w-10 md:w-12 shrink-0 rounded-t-sm border-r border-black/40 shadow-md transition-transform duration-200 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-terracotta ${open ? "-translate-y-2 ring-2 ring-accent-gold" : ""}`}
                        style={{ height: `${112 + (w.title.length % 3) * 12}px` }}
                      >
                        <span
                          className="absolute inset-0 flex items-center justify-center p-1 text-center text-[9px] font-serif font-bold uppercase leading-tight tracking-wider text-paper-cream"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          {w.title} · {w.year}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {activeWriting && (
                    <motion.div
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotateX: -18 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, rotateX: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-3 rounded-xl border border-shade-84 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-accent-terracotta">
                        <span>{activeWriting.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeWriting.tags.join(" / ")}</span>
                      </div>
                      <h4 className="font-serif text-base font-semibold mt-1">{activeWriting.title}</h4>
                      <p className="text-xs text-ink-muted leading-relaxed mt-1">{activeWriting.abstract}</p>
                      <a
                        href={activeWriting.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-terracotta hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-terracotta rounded"
                      >
                        <span>Read</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-ink-muted">
                  <Loader2 className="w-8 h-8 animate-spin text-accent-terracotta" />
                  <p className="text-sm font-serif italic">Retrieving treatises from the archive...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {posts.map((post) => (
                    <a
                      key={post.id}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-5 rounded-xl bg-white border border-shade-84 hover:border-accent-terracotta shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-accent-terracotta uppercase tracking-wider mb-1.5 block">
                          Legal & Political Commentary
                        </span>
                        <h4
                          className="font-serif text-base font-semibold leading-snug group-hover:text-accent-terracotta transition-colors mb-2"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <div
                          className="text-xs text-ink-muted line-clamp-3 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                      </div>

                      <div className="mt-4 pt-3 border-t border-shade-85 flex items-center justify-between text-xs text-accent-terracotta font-semibold">
                        <span>Read Essay</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Book Bottom Bookmark */}
            <div className="bg-shade-86 px-6 py-3 border-t border-shade-87 flex items-center justify-between text-xs text-ink-muted">
              <span className="font-serif italic">Archived at barakalines.com</span>
              <a
                href="https://barakalines.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent-terracotta font-semibold hover:underline"
              >
                <span>Browse Entire Library</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
