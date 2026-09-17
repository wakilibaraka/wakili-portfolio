"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, BookOpen, ExternalLink, Sparkles, Loader2 } from "lucide-react";

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

export default function BookshelfModal({ isOpen, onClose }: BookshelfModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (isOpen && posts.length === 0) {
      setLoading(true);
      fetch("https://barakalines.com/wp-json/wp/v2/posts?per_page=6")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPosts(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
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
                      className="group p-5 rounded-xl bg-white border border-shade-84 hover:border-accent-terracotta shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
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
